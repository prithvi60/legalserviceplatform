import { decryptText } from "@/services/encryption";
import { FormData2 } from "@/types/Types";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

interface LetterPreviewProps {
    formData: FormData2;
    currentYear: number;
    encryptedContent: string;
    isDecrypted: boolean;
    isFormComplete: boolean;
    targetRef: React.RefObject<HTMLDivElement>;
}

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
