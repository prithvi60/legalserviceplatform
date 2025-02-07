/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmployeeFormData, NDAFormData } from "@/types/Types";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { ChangeEvent } from "react";

interface DynamicFieldProps {
    type: "input" | "radio" | "select" | "checkbox";
    id: string;
    label: string;
    
    value: any;
    options?: string[];
    onChange: (value: unknown) => void;
    placeholder?: string;
    multipleOptions?: boolean;
    className?: string;
}

export const DynamicField = ({
    type,
    id,
    label,
    value,
    options = [],
    onChange,
    placeholder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    multipleOptions = false,
}: DynamicFieldProps): JSX.Element => {
    return (
        <div className="space-y-2">
            <label htmlFor={id}>{label}</label>
            {type === "input" && (
                <Input
                    id={id}
                    placeholder={placeholder}
                    className="w-full"
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.value)
                    }
                />
            )}
            {type === "radio" && (
                <RadioGroup
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.value)
                    }
                >
                    {options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <Radio value={option} id={option} />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                </RadioGroup>
            )}
            {type === "select" && (
                <Select
                    value={value}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        onChange(e.target.value)
                    }
                    placeholder={placeholder}
                >
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </Select>
            )}
            {type === "checkbox" && (
                options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                            id={option}
                            checked={value.includes(option)}
                            onChange={(e) => {
                                const updatedValue = e.target.checked
                                    ? [...value, option]
                                    : value.filter((v: never) => v !== option);
                                onChange(updatedValue);
                            }}
                        />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))
            )}
        </div>
    );
};

interface EARenderStepProps {
    step: number;
    formData: EmployeeFormData;
    handleInputChange: (name: string, value: string | number | boolean | string[]) => void;
}

export const EARenderSteps = ({
    step,
    formData,
    handleInputChange,
}: EARenderStepProps): JSX.Element | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stepConfig: { [key: number]: { type: "input" | "radio" | "select" | "checkbox"; id: string; label: string; value: any; placeholder?: string; typeName?: string; options?: string[]; multipleOptions?: boolean; }[] } = {
        1: [
            { type: "input", id: "employee_name", label: "Employee's Full Name", value: formData.employee_name, placeholder: "Enter full name" },
            { type: "input", id: "employee_address", label: "Residential Address", value: formData.employee_address, placeholder: "Enter residential address" },
            { type: "input", id: "designation", label: "Job Title/Designation", value: formData.designation, placeholder: "Enter designation" },
            { type: "input", id: "department", label: "Department", value: formData.department, placeholder: "Enter department" },
        ],
        2: [
            { type: "input", id: "joining_date", label: "Joining Date", value: formData.joining_date, placeholder: "YYYY-MM-DD" },
            { type: "input", id: "ctc", label: "Annual CTC (Rs.)", value: formData.ctc, placeholder: "Enter CTC" },
            { type: "input", id: "ctc_breakup", label: "CTC Breakup", value: formData.ctc_breakup, placeholder: "Enter CTC components" },
            { type: "input", id: "bank_account_details", label: "Bank Account Details", value: formData.bank_account_details, placeholder: "Enter bank details" },
        ],
        3: [
            { type: "input", id: "work_location", label: "Work Location", value: formData.work_location, placeholder: "Enter work location" },
            { type: "input", id: "office_hours", label: "Office Hours", value: formData.office_hours, placeholder: "Enter working hours" },
            { type: "input", id: "severance_package", label: "Severance Package", value: formData.severance_package, placeholder: "Enter severance details" },
            { type: "radio", id: "employment_type", label: "Employment Type", value: formData.employment_type, options: ["Full-time", "Part-time", "Contract", "Temporary"] },
        ],
        4: [
            { type: "select", id: "probation_period", label: "Probation Period", value: formData.probation_period, options: ["3 months", "6 months", "1 year", "No probation"] },
            { type: "checkbox", id: "working_days", label: "Working Days", value: formData.working_days, options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], multipleOptions: true },
            { type: "radio", id: "remote_work_policy", label: "Remote Work Policy", value: formData.remote_work_policy, options: ["Yes", "No"] },
            { type: "radio", id: "weekend_work", label: "Weekend Work", value: formData.weekend_work, options: ["Yes", "No"] },
        ],
        5: [
            { type: "input", id: "public_holidays", label: "Public Holidays", value: formData.public_holidays, placeholder: "Enter number of holidays" },
            { type: "input", id: "paid_leave", label: "Paid Leave", value: formData.paid_leave, placeholder: "Enter paid leave days" },
            { type: "radio", id: "leave_accrual_policy", label: "Leave Accrual Policy", value: formData.leave_accrual_policy, options: ["Yes", "No"] },
            { type: "input", id: "casual_sick_leave", label: "Casual/Sick Leave", value: formData.casual_sick_leave, placeholder: "Enter sick leave days" },
        ],
        6: [
            { type: "checkbox", id: "benefits_provided", label: "Benefits Provided", value: formData.benefits_provided, options: ["Health Insurance", "Stock Options", "Paid Leave", "Retirement Plan", "Company Laptop", "Travel Allowance"], multipleOptions: true },
            { type: "select", id: "reimbursement_policy", label: "Reimbursement Policy", value: formData.reimbursement_policy, options: ["Company covers all expenses", "Partial reimbursement", "No reimbursement"] },
            { type: "input", id: "joining_bonus", label: "Joining Bonus", value: formData.joining_bonus, placeholder: "Enter bonus amount" },
            { type: "input", id: "bonus_payment_terms", label: "Bonus Payment Terms", value: formData.bonus_payment_terms, placeholder: "Enter bonus terms" },
        ],
        7: [
            { type: "select", id: "termination_notice_period", label: "Termination Notice Period", value: formData.termination_notice_period, options: ["15 days", "1 month", "2 months", "3 months"] },
            { type: "radio", id: "termination_cause", label: "Termination for Cause", value: formData.termination_cause, options: ["Yes", "No"] },
            { type: "radio", id: "non_compete_clause", label: "Non-Compete Clause", value: formData.non_compete_clause, options: ["Yes", "No"] },
            { type: "input", id: "non_compete_duration", label: "Non-Compete Duration", value: formData.non_compete_duration, placeholder: "Enter duration in months" },
        ],
        8: [
            { type: "radio", id: "dispute_resolution_clause", label: "Dispute Resolution", value: formData.dispute_resolution_clause, options: ["Arbitration", "Litigation", "Mediation"] },
            { type: "input", id: "arbitration_institution", label: "Arbitration Institution", value: formData.arbitration_institution, placeholder: "Enter institution name" },
            { type: "radio", id: "confidentiality_agreement", label: "Confidentiality Agreement", value: formData.confidentiality_agreement, options: ["Yes", "No"] },
            { type: "radio", id: "intellectual_property_rights", label: "Intellectual Property Rights", value: formData.intellectual_property_rights, options: ["Yes", "No"] },
        ],
        9: [
            { type: "radio", id: "code_of_conduct_agreement", label: "Code of Conduct Agreement", value: formData.code_of_conduct_agreement, options: ["Yes", "No"] },
            { type: "checkbox", id: "required_documents", label: "Required Documents", value: formData.required_documents, options: ["Passport", "Aadhar Card", "PAN Card", "Educational Certificates", "Previous Employer References"], multipleOptions: true },
            { type: "radio", id: "background_check", label: "Background Check", value: formData.background_check, options: ["Yes", "No"] },
        ],
    };

    const fields = stepConfig[step];
    if (!fields) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">
                {step === 1 ? "Basic Information" : "Employment Details"}
            </h2>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <DynamicField
                        key={index}
                        type={field.type}
                        id={field.id}
                        label={field.label}
                        value={field.value}
                        options={field.options}
                        onChange={(value) => handleInputChange(field.id as keyof EmployeeFormData, value as string | number | string[] | ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[] | ("Paid Leave" | "Health Insurance" | "Stock Options" | "Retirement Plan" | "Company Laptop" | "Travel Allowance")[] | ("Passport" | "Aadhar Card" | "PAN Card" | "Educational Certificates" | "Previous Employer References")[])}
                        placeholder={field.placeholder}
                        multipleOptions={field.multipleOptions}
                    />
                ))}
            </div>
        </div>
    );
};

