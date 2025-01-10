"use client";

import React, { useState, ChangeEvent, JSX, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { DatePicker } from "@nextui-org/date-picker";
import { usePDF } from "react-to-pdf";
import { format } from "date-fns";
import { DateValue } from "@react-types/calendar";
import { IoMdDownload } from "react-icons/io";
import { Tooltip } from "@nextui-org/tooltip";
import { FieldGroup, FormData } from "@/types/Types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FlexibleHoursForm: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const { status } = useSession();
    const router = useRouter();
    // const [isStatus, setIsStatus] = useState(false)
    const [formData, setFormData] = useState<FormData>({
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
    });

    const { toPDF, targetRef } = usePDF({
        filename: "flexible-working-hours-request.pdf",
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

    const isFormComplete = (): boolean => {
        return progress === 100;
    };

    // Define field groups for each step
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

    // Calculate progress based on filled fields
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

    // Update progress when form data changes
    useEffect(() => {
        const newProgress = calculateProgress();
        setProgress(newProgress);

        // Store form data in sessionStorage
        sessionStorage.setItem("formData", JSON.stringify(formData));
    }, [formData, step]);

    useEffect(() => {
        const storedData = sessionStorage.getItem("formData");
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         setIsStatus(true)
    //     } else {
    //         setIsStatus(false)
    //     }
    // }, [status]);

    // if (status === "loading") {
    //     return <div>Loading...</div>;
    // }

    // Check if current step is complete

    const isCurrentStepComplete = (): boolean => {
        const currentGroup = fieldGroups.find((group) => group.step === step);
        if (!currentGroup) return false;

        return currentGroup.fields.every((field) => formData[field] !== "");
    };

    const handleInputChange = (
        name: keyof FormData,
        value: string | DateValue | null
    ): void => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = (): void => {
        if (step < fieldGroups.length && isCurrentStepComplete()) {
            setStep((prev) => prev + 1);
        }
    };

    const handleBack = (): void => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const handleDownload = async () => {
        if (status === "authenticated") {
            await toPDF();
        } else {
            router.push("/api/auth/signin");
        }
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
                                    onChange={(value: DateValue | null) =>
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
                                    onChange={(value: DateValue | null) =>
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

    const LetterPreview: React.FC = () => (
        <div
            ref={targetRef}
            id="letter-preview"
            className={`p-6 bg-white rounded-lg shadow ${isFormComplete() && "blur-sm"
                }`}
        >
            <div className="mb-4">
                <p>Date: { }</p>
            </div>
            <div className="mb-4">
                <p>Dear HR Manager,</p>
            </div>
            <div className="mb-4">
                <p>
                    I, {formData.employeeName}, currently working as{" "}
                    {formData.designation} in the {formData.department} department, am
                    writing to request flexible working hours.
                </p>
            </div>
            <div className="mb-4">
                <p>
                    Currently, I work from {formData.currentStartTime} to{" "}
                    {formData.currentEndTime}. I would like to propose changing my working
                    hours to {formData.proposedStartTime} to {formData.proposedEndTime}.
                </p>
            </div>
            <div className="mb-4">
                <p>
                    This arrangement would commence from{" "}
                    {formData.startDate
                        ? format(new Date(formData.startDate.toString()), "dd-MM-yyyy")
                        : "dd/mm/yyyy"}{" "}
                    until{" "}
                    {formData.endDate
                        ? format(new Date(formData.endDate.toString()), "dd-MM-yyyy")
                        : "dd/mm/yyyyy"}
                    .
                    {formData.trialPeriod &&
                        ` I am open to a trial period of ${formData.trialPeriod}.`}
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
                        <p className="blur-sm py-4">
                            I am open to discussing how this arrangement can be structured to
                            suit both the team&apos;s needs and my professional
                            responsibilities. I would be happy to provide any additional
                            information and discuss this further at your convenience.
                        </p>
                    </Tooltip>
                ) : (
                    <p className="blur-sm py-4">
                        I am open to discussing how this arrangement can be structured to
                        suit both the team&apos;s needs and my professional
                        responsibilities. I would be happy to provide any additional
                        information and discuss this further at your convenience.
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

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className={`flex justify-center items-start gap-10`}>
                {" "}
                {!isFormComplete() && (
                    <div className="basis-full md:basis-2/5">
                        <Card className="!max-w-md">
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
                                        onClick={handleBack}
                                        disabled={step === 1}
                                        variant="bordered"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        disabled={
                                            step === fieldGroups.length || !isCurrentStepComplete()
                                        }
                                        color="primary"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
                <div className={`basis-full md:basis-3/5 select-none`}>
                    <Card>
                        <CardBody>
                            <h3 className="text-lg font-semibold mb-4">Preview</h3>
                            <LetterPreview />
                            {isFormComplete() && (
                                <Button
                                    onClick={handleDownload}
                                    className="mt-4 w-full"
                                    color="primary"
                                    endContent={<IoMdDownload className="text-xl ml-5" />}
                                >
                                    Download PDF
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
