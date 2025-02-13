
"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
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
import usePDFGeneration from "@/context/UsePDFGeneration";
interface DocumentPreviewProps {
    documentType: keyof typeof documentConfig;
}

const NDAPreview: React.FC<DocumentPreviewProps> = ({ documentType }) => {
    const { data: sessionData } = useSession() as { data: { user: { email: string } } | null };
    const router = useRouter();
    const searchParams = useSearchParams();
    const docType = searchParams.get("DT")?.trim() || null;
    const docNumber = Number(searchParams.get("DN")) || 0;
    const paymentStatus = searchParams.get("paymentStatus");
    // console.log("doc && number", docType, docNumber);
    const targetRef = useRef<HTMLDivElement | null>(null);
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
    const LetterPreviewComponent = letterPreview
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

    // const { toPDF, targetRef } = usePDF({
    //     filename: fileName,
    //     page: { margin: 20, format: "a4", orientation: "portrait" },
    //     canvas: { mimeType: "image/jpeg", qualityRatio: 0.6 },
    //     overrides: {
    //         pdf: {
    //             compress: true
    //         },
    //     }
    // });

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

    // const handleInputChange = useCallback(
    //     (name: keyof typeof initialFormData, value: string | number | boolean | string[]) => {
    //         setState((prev) => ({
    //             ...prev,
    //             formData: { ...prev.formData, [name]: value },
    //         }));
    //     },
    //     []
    // );

    const existingData = sessionStorage.getItem(storageKey);
    const currentData = JSON.parse(existingData || "{}");

    // problem will occur here, when we make it dynamic value
    const handleInputChange = useCallback(
        (name: keyof typeof initialFormData, value: string | number | boolean | string[]) => {
            setState((prev) => {
                const updatedFormData = { ...prev.formData, [name]: value };

                // Store updated data in sessionStorage immediately
                if (typeof window !== "undefined") {
                    sessionStorage.setItem(
                        storageKey,
                        JSON.stringify({
                            ...currentData,
                            formData: updatedFormData,
                            step: prev.step,
                            progress: prev.progress,
                        })
                    );
                }

                return { ...prev, formData: updatedFormData };
            });
        },
        [currentData, storageKey]
    );

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

    // const generatePDF = async () => {
    //     const element = targetRef.current;
    //     if (!element) return console.error("Error: targetRef is null.");

    //     await new Promise(resolve => setTimeout(resolve, 500));

    //     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    //     const [pageWidth, pageHeight, margin] = [210, 297, 10];
    //     let yOffset = margin;

    //     for (const child of element.children) {
    //         const canvas = await html2canvas(child, { scale: 2 });
    //         const imgData = canvas.toDataURL("image/jpeg", 0.8);
    //         const imgWidth = pageWidth - 2 * margin;
    //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //         if (yOffset + imgHeight > pageHeight - margin) {
    //             pdf.addPage();
    //             yOffset = margin;
    //         }
    //         pdf.addImage(imgData, "JPEG", margin, yOffset, imgWidth, imgHeight);
    //         yOffset += imgHeight + 5;
    //     }
    //     return pdf.output('blob');
    // };

    // const performDownloadAndSendEmail = async () => {
    //     if (!(paymentStatus === "success" && !state.isDownloading && GetDocType?.getBusinessForms?.length)) return;

    //     try {
    //         await new Promise(resolve => {
    //             const interval = setInterval(() => {
    //                 if (targetRef.current) {
    //                     clearInterval(interval);
    //                     resolve(undefined);
    //                 }
    //             }, 500);
    //         });

    //         if (!targetRef.current) return console.error("Error: targetRef.current is still null after delay.");

    //         setState(prev => ({ ...prev, isDecrypted: true, isDownloading: true }));

    //         const pdfBlob = await generatePDF();
    //         if (!pdfBlob) throw new Error("PDF generation failed.");

    //         const pdfBase64 = await new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(pdfBlob);
    //             reader.onloadend = () => typeof reader.result === "string"
    //                 ? resolve(reader.result.split(",")[1])
    //                 : reject(new Error("Failed to read PDF Blob"));
    //             reader.onerror = reject;
    //         });

    //         const response = await fetch("/api/sendEmailWithAttachment", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ pdfBlob: pdfBase64, email: sessionData?.user?.email, pdfName: fileName }),
    //         });

    //         const result = await response.json();
    //         if (!result.success) throw new Error(result.message);

    //         toast.success("Mail sent successfully!", {
    //             position: "top-right",
    //             duration: 3000,
    //             style: { border: "1px solid #65a34e", padding: "16px", color: "#65a34e" },
    //             iconTheme: { primary: "#65a34e", secondary: "#FFFAEE" },
    //         });

    //         sessionStorage.removeItem(storageKey);
    //         setState(prev => ({ ...prev, isDecrypted: false, isDownloading: false }));

    //         const urlLink = new URL(window.location.href);
    //         urlLink.searchParams.delete("paymentStatus");
    //         window.history.replaceState({}, "", url);
    //         setTimeout(() => window.location.replace(url), 500);
    //     } catch (error) {
    //         console.error("Error generating PDF or sending email:", error);
    //         setState(prev => ({ ...prev, isDownloading: false, isDecrypted: false }));
    //     }
    // };

    // useEffect(() => {
    //     const timer = setTimeout(performDownloadAndSendEmail, 1000);
    //     return () => clearTimeout(timer);
    // }, [paymentStatus, state.isDownloading, GetDocType?.getBusinessForms?.length, storageKey, url, targetRef, fileName, sessionData?.user?.email]);

    usePDFGeneration({
        targetRef,
        paymentStatus,
        state,
        setState,
        GetDocType,
        storageKey,
        url,
        fileName,
        sessionData,
    });


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
                                        color="success"
                                        radius="sm"
                                        className="text-[#1E318D] font-medium font-Lorin"
                                    >
                                        Back
                                    </Button>
                                    {JSON.parse(sessionStorage.getItem(storageKey) || "{}").step <
                                        fieldGroups.length && (
                                            <Button
                                                onPress={handleNext}
                                                color="success"
                                                radius="sm"
                                                className="text-white font-semibold font-Lorin"
                                                disabled={!isCurrentStepComplete()}
                                            >
                                                {getDocsLoading ? <Loader /> : "Save & continue"}
                                            </Button>
                                        )}
                                    {JSON.parse(sessionStorage.getItem(storageKey) || "{}")
                                        .step === fieldGroups.length &&
                                        state.progress === 100 && (
                                            <Button
                                                disabled={paymentStatus === 'success' ? true : false}
                                                onClick={handleFinishClick}
                                                color="success"
                                                radius="sm"
                                                className="text-white disabled:bg-warning/60 font-semibold font-Lorin animate-pulse hover:scale-110 transition-all transform duration-400 ease-in-out"
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
                                {LetterPreviewComponent && (
                                    <LetterPreviewComponent
                                        formData={state.formData}
                                        currentYear={state.currentYear}
                                        encryptedContent={state.encryptedContent}
                                        isDecrypted={state.isDecrypted}
                                        isFormComplete={isFormComplete()}
                                        targetRef={targetRef} />
                                )}
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