interface NDARenderStepProps {
    step: number;
    formData: NDAFormData;
    handleInputChange: (name: string, value: string | number | boolean | string[]) => void;
}

export const NDARenderSteps = ({
    step,
    formData,
    handleInputChange,
}: NDARenderStepProps): JSX.Element | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stepConfig: { [key: number]: { type: "input"; id: string; label: string; value: any; placeholder?: string; className?: string; }[] } = {
        1: [
            { type: "input", id: "agreementDay", label: "Agreement Day", value: formData.agreementDay, placeholder: "e.g. 22nd" },
            { type: "input", id: "agreementMonth", label: "Agreement Month", value: formData.agreementMonth, placeholder: "e.g. 01 or January" },
            { type: "input", id: "disclosingPartyCompanyName", label: "Disclosing Party Company Name", value: formData.disclosingPartyCompanyName, placeholder: "Enter company name" },
        ],
        2: [
            { type: "input", id: "disclosingPartyRegisteredOffice", label: "Disclosing Party Registered Office", value: formData.disclosingPartyRegisteredOffice, placeholder: "Enter registered office address", className: "w-full" },
            { type: "input", id: "disclosingPartyRepName", label: "Disclosing Party Representative Name", value: formData.disclosingPartyRepName, placeholder: "Enter representative name", className: "w-full" },
            { type: "input", id: "disclosingPartyPosition", label: "Disclosing Party Position", value: formData.disclosingPartyPosition, placeholder: "Enter position", className: "w-full" },
        ],
        3: [
            { type: "input", id: "receivingPartyName", label: "Receiving Party Company Name", value: formData.receivingPartyName, placeholder: "Enter company name", className: "w-full" },
            { type: "input", id: "receivingPartyRegisteredOffice", label: "Receiving Party Registered Office", value: formData.receivingPartyRegisteredOffice, placeholder: "Enter registered office address", className: "w-full" },
            { type: "input", id: "receivingPartyPosition", label: "Receiving Party Position", value: formData.receivingPartyPosition, placeholder: "Enter position", className: "w-full" },
        ],
    };

    const fields = stepConfig[step];
    if (!fields) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">
                {step === 1 ? "Basic Information" : step === 2 ? "Disclosing Party Details" : "Receiving Party Details"}
            </h2>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <DynamicField
                        key={index}
                        type={field.type}
                        id={field.id}
                        label={field.label}
                        value={field.value}
                        onChange={(value) => handleInputChange(field.id as keyof NDAFormData, value as string)}
                        placeholder={field.placeholder}
                        className={field.className}
                    />
                ))}
            </div>
        </div>
    );
};