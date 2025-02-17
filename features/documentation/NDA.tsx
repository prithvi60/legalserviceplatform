"use client";

import React, { useState, ChangeEvent, JSX, useEffect, useRef } from "react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { usePDF } from "react-to-pdf";
import { IoMdDownload } from "react-icons/io";
import {
    FieldGroup2,
    FormData2,
    GetBFResponse,
    GetOBFResponse,
    GetUserResponse,
} from "@/types/Types";
import { Loader } from "@/components/UI/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { decryptText, encryptText } from "@/services/encryption";
import { Tooltip } from "@heroui/tooltip";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";
import {
    CREATE_BUSINESS_FORM,
    DELETE_BUSINESS_FORM,
    GET_BUSINESS_FORM,
    GET_BUSINESS_FORMS,
    GET_USER,
    UPDATE_BUSINESS_FORM,
} from "@/constants/Queries";
import { getStorageData } from "@/constants/Helper";
import { Spinner } from "@heroui/spinner";

const SENSITIVE_CONTENT = `
            <div class="mainHeading"><h2 class="heading">BACKGROUND</h2><p class="para">(i) The purpose of this Agreement is to facilitate discussions and potential collaboration between the Disclosing Party and the Receiving Party, wherein the Receiving Party may provide Enterprise Resource Planning (ERP) solutions to the Disclosing Party (the &quot;Purpose&quot;).</p><p class="para">(ii) Adil Supermarkets have revealed or plan to reveal to you Confidential Information (as defined herein). In consideration for us revealing Confidential Information to you and to any of your subsidiaries, directors, members, officers, employees, agents and advisors including without limitation attorneys, accountants,technicians, consultants and technical advisors etc.(&quot;your Representatives&quot;), you and your Representatives agree that all such information will be treated by you and/or your Representatives as being strictly confidential in accordance with this Agreement.</p><p class="para">(iii) In In connection with these discussions, the Disclosing Party may disclose certain non-public, proprietary, and sensitive information, defined as Confidential Information, to the Receiving Party. The Receiving Party acknowledges that maintaining the confidentiality of this information is critical to the Disclosing Party’s business interests and agrees to use such information solely for the Purpose.</p><p class="para">(iv) order to enable you and your Representatives to undertake the Specified Purpose you wish to access certain Confidential Information. The Confidential Information may be disclosed to you either through written or oral communications, or transfer of data through electronic means and during the discussions relating to the Specified Purpose. The Receiving Party shall use the Confidential Information strictly for the Purpose and for no other purpose, whether directly or indirectly</p></div><div class="mainHeading"><h2 class="heading">1. Confidential Information</h2><p class="para">a. For the purpose of this Agreement "Confidential Information" means any and all information disclosed by disclosing party or by a third party on behalf of us to you and your Representatives (whether in writing, verbally electronically or by any other means and whether directly or indirectly) and which is now or which at any time after the date of this Agreement comes into your possession to carry out the Purpose (as may be developed and/or adapted from time to time) including, and without limitation, any information relating to our products, technical products, technicality, operations, processes, plans or intentions, product information, know-how, design rights, trade secrets, market opportunities and business affairs, historical audited financial statements, financial projections, feasibility studies, reports, drawings, specifications, data, graphs, Customer lists, purchasing trends, supplier details, pricing models, and contract terms, Operational workflows, inventory management systems, logistics processes, and supply chain strategies.</p><p class="para">b. The Disclosing Party retains full ownership of all rights, titles, and interests in its Confidential Information. Disclosure under this Agreement does not grant the Receiving Party any rights, licenses, or claims to the Confidential Information, except as strictly necessary for the Purpose.</p><p class="para">c. You and your Representatives acknowledge and agree that in carrying out the specified Purpose whether such information has been reduced to a tangible form or marked "confidential" and any information which has been or may be derived from any such information, is deemed to be Confidential in nature</p><p class="para">d. You and your Representatives undertake not to use the Confidential Information for any purpose whatsoever other than in connection with the Purpose.</p></div><div class="mainHeading"><h2 class="heading">2. Keeping Confidential Information Confidential</h2><p class="para">2.1 In consideration of us disclosing the Confidential Information to you and your Representatives and agreeing to enter into discussions with you, you and your Representatives hereby undertake and agree:</p><p class="para">a) to hold the Confidential Information in confidence and not to disclose or permit it to be made available to any person, firm or company without our prior written consent.</p><p class="para">b) only to use the Confidential Information for Purpose.</p><p class="para">c) to keep all Confidential Information, separate from all your other documents, materials and records.</p><p class="para">d) to make copies of the Confidential Information only to the extent that is strictly required for the specified Purpose.</p><p class="para">e) to keep a written record of all copies or reproductions of any Confidential Information specifying when and by whom they were taken and to whom they have been sent (if anyone). Such record will be available for inspection by us upon giving you two (2) days' notice in writing.</p><p class="para">f) upon written demand from us either to return to us the Confidential Information and any copies of it or to confirm to us in writing that, save as required by law or regulation, it has been destroyed.</p><p class="para">g) to keep confidential and not reveal to any person, firm or company the fact that the Purpose is taking place or that discussions or negotiations have taken place between us without our prior express written consent.</p><p class="para">h) to establish and maintain effective security measures and to use your best efforts to safeguard and protect the Confidential Information from unauthorized access, use, copying or disclosure (and which you and your Representatives warrant as providing adequate protection against any unauthorized disclosure, copying or use)</p><p class="para">i) to notify us immediately in the event of any potential, suspected or actual unauthorized use, copying or disclosure of the Confidential Information.</p></div><div class="mainHeading"><h2 class="heading">3. Disclosure of Confidential Information</h2><p class="para">3.1 You and your Representatives undertake not to disclose any Confidential Information to any third-party except that you may disclose and to allow access to the Confidential Information-</p><p class="para">(a) only to those of your Representatives who have reasonable need to see and use it for the specified Purpose and in any event to ensure that each person who is permitted to access the Confidential Information is made by you fully aware in advance of its obligations under this Agreement and that each such person gives an undertaking in respect of the Confidential Information, in terms which correspond to the terms of this Agreement; and</p><p class="para">(b) or if disclosure is required by law, by any court of competent jurisdiction or by any other regulatory body provided that you undertake to give us not less than seven (7) business days’ notice of such disclosure.</p><p class="para">3.2 You and your Representatives will use your best efforts to prevent the disclosure of any of the Confidential Information including the exclusions as mentioned in paragraph 3.1.</p><p class="para">3.3 You will procure that any person to whom information IS disclosed pursuant to paragraph 3.1 (a) complies with the terms of this undertaking as if that person was a party to this undertaking.</p><p class="para">3.4 Notwithstanding any access to Confidential Information which you may provide to your Representatives pursuant to paragraph 3.1(a) and to terms of this Agreement, you will remain primarily responsible for the acts and omissions of your Representatives as though they were your own.</p><p class="para">3.5 The Receiving Party bears the burden of proving that any information falls within the exclusions outlined herein. This must be substantiated with credible evidence, which must be provided to the Disclosing Party upon request.</p></div><div class="mainHeading"><h2 class="heading">4. Return of Confidential Information</h2><p class="para">4.1 You agree and undertake that at the conclusion of the Purpose or within three (3) days of a written request from us to return to us all documents and other material in your possession, custody or control that bear or incorporate any of the Confidential Information or the secondary Information and you will not keep any copies and will destroy any copies or reproductions of any of the Confidential Information or any other documents containing or reflecting any Confidential Information made by you or on your behalf either in written or electronic form, or any other form, that were created by you, Representative or on your behalf.</p><p class="para">4.2 Upon our request, you will provide a written certification confirming the return and/or destruction of all such materials. Any exclusions to confidentiality shall be narrowly construed. If there is any doubt about whether information falls under an exclusion, it will be treated as Confidential Information.</p></div><div class="mainHeading"><h2 class="heading">5. General</h2><p class="para">5.1 You and your Representatives further agree and undertake that: -</p><p class="para">(a) no right or license is granted to you in relation to any of the Confidential Information other than as expressly set out in this Agreement.</p><p class="para">(b) Adil Supermarkets accept no responsibility for and make no representations or warranties, express or implied with respect to the accuracy or completeness of any of the Confidential Information and we will not be liable to you or any third party for any loss resulting from use of the Confidential Information.</p><p class="para">(c) you will not disclose to any person except those referred to in paragraph 3.1(a) the fact that the specified Purpose is taking place or that discussion or negotiations are taking place between us without our prior written consent.</p><p class="para">(d) no failure or delay by us in exercising any right or power under this undertaking will operate as a waiver of that right or power and no single or partial exercise of that right or power will preclude any other or further exercise of that right or right or power; and</p><p className="para">(e) Damages alone would not be an adequate remedy for any breach of this Agreement and Adil Supermarkets will be entitled to the remedies including of injunction, specific performance and other equitable relief for any threatened or actual breach of this Agreement and no proof of special damages will be necessary for the enforcement of this Agreement and Damages</p><p className="para">5.2 You undertake to indemnify us against all liability or loss arising directly or indirectly from, and any costs. charges and expenses incurred in connection with any breach by you of the terms of this Agreement, with any sum due under this paragraph 6.2 to be paid without any deduction or set-off (and irrespective of any counterclaim) whatsoever.</p><p className="para">5.3 You acknowledge, understand and agree that any unauthorized use (whether for your advantage or the advantage of another) or disclosure by you or any of your Representatives who are permitted by you to access the Confidential Information of any Confidential Information except as may be permitted by law Will give rise to an offence under the laws of the Dubai, United Arab Emirates.</p><p className="para">5.4 You hereby agree that this Agreement will be governed by and construed in accordance with the laws of the Dubai, United Arab Emirates You hereby irrevocably consent to the non-exclusive jurisdiction of the courts of Dubai for any actions, suits or proceedings arising out of or relating to this Agreement or any of its terms ("Action") You hereby submit to the jurisdiction of such courts and you waive any objection to any Action brought by us in any such courts whether on the ground of venue or on the ground that the Action has been brought in an inconvenient forum, and you further agree that a judgment in any Action brought in any such court will be conclusive and binding on you and may be enforced in the courts of any other jurisdiction.</p><p className="para">5.5 Any disputes arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the rules of the Dubai International Arbitration Centre (DIAC). The arbitration shall take place in Dubai, UAE, and the language of arbitration shall be English.</p><p className="para">5.6 Notwithstanding the foregoing, you agree that nothing in this Agreement will limit our right to bring any Action relating to the protection of the Confidential Information or any claim for interlocutory or injunctive relief in any other courts of competent jurisdiction, nor will the bringing by us of an Action in one jurisdiction preclude the bringing of an Action in any other jurisdiction (whether concurrently or not) Any clause or part of a clause of this Agreement which is ineffective in any jurisdiction is ineffective only to that extent in that jurisdiction.</p><p className="para">5.7 You hereto agree that no failure or delay by us in exercising any right, power or privilege hereunder will operate as a waiver thereof, nor will any single or partial exercise thereof preclude any other or further exercise thereof or the exercise of any right, power or privilege hereunder.</p><p className="para">5.8 Neither this paragraph nor any other provisions in this Agreement can be waived, amended or assigned except by prior written consent of the Party waiving the right, which consent will specifically refer to this paragraph (or such other provision) and explicitly make such waiver or amendment A waiver by one Party under this paragraph does not prejudice its rights in respect of any subsequent breach of this Agreement by the other Party.</p><p className="para">5.9 If any provision or covenant of this Agreement is found to violate or unenforceable in whole or in part any statute, regulation, rule, order or decree of any governmental authority, court, agency or exchange, such invalidity will not be deemed to affect any other provisions or covenants hereof or the validity of the remainder of this Agreement, and such invalid provision will be deemed deleted here from to the minimum extent necessary to cure such violation.</p><p className="para">5.10 This Agreement shall be valid for a term of 5 years from the date of this Agreement mentioned in the beginning, Notwithstanding the termination or expiration of this Agreement, the confidentiality obligations imposed on the Receiving Party under this Agreement shall survive.</p></div><p className="para">The Parties acknowledge and agree that this Agreement is solely intended to govern the disclosure and protection of Confidential Information exchanged for the Purpose defined herein. Nothing in this Agreement shall be interpreted as creating any obligation, commitment, or guarantee for either Party to enter into a subsequent business relationship, transaction, or contract or Award or assign any work, project.</p>
                `;

