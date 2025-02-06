import { decryptText } from "@/services/encryption";
import { EmployeeFormData, NDAFormData } from "@/types/Types";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Checkbox } from "@heroui/checkbox";
import {
    Select,
    SelectItem,
} from "@heroui/select";
import { Tooltip } from "@heroui/tooltip";
import React, { ChangeEvent } from "react";

interface NDARenderStepProps {
    step: number;
    formData: NDAFormData;
    handleInputChange: (name: keyof NDAFormData, value: string) => void;
}

interface EARenderStepProps {
    step: number;
    formData: EmployeeFormData;
    handleInputChange: (name: keyof EmployeeFormData, value: string | number | boolean | string[]) => void;
}

interface LetterPreviewProps {
    formData: NDAFormData;
    currentYear: number;
    encryptedContent: string;
    isDecrypted: boolean;
    isFormComplete: boolean;
    targetRef: React.RefObject<HTMLDivElement>;
}

export const NDARenderStep = ({
    step,
    formData,
    handleInputChange,
}: NDARenderStepProps): JSX.Element | null => {
    switch (step) {
        case 1:
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <Input
                        label="Agreement Day"
                        placeholder="e.g. 22nd"
                        value={formData.agreementDay}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("agreementDay", e.target.value)
                        }
                    />
                    <Input
                        label="Agreement Month"
                        placeholder="e.g. 01 or January"
                        value={formData.agreementMonth}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("agreementMonth", e.target.value)
                        }
                    />
                    <Input
                        label="Disclosing Party Company Name"
                        placeholder="Enter company name"
                        value={formData.disclosingPartyCompanyName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("disclosingPartyCompanyName", e.target.value)
                        }
                    />
                </div>
            );

        case 2:
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Disclosing Party Details</h3>
                    <div className="block space-y-4">
                        <Input
                            label="Disclosing Party Registered Office"
                            placeholder="Enter registered office address"
                            value={formData.disclosingPartyRegisteredOffice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(
                                    "disclosingPartyRegisteredOffice",
                                    e.target.value
                                )
                            }
                            className="w-full"
                        />
                        <Input
                            label="Disclosing Party Representative Name"
                            placeholder="Enter representative name"
                            value={formData.disclosingPartyRepName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("disclosingPartyRepName", e.target.value)
                            }
                            className="w-full"
                        />
                        <Input
                            label="Disclosing Party Position"
                            placeholder="Enter position"
                            value={formData.disclosingPartyPosition}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("disclosingPartyPosition", e.target.value)
                            }
                            className="w-full"
                        />
                    </div>
                </div>
            );

        case 3:
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Receiving Party Details</h3>
                    <Input
                        label="Receiving Party Company Name"
                        placeholder="Enter company name"
                        value={formData.receivingPartyName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("receivingPartyName", e.target.value)
                        }
                        className="w-full"
                    />
                    <Input
                        label="Receiving Party Registered Office"
                        placeholder="Enter registered office address"
                        value={formData.receivingPartyRegisteredOffice}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                                "receivingPartyRegisteredOffice",
                                e.target.value
                            )
                        }
                        className="w-full"
                    />
                    <Input
                        label="Receiving Party Position"
                        placeholder="Enter position"
                        value={formData.receivingPartyPosition}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("receivingPartyPosition", e.target.value)
                        }
                        className="w-full"
                    />
                </div>
            );

        default:
            return null;
    }
};

export const NDALetterPreview = ({
    formData,
    currentYear,
    encryptedContent,
    isDecrypted,
    isFormComplete,
    targetRef,
}: LetterPreviewProps) => {
    const sensitiveContent = isDecrypted
        ? decryptText(encryptedContent)
        : encryptedContent;

    return (
        <div
            ref={targetRef}
            className="p-6 bg-white rounded-lg shadow"
            style={{ minHeight: "297mm", width: "100%" }}
        >
            <div className="text-center font-bold mb-6">
                <h1 className="text-xl mb-2">NON-DISCLOSURE AGREEMENT</h1>
                <p>(The &quot;Agreement&quot;)</p>
            </div>
            <p className="mb-4">
                This Agreement is made on {formData.agreementDay || "______"} day of{" "}
                {formData.agreementMonth || "______"} {currentYear} (&quot;Agreement
                Date&quot;) between:
            </p>
            <div className="space-y-4">
                <p>
                    <strong>{formData.disclosingPartyCompanyName || "______"}</strong>,
                    (&quot;Disclosing Party&quot;), a Company established under the Laws
                    of the United Arab Emirates, whose registered Office located at{" "}
                    {formData.disclosingPartyRegisteredOffice || "______"} Dubai, UAE.
                </p>
                <p>And</p>
                <p>
                    {formData.receivingPartyName || "______"} (&quot;Receiving
                    Party&quot;), a company established under the Laws of the United Arab
                    Emirates, whose registered Office located at{" "}
                    {formData.receivingPartyRegisteredOffice || "______"}, UAE.
                </p>
            </div>
            {!isFormComplete ? (
                <Tooltip
                    showArrow
                    offset={-4}
                    closeDelay={10}
                    color="primary"
                    size="lg"
                    className="text-xl text-white px-4 py-3"
                    content="Unlock clear and readable text by downloading the document now!"
                >
                    <div
                        className={`py-4 max-w-xl ${!isDecrypted ? "blur-sm line-clamp-6" : ""
                            }`}
                        dangerouslySetInnerHTML={{ __html: sensitiveContent }}
                    />
                </Tooltip>
            ) : (
                <div
                    className={`${!isDecrypted ? "blur-sm line-clamp-6" : ""}`}
                    dangerouslySetInnerHTML={{ __html: sensitiveContent }}
                />
            )}
            <div className="mt-12 pt-8 space-y-8">
                <div>
                    <p className="font-medium mb-4">
                        IN WITNESS WHEREOF, this agreement has caused it to be executed at
                        Dubai, UAE on the date indicated above.
                    </p>
                </div>
                <div className="space-y-4">
                    <p className="font-medium">
                        Signed by duly Authorized Representative of{" "}
                        {formData.disclosingPartyCompanyName || "______"}
                    </p>
                    <div className="mt-4">
                        <p>
                            <span className="font-semibold">Name: </span>
                            {formData.disclosingPartyRepName || "______"}
                        </p>
                        <p>
                            <span className="font-semibold">Position: </span>
                            {formData.disclosingPartyPosition || "______"}
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="font-medium">
                        Receiving Party read and agreed to the terms and conditions of this
                        Agreement:
                    </p>
                    <p className="font-medium">
                        Signed by duly Authorized Representative of{" "}
                        {formData.receivingPartyName || "______"}
                    </p>
                    <div className="mt-4">
                        <p>
                            <span className="font-semibold">Name: </span>
                            {formData.receivingPartyName || "______"}
                        </p>
                        <p>
                            <span className="font-semibold">Position: </span>
                            {formData.receivingPartyPosition || "______"}
                        </p>
                        <p>
                            <span className="font-semibold">Date: </span>
                            {formData.agreementDay || "______"} of{" "}
                            {formData.agreementMonth || "______"} {currentYear}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EARenderStep = ({
    step,
    formData,
    handleInputChange,
}: EARenderStepProps): JSX.Element | null => {
    switch (step) {
        case 1:
            return (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Basic Information</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="employee_name">Employee&apos;s Full Name</label>
                            <Input
                                id="employee_name"
                                placeholder="Enter full name"
                                className="w-full"
                                value={formData.employee_name}
                                onChange={(e) => handleInputChange("employee_name", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="employee_address">Residential Address</label>
                            <Input
                                id="employee_address"
                                placeholder="Enter residential address"
                                className="w-full"
                                value={formData.employee_address}
                                onChange={(e) => handleInputChange("employee_address", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="designation">Job Title/Designation</label>
                            <Input
                                id="designation"
                                placeholder="Enter designation"
                                className="w-full"
                                value={formData.designation}
                                onChange={(e) => handleInputChange("designation", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="department">Department</label>
                            <Input
                                id="department"
                                placeholder="Enter department"
                                className="w-full"
                                value={formData.department}
                                onChange={(e) => handleInputChange("department", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="joining_date">Joining Date</label>
                            <Input
                                id="joining_date"
                                type="date"
                                className="w-full"
                                value={formData.joining_date}
                                onChange={(e) => handleInputChange("joining_date", e.target.value)}
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
                            <RadioGroup value={formData.employment_type} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("employment_type", e.target.value as "Full-time" | "Part-time" | "Contract" | "Temporary")}>
                                {["Full-time", "Part-time", "Contract", "Temporary"].map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Radio value={type} id={type} />
                                        <label htmlFor={type}>{type}</label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <label>Probation Period</label>
                            <Select
                                value={formData.probation_period}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("probation_period", e.target.value as "3 months" | "6 months" | "1 year" | "No probation")}
                                placeholder="Select probation period"
                            >
                                {["3 months", "6 months", "1 year", "No probation"].map((period) => (
                                    <SelectItem key={period} value={period}>
                                        {period}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label>Working Days</label>
                            {formData.working_days.map((day) => (
                                <div key={day} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={day}
                                        checked={formData.working_days.includes(day)}
                                        onChange={(e) => {
                                            const updatedDays = e.target.checked
                                                ? [...formData.working_days, day]
                                                : formData.working_days.filter((d) => d !== day);
                                            handleInputChange("working_days", updatedDays);
                                        }}
                                    />
                                    <label htmlFor={day}>{day}</label>
                                </div>
                            ))}
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
                                value={formData.ctc.toString()}
                                onChange={(e) => handleInputChange("ctc", Number(e.target.value) || 0)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label>Benefits Provided</label>
                            {formData.benefits_provided.map((benefit) => (
                                <div key={benefit} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={benefit}
                                        checked={formData.benefits_provided.includes(benefit)}
                                        onChange={(e) => {
                                            const updatedBenefits = e.target.checked
                                                ? [...formData.benefits_provided, benefit]
                                                : formData.benefits_provided.filter((b) => b !== benefit);
                                            handleInputChange("benefits_provided", updatedBenefits);
                                        }}
                                    />
                                    <label htmlFor={benefit}>{benefit}</label>
                                </div>
                            ))}
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
                            <Select
                                value={formData.termination_notice_period}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("termination_notice_period", e.target.value as "15 days" | "1 month" | "2 months" | "3 months")}
                                placeholder="Select notice period"
                            >
                                {["15 days", "1 month", "2 months", "3 months"].map((period) => (
                                    <SelectItem key={period} value={period}>
                                        {period}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label>Non-Compete Clause</label>
                            <RadioGroup value={formData.non_compete_clause} onValueChange={(value) => handleInputChange("non_compete_clause", value as "Yes" | "No")}>
                                <div className="flex items-center space-x-2">
                                    <Radio value="Yes" id="non-compete-yes" />
                                    <label htmlFor="non-compete-yes">Yes</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Radio value="No" id="non-compete-no" />
                                    <label htmlFor="non-compete-no">No</label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <label>Required Documents</label>
                            {formData.required_documents.map((doc) => (
                                <div key={doc} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={doc}
                                        checked={formData.required_documents.includes(doc)}
                                        onChange={(e) => {
                                            const updatedDocuments = e.target.checked
                                                ? [...formData.required_documents, doc]
                                                : formData.required_documents.filter((d) => d !== doc);
                                            handleInputChange("required_documents", updatedDocuments);
                                        }}
                                    />
                                    <label htmlFor={doc}>{doc}</label>
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
