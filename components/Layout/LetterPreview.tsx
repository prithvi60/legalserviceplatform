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


export const EALetterPreview = ({
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
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-4">Employment Offer Letter</h2>
                <p className="mb-2"><strong>Date:</strong> __________</p>
                <p className="mb-2"><strong>From:</strong></p>
                <p className="mb-2"><strong>To:</strong> __________</p>
                <p className="mb-4"><strong>Re:</strong> Employment with __________</p>
                <p className="mb-4">Dear __________,</p>
                <p className="mb-4">
                    We are pleased to offer you (&apos;You&apos; or the &apos;Employee&apos;) employment in __________, having its office at __________ (&apos;Employer&apos;) on the following terms and conditions:
                </p>

                <h3 className="text-lg font-semibold mt-6">1. Type of Employment</h3>
                <p className="mb-4">The Employee will be employed on the following basis: <strong>full-time</strong>.</p>

                <h3 className="text-lg font-semibold mt-6">2. Commencement of Employment</h3>
                <p className="mb-2">(a) Your employment with the Employer (&apos;Employment&apos;) shall be effective from the Commencement Date, which shall be the later of:</p>
                <ul className="list-disc list-inside mb-2">
                    <li>__________</li>
                    <li>You providing the Employer with copies of your passport or birth certificate and all documents pertaining to your educational and professional qualifications and references from your previous employers (if any) to the Employer&apos;s satisfaction.</li>
                </ul>
                <p className="mb-2">(b) You shall be employed with the Employer as __________. The Employer reserves the right to change your designation from time to time at its sole and absolute discretion.</p>
                <p className="mb-2">(c) Your period of continuous Employment with the Employer shall be calculated from the Commencement Date.</p>
                <p className="mb-2">(d) You warrant and represent to the Employer that you will not breach any obligation binding on you by reason of entering into this letter agreement or performing any of your duties and obligations under it or other third-party contractual obligations.</p>
                <p className="mb-4">(e) You warrant that all the information relating to you and provided by you to the Employer is true and accurate.</p>

                <h3 className="text-lg font-semibold mt-6">3. Probation</h3>
                <p className="mb-2">(a) You shall be on probation for a period of __________ from the Commencement Date...</p>
                <p className="mb-2">During this period, the Employer may terminate your Employment by giving you __________ days prior written notice of termination...</p>

                <h3 className="text-lg font-semibold mt-6">4. Compensation & Benefits</h3>
                <p className="mb-2">(a) As compensation, you shall be entitled to receive a CTC of Rs. __________ (__________) per annum.</p>
                <p className="mb-2">(b) This shall accrue on a daily basis and be payable in the following periodicity...</p>
                <p className="mb-2">(c) You shall be entitled to a one-time joining bonus of Rs. __________...</p>
                <p className="mb-2">(d) The Employer will formally review your performance annually...</p>
                <p className="mb-2">(e) The Employer is under no obligation to increase your CTC as a result of any review in performance...</p>

                <h3 className="text-lg font-semibold mt-6">5. Taxation & Deductions</h3>
                <p className="mb-2">(i) It shall be your sole responsibility to meet all requirements under Indian tax laws...</p>
                <p className="mb-2">(j) No liability shall attach to the Employer for your failure to pay any such taxes...</p>
                <p className="mb-4">(k) The Employer shall be entitled, at any time during your employment, or in any event on the termination of your employment, to deduct from your remuneration...</p>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">5. Duties & Obligations</h2>
                    <p className="mt-2">(a) The Employee will be required to perform all tasks and accept all duties and responsibilities as reasonably requested by the Employer.</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Your duties include those expected to fall within this job title or as assigned.</li>
                        <li>The Employer may make reasonable changes to the position description.</li>
                        <li>The Employee must perform duties in good faith, with professionalism and care.</li>
                        <li>Devote whole time, attention, and ability solely to the Employer.</li>
                        <li>Abide by the Employer&apos;s HR Policy, where this Contract shall prevail in case of conflicts.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">6. Location of Employment</h2>
                    <p className="mt-2">(a) You shall be employed at the Employer&apos;s office in ________ or any other location required by the Employer.</p>
                    <p>(b) The Employer may transfer you to any office within India or abroad.</p>
                    <p>(c) You agree to travel as necessary for the discharge of duties.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">7. Office Hours</h2>
                    <p className="mt-2">(a) The Employer&apos;s normal business hours are: ________.</p>
                    <p>(b) The Employee is expected to work ________ hours a week.</p>
                    <p>(c) Office hours may be amended by the Employer, with possible additional payment.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">8. Holidays and Leave</h2>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Entitled to ________ public holidays per year.</li>
                        <li>Paid leave entitlement: ________ days per 12-month period.</li>
                        <li>Casual/sick leave: ________ days per year, non-carry forwardable.</li>
                        <li>Unapproved absences must be reported promptly.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">9. Sickness</h2>
                    <p className="mt-2">(a) Sick leave will be deducted from casual/sick leave entitlement.</p>
                    <p>(b) A medical certificate is required for absences exceeding 3 days.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">10. Confidential Information & Trade Secrets</h2>
                    <p className="mt-2">(a) The Employee will have access to confidential information and must maintain its secrecy.</p>
                    <p>(b) Confidential Information includes:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Intellectual Property, trade secrets, and financial data.</li>
                        <li>Client information, marketing strategies, and business plans.</li>
                        <li>Organizational, technical, and HR-related information.</li>
                        <li>Manufacturing, procurement, and technical data.</li>
                    </ul>
                    <p className="mt-2">(c) The Employee shall:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Not disclose confidential information without written consent.</li>
                        <li>Prevent unauthorized publication or disclosure.</li>
                        <li>Sign a Non-Disclosure Agreement (NDA).</li>
                        <li>Not reference company information on social networking sites.</li>
                    </ul>
                    <p className="mt-2">(d) The above restrictions shall not apply to publicly available information.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">11. Intellectual Property</h2>
                    <p className="mb-2">
                        (a) The Employee has submitted to the Employer a complete report with all supporting documents relating to all the Confidential Information, Intellectual Property, and all other information developed by the Employee on or prior to the Commencement Date, which would be excluded from the scope of this Agreement...
                    </p>
                    <p className="mb-2">
                        (b) You shall promptly and fully disclose to the Employer and keep confidential all inventions, discoveries, trade secrets, copyright works, designs, or technical know-how and improvements, whether or not patentable, and whether or not they are made, conceived, or reduced to practice during working hours or using the Employer&apos;s data or facilities...
                    </p>
                    <p className="mb-2">
                        (c) The Employee agrees that all originals and all copies of any and all material containing, representing, evidencing, recording, or constituting all or part of the Developments, however, and whenever produced (whether by Employee or others) and whether or not protected under copyright law or patentable or protected under other intellectual property law, shall be immediately handed over to the Employer...
                    </p>
                    <p className="mb-2">(d) The Employee agrees that the exclusive ownership of all content and/or part of Developments that are not protected under copyright laws and /or other intellectual property law and/or that is not patentable shall be automatically and irrevocably transferred to the Employer from date of creation.</p>
                    <p className="mb-2">(e) To the extent any assignment of the Developments cannot be made to the Employer or its designees, at present, the Employee hereby irrevocably, absolutely and perpetually agrees to assign to Employer or its designees, all of the Employee&apos;s right, title and interest including intellectual property rights therein or any part thereof. You hereby irrevocably, agree to transfer and assign to the Employer all of your entire right, title and interest in and to any and all inventions, discoveries, methods, copyrights, software, data, processes, products, improvements and developments whether or not published, confidential, protected or susceptible of legal protection and whether or not any attempt has been made to secure such protection, which was made, conceived or reduced to practice at any time during the course of your employment with the Employer (whether prior to or after the execution of this letter agreement) by you, in whole or in part at the expense of, on the premises of, with the assistance of the employees or consultants of, or with the equipment or supplies of, the Employer or any of its affiliates, and any and all other confidential information belonging to the Employer. If you are the author of any work, or a subject matter other than work, that was created or was being created in the course of your employment, the Employer may use it in any manner. You consent to this use whether or not it would, but for this clause, infringe your moral rights. The Employee explicitly waives all moral rights in the Developments.</p>
                    <p className="mb-2">(f) For the purposes of this clause, you agree promptly to take all action and sign and deliver all instruments as the Employer may require at any time hereafter. During and after the term of the Employee&apos;s employment by the Employer, the Employee shall and undertakes to assist the Employer, at the Employer&apos;s expense, in every proper way to (i) secure and maintain the Employer&apos;s rights hereunder and to carry out the intent of this Agreement and for vesting the Employer with the full title of Developments and all rights, titles and interest including intellectual property rights therein and to enable the Employer, its successors, assigns and nominees, to secure and enjoy the full and exclusive benefits and advantages thereof.; (ii) to apply and prosecute registration applications in respect of intellectual property rights and the Developments for the Employer&apos;s benefit, in any and all countries; (iii) sign, execute, affirm all documents, including, without limitation, all applications, forms, instruments of assignment and supporting documentation and perform all other acts as may be required for the abovementioned purposes.</p>
                    <p className="mb-2">(g) You hereby constitute and appoint the Employer, its successors and assigns, your true and lawful attorney, with the full power of substitution for you, and in your name, place and stead or otherwise, but on behalf of and for the benefit of the Employer, its successors and assigns, to take all actions and execute all documents on behalf of you necessary to effect the assignment set forth hereinabove.</p>
                    <p className="mb-2">(h) Should the Employer be unable to secure the signature on any document necessary to apply for, prosecute, obtain, protect or enforce any IPRs, due to any cause, the Employee hereby irrevocably designates and appoints the Employer and each of its duly authorized officers and agents as the Employee&apos;s agent and attorneys to do all lawfully permitted acts to further the prosecution, issuance, and enforcement of IPRs or protection in respect of the Developments, with the same force and effect as if executed and delivered by the Employee.</p>
                    <p className="mb-2">(i) The Employee represents and warrants that he will not use or integrate with the Developments any third-party materials or data that are not validly licensed to the Employer unless previously authorized by the Employee&apos;s reporting officer in the Employer. The Employee represents and warrants that the Employee has not violated the Intellectual Property Rights of any third party, and covenants that he/she shall not violate the Intellectual Property Rights of any third party in the course of his/her employment with Employer. Provided that in the event the Employer is held liable for the Employee&apos;s violation of any Intellectual Property Rights, the Employee undertakes to indemnify the Employer or affiliates as the case may be against any and all losses, liabilities, claims, actions, costs and expenses, including reasonable attorney&apos;s fees and court fees resulting therefrom.</p>
                    <p className="mb-2">(j) If in the course of the Employee&apos;s employment with the Employer, the Employee incorporates Intellectual Property into the Employer&apos;s product, process or machine, the Employer is hereby granted and shall have a nonexclusive, royalty-free, irrevocable, perpetual, worldwide license (with rights to sublicense through multiple tiers of sub-licensees) to make, have made, modify, use and sell such Intellectual Property.</p>
                    <p className="mb-2">(k) The Employee shall not during and after the term of the Employee&apos;s employment with the Employer, in any way violate the Intellectual Property Rights of any client of the Employer. Provided that in the event the Employer is held liable for the Employee&apos;s violation of any Intellectual Property Rights, the Employee undertakes to indemnify the Employer or affiliates as the case may be against any and all losses, liabilities, claims, actions, costs and expenses, including reasonable attorney&apos;s fees and court fees resulting therefrom. The Employee further covenants that he/she shall ensure that all information and records pertaining to any idea, process, trademark, service mark, invention, technology, computer program, original work of authorship, design, formula, discovery, patent or copyright of any client of the Employer that the Employee comes across during the term of his employment with the Employer, are duly protected. The Employee agrees that all originals and all copies of any and all material containing, representing, evidencing, recording, or constituting all or part of the Intellectual Property belonging to any client of the Employer, however, and whenever produced (whether by Employee or others) and whether or not protected under copyright law or patentable or protected under other intellectual property law, shall be immediately along with any copies thereof returned to the Employer upon the termination of Employee&apos;s employment for any reason.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">12. Dismissal</h2>
                    <p className="mb-2">
                        (a) Notwithstanding anything contained herein, your employment may be terminated by the Employer without notice and without payment of compensation or in lieu of notice if you are guilty of fraud, negligence, misconduct or in any way breach the terms of this letter agreement. Without limiting the above, the Employer shall be entitled to terminate the Employment summarily by written notice and without any payment in lieu of notice (but without prejudice to the rights and remedies of the Employer for any breach of this Contract and to your continuing obligations under this Contract) in any of the following events:
                        <br />
                        (i) If you have committed any criminal offence or been guilty of any gross misconduct whether during the performance of your duties or otherwise which, in the opinion of the Employer, renders you unfit to continue as an employee of the Employer or which would be likely adversely to prejudice the interests of the Employer.
                        <br />
                        (ii) If you wilfully abuse or misuse the Employer&apos;s computer system, or any password relating to that computer system or gain access to any file or load any information or program contrary to the Employer&apos;s interests or procedures.
                        <br />
                        (iii) If any information relating to your suitability for employment provided to the Employer in the course of applying for employment is found to be materially false or misleading.
                        <br />
                        (iv) If you are subject to immigration control in India, your Employment shall be conditional upon you having been granted leave to enter into, remain and take up employment in India, such leave being valid and subsisting at all times and not being subject to any condition precluding or restricting the Employment.
                    </p>
                    <p className="mb-2">
                        (b) The following are examples of your conduct as regards the Employer that cause harm to the Employer and which would entitle the Employer to terminate your employment summarily:
                        <br />
                        (i) Theft, fraud, intentionally providing false or misleading information or any act of dishonesty.
                        <br />
                        (ii) Any act or attempted act of violence or abusive behaviour towards people or property including causing deliberate damage to the Employer&apos;s property.
                        <br />
                        (iii) Indecent behaviour towards or harassment or bullying of fellow employees, suppliers, customers or clients.
                        <br />
                        (iv) Incapability to undertake your responsibilities under this employment agreement on account of your abuse of alcohol or other banned substances.
                        <br />
                        (v) Wilful breach of health and safety regulations, if any, prescribed by the Employer.
                        <br />
                        (vi) A serious act of insubordination or wilful refusal to carry out reasonable requests by the board of the Employer.
                        <br />
                        (vii) Serious or persistent neglect of duties or a series of persistent breaches of the terms and conditions of your employment.
                        <br />
                        (viii) Unauthorised use of or disclosure of Confidential Information of the Employer.
                        <br />
                        (ix) Falsifying records or expense claims.
                        <br />
                        (x) Conviction for a criminal offence arising from or related to your work for the Employer.
                        <br />
                        (xi) Conviction for a criminal offence committed outside working hours which in the opinion of the Employer adversely affects the Employer&apos;s business or reputation, or affects your suitability for the type of work which you perform or affects your acceptability to other employees.
                        <br />
                        (xii) Any act which you know or reasonably believe is likely to bring the Employer into disrepute.
                        <br />
                        (xiii) Unauthorized signing of documentation committing the Employer to any financial obligation which is not in the ordinary course of business of the Employer or exceeding your authority in any other way.
                        <br />
                        This list is intended as a guide and is not exhaustive.

                    </p>
                    <p className="mb-2">(c) Upon dismissal as specified above or the termination of your Employment, you shall forthwith return to the Employer all documents, books, materials, records, correspondence, papers and information (on whatever media and wherever located) relating to the business of the Employer or its customers or prospects, any magnetic disc on which information relating to the business is stored and any other property of the Employer which may be in your power, possession, custody, care or control or which contain or refer to any Confidential Information and shall, if requested to do so by the Employer, provide a signed statement that you have complied fully with the terms of this clause.</p>
                    <p className="mb-2">(d) Upon dismissal, you shall not be entitled to receive any accruals towards leave encashment.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">13. Termination</h2>
                    <p className="mb-2">
                        (a) This Contract shall be terminated forthwith:
                        <br />
                        (i) In the event of your death.
                        <br />
                        (ii) Upon the dissolution of the Employer.
                    </p>
                    <p className="mb-2">
                        (b) Upon confirmation of your employment, your Employment may be terminated by either party by giving the following notice: ________ written notice. The Employer may terminate your Employment by paying you a salary in lieu of notice. It is hereby clarified that the term &apos;salary&apos; for the purpose of this clause shall mean the proportionate monthly CTC and shall not include any other compensation payable to the Employee by the Employer.
                    </p>
                    <p className="mb-2">
                        (c) If you purport to terminate the Employment without notice or prior to the completion of the notice period specified above, you hereby agree to relinquish any salary for that part of the notice period that is not fulfilled. In addition, you shall also pay the Employer for the remaining notice period for not completing the stipulated notice period. Purported termination of the Employment without notice or on short notice or the payment of a penalty shall not and does not absolve you of the obligation to comply fully with the terms of this Clause.
                    </p>
                    <p className="mb-2">(d) Nothing in this Contract shall prevent the Employer from terminating your Employment without notice if you have been dismissed.</p>
                    <p className="mb-2">(e) Once the notice of termination has been given by either Party, the Employer may at any time before the expiry of the notice period, require you to:
                        (i) Perform such duties as directed;
                        <br />
                        (ii) Perform no duties;
                        <br />
                        (iii) Not have any communication with any customer or prospective customer of the Employer in relation to the business of the Employer;
                        <br />
                        (iv) Not contact or have any communication with any employee, officer, director, agent or consultant of the Employer in relation to the business of the Employer, and
                        <br />
                        (v) Not remain or become involved in any respect with the business of the Employer except as required by the Employer, including but not limited to not attending the Employer&apos;s places of business and requiring you to remain at home for all or part of the notice period.
                    </p>
                    <p className="mb-2">(f) Upon termination of Employment, you shall be entitled to receive the basic salary portion of the CTC in lieu of any accrued but unutilised holiday entitlement. However, if you have taken holiday or casual leave in excess of your entitlement, the Employer may at its sole and absolute discretion deduct a sum equivalent to the basic salary portion of the CTC due for each day of absence in excess of the holiday or casual leave entitlement.</p>
                    <p className="mb-2">(g) On the last day of your employment with the Employer you must immediately return to the Employer in accordance with its instructions all equipment, correspondence, records, specifications, software, models, notes, reports and other documents belonging to the Employer and any copies thereof and any other property belonging to the Employer including but not limited to keys provided to you and which are in your possession or under your control. You will provide the Employer with any passwords in your possession and which are required to access these records, or any other such information relating to the Employer produced in the course of your employment. Furthermore, you will delete all information relating to the Employer produced in the course of your employment which is not stored on Employer property, including any such information stored on your personal computer. If you owe any money to the Employer, then the Employer has the right to deduct such sums from any payment due to you. This is without prejudice to the Employer&apos;s other remedies to recover any sums due from you to the Employer. No outstanding payments will be made to you until you, if so required by the Employer, confirm in writing that you have complied with your obligations under this clause.</p>
                    <p className="mb-2">(h) Any and all of the Employer&apos;s Property, Confidential Information and Intellectual Property of the Employer acquired by or in the possession of the Employee under this Agreement, shall be returned to the Employer immediately upon termination of this Agreement.</p>
                    <p className="mb-2">(i) In the event the Employee&apos;s employment with the Employer is terminated, Employee shall sign and deliver to the Employer a termination certificate in the format specified by the Employer.</p>
                    <p className="mb-2">(j) It is further agreed and understood that until such time as all of the Employer&apos;s Property, Confidential Information and Intellectual Property are returned and the Termination Certificate is provided as abovementioned, the Employer shall, in addition to initiating legal proceedings for recovery (and without prejudice to any other rights or remedies that Employer may have under law or equity), be entitled to withhold any salary, emoluments or other dues of the Employee then or in future payable to the Employee, to the extent allowable by law, and may further, at its discretion, deduct therefrom the full value of the said property/properties calculated at its then replacement price. The Employee recognizes and agrees that the Employer shall be entitled to recover from the Employee and the Employee shall be bound and liable to make good to the Employer any loss suffered by the Employer on account of misuse of the Employer&apos;s Property, Confidential Information and Intellectual Property by the Employee and/or any damage occasioned to the Employer&apos;s Property, Confidential Information and Intellectual Property whilst in the custody of or entrusted to the Employee.</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl font-semibold">14. Restrictive Covenants</h2>
                    <p className="mt-2">
                        (a) You shall not during your Employment, without the prior written consent of the Employer, under any circumstances, whether directly or indirectly undertake as an employee or otherwise or discharge (for remuneration or compensation howsoever payable) for any other person in India or elsewhere any duties and responsibilities, of whatever kind.
                    </p>
                    <p className="mt-2">
                        (b) You shall not during your Employment, without the prior written consent of the Employer, during the term of employment hereunder, be engaged in any other business activity pursued for gain, profit, or other pecuniary advantages if such activity interferes with your duties and responsibilities hereunder.
                    </p>
                    <p className="mt-2">
                        (c) You shall not, for the following period: ________ after the termination of your Employment, without the prior written consent of the Employer engage, whether directly or indirectly, in any business, employment or activity related to the Employers clients or customers, a Competitive Business (as defined hereunder) nor provide services and carry out duties for any Competitive Business which are similar to the duties carried out for the Employer during Employment. You agree that the above is necessary to safeguard any sensitive information of the Employer that may have come into your knowledge while in Employment. in order to safeguard any sensitive information of the Employer that may have come into your knowledge while in Employment.Competitive Business(es)&apos; include any firm, partnership, joint venture, company and/or any other entity and/or person that engages in the following business: ________ or carries out activities similar or competitive to the business in which the Employer engages or proposes to engage during the term of employment.
                    </p>
                    <p className="mt-2">
                        (d) During your Employment and for the following period: ________ thereafter, You shall not without the prior written consent of the Employer carry out or engage in, whether directly or indirectly, whether through a partnership or as a shareholder, joint venture partner, collaborator, consultant or agent or in any other manner whatsoever, whether for profit or otherwise in any Competitive Business which competes directly or indirectly with the whole or any part of the business carried on by the Employer in India or elsewhere or in any activity related to the business carried on by the Employer.
                    </p>
                    <p className="mt-2">(e) You shall not on your own account or on behalf of any other person, solicit or accept orders for products or services from any of the Employer&apos;s current or previous customers that are in competition with products or services of or in any way related to the business of the Employer from any of the Employer&apos;s current or previous customers.</p>
                    <p className="mt-2">(f) The Employee hereby agrees and undertakes that during the term of employment with the Employer and for the following period: ________ following the termination of Employment, the Employee shall not, directly or indirectly, either as an individual on his/her own account or as a partner, employee, consultant, advisor, agent, contractor, director, trustee, committee member, office bearer, or shareholder (or in a similar capacity or function):
                        <br />
                        (i) Solicit employment of or advise any of the Employer&apos;s existing employees or any person who was employed by the Employer within six months prior to such solicitation or any person or organization providing services to or through Employer to terminate his or her contract or relationship with Employer or to accept any contract (directly or indirectly) or other arrangements for providing services to any other person or organization; or
                        <br />
                        (ii) Contact any of the existing or prospective clients (i.e. any person or organization with whom the Employer is in advanced stages of exploring a professional or business relationship) of the Employer to entice such clients away from the Employer or to damage in any way their business relationship with the Employer or for the provision of substantially the same services provided to such clients by the Employer; or
                        <br />
                        (iii) Solicit or undertake employment with any client of the Employer or any organization where the employee has been taken or sent for training, deputation or secondment or professional work by the Employer; or
                        <br />
                        (iv) Enter the employ of, or render any other services to, any person engaged in a business which competes with the Business, if (i) the Employee has prior knowledge of the same or (ii) gains such knowledge during the term of employment or (iii) which is obvious to the Employee.
                    </p>
                    <p className="mt-2">(g) It is agreed by and between the parties that the employment with the Employer and the compensation payable under this Agreement shall be sufficient consideration for this Clause.</p>
                    <p className="mt-2">(h) The Employee hereby acknowledges and agrees that the limitations as to time and the limitations of the character or nature placed in this Clause are reasonable and fair and will not preclude the Employee from earning a livelihood, nor will they unreasonably impose limitations on the Employee&apos;s ability to earn a living. In addition, the Employee agrees and acknowledges that the potential harm to the Employer of the non-enforcement of this Clause outweighs any potential harm to the Employee by this Agreement and has given careful consideration to the restraints imposed upon the Employee by this Agreement, and is in full accord as to their necessity for the reasonable and proper protection of Confidential Information and Intellectual Property of the Employer now existing or to be developed in the future. The Employee expressly acknowledges and agrees that each and every restraint imposed by this Agreement is reasonable with respect to the subject matter, time period and geographical area.</p>
                    <p className="mt-2">(i) You further agree and accept that during the Employment and for the relevant period as specified in the clauses above, each of the restrictions above shall be deemed to constitute a separate agreement and shall be construed independently of the others. It is expressly understood and agreed by the Parties that although the employee and the Employer consider the restrictions contained in this Clause to be reasonable if a final judicial determination is made by a court of competent jurisdiction that the time or territory or any other restriction contained in this Agreement is an unenforceable restriction against the employee, the provisions of this Agreement shall not be rendered void but shall be deemed amended to apply as to such maximum time and territory and to such maximum extent as such court may judicially determine or indicate to be enforceable. Alternatively, if any court of competent jurisdiction finds that any restriction contained in this Agreement is unenforceable, and such restriction cannot be amended so as to make it enforceable, such finding shall not affect the enforceability of any of the other restrictions contained herein.</p>
                    <p className="mt-2">(j) You understand and agree that the foregoing restrictions are necessary and reasonable in scope and duration, in all circumstances, for the purpose of protecting the Employer&apos;s business.</p>
                    <p className="mt-2">(k) If any breach or violation of any of the terms of this Clause occurs, it is agreed that damages alone may not compensate for such breach or violation and that injunctive relief is reasonable and essential to safeguarding the interests of the Employer and that an injunction in addition to any other remedy may accordingly be obtained by the Employer. No waiver of any such breach or violation shall be implied from the forbearance or failure by the Employer to take action in respect of such breach or violation.
                        <br />
                        The provisions of this clause shall survive the termination of this Contract.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">15. Expenses</h2>
                    <p className="mt-2">
                        The Employer shall also reimburse all pre-approved expenses properly incurred by you in the due and proper performance of your duties or responsibilities provided that supporting original vouchers and bills are furnished along with any request for reimbursement. All expenses need to be pre-approved by the Employer controller as designated from time to time and failure to do so shall result in the expenses not being reimbursed.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">16. Deductions</h2>
                    <p className="mt-2">
                        You consent to the Employer deducting from any sum otherwise payable to you by reason of the Employment (or its termination) the value of any claim that the Employer may have against you, including but not limited to:
                        <br />
                        (i) Overpayment of remuneration;
                        <br />
                        (ii) Overpayment of expenses incurred by you in carrying out your duties;
                        <br />
                        (iii) Loans which the Employer may have made to you from time to time;
                        <br />
                        (iv) Any advance on salary, which the Employer may have made to you from time to time.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">17. Amendments</h2>
                    <p className="mt-2">
                        (a) The Employer reserves the right to make reasonable changes to any of the terms and conditions of Employment and you shall be notified of such changes by way of a general notice to all employees. Any such changes shall take effect from the date of the notice.
                    </p>
                    <p className="mt-2">(b) The Employer shall give 1 month&apos;s written notice of what it considers to be any significant change, either by way of an individual notice or a general notice to all employees.</p>
                    <p className="mt-2">(c) Such significant changes will be deemed to be accepted unless you notify the Employer of any objection in writing before the expiry of the notice period of 1 month. Any such changes shall take effect from the date of the expiry of the notice period. If the Employer receives a notification of objection within the prescribed period, the objection will be considered and if it cannot be resolved within a period of 30 days from receipt of the objection, the Employer will terminate your Employment by giving you notice under Clause (((12)b)i). The decision of the Employer as to what constitutes minor changes of detail or significant changes shall be final and binding.</p>
                    <p className="mt-2">(d) You shall not be entitled to make any changes or amendments to this Employment Contract.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">18. Notices</h2>
                    <p className="mt-2">
                        (a) Any notice or other written communication given under or in connection with this Contract must be delivered personally or sent by Registered post AD.
                    </p>
                    <p className="mt-2">(b) The Employer&apos;s address for service shall be its registered office or such other place as the Employer may notify from time to time.</p>
                    <p className="mt-2">(c) Your address for service shall be the address given at the head of this Contract or any other place that you may notify.</p>
                    <p className="mt-2">(d) Any notice or other written communication shall be deemed to have been served:
                        <br />
                        (i) If delivered personally, at the time of delivery.
                        <br />
                        (ii) If posted, at the expiry of 4 business days after it was posted (excluding the day of posting).
                    </p>
                    <p className="mt-2">(e) You must notify the Employer in writing of any change in your name, address, bank account number, marital status or next of kin within one month of such change, and of any arrest, prosecution or conviction for a criminal offence, any disciplinary action taken against you by a professional or regulatory body or if you become bankrupt, apply for or have made against you a receiving order make any composition with your creditors or commit any act of bankruptcy.</p>
                    <p className="mt-2"></p>
                    <p className="mt-2"></p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">19. Governing Law & Jurisdiction</h2>
                    <p className="mt-2">
                        This Agreement shall be governed by and construed in accordance with Indian laws and each party to this Agreement submits to the exclusive jurisdiction of the Courts of New Delhi, India .
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">20. Arbitration</h2>
                    <p className="mt-2">
                        Both the Parties do hereby agree that any dispute arising out of or in relation to this Agreement shall be settled in accordance with the provisions of the Arbitration and Conciliation Act, 1996 and/or any statutory modification or re-enactment thereof for the time being in force. The Parties shall mutually appoint a single Arbitrator. Each Party shall pay their own costs and Fees of the arbitration and the cost of the arbitrator shall be borne equally. The seat or place of the arbitration shall be as New Delhi. The language of the arbitration shall be English . The Agreement shall be governed in accordance with the laws of India and the courts of New Delhi will have the exclusive jurisdiction.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold">21. Miscellaneous</h2>
                    <p className="mt-2">
                        (a) No collective agreements (which are otherwise applicable to workmen under the Industrial Disputes Act, 1947) apply to your employment.
                    </p>
                    <p className="mt-2">
                        (b) This contract sets out the entire agreement and understanding between the Parties in connection with the Employment and supersedes any previous contract or agreement between you and the Employer.
                    </p>
                    <p className="mt-2">(c) The Employer may hold and process, whether electronically or manually, the data it collects in relation to you in the course of the Employment for the purposes of the Employer&apos;s management and administration of its business and of other employees and for compliance with applicable procedures, laws and regulations and you hereby consent for the same. The Employer or its agents may transfer, store and process such data whether in India or any other place for the above purposes.</p>
                    <p className="mt-2">(d) 52 52 522 2822 522 2252 25 252888822 82 2588 82225582 85588 82 5285 22 82 8882258, 8285885 25 5222225825882, 82 85282 25 82 2552, 52525 522 5582 22 858 25 225822222, 8585 2252 25 252888822 25 2552 85588 22 2552 252222 82 522225 222 22 2252 2552 22 2588 82225582, 852 252 22225825888822 22 252 522582525 22 2588 82225582 85588 222 82 52228225.</p>
                    <p className="mt-2">(e) The Employee agrees, recognizes and acknowledges that:
                        <br />
                        (i) he/she has been provided with a copy of this Agreement for review prior to signing it, that he/she has reviewed it and that he/she understands the terms, purposes and effects of this Agreement, and that he/she has signed the same only after having had the opportunity to seek clarifications; that he/she has been given a signed copy of this Agreement for his/her own records; he/she has not been subjected to duress or undue influence of any kind to execute this Agreement and this Agreement will not impose an undue hardship upon him/her. He/she has executed this Agreement of his/her own free will and without relying upon any statements made by the Employer or any of its representatives, agents or employees. This Agreement is in all respects reasonable and necessary to protect the legitimate business interests of the Employer;
                        <br />
                        (ii) if he/she violates any of the terms of this Agreement, the Employer will suffer irreparable injury and damages the amount of which cannot be adequately measured in monetary terms and that an adequate remedy at law will not exist;
                        <br />
                        (iii) In view of the above, the Employer shall be entitled to injunctive relief, in addition to any other remedy available at law or in equity, in the event he/she violates any of the terms or conditions of this Agreement.
                    </p>
                </section>

                <section className="border-t pt-4">
                    <h2 className="text-xl font-semibold">Agreement Confirmation</h2>
                    <p className="mt-2">Please return a signed copy of this letter to indicate your understanding and acknowledgement of the terms and conditions contained herein.</p>
                    <div className="mt-4">
                        <p>Signed on behalf of: ________________</p>
                        <p>Signature: ________________</p>
                        <p>Date: ________</p>
                    </div>
                    <div className="mt-4">
                        <p>I confirm that I have read and understood the aforesaid contract...</p>
                        <p>Signed: ________________</p>
                        <p>Name: ________</p>
                        <p>Date: ________</p>
                    </div>
                </section>
            </div>
        </div>
    );
};