const STORAGE_KEY = "nda-form-data";

const initialFormData: FormData2 = {
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
};

const NDAPreview: React.FC = () => {
    const { data: sessionData } = useSession();
    const searchParams = useSearchParams();
    const resume = searchParams.get("resume");
    const docType = searchParams.get("DT");
    const docNumber = Number(searchParams.get("DN"));

    const [step, setStep] = useState<number>(() => {
        const storageData = getStorageData();
        return storageData?.step ?? 1;
    });
    const [progress, setProgress] = useState<number>(() => {
        const storageData = getStorageData();
        return storageData?.progress ?? 0;
    });
    const [formData, setFormData] = useState<FormData2>(() => {
        const storageData = getStorageData();
        return storageData?.formData ?? initialFormData;
    });

    const [isFinished, setIsFinished] = useState(false);
    const [encryptedContent, setEncryptedContent] = useState<string>("");
    const [isDecrypted, setIsDecrypted] = useState(false);
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const hasDownloadedRef = useRef(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    const { data: RoleBased, loading } = useQuery<GetUserResponse>(GET_USER, {
        variables: { email: sessionData?.user?.email },
    });
    const userId = RoleBased?.getUser?.id;
    const [createBusinessForm] = useMutation(CREATE_BUSINESS_FORM, {
        refetchQueries: [
            {
                query: GET_BUSINESS_FORMS,
                variables: { userId, DocType: "NDA", orderBy: { DocNumber: "desc" } },
            },
        ],
    });
    const [updateBusinessForm] = useMutation(UPDATE_BUSINESS_FORM, {
        refetchQueries: [
            {
                query: GET_BUSINESS_FORMS,
                variables: { userId, DocType: "NDA", orderBy: { DocNumber: "desc" } },
            },
        ],
    });
    const [deleteBusinessForm] = useMutation(DELETE_BUSINESS_FORM, {
        refetchQueries: [
            {
                query: GET_BUSINESS_FORMS,
                variables: { userId, DocType: "NDA", orderBy: { DocNumber: "desc" } },
            },
        ],
        awaitRefetchQueries: true,
        onError: (error) => {
            console.error("Delete mutation error:", error);
        },
    });
    const { data: GetDocType } = useQuery<GetBFResponse>(GET_BUSINESS_FORMS, {
        variables: { userId, DocType: "NDA", orderBy: { DocNumber: "desc" } },
    });
    const { data: GetDoc, loading: getDocLoading } = useQuery<GetOBFResponse>(
        GET_BUSINESS_FORM,
        {
            variables: { userId, DocType: docType, DocNumber: docNumber },
        }
    );

    // Load data from the database or session storage
    useEffect(() => {
        const documentData = GetDoc?.getBusinessForm?.formData;

        const injectDataToSessionStorage = () => {
            // Ensure documentData exists
            if (documentData) {
                // If resume is true or both docNumber and docType exist, inject data
                if (docNumber && docType) {
                    const dbFormData = documentData.formData || {};
                    const dbStep = documentData.step || 1;
                    const dbProgress = documentData.progress || 0;

                    const storedData = {
                        step: dbStep,
                        progress: dbProgress,
                        formData: { ...initialFormData, ...dbFormData },
                    };

                    // Inject data into sessionStorage
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

                    // Update state with the new data
                    setStep(dbStep);
                    setProgress(dbProgress);
                    setFormData(storedData.formData);
                }
            }
        };

        // Only inject data when the loading states are complete and data is available
        if (!getDocLoading) {
            injectDataToSessionStorage();
        }
    }, [resume, GetDoc?.getBusinessForm, docNumber, docType, getDocLoading]);

    const existingData = sessionStorage.getItem(STORAGE_KEY);
    const currentData = JSON.parse(existingData || "{}");
    const input = {
        userId: userId,
        DocType: "NDA",
        formData: currentData,
        status: progress === 100 ? "IsComplete" : "IsPending",
        url: "/documentation/business_contracts",
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setPaymentStatus(searchParams.get("paymentStatus"));
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const existingData = sessionStorage.getItem(STORAGE_KEY);
            const currentData = JSON.parse(existingData || "{}");

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    ...currentData,
                    formData: formData,
                    step: step,
                    progress: progress,
                })
            );

            setCurrentYear(new Date().getFullYear());
        }
    }, [formData, step, progress]);

    useEffect(() => {
        const encrypted = encryptText(SENSITIVE_CONTENT);
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
                !isDownloading &&
                GetDocType?.getBusinessForms?.length
            ) {
                try {
                    hasDownloadedRef.current = true;
                    setIsDecrypted(true);
                    setIsDownloading(true);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    await toPDF();

                    sessionStorage.removeItem(STORAGE_KEY);

                    const url = new URL(window.location.href);
                    url.searchParams.delete("paymentStatus");
                    window.history.replaceState({}, "", url);

                    setIsDownloading(false);
                    setIsDecrypted(false);
                    window.location.replace("/documentation/business_contracts");
                    // window.location.href = "/documentation/business_contracts";
                } catch (error) {
                    console.error("Error generating PDF:", error);
                    alert(
                        "An error occurred while generating the PDF. Please try again."
                    );
                    hasDownloadedRef.current = false;
                    setIsDownloading(false);
                    setIsDecrypted(false);
                }
            }
        };

        performDownload();
    }, [
        paymentStatus,
        isDownloading,
        GetDocType?.getBusinessForms,
        deleteBusinessForm,
        userId,
    ]);

    useEffect(() => {
        return () => {
            hasDownloadedRef.current = false;
        };
    }, []);

    const { toPDF, targetRef } = usePDF({
        filename: "nda-agreement.pdf",
        page: {
            margin: 20,
            format: "a4",
            orientation: "portrait",
        },
        canvas: {
            mimeType: "image/jpeg",
            qualityRatio: 0.6,
        },
    });

    const isFormComplete = (): boolean => {
        return isFinished && progress === 100 || progress === 100 && GetDoc?.getBusinessForm.status === "IsComplete";
    };

    const fieldGroups: FieldGroup2[] = [
        {
            step: 1,
            fields: ["agreementDay", "agreementMonth", "disclosingPartyCompanyName"],
        },
        {
            step: 2,
            fields: [
                "disclosingPartyRegisteredOffice",
                "disclosingPartyRepName",
                "disclosingPartyPosition",
            ],
        },
        {
            step: 3,
            fields: [
                "receivingPartyName",
                "receivingPartyRegisteredOffice",
                "receivingPartyPosition",
            ],
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
                group.fields.includes(key as keyof FormData2)
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
        name: keyof FormData2,
        value: string | null
    ): void => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reusable function to save progress to the database
    const saveProgressToDatabase = async (): Promise<void> => {
        if (!userId || !currentData) {
            alert("Required data is missing. Please check the form and try again.");
            return;
        }

        try {
            // Filter by DocType and sort by latest createdAt timestamp
            const existingForm = GetDocType?.getBusinessForms
                ?.filter((form) => form.DocType === input.DocType)
                .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))?.[0];
            if (existingForm && step > 1) {
                // Update existing form
                const { data } = await updateBusinessForm({
                    variables: {
                        input: {
                            userId: input.userId,
                            DocType: input.DocType,
                            DocNumber: existingForm.DocNumber,
                            formData: input.formData,
                            status: input.status,
                        },
                    },
                });

                if (data) {
                    alert("Form updated successfully!");
                } else {
                    console.error("No data returned from update mutation.");
                    alert("An error occurred while updating the form. Please try again.");
                }
            } else {
                // Create a new form
                const { data } = await createBusinessForm({
                    variables: {
                        input: {
                            ...input,
                        },
                    },
                });

                if (data) {
                    alert("Form submitted successfully!");
                } else {
                    console.error("No data returned from create mutation.");
                    alert(
                        "An error occurred while submitting the form. Please try again."
                    );
                }
            }
        } catch (error) {
            console.error("Error handling form submission:", error);
            alert(
                "Failed to submit the form. Please check your internet connection and reload or try again later."
            );
        }
    };

    const handleNext = async (): Promise<void> => {
        if (step < fieldGroups.length && isCurrentStepComplete()) {
            const nextStep = step + 1;
            setStep(nextStep);
            const existingData = sessionStorage.getItem(STORAGE_KEY);
            const currentData = JSON.parse(existingData || "{}");

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    ...currentData,
                    step: nextStep,
                })
            );
        }
        await saveProgressToDatabase();
    };

    const handleFinishClick = async (): Promise<void> => {
        await saveProgressToDatabase();
        setIsFinished(true);
    };

    const handleBack = async (): Promise<void> => {
        if (step > 1) {
            const prevStep = step - 1;
            setStep(prevStep);
            const existingData = sessionStorage.getItem(STORAGE_KEY);
            const currentData = JSON.parse(existingData || "{}");

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    ...currentData,
                    step: prevStep,
                })
            );
        }
        // await saveProgressToDatabase();
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

    const LetterPreview: React.FC = () => {
        const sensitiveContent =
            isDecrypted === true ? decryptText(encryptedContent) : encryptedContent;
        return (
            <div
                ref={targetRef}
                id="letter-preview"
                className={`p-6 bg-white rounded-lg shadow`}
                style={{
                    minHeight: "297mm",
                    width: "100%",
                    wordBreak: "normal",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    pageBreakInside: "auto",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <div className="text-center font-bold mb-6">
                    <h1 className="text-xl mb-2">NON-DISCLOSURE AGREEMENT</h1>
                    <p>(The &quot;Agreement&quot;)</p>
                </div>
                <p className="mb-4">
                    This Agreement is made on{" "}
                    {formData.agreementDay === "" ? "______" : formData.agreementDay} day
                    of{" "}
                    {formData.agreementMonth === "" ? "______" : formData.agreementMonth}{" "}
                    {currentYear ? currentYear : "Loading..."} (&quot;Agreement
                    Date&quot;) between:
                </p>
                <div className="space-y-4">
                    <p>
                        <strong>
                            {formData.disclosingPartyCompanyName === ""
                                ? "______"
                                : formData.disclosingPartyCompanyName}
                        </strong>
                        , (&quot;Disclosing Party&quot; or &quot;us&quot;), a Company
                        established under the Laws of the United Arab Emirates, whose
                        registered Office located at{" "}
                        {formData.disclosingPartyRegisteredOffice === ""
                            ? "______"
                            : formData.disclosingPartyRegisteredOffice}{" "}
                        Dubai, UAE, INCLUDING ITS SUBSIDIARIES AND AFFILIATES
                    </p>

                    <p>And</p>

                    <p>
                        {formData.receivingPartyName === ""
                            ? "______"
                            : formData.receivingPartyName}{" "}
                        (&quot;Receiving Party&quot; or &quot;you&quot; or
                        &quot;yours&quot;), is a company established under the Laws of the
                        United Arab Emirates, whose registered Office located at{" "}
                        {formData.receivingPartyRegisteredOffice === ""
                            ? "______"
                            : formData.receivingPartyRegisteredOffice}
                        , UAE each a &quot;Party&quot; and together the &quot;Parties&quot;.
                    </p>
                </div>
                {!isFormComplete() ? (
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
                        className={`${!isDecrypted ? "blur-sm line-clamp-6" : ""
                            } w-full h-full`}
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
                            {formData.disclosingPartyCompanyName === ""
                                ? "______"
                                : formData.receivingPartyName}
                        </p>
                        <div className="mt-4">
                            <p>
                                <span className="font-semibold">Name: </span>
                                {formData.disclosingPartyRepName === ""
                                    ? "______"
                                    : formData.disclosingPartyRepName}
                            </p>
                            <p>
                                <span className="font-semibold">Position: </span>
                                {formData.disclosingPartyPosition === ""
                                    ? "______"
                                    : formData.disclosingPartyPosition}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="font-medium">
                            Receiving Party read and agreed to the terms and conditions of
                            this Agreement:
                        </p>
                        <p className="font-medium">
                            Signed by duly Authorized Representative of{" "}
                            {formData.receivingPartyName === ""
                                ? "______"
                                : formData.receivingPartyName}
                        </p>
                        <div className="mt-4">
                            <p className="flex gap-2">
                                <span className="font-semibold">Name: </span>
                                {formData.receivingPartyName === ""
                                    ? "______"
                                    : formData.receivingPartyName}
                            </p>
                            <p>
                                <span className="font-semibold">Position: </span>
                                {formData.receivingPartyPosition === ""
                                    ? "______"
                                    : formData.receivingPartyPosition}
                            </p>
                            <p>
                                <span className="font-semibold">Date: </span>
                                {formData.agreementDay === ""
                                    ? "______"
                                    : formData.agreementDay}{" "}
                                of{" "}
                                {formData.agreementMonth === ""
                                    ? "______"
                                    : formData.agreementMonth}{" "}
                                {currentYear ? currentYear : "Loading..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading || getDocLoading)
        return (
            <div className="w-full padding h-[80vh] flex justify-center items-center">
                <Spinner size="lg" classNames={{
                    label: "animate-pulse text-base md:text-2xl font-archivo font-semibold tracking-wider"
                }} color="primary" labelColor="primary" label="Loading..." />
            </div>
        );

    return (
        <div className="container mx-auto p-4 max-w-6xl space-y-12 py-16">
            <h3 className="text-2xl text-center md:text-start md:text-3xl tracking-wider font-semibold text-[#1E318D] capitalize">
                Non-Disclosure Agreement
            </h3>
            <div
                className={`flex flex-col lg:flex-row justify-center items-start gap-10`}
            >
                {/* {isDownloading && <p className="w-full h-[80vh] flex justify-center items-center font-semibold tracking-widest animate-pulse text-lg md:text-xl">Generating your PDF, please wait...</p>} */}
                {!isFormComplete() && (
                    <div className={`w-full basis-full lg:basis-2/5`}>
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
                                        color="warning"
                                        radius="sm"
                                        className="text-[#1E318D] font-medium font-Lorin"
                                    >
                                        Back
                                    </Button>
                                    {JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}")
                                        .step < fieldGroups.length && (
                                            <Button
                                                onPress={handleNext}
                                                color="success"
                                                radius="sm"
                                                className="!text-primary font-semibold font-Lorin"
                                                disabled={!isCurrentStepComplete()}
                                            >
                                                Save & Continue
                                            </Button>
                                        )}
                                    {JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}")
                                        .step === fieldGroups.length &&
                                        progress === 100 && (
                                            <Button
                                                onClick={handleFinishClick}
                                                color="success"
                                                radius="sm"
                                                className="text-primary font-semibold font-Lorin animate-pulse hover:scale-110 transition-all transform duration-400 ease-in-out"
                                            >
                                                Save & Finish!
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
                            <div className="no_scrollbar max-h-[490px] overflow-y-scroll">
                                <LetterPreview />
                            </div>
                            {(isFormComplete() || GetDoc?.getBusinessForm.status === "IsComplete") && (
                                <Button
                                    onPress={handleDownload}
                                    className="mt-4 w-full text-white"
                                    color="primary"
                                    disabled={isDownloading}
                                    endContent={
                                        !isDownloading && (
                                            <IoMdDownload className="text-xl ml-5" />
                                        )
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

export default NDAPreview;
