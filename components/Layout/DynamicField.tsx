// import { Checkbox } from "@heroui/checkbox";
// import { Input } from "@heroui/input";
// import { Radio, RadioGroup } from "@heroui/radio";
// import { Select, SelectItem } from "@heroui/select";
// import { ChangeEvent } from "react";

// interface DynamicFieldProps {
//     type: "input" | "radio" | "select" | "checkbox";
//     id: string;
//     label: string;
//     value: any;
//     options?: string[]; // For radio and select options
//     onChange: (value: unknown) => void;
//     placeholder?: string;
//     multipleOptions?: boolean; // For checkboxes
// }

// export const DynamicField = ({
//     type,
//     id,
//     label,
//     value,
//     options = [],
//     onChange,
//     placeholder,
//     multipleOptions = false,
// }: DynamicFieldProps): JSX.Element => {
//     switch (type) {
//         case "input":
//             return (
//                 <div className="space-y-2">
//                     <label htmlFor={id}>{label}</label>
//                     <Input
//                         id={id}
//                         placeholder={placeholder}
//                         className="w-full"
//                         value={value}
//                         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                             onChange(e.target.value)
//                         }
//                     />
//                 </div>
//             );
//         case "radio":
//             return (
//                 <div className="space-y-2">
//                     <label>{label}</label>
//                     <RadioGroup
//                         value={value}
//                         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                             onChange(e.target.value)
//                         }
//                     >
//                         {options.map((option) => (
//                             <div key={option} className="flex items-center space-x-2">
//                                 <Radio value={option} id={option} />
//                                 <label htmlFor={option}>{option}</label>
//                             </div>
//                         ))}
//                     </RadioGroup>
//                 </div>
//             );
//         case "select":
//             return (
//                 <div className="space-y-2">
//                     <label>{label}</label>
//                     <Select
//                         value={value}
//                         onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                             onChange(e.target.value)
//                         }
//                         placeholder={placeholder}
//                     >
//                         {options.map((option) => (
//                             <SelectItem key={option} value={option}>
//                                 {option}
//                             </SelectItem>
//                         ))}
//                     </Select>
//                 </div>
//             );
//         case "checkbox":
//             return (
//                 <div className="space-y-2">
//                     <label>{label}</label>
//                     {options.map((option) => (
//                         <div key={option} className="flex items-center space-x-2">
//                             <Checkbox
//                                 id={option}
//                                 checked={value.includes(option)}
//                                 onChange={(e) => {
//                                     const updatedValue = e.target.checked
//                                         ? [...value, option]
//                                         : value.filter((v) => v !== option);
//                                     onChange(updatedValue);
//                                 }}
//                             />
//                             <label htmlFor={option}>{option}</label>
//                         </div>
//                     ))}
//                 </div>
//             );
//         default:
//             return null;
//     }
// };

// interface EARenderStepProps {
//     step: number;
//     formData: EmployeeFormData;
//     handleInputChange: <T extends keyof EmployeeFormData>(name: T, value: EmployeeFormData[T]) => void;
// }

// export const renderStep = ({
//     step,
//     formData,
//     handleInputChange,
// }: EARenderStepProps): JSX.Element | null => {
//     const stepConfig = {
//         1: [
//             { type: "input", id: "employee_name", label: "Employee's Full Name", value: formData.employee_name, placeholder: "Enter full name" },
//             { type: "input", id: "employee_address", label: "Residential Address", value: formData.employee_address, placeholder: "Enter residential address" },
//             { type: "input", id: "designation", label: "Job Title/Designation", value: formData.designation, placeholder: "Enter designation" },
//             { type: "input", id: "department", label: "Department", value: formData.department, placeholder: "Enter department" },
//             { type: "input", id: "joining_date", label: "Joining Date", value: formData.joining_date, placeholder: "", type: "date" },
//         ],
//         2: [
//             { type: "radio", id: "employment_type", label: "Type of Employment", value: formData.employment_type, options: ["Full-time", "Part-time", "Contract", "Temporary"] },
//             { type: "select", id: "probation_period", label: "Probation Period", value: formData.probation_period, options: ["3 months", "6 months", "1 year", "No probation"] },
//             { type: "checkbox", id: "working_days", label: "Working Days", value: formData.working_days, options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], multipleOptions: true },
//         ],
//         3: [
//             { type: "input", id: "ctc", label: "Annual CTC (Rs.)", value: formData.ctc.toString(), placeholder: "Enter annual CTC", type: "number" },
//             { type: "checkbox", id: "benefits_provided", label: "Benefits Provided", value: formData.benefits_provided, options: ["Health Insurance", "Life Insurance", "Stock Options"], multipleOptions: true },
//         ],
//         4: [
//             { type: "select", id: "termination_notice_period", label: "Notice Period", value: formData.termination_notice_period, options: ["15 days", "1 month", "2 months", "3 months"] },
//             { type: "radio", id: "non_compete_clause", label: "Non-Compete Clause", value: formData.non_compete_clause, options: ["Yes", "No"] },
//             { type: "checkbox", id: "required_documents", label: "Required Documents", value: formData.required_documents, options: ["ID Proof", "Address Proof", "Bank Details"], multipleOptions: true },
//         ],
//     };

//     const fields = stepConfig[step];

//     return (
//         <div className="space-y-6">
//             <h2 className="text-xl font-semibold">{step === 1 ? "Basic Information" : step === 2 ? "Employment Details" : step === 3 ? "Compensation & Benefits" : "Legal & Compliance"}</h2>
//             <div className="space-y-4">
//                 {fields.map((field, index) => (
//                     <DynamicField
//                         key={index}
//                         type={field.type}
//                         id={field.id}
//                         label={field.label}
//                         value={field.value}
//                         options={field.options}
//                         onChange={(value) => handleInputChange(field.id, value)}
//                         placeholder={field.placeholder}
//                         multipleOptions={field.multipleOptions}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
