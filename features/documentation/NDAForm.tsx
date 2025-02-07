
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { usePDF } from "react-to-pdf";
import { IoMdDownload } from "react-icons/io";
import { GetBFResponse, GetOBFResponse, GetUserResponse } from "@/types/Types";
import { Loader } from "@/components/UI/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { encryptText } from "@/services/encryption";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import {
    CREATE_BUSINESS_FORM,
    GET_BUSINESS_FORM,
    GET_BUSINESS_FORMS,
    GET_USER,
    UPDATE_BUSINESS_FORM,
} from "@/constants/Queries";
import { getStorageData } from "@/constants/Helper";
import { Spinner } from "@heroui/spinner";
import { documentConfig } from "@/constants/documentConfig";
import toast from "react-hot-toast";

interface DocumentPreviewProps {
    documentType: keyof typeof documentConfig;
}

const NDAPreview: React.FC<DocumentPreviewProps> = ({ documentType }) => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const docType = searchParams.get("DT")?.trim() || null;
    const docNumber = Number(searchParams.get("DN")) || 0;
    const paymentStatus = searchParams.get("paymentStatus");
    // console.log("doc && number", docType, docNumber);

    const config = documentConfig[documentType];
    const {
        title,
        initialFormData,
        fieldGroups,
        sensitiveContent,
        documentSlug,
        fileName,
        storageKey,
        url,
        letterPreview,
        renderStep,
    } = config;

    // State management
    const [state, setState] = useState(() => {
        const storageData = getStorageData();
        return {
            step: storageData?.step ?? 1,
            progress: storageData?.progress ?? 0,
            formData: storageData?.formData ?? initialFormData,
            isFinished: false,
            encryptedContent: encryptText(sensitiveContent),
            isDecrypted: false,
            isDownloading: false,
            currentYear: new Date().getFullYear(),
        };
    });
    // GraphQl || query
    const { data: RoleBased, loading: userLoading } = useQuery<GetUserResponse>(
        GET_USER,
        {
            variables: { email: sessionData?.user?.email },
        }
    );
    const userId = RoleBased?.getUser?.id;

    const { data: GetDocType, loading: getDocsLoading } = useQuery<GetBFResponse>(
        GET_BUSINESS_FORMS,
        {
            variables: {
                userId,
                DocType: documentSlug,
                orderBy: { DocNumber: "desc" },
            },
        }
    );
    // console.log(GetDocType?.getBusinessForms);

    const { data: GetDoc, loading: getDocLoading } = useQuery<GetOBFResponse>(
        GET_BUSINESS_FORM,
        {
            variables: { userId, DocType: documentSlug, DocNumber: docNumber },
        }
    );
    // GraphQl || mutation
    const [createBusinessForm] = useMutation(CREATE_BUSINESS_FORM, {
        refetchQueries: [
            {
                query: GET_BUSINESS_FORMS,
                variables: {
                    userId,
                    DocType: documentSlug,
                    orderBy: { DocNumber: "desc" },
                },
            },
        ],
        awaitRefetchQueries: true,
    });
    const [updateBusinessForm] = useMutation(UPDATE_BUSINESS_FORM, {
        refetchQueries: [
            {
                query: GET_BUSINESS_FORMS,
                variables: {
                    userId,
                    DocType: documentSlug,
                    orderBy: { DocNumber: "desc" },
                },
            },
        ],
        awaitRefetchQueries: true,
    });

    const { toPDF, targetRef } = usePDF({
        filename: fileName,
        page: { margin: 20, format: "a4", orientation: "portrait" },
        canvas: { mimeType: "image/jpeg", qualityRatio: 0.6 },
    });

    const totalFields = useMemo(
        () => fieldGroups.reduce((acc, group) => acc + group.fields.length, 0),
        [fieldGroups]
    );

    const calculateProgress = useCallback(() => {
        const filledFields = Object.entries(state.formData).filter(
            ([key, value]) => {
                const fieldStep = fieldGroups.find((group) =>
                    group.fields.includes(key as keyof typeof initialFormData)
                )?.step;
                return fieldStep && fieldStep <= state.step && value !== "";
            }
        ).length;
        return Math.floor((filledFields / totalFields) * 100);
    }, [state.formData, state.step, totalFields, fieldGroups]);

    const isCurrentStepComplete = useCallback(() => {
        const currentGroup = fieldGroups.find((group) => group.step === state.step);
        return currentGroup
            ? currentGroup.fields.every((field) => state.formData[field] !== "")
            : false;
    }, [state.step, state.formData, fieldGroups]);

    // problem will occur here, when we make it dynamic value
    const handleInputChange = useCallback(
        (name: keyof typeof initialFormData, value: string | number | boolean | string[]) => {
            setState((prev) => ({
                ...prev,
                formData: { ...prev.formData, [name]: value },
            }));
        },
        []
    );

    const existingData = sessionStorage.getItem(storageKey);
    const currentData = JSON.parse(existingData || "{}");
    // console.log(currentData);

    // Reusable function to save progress to the database
    const saveProgressToDatabase = useCallback(async () => {
        if (!userId) return;

        const input = {
            userId,
            DocType: docType !== null && docNumber > 0 ? docType : documentSlug,
            formData: currentData,
            status:
                (docType !== null && docNumber > 0
                    ? currentData.progress
                    : state.progress) === 100
                    ? "IsComplete"
                    : "IsPending",
        };

        // Get existing form based on document type
        const existingForm =
            docType !== null && docNumber > 0
                ? GetDoc?.getBusinessForm || null
                : GetDocType?.getBusinessForms
                    ?.filter((form) => form.DocType === input.DocType)
                    ?.sort((a, b) => b.DocNumber - a.DocNumber)?.[0];
        // console.log("existing", existingForm);

        try {
            // console.log("existing", existingForm);

            if (
                existingForm &&
                (state.step > 1 || (docType !== null && docNumber > 0))
            ) {
                const { data } = await updateBusinessForm({
                    variables: { input: { ...input, DocNumber: existingForm.DocNumber } },
                });
                if (data) {
                    toast.success("Form updated successfully!", {
                        position: "top-right",
                        duration: 3000,
                        style: {
                            border: "1px solid #65a34e",
                            padding: "16px",
                            color: "#65a34e",
                        },
                        iconTheme: {
                            primary: "#65a34e",
                            secondary: "#FFFAEE",
                        },
                    });
                    setState((prevState) => ({ ...prevState, step: state.step + 1 }));
                } else {
                    console.error("No data returned from update mutation.");
                    toast.error(
                        "An error occurred while updating the form. Please try again.",
                        {
                            position: "top-right",
                            duration: 3000,
                            style: {
                                border: "1px solid #EB1C23",
                                padding: "16px",
                                color: "#EB1C23",
                            },
                            iconTheme: {
                                primary: "#EB1C23",
                                secondary: "#FFFAEE",
                            },
                        }
                    );
                }
            } else {
                // Create a new form
                const { data } = await createBusinessForm({
                    variables: {
                        input: {
                            ...input,
                            url,
                        },
                    },
                });

                if (data) {
                    toast.success("Form submitted successfully!", {
                        position: "top-right",
                        duration: 3000,
                        style: {
                            border: "1px solid #65a34e",
                            padding: "16px",
                            color: "#65a34e",
                        },
                        iconTheme: {
                            primary: "#65a34e",
                            secondary: "#FFFAEE",
                        },
                    });
                    setState((prevState) => ({ ...prevState, step: state.step + 1 }));
                } else {
                    console.error("No data returned from create mutation.");
                    toast.error(
                        "An error occurred while updating the form. Please try again.",
                        {
                            position: "top-right",
                            duration: 3000,
                            style: {
                                border: "1px solid #EB1C23",
                                padding: "16px",
                                color: "#EB1C23",
                            },
                            iconTheme: {
                                primary: "#EB1C23",
                                secondary: "#FFFAEE",
                            },
                        }
                    );
                }
            }
        } catch (error) {
            console.error("Error saving progress:", error);
            toast.error(
                "Failed to submit the form. Please check your internet connection and reload or try again later.",
                {
                    position: "top-right",
                    duration: 3000,
                    style: {
                        border: "1px solid #EB1C23",
                        padding: "16px",
                        color: "#EB1C23",
                    },
                    iconTheme: {
                        primary: "#EB1C23",
                        secondary: "#FFFAEE",
                    },
                }
            );
        }
    }, [
        userId,
        state,
        GetDocType,
        currentData,
        GetDoc?.getBusinessForm,
        docType,
        createBusinessForm,
        updateBusinessForm,
        documentSlug,
        url,
        docNumber,
    ]);

    const handleNext = useCallback(async () => {
        if (state.step < fieldGroups.length && isCurrentStepComplete()) {
            const nextStep = state.step + 1;
            setState((prev) => ({ ...prev, step: nextStep }));

            sessionStorage.setItem(
                storageKey,
                JSON.stringify({
                    ...currentData,
                    step: nextStep,
                })
            );
            await saveProgressToDatabase();
        }
    }, [
        state.step,
        isCurrentStepComplete,
        saveProgressToDatabase,
        currentData,
        fieldGroups.length,
        storageKey,
    ]);

    const handleBack = useCallback(() => {
        if (state.step > 1) {
            setState((prev) => ({ ...prev, step: prev.step - 1 }));
            sessionStorage.setItem(
                storageKey,
                JSON.stringify({
                    ...currentData,
                    step: state.step - 1,
                })
            );
        }
    }, [state.step, currentData, storageKey]);

    const handleFinishClick = useCallback(async () => {
        await saveProgressToDatabase();
        setState((prev) => ({ ...prev, isFinished: true }));
    }, [saveProgressToDatabase]);

    const handleDownload = useCallback(async () => {
        const currentPath = window.location.pathname;
        const paymentUrl = `/payment?amount=5.99&redirect=${encodeURIComponent(
            currentPath
        )}`;
        router.push(paymentUrl);
    }, [router]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(
                storageKey,
                JSON.stringify({
                    ...currentData,
                    formData: state.formData,
                    step: state.step,
                    progress: state.progress,
                })
            );
        }
    }, [currentData, state.formData, state.step, state.progress, storageKey]);

    // Load data from the database or session storage
    useEffect(() => {
        const documentData = GetDoc?.getBusinessForm?.formData;

        const injectDataToSessionStorage = () => {
            // Ensure documentData exists
            if (documentData) {
                // If (docType !== null  && docNumber > 0) is true or both docNumber and docType exist, inject data
                if (docNumber && docType) {
                    const dbFormData = documentData.formData || {};
                    const dbStep = documentData.step || 1;
                    const dbProgress = documentData.progress || 0;

                    const storedData = {
                        step: dbStep,
                        progress: dbProgress,
                        formData: dbFormData,
                    };
                    // console.log("document", storedData);
                    // Inject data into sessionStorage
                    sessionStorage.setItem(storageKey, JSON.stringify(storedData));

                    // Update state with the new data
                    setState((prev) => ({
                        ...prev,
                        step: dbStep,
                        progress: dbProgress,
                        formData: { ...initialFormData, ...dbFormData },
                    }));
                }
            }
        };

        // Only inject data when the loading states are complete and data is available
        if (!getDocLoading) {
            injectDataToSessionStorage();
        }
    }, [
        GetDoc?.getBusinessForm,
        docNumber,
        docType,
        getDocLoading,
        storageKey,
        initialFormData,
    ]);

    useEffect(() => {
        const newProgress = calculateProgress();
        setState((prev) => ({ ...prev, progress: newProgress }));
    }, [state.formData, state.step, calculateProgress]);
    console.log(state.isDownloading);

    // download process
    useEffect(() => {
        if (
            paymentStatus === "success" &&
            !state.isDownloading &&
            GetDocType?.getBusinessForms?.length
        ) {
            const performDownload = async () => {
                try {
                    if (!targetRef.current) {
                        console.error("Error: targetRef is null. Waiting for re-render...");
                        return;
                    }
                    setState((prev) => ({
                        ...prev,
                        isDecrypted: true,
                        isDownloading: true,
                    }));
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    console.log("Generating PDF...");
                    await toPDF();
                    console.log("PDF generated successfully.");

                    // Clear session storage and verify it's removed
                    sessionStorage.removeItem(storageKey);

                    setState((prev) => ({
                        ...prev,
                        isDecrypted: false,
                        isDownloading: false,
                    }));
                    const urlLink = new URL(window.location.href);
                    urlLink.searchParams.delete("paymentStatus");
                    window.history.replaceState({}, "", url);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    window.location.replace(url);
                } catch (error) {
                    console.error("Error generating PDF:", error);
                    setState((prev) => ({
                        ...prev,
                        isDownloading: false,
                        isDecrypted: false,
                    }));
                }
            };
            performDownload();
        }
    }, [paymentStatus, state.isDownloading, GetDocType, storageKey, toPDF, url, targetRef]);

    const isFormComplete = (): boolean => {
        return (
            (state.isFinished && state.progress === 100) ||
            (state.progress === 100 &&
                GetDoc?.getBusinessForm.status === "IsComplete")
        );
    };

    if (userLoading || getDocLoading) {
        return (
            <div className="w-full padding h-[80vh] flex justify-center items-center">
                <Spinner size="lg" label="Loading..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl space-y-12 py-16">
            <h3 className="text-2xl text-center md:text-start md:text-3xl tracking-wider font-semibold text-[#1E318D] capitalize">
                {title}
            </h3>
            <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
                {!isFormComplete() && (
                    <div className="w-full basis-full lg:basis-2/5">
                        <Card className="lg:max-w-md">
                            <CardBody>
                                <Progress
                                    value={state.progress}
                                    className="mb-4"
                                    color="primary"
                                    showValueLabel
                                />
                                {renderStep({
                                    step: state.step,
                                    formData: state.formData,
                                    // @ts-ignore
                                    handleInputChange,
                                })}
                                <div className="flex justify-between mt-4">
                                    <Button
                                        onPress={handleBack}
                                        disabled={state.step === 1}
                                        variant="bordered"
                                        color="warning"
                                        radius="sm"
                                        className="text-[#1E318D] font-medium font-Lorin"
                                    >
                                        Back
                                    </Button>
                                    {JSON.parse(sessionStorage.getItem(storageKey) || "{}").step <
                                        fieldGroups.length && (
                                            <Button
                                                onPress={handleNext}
                                                color="warning"
                                                radius="sm"
                                                className="text-white font-semibold font-Lorin"
                                                disabled={!isCurrentStepComplete()}
                                            >
                                                {getDocsLoading ? <Loader /> : "save & continue"}
                                            </Button>
                                        )}
                                    {JSON.parse(sessionStorage.getItem(storageKey) || "{}")
                                        .step === fieldGroups.length &&
                                        state.progress === 100 && (
                                            <Button
                                                onClick={handleFinishClick}
                                                color="warning"
                                                radius="sm"
                                                className="text-white font-semibold font-Lorin animate-pulse hover:scale-110 transition-all transform duration-400 ease-in-out"
                                            >
                                                Save & Finish!
                                            </Button>
                                        )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
                <div className="w-full basis-full lg:basis-3/5 select-none">
                    <Card className="w-full">
                        <CardBody>
                            <h3 className="text-lg font-semibold mb-4 text-[#1E318D]">
                                Preview
                            </h3>
                            <div className="no_scrollbar max-h-[490px] overflow-y-scroll">
                                {letterPreview({
                                    formData: state.formData,
                                    currentYear: state.currentYear,
                                    encryptedContent: state.encryptedContent,
                                    isDecrypted: state.isDecrypted,
                                    isFormComplete: isFormComplete(),
                                    targetRef: targetRef,
                                })}
                            </div>
                            {(isFormComplete() ||
                                GetDoc?.getBusinessForm.status === "IsComplete") && (
                                    <Button
                                        onPress={handleDownload}
                                        className="mt-4 w-full text-white"
                                        color="primary"
                                        disabled={state.isDownloading}
                                        endContent={
                                            !state.isDownloading && (
                                                <IoMdDownload className="text-xl ml-5" />
                                            )
                                        }
                                    >
                                        {state.isDownloading ? <Loader /> : "Download PDF"}
                                    </Button>
                                )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NDAPreview;
