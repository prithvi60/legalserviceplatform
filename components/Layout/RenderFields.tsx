"use client"
import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Radio, RadioGroup } from "@heroui/radio";
import { Checkbox } from "@heroui/checkbox";
import {
    Select,
    SelectItem,
} from "@heroui/select";
import { cn } from '@heroui/theme';

const RenderFields = () => {
    const [step, setStep] = React.useState(1);
    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Basic Information</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="fullName">Employee&apos;s Full Name</label>
                                <Input
                                    id="fullName"
                                    placeholder="Enter full name"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address">Residential Address</label>
                                <Input
                                    id="address"
                                    placeholder="Enter residential address"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="designation">Job Title/Designation</label>
                                <Input
                                    id="designation"
                                    placeholder="Enter designation"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="department">Department</label>
                                <Input
                                    id="department"
                                    placeholder="Enter department"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="joiningDate">Joining Date</label>
                                <Input
                                    id="joiningDate"
                                    type="date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Employment Details</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label>Type of Employment</label>
                                <RadioGroup defaultValue="full-time">
                                    {["Full-time", "Part-time", "Contract", "Temporary"].map((type) => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Radio value={type.toLowerCase()} id={type.toLowerCase()} />
                                            <label htmlFor={type.toLowerCase()}>{type}</label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <label>Probation Period</label>
                                <Select placeholder='Select probation period' label="Probation Period">
                                    {["3 months", "6 months", "1 year", "No probation"].map((period) => (
                                        <SelectItem key={period} value={period.toLowerCase()}>
                                            {period}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label>Working Days</label>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                    <div key={day} className="flex items-center space-x-2">
                                        <Checkbox id={day.toLowerCase()} />
                                        <label htmlFor={day.toLowerCase()}>{day}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label>Remote Work Option</label>
                                <RadioGroup defaultValue="no">
                                    <div className="flex items-center space-x-2">
                                        <Radio classNames={{
                                            control: cn(
                                                "border-primary",
                                            ),
                                        }} value="yes" id="remote-yes" />
                                        <label htmlFor="remote-yes">Yes</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Radio value="no" id="remote-no" />
                                        <label htmlFor="remote-no">No</label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Compensation & Benefits</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="ctc">Annual CTC (Rs.)</label>
                                <Input
                                    id="ctc"
                                    type="number"
                                    placeholder="Enter annual CTC"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="ctcBreakup">CTC Breakup</label>
                                <Input
                                    id="ctcBreakup"
                                    placeholder="Enter CTC components"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="bankDetails">Bank Account Details</label>
                                <Input
                                    id="bankDetails"
                                    placeholder="Enter bank details"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label>Benefits Provided</label>
                                {[
                                    "Health Insurance",
                                    "Stock Options",
                                    "Paid Leave",
                                    "Retirement Plan",
                                    "Company Laptop",
                                    "Travel Allowance"
                                ].map((benefit) => (
                                    <div key={benefit} className="flex items-center space-x-2">
                                        <Checkbox id={benefit.toLowerCase().replace(/\s+/g, '-')} />
                                        <label htmlFor={benefit.toLowerCase().replace(/\s+/g, '-')}>{benefit}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label>Reimbursement Policy</label>
                                <Select placeholder='Select reimbursement policy' label="Reimbursement Policy">

                                    {[
                                        "Company covers all expenses",
                                        "Partial reimbursement",
                                        "No reimbursement"
                                    ].map((policy) => (
                                        <SelectItem key={policy} value={policy.toLowerCase().replace(/\s+/g, '-')}>
                                            {policy}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Legal & Compliance</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label>Notice Period</label>
                                <Select placeholder="Select notice period" label="Notice Period">

                                    {["15 days", "1 month", "2 months", "3 months"].map((period) => (
                                        <SelectItem key={period} value={period.toLowerCase().replace(/\s+/g, '-')}>
                                            {period}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label>Non-Compete Clause</label>
                                <RadioGroup defaultValue="no">
                                    <div className="flex items-center space-x-2">
                                        <Radio value="yes" id="non-compete-yes" />
                                        <label htmlFor="non-compete-yes">Yes</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Radio value="no" id="non-compete-no" />
                                        <label htmlFor="non-compete-no">No</label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="nonCompeteDuration">Non-Compete Duration (months)</label>
                                <Input
                                    id="nonCompeteDuration"
                                    type="number"
                                    placeholder="Enter duration in months"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label>Required Documents</label>
                                {[
                                    "Passport",
                                    "Aadhar Card",
                                    "PAN Card",
                                    "Educational Certificates",
                                    "Previous Employer References"
                                ].map((doc) => (
                                    <div key={doc} className="flex items-center space-x-2">
                                        <Checkbox id={doc.toLowerCase().replace(/\s+/g, '-')} />
                                        <label htmlFor={doc.toLowerCase().replace(/\s+/g, '-')}>{doc}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto h-[80vh] flex justify-center items-center">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h4>Employment Form</h4>
                    <div className="text-sm">Step {step} of {totalSteps}</div>
                </div>
            </CardHeader>

            <CardBody>
                {renderStep()}
            </CardBody>

            <CardFooter>
                <div className="flex justify-between w-full">
                    <Button
                        variant="bordered"
                        onClick={handlePrevious}
                        disabled={step === 1}
                    >
                        Previous
                    </Button>

                    <Button
                        onClick={step === totalSteps ? () => console.log('Submit') : handleNext}
                    >
                        {step === totalSteps ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default RenderFields;