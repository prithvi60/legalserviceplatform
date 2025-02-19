// documentConfig.ts

import { EARenderSteps, NDARenderSteps } from "@/components/Layout/DynamicField";
import { EALetterPreview, EARenderStep, NDALetterPreview, NDARenderStep, } from "@/components/Layout/LetterPreview";
import { EmployeeFormData, NDAFormData } from "@/types/Types";
export interface FieldGroup<T> {
    step: number;
    fields: (keyof T)[];
}

export const documentConfig = {
    "business-contracts": {
        title: "Non-Disclosure Agreement",
        documentSlug: "BC",
        initialFormData: {
            agreementDay: "",
            agreementMonth: "",
            receivingPartyName: "",
            receivingPartyAddress: "",
            receivingPartyRegisteredOffice: "",
            receivingPartyPosition: "",
            disclosingPartyCompanyName: "",
            disclosingPartyRepName: "",
            disclosingPartyPosition: "",
            disclosingPartyRegisteredOffice: "",
        } as NDAFormData,
        fieldGroups: [
            { step: 1, fields: ["agreementDay", "agreementMonth", "disclosingPartyCompanyName"] },
            {
                step: 2,
                fields: ["disclosingPartyRegisteredOffice", "disclosingPartyRepName", "disclosingPartyPosition"],
            },
            {
                step: 3,
                fields: ["receivingPartyName", "receivingPartyRegisteredOffice", "receivingPartyPosition"],
            },
        ] as FieldGroup<NDAFormData>[],
        sensitiveContent: `
            <div class="mainHeading"><h2 class="heading">BACKGROUND</h2><p class="para">(i) The purpose of this Agreement is to facilitate discussions and potential collaboration between the Disclosing Party and the Receiving Party, wherein the Receiving Party may provide Enterprise Resource Planning (ERP) solutions to the Disclosing Party (the &quot;Purpose&quot;).</p><p class="para">(ii) Adil Supermarkets have revealed or plan to reveal to you Confidential Information (as defined herein). In consideration for us revealing Confidential Information to you and to any of your subsidiaries, directors, members, officers, employees, agents and advisors including without limitation attorneys, accountants,technicians, consultants and technical advisors etc.(&quot;your Representatives&quot;), you and your Representatives agree that all such information will be treated by you and/or your Representatives as being strictly confidential in accordance with this Agreement.</p><p class="para">(iii) In In connection with these discussions, the Disclosing Party may disclose certain non-public, proprietary, and sensitive information, defined as Confidential Information, to the Receiving Party. The Receiving Party acknowledges that maintaining the confidentiality of this information is critical to the Disclosing Party’s business interests and agrees to use such information solely for the Purpose.</p><p class="para">(iv) order to enable you and your Representatives to undertake the Specified Purpose you wish to access certain Confidential Information. The Confidential Information may be disclosed to you either through written or oral communications, or transfer of data through electronic means and during the discussions relating to the Specified Purpose. The Receiving Party shall use the Confidential Information strictly for the Purpose and for no other purpose, whether directly or indirectly</p></div><div class="mainHeading"><h2 class="heading">1. Confidential Information</h2><p class="para">a. For the purpose of this Agreement "Confidential Information" means any and all information disclosed by disclosing party or by a third party on behalf of us to you and your Representatives (whether in writing, verbally electronically or by any other means and whether directly or indirectly) and which is now or which at any time after the date of this Agreement comes into your possession to carry out the Purpose (as may be developed and/or adapted from time to time) including, and without limitation, any information relating to our products, technical products, technicality, operations, processes, plans or intentions, product information, know-how, design rights, trade secrets, market opportunities and business affairs, historical audited financial statements, financial projections, feasibility studies, reports, drawings, specifications, data, graphs, Customer lists, purchasing trends, supplier details, pricing models, and contract terms, Operational workflows, inventory management systems, logistics processes, and supply chain strategies.</p><p class="para">b. The Disclosing Party retains full ownership of all rights, titles, and interests in its Confidential Information. Disclosure under this Agreement does not grant the Receiving Party any rights, licenses, or claims to the Confidential Information, except as strictly necessary for the Purpose.</p><p class="para">c. You and your Representatives acknowledge and agree that in carrying out the specified Purpose whether such information has been reduced to a tangible form or marked "confidential" and any information which has been or may be derived from any such information, is deemed to be Confidential in nature</p><p class="para">d. You and your Representatives undertake not to use the Confidential Information for any purpose whatsoever other than in connection with the Purpose.</p></div><div class="mainHeading"><h2 class="heading">2. Keeping Confidential Information Confidential</h2><p class="para">2.1 In consideration of us disclosing the Confidential Information to you and your Representatives and agreeing to enter into discussions with you, you and your Representatives hereby undertake and agree:</p><p class="para">a) to hold the Confidential Information in confidence and not to disclose or permit it to be made available to any person, firm or company without our prior written consent.</p><p class="para">b) only to use the Confidential Information for Purpose.</p><p class="para">c) to keep all Confidential Information, separate from all your other documents, materials and records.</p><p class="para">d) to make copies of the Confidential Information only to the extent that is strictly required for the specified Purpose.</p><p class="para">e) to keep a written record of all copies or reproductions of any Confidential Information specifying when and by whom they were taken and to whom they have been sent (if anyone). Such record will be available for inspection by us upon giving you two (2) days' notice in writing.</p><p class="para">f) upon written demand from us either to return to us the Confidential Information and any copies of it or to confirm to us in writing that, save as required by law or regulation, it has been destroyed.</p><p class="para">g) to keep confidential and not reveal to any person, firm or company the fact that the Purpose is taking place or that discussions or negotiations have taken place between us without our prior express written consent.</p><p class="para">h) to establish and maintain effective security measures and to use your best efforts to safeguard and protect the Confidential Information from unauthorized access, use, copying or disclosure (and which you and your Representatives warrant as providing adequate protection against any unauthorized disclosure, copying or use)</p><p class="para">i) to notify us immediately in the event of any potential, suspected or actual unauthorized use, copying or disclosure of the Confidential Information.</p></div><div class="mainHeading"><h2 class="heading">3. Disclosure of Confidential Information</h2><p class="para">3.1 You and your Representatives undertake not to disclose any Confidential Information to any third-party except that you may disclose and to allow access to the Confidential Information-</p><p class="para">(a) only to those of your Representatives who have reasonable need to see and use it for the specified Purpose and in any event to ensure that each person who is permitted to access the Confidential Information is made by you fully aware in advance of its obligations under this Agreement and that each such person gives an undertaking in respect of the Confidential Information, in terms which correspond to the terms of this Agreement; and</p><p class="para">(b) or if disclosure is required by law, by any court of competent jurisdiction or by any other regulatory body provided that you undertake to give us not less than seven (7) business days’ notice of such disclosure.</p><p class="para">3.2 You and your Representatives will use your best efforts to prevent the disclosure of any of the Confidential Information including the exclusions as mentioned in paragraph 3.1.</p><p class="para">3.3 You will procure that any person to whom information IS disclosed pursuant to paragraph 3.1 (a) complies with the terms of this undertaking as if that person was a party to this undertaking.</p><p class="para">3.4 Notwithstanding any access to Confidential Information which you may provide to your Representatives pursuant to paragraph 3.1(a) and to terms of this Agreement, you will remain primarily responsible for the acts and omissions of your Representatives as though they were your own.</p><p class="para">3.5 The Receiving Party bears the burden of proving that any information falls within the exclusions outlined herein. This must be substantiated with credible evidence, which must be provided to the Disclosing Party upon request.</p></div><div class="mainHeading"><h2 class="heading">4. Return of Confidential Information</h2><p class="para">4.1 You agree and undertake that at the conclusion of the Purpose or within three (3) days of a written request from us to return to us all documents and other material in your possession, custody or control that bear or incorporate any of the Confidential Information or the secondary Information and you will not keep any copies and will destroy any copies or reproductions of any of the Confidential Information or any other documents containing or reflecting any Confidential Information made by you or on your behalf either in written or electronic form, or any other form, that were created by you, Representative or on your behalf.</p><p class="para">4.2 Upon our request, you will provide a written certification confirming the return and/or destruction of all such materials. Any exclusions to confidentiality shall be narrowly construed. If there is any doubt about whether information falls under an exclusion, it will be treated as Confidential Information.</p></div><div class="mainHeading"><h2 class="heading">5. General</h2><p class="para">5.1 You and your Representatives further agree and undertake that: -</p><p class="para">(a) no right or license is granted to you in relation to any of the Confidential Information other than as expressly set out in this Agreement.</p><p class="para">(b) Adil Supermarkets accept no responsibility for and make no representations or warranties, express or implied with respect to the accuracy or completeness of any of the Confidential Information and we will not be liable to you or any third party for any loss resulting from use of the Confidential Information.</p><p class="para">(c) you will not disclose to any person except those referred to in paragraph 3.1(a) the fact that the specified Purpose is taking place or that discussion or negotiations are taking place between us without our prior written consent.</p><p class="para">(d) no failure or delay by us in exercising any right or power under this undertaking will operate as a waiver of that right or power and no single or partial exercise of that right or power will preclude any other or further exercise of that right or right or power; and</p><p className="para">(e) Damages alone would not be an adequate remedy for any breach of this Agreement and Adil Supermarkets will be entitled to the remedies including of injunction, specific performance and other equitable relief for any threatened or actual breach of this Agreement and no proof of special damages will be necessary for the enforcement of this Agreement and Damages</p><p className="para">5.2 You undertake to indemnify us against all liability or loss arising directly or indirectly from, and any costs. charges and expenses incurred in connection with any breach by you of the terms of this Agreement, with any sum due under this paragraph 6.2 to be paid without any deduction or set-off (and irrespective of any counterclaim) whatsoever.</p><p className="para">5.3 You acknowledge, understand and agree that any unauthorized use (whether for your advantage or the advantage of another) or disclosure by you or any of your Representatives who are permitted by you to access the Confidential Information of any Confidential Information except as may be permitted by law Will give rise to an offence under the laws of the Dubai, United Arab Emirates.</p><p className="para">5.4 You hereby agree that this Agreement will be governed by and construed in accordance with the laws of the Dubai, United Arab Emirates You hereby irrevocably consent to the non-exclusive jurisdiction of the courts of Dubai for any actions, suits or proceedings arising out of or relating to this Agreement or any of its terms ("Action") You hereby submit to the jurisdiction of such courts and you waive any objection to any Action brought by us in any such courts whether on the ground of venue or on the ground that the Action has been brought in an inconvenient forum, and you further agree that a judgment in any Action brought in any such court will be conclusive and binding on you and may be enforced in the courts of any other jurisdiction.</p><p className="para">5.5 Any disputes arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the rules of the Dubai International Arbitration Centre (DIAC). The arbitration shall take place in Dubai, UAE, and the language of arbitration shall be English.</p><p className="para">5.6 Notwithstanding the foregoing, you agree that nothing in this Agreement will limit our right to bring any Action relating to the protection of the Confidential Information or any claim for interlocutory or injunctive relief in any other courts of competent jurisdiction, nor will the bringing by us of an Action in one jurisdiction preclude the bringing of an Action in any other jurisdiction (whether concurrently or not) Any clause or part of a clause of this Agreement which is ineffective in any jurisdiction is ineffective only to that extent in that jurisdiction.</p><p className="para">5.7 You hereto agree that no failure or delay by us in exercising any right, power or privilege hereunder will operate as a waiver thereof, nor will any single or partial exercise thereof preclude any other or further exercise thereof or the exercise of any right, power or privilege hereunder.</p><p className="para">5.8 Neither this paragraph nor any other provisions in this Agreement can be waived, amended or assigned except by prior written consent of the Party waiving the right, which consent will specifically refer to this paragraph (or such other provision) and explicitly make such waiver or amendment A waiver by one Party under this paragraph does not prejudice its rights in respect of any subsequent breach of this Agreement by the other Party.</p><p className="para">5.9 If any provision or covenant of this Agreement is found to violate or unenforceable in whole or in part any statute, regulation, rule, order or decree of any governmental authority, court, agency or exchange, such invalidity will not be deemed to affect any other provisions or covenants hereof or the validity of the remainder of this Agreement, and such invalid provision will be deemed deleted here from to the minimum extent necessary to cure such violation.</p><p className="para">5.10 This Agreement shall be valid for a term of 5 years from the date of this Agreement mentioned in the beginning, Notwithstanding the termination or expiration of this Agreement, the confidentiality obligations imposed on the Receiving Party under this Agreement shall survive.</p></div><p className="para">The Parties acknowledge and agree that this Agreement is solely intended to govern the disclosure and protection of Confidential Information exchanged for the Purpose defined herein. Nothing in this Agreement shall be interpreted as creating any obligation, commitment, or guarantee for either Party to enter into a subsequent business relationship, transaction, or contract or Award or assign any work, project.</p>
                `,
        storageKey: "nda-form-data",
        fileName: "nda-agreement.pdf",
        url: "/legal_documentation/india/BC",
        renderStep: NDARenderSteps,
        letterPreview: NDALetterPreview
    },
    "employee-agreement": {
        title: "Employee Agreement",
        documentSlug: "EA",
        initialFormData: {
            employee_name: "",
            employee_address: "",
            designation: "",
            department: "",
            joining_date: "",
            ctc: 0,
            ctc_breakup: "",
            bank_account_details: "",
            work_location: "",
            office_hours: "",
            severance_package: "",
            public_holidays: [],
            paid_leave: 0,
            casual_sick_leave: 0,
            joining_bonus: 0,
            non_compete_duration: "",
            bonus_payment_terms: "",
            arbitration_institution: "",
            // Radio Buttons
            employment_type: "Full-time",
            remote_work_policy: "No",
            weekend_work: "No",
            leave_accrual_policy: "No",
            termination_cause: "No",
            non_compete_clause: "No",
            confidentiality_agreement: "No",
            intellectual_property_rights: "No",
            code_of_conduct_agreement: "No",
            background_check: "No",

            // Dropdowns
            probation_period: "No probation",
            termination_notice_period: "1 month",
            reimbursement_policy: "No reimbursement",
            dispute_resolution_clause: "Arbitration",
            working_days: [],
            benefits_provided: [],
            required_documents: [],
        } as EmployeeFormData,
        fieldGroups: [
            {
                step: 1,
                fields: ["employee_name", "employee_address", "designation", "department"],
            },
            {
                step: 2,
                fields: ["joining_date", "ctc", "ctc_breakup", "bank_account_details"],
            },
            {
                step: 3,
                fields: ["work_location", "office_hours", "severance_package", "employment_type"],
            },
            {
                step: 4,
                fields: ["probation_period", "working_days", "remote_work_policy", "weekend_work"],
            },
            {
                step: 5,
                fields: [
                    "public_holidays",
                    "paid_leave",
                    "leave_accrual_policy",
                    "casual_sick_leave",
                ],
            },
            {
                step: 6,
                fields: [
                    "benefits_provided",
                    "reimbursement_policy",
                    "joining_bonus",
                    "bonus_payment_terms",
                ],
            },
            {
                step: 7,
                fields: [
                    "termination_notice_period",
                    "termination_cause",
                    "non_compete_clause",
                    "non_compete_duration",
                ],
            },
            {
                step: 8,
                fields: [
                    "dispute_resolution_clause",
                    "arbitration_institution",
                    "confidentiality_agreement",
                    "intellectual_property_rights",
                ],
            },
            {
                step: 9,
                fields: ["code_of_conduct_agreement", "required_documents", "background_check"],
            },
        ] as FieldGroup<EmployeeFormData>[],
        sensitiveContent: `
                `,
        storageKey: "ea-form-data",
        fileName: "ea-agreement.pdf",
        url: "/legal_documentation/india/EA",
        renderStep: EARenderSteps,
        letterPreview: EALetterPreview
    },

};