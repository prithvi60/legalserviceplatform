"use client";

import React, { useState, ChangeEvent, JSX, useEffect, useRef } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { DatePicker } from "@nextui-org/date-picker";
import { usePDF } from "react-to-pdf";
import { format } from "date-fns";
import { IoMdDownload } from "react-icons/io";
import { Tooltip } from "@nextui-org/tooltip";
import { FieldGroup, FormData } from "@/types/Types";
import { decryptText, encryptText } from "@/services/encryption";
import { Loader } from "@/components/UI/Loader";
import { useRouter } from "next/navigation";
import {
    CalendarDate,
    getLocalTimeZone,
    parseDate,
} from "@internationalized/date";

const SENSITIVE_CONTENT = `I am open to discussing how this arrangement can be structured to
                            suit both the team's needs and my professional
                            responsibilities. I would be happy to provide any additional
                            information and discuss this further at your convenience.`;

const STORAGE_KEY = "flexible-hours-form-data";

const FlexibleHoursForm: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [isFinished, setIsFinished] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [encryptedContent, setEncryptedContent] = useState<string>("");
    const [isDecrypted, setIsDecrypted] = useState(false);
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const hasDownloadedRef = useRef(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window !== "undefined") {
            const savedData = sessionStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                return {
                    ...parsedData,
                    startDate: parsedData.startDate
                        ? parseDate(parsedData.startDate)
                        : null,
                    endDate: parsedData.endDate ? parseDate(parsedData.endDate) : null,
                };
            }
        }
        return {
            entityType: "company",
            employeeName: "",
            designation: "",
            department: "",
            currentStartTime: "",
            currentEndTime: "",
            proposedStartTime: "",
            proposedEndTime: "",
            startDate: null,
            endDate: null,
            trialPeriod: "",
            reason: "",
        };
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setPaymentStatus(searchParams.get("paymentStatus"));
    }, []);

    useEffect(() => {
        const savedStep = sessionStorage.getItem("completedStep");
        if (savedStep) {
            setStep(parseInt(savedStep, 10));
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const dataToSave = {
                ...formData,
                startDate: formData.startDate ? formData.startDate.toString() : null,
                endDate: formData.endDate ? formData.endDate.toString() : null,
            };
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        }
    }, [formData]);

    useEffect(() => {
        const encrypted = encryptText(SENSITIVE_CONTENT);
        console.log(encrypted);
        setEncryptedContent(encrypted);
    }, []);

    useEffect(() => {
        const newProgress = calculateProgress();
        setProgress(newProgress);
    }, [formData, step]);

    useEffect(() => {
        const performDownload = async () => {
            if (
                paymentStatus === "success" &&
                !hasDownloadedRef.current &&
                !isDownloading
            ) {
                hasDownloadedRef.current = true;
                setIsDownloading(true);

                try {
                    setIsDecrypted(true);
                    await new Promise((resolve) => setTimeout(resolve, 200));
                    await toPDF();

                    // Clear session storage after successful download
                    sessionStorage.removeItem(STORAGE_KEY);
                    sessionStorage.removeItem("completedStep");

                    const url = new URL(window.location.href);
                    url.searchParams.delete("paymentStatus");
                    window.history.replaceState({}, "", url);

                    // Redirect after successful download and cleanup
                    setIsDownloading(false);
                    setIsDecrypted(false);
                    window.location.replace("/documentation");
                } catch (error) {
                    console.error("Error generating PDF:", error);
                    hasDownloadedRef.current = false;
                    setIsDecrypted(false);
                    setIsDownloading(false);
                }
            }
            if (paymentStatus === "success") {
                performDownload();
            }
        };

        performDownload();
    }, [paymentStatus]);

    // Clear download state when leaving the page
    useEffect(() => {
        return () => {
            hasDownloadedRef.current = false;
        };
    }, []);

    const { toPDF, targetRef } = usePDF({
        filename: "sample.pdf",
        page: {
            margin: 20,
            format: "a4",
            orientation: "portrait",
        },
        canvas: {
            mimeType: "image/png",
            qualityRatio: 1,
        },
    });

    const formatDisplayDate = (date: CalendarDate | null) => {
        if (!date) return "dd/mm/yyyy";
        return format(date.toDate(getLocalTimeZone()), "dd-MM-yyyy");
    };

    const isFormComplete = (): boolean => {
        // return progress === 100;
        return isFinished;
    };

    const fieldGroups: FieldGroup[] = [
        {
            step: 1,
            fields: ["entityType", "employeeName", "designation", "department"],
        },
        {
            step: 2,
            fields: [
                "currentStartTime",
                "currentEndTime",
                "proposedStartTime",
                "proposedEndTime",
            ],
        },
        {
            step: 3,
            fields: ["startDate", "endDate", "trialPeriod", "reason"],
        },
    ];

    const totalFields = fieldGroups.reduce(
        (acc, group) => acc + group.fields.length,
        0
    );

    const calculateProgress = (): number => {
        const filledFields = Object.entries(formData).filter(([key, value]) => {
            // Check if the field belongs to current or previous steps
            const fieldStep = fieldGroups.find((group) =>
                group.fields.includes(key as keyof FormData)
            )?.step;
            return fieldStep && fieldStep <= step && value !== "";
        }).length;

        return Math.floor((filledFields / totalFields) * 100);
    };

    const isCurrentStepComplete = (): boolean => {
        const currentGroup = fieldGroups.find((group) => group.step === step);
        if (!currentGroup) return false;

        return currentGroup.fields.every((field) => formData[field] !== "");
    };

    const handleInputChange = (
        name: keyof FormData,
        value: string | CalendarDate | null
    ): void => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = (): void => {
        if (step < fieldGroups.length && isCurrentStepComplete()) {
            const nextStep = step + 1;
            setStep(nextStep);
            sessionStorage.setItem("completedStep", nextStep.toString());
        }
    };

    const handleBack = (): void => {
        if (step > 1) {
            const PrevStep = step - 1;
            setStep(PrevStep);
            sessionStorage.setItem("completedStep", PrevStep.toString());
        }
    };

    const handleDownload = async () => {
        const currentPath = window.location.pathname;
        const paymentUrl = `/payment?amount=5.99&redirect=${encodeURIComponent(
            currentPath
        )}`;
        router.push(paymentUrl);
    };

    const renderStep = (): JSX.Element | null => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                        <Input
                            label="Full Name"
                            placeholder="E.g. John Doe"
                            value={formData.employeeName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("employeeName", e.target.value)
                            }
                        />
                        <RadioGroup
                            label="Entity Type"
                            value={formData.entityType}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(
                                    "entityType",
                                    event.target.value as "company" | "organization"
                                )
                            }
                        >
                            <Radio value="company">Company</Radio>
                            <Radio value="organization">Organization</Radio>
                        </RadioGroup>
                        <Input
                            label="Designation"
                            placeholder="E.g. Senior Developer"
                            value={formData.designation}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("designation", e.target.value)
                            }
                        />
                        <Input
                            label="Department"
                            placeholder="E.g. Engineering"
                            value={formData.department}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("department", e.target.value)
                            }
                        />
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Current & Proposed Schedule
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Current Start Time"
                                type="time"
                                value={formData.currentStartTime}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange("currentStartTime", e.target.value)
                                }
                            />
                            <Input
                                label="Current End Time"
                                type="time"
                                value={formData.currentEndTime}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange("currentEndTime", e.target.value)
                                }
                            />
                            <Input
                                label="Proposed Start Time"
                                type="time"
                                value={formData.proposedStartTime}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange("proposedStartTime", e.target.value)
                                }
                            />
                            <Input
                                label="Proposed End Time"
                                type="time"
                                value={formData.proposedEndTime}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange("proposedEndTime", e.target.value)
                                }
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Duration & Reason</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-full max-w-sm flex flex-row gap-4">
                                <DatePicker
                                    labelPlacement="outside"
                                    value={formData.startDate}
                                    onChange={(value: CalendarDate | null) =>
                                        handleInputChange("startDate", value)
                                    }
                                    aria-label="Start Date"
                                    showMonthAndYearPickers
                                    label="Start Date"
                                    variant="bordered"
                                />
                            </div>
                            <div className="w-full max-w-sm flex flex-row gap-4">
                                <DatePicker
                                    labelPlacement="outside"
                                    value={formData.endDate}
                                    onChange={(value: CalendarDate | null) =>
                                        handleInputChange("endDate", value)
                                    }
                                    aria-label="End Date"
                                    showMonthAndYearPickers
                                    label="End Date"
                                    variant="bordered"
                                />
                            </div>
                        </div>
                        <Input
                            label="Trial Period (if applicable)"
                            placeholder="E.g. 3 months"
                            value={formData.trialPeriod}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("trialPeriod", e.target.value)
                            }
                        />
                        <Input
                            label="Reason for Request"
                            placeholder="Please provide your reason"
                            value={formData.reason}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("reason", e.target.value)
                            }
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    const LetterPreview: React.FC = () => {
        const sensitiveContent =
            isDecrypted === true ? decryptText(encryptedContent) : encryptedContent;
        return (
            <div
                ref={targetRef}
                id="letter-preview"
                className={`p-6 bg-white rounded-lg shadow`}
            >
                <div className="mb-4">
                    <p>Dear HR Manager,</p>
                </div>
                <div className="mb-4">
                    <p>
                        {`I, ${formData.employeeName === "" ? "______" : formData.employeeName
                            } , currently working as ${formData.designation === "" ? "______" : formData.designation
                            }
                        in the ${formData.department === ""
                                ? "______"
                                : formData.department
                            } department, am
                        writing to request flexible working hours.`}
                    </p>
                </div>
                <div className="mb-4">
                    <p>
                        {`Currently, I work from ${formData.currentStartTime === ""
                            ? "______"
                            : formData.currentStartTime
                            } to ${formData.currentEndTime === ""
                                ? "______"
                                : formData.currentEndTime
                            }
                        . I would like to propose changing my working
                        hours to ${formData.proposedStartTime === ""
                                ? "______"
                                : formData.proposedStartTime
                            } to ${formData.proposedEndTime === ""
                                ? "______"
                                : formData.proposedEndTime
                            }.`}
                    </p>
                </div>
                {/* ${ === "" ? "______" : } */}
                <div className={`mb-4 ${isFormComplete() && "blur-sm"}`}>
                    <p>
                        This arrangement would commence from{" "}
                        {formData.startDate
                            ? formatDisplayDate(formData.startDate)
                            : "dd/mm/yyyy"}{" "}
                        until{" "}
                        {formData.endDate
                            ? formatDisplayDate(formData.endDate)
                            : "dd/mm/yyyy"}
                        .
                        {`I am open to a trial period of ${formData.trialPeriod === "" ? "_____ " : formData.trialPeriod
                            }.`}
                    </p>
                    {!isFormComplete() ? (
                        <Tooltip
                            showArrow
                            offset={-4}
                            closeDelay={10}
                            color="primary"
                            size="lg"
                            className="text-xl px-4 py-3"
                            content="Unlock clear and readable text by downloading the document now!"
                        >
                            <p className="py-4 blur-sm max-w-xl line-clamp-3">
                                {sensitiveContent}
                            </p>
                        </Tooltip>
                    ) : (
                        <p
                            className={`py-4 max-w-xl line-clamp-3 ${!isDecrypted ? "blur-sm" : ""
                                }`}
                        >
                            {sensitiveContent}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <p>Reason for request: {formData.reason}</p>
                </div>
                <div className="mt-8">
                    <p>Sincerely,</p>
                    <p>{formData.employeeName}</p>
                    <p>{formData.designation}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div
                className={`flex flex-col lg:flex-row justify-center items-start gap-10`}
            >
                {!isFormComplete() && (
                    <div className="w-full basis-full lg:basis-2/5">
                        <Card className="lg:max-w-md">
                            <CardBody>
                                <Progress
                                    value={progress}
                                    className="mb-4"
                                    color="primary"
                                    showValueLabel={true}
                                />
                                {renderStep()}
                                <div className="flex justify-between mt-4">
                                    <Button
                                        onPress={handleBack}
                                        disabled={step === 1}
                                        variant="bordered"
                                        className="text-[#1E318D]"
                                    >
                                        Back
                                    </Button>
                                    {step < fieldGroups.length ? (
                                        <Button
                                            onPress={handleNext}
                                            color="primary"
                                            className="text-[#1E318D]"
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <Button
                                            onPress={() => setIsFinished(true)}
                                            color="primary"
                                            className="text-[#1E318D] animate-pulse hover:scale-110 transition-all transform duration-400 ease-in-out"
                                        >
                                            Finish!
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
                <div className={`w-full basis-full lg:basis-3/5 select-none`}>
                    <Card className="w-full">
                        <CardBody>
                            <h3 className="text-lg font-semibold mb-4 text-[#1E318D]">
                                Preview
                            </h3>
                            <LetterPreview />
                            {isFormComplete() && (
                                <Button
                                    onPress={handleDownload}
                                    className="mt-4 w-full"
                                    color="primary"
                                    disabled={isDownloading}
                                    endContent={
                                        !isDownloading && <IoMdDownload className="text-xl ml-5" />
                                    }
                                >
                                    {isDownloading ? <Loader /> : "Download PDF"}
                                </Button>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FlexibleHoursForm;
