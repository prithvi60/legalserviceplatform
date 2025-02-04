import { decryptText } from "@/services/encryption";
import { FormData2 } from "@/types/Types";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import React, { ChangeEvent } from "react";

interface LetterPreviewProps {
    formData: FormData2;
    currentYear: number;
    encryptedContent: string;
    isDecrypted: boolean;
    isFormComplete: boolean;
    targetRef: React.RefObject<HTMLDivElement>;
}

export const renderStep = ({ step, formData, handleInputChange }: { step: number; formData: FormData2; handleInputChange: (name: keyof FormData2, value: string) => void }): JSX.Element | null => {
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

const LetterPreview: React.FC<LetterPreviewProps> = ({
    formData,
    currentYear,
    encryptedContent,
    isDecrypted,
    isFormComplete,
    targetRef,
}) => {
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
                <Tooltip showArrow
                    offset={-4}
                    closeDelay={10}
                    color="primary"
                    size="lg"
                    className="text-xl text-white px-4 py-3"
                    content="Unlock clear and readable text by downloading the document now!">
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

export default LetterPreview;
