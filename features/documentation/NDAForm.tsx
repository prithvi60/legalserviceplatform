"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const NDAForm = () => {
    const [formData, setFormData] = useState({
        agreementDate: "",
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
    });

    const [preview, setPreview] = useState(false);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const NDAPreview = () => (
        <div className="p-6 space-y-4 text-sm">
            <div className="text-center font-bold mb-6">
                <h1 className="text-xl mb-2">NON-DISCLOSURE AGREEMENT</h1>
                <p>(The &quot;Agreement&quot;)</p>
            </div>

            <p>
                This Agreement is made on{" "}
                {formData.agreementDay === "" ? "______" : formData.agreementDay} day of{" "}
                {formData.agreementMonth === "" ? "______" : formData.agreementMonth}{" "}
                {new Date().getFullYear()} (&quot;Agreement Date&quot;) between:
            </p>

            <div className="space-y-4">
                <p>
                    <strong>
                        {formData.disclosingPartyCompanyName === ""
                            ? "______"
                            : formData.agreementMonth}
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
                    (&quot;Receiving Party&quot; or &quot;you&quot; or &quot;yours&quot;),
                    is a company established under the Laws of the United Arab Emirates,
                    whose registered Office located at{" "}
                    {formData.receivingPartyRegisteredOffice === ""
                        ? "______"
                        : formData.receivingPartyRegisteredOffice}
                    , UAE each a &quot;Party&quot; and together the &quot;Parties&quot;.
                </p>
            </div>

            <div className="mt-8 space-y-4">
                <h2 className="font-bold">BACKGROUND</h2>
                <p>
                    (i) The purpose of this Agreement is to facilitate discussions and
                    potential collaboration between the Disclosing Party and the Receiving
                    Party, wherein the Receiving Party may provide Enterprise Resource
                    Planning (ERP) solutions to the Disclosing Party (the
                    &quot;Purpose&quot;).
                </p>

                <p>
                    (ii) Adil Supermarkets have revealed or plan to reveal to you
                    Confidential Information (as defined herein). In consideration for us
                    revealing Confidential Information to you and to any of your
                    subsidiaries, directors, members, officers, employees, agents and
                    advisors including without limitation attorneys, accountants,
                    technicians, consultants and technical advisors etc. (&quot;your
                    Representatives&quot;), you and your Representatives agree that all
                    such information will be treated by you and/or your Representatives as
                    being strictly confidential in accordance with this Agreement.
                </p>
            </div>

            {/* Signature Section */}
            <div className="mt-12 pt-8 border-t space-y-8">
                <div>
                    <p className="font-bold mb-4">
                        IN WITNESS WHEREOF, this agreement has caused it to be executed at
                        Dubai, UAE on the date indicated above.
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="font-bold">
                        Signed by duly Authorized Representative of{" "}
                        {formData.disclosingPartyCompanyName === ""
                            ? "______"
                            : formData.receivingPartyName}
                    </p>
                    <div className="mt-4">
                        <p>
                            Name:{" "}
                            {formData.disclosingPartyRepName === ""
                                ? "______"
                                : formData.disclosingPartyRepName}
                        </p>
                        <p>
                            Position:{" "}
                            {formData.disclosingPartyPosition === ""
                                ? "______"
                                : formData.disclosingPartyPosition}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-bold">
                        Receiving Party read and agreed to the terms and conditions of this
                        Agreement:
                    </p>
                    <p className="font-bold">
                        Signed by duly Authorized Representative of{" "}
                        {formData.receivingPartyName === ""
                            ? "______"
                            : formData.receivingPartyName}
                    </p>
                    <div className="mt-4">
                        <p>
                            Name:{" "}
                            {formData.receivingPartyName === ""
                                ? "______"
                                : formData.receivingPartyName}
                        </p>
                        <p>
                            Position:{" "}
                            {formData.receivingPartyPosition === ""
                                ? "______"
                                : formData.receivingPartyPosition}
                        </p>
                        <p>
                            Date:{" "}
                            {formData.agreementDay === "" ? "______" : formData.agreementDay}{" "}
                            of{" "}
                            {formData.agreementMonth === ""
                                ? "______"
                                : formData.agreementMonth}{" "}
                            {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <Card>
                <CardHeader>
                    <h3>Non-Disclosure Agreement Form</h3>
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        {!preview ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Agreement Day"
                                        placeholder="e.g. 22nd"
                                        value={formData.agreementDay}
                                        onChange={(e) =>
                                            handleInputChange("agreementDay", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <Input
                                        label="Agreement Month"
                                        placeholder="e.g. 01 or January"
                                        value={formData.agreementMonth}
                                        onChange={(e) =>
                                            handleInputChange("agreementMonth", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <Input
                                        label="Disclosing Party Company Name"
                                        placeholder="Enter company name"
                                        value={formData.disclosingPartyCompanyName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "disclosingPartyCompanyName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <Input
                                    label="Disclosing Party Registered Office"
                                    placeholder="Enter registered office address"
                                    value={formData.disclosingPartyRegisteredOffice}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "disclosingPartyRegisteredOffice",
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="Receiving Party Company Name"
                                    placeholder="Enter company name"
                                    value={formData.receivingPartyName}
                                    onChange={(e) =>
                                        handleInputChange("receivingPartyName", e.target.value)
                                    }
                                    className="w-full"
                                />

                                <Input
                                    label="Receiving Party Registered Office"
                                    placeholder="Enter registered office address"
                                    value={formData.receivingPartyRegisteredOffice}
                                    onChange={(e) =>
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
                                    onChange={(e) =>
                                        handleInputChange("receivingPartyPosition", e.target.value)
                                    }
                                    className="w-full"
                                />

                                <Input
                                    label="Disclosing Party Representative Name"
                                    placeholder="Enter representative name"
                                    value={formData.disclosingPartyRepName}
                                    onChange={(e) =>
                                        handleInputChange("disclosingPartyRepName", e.target.value)
                                    }
                                    className="w-full"
                                />

                                <Input
                                    label="Disclosing Party Position"
                                    placeholder="Enter position"
                                    value={formData.disclosingPartyPosition}
                                    onChange={(e) =>
                                        handleInputChange("disclosingPartyPosition", e.target.value)
                                    }
                                    className="w-full"
                                />

                                <div className="flex justify-end space-x-4 mt-6">
                                    <Button variant="flat" onClick={() => setPreview(true)}>
                                        Preview
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <NDAPreview />
                                <div className="flex justify-end space-x-4 mt-6">
                                    <Button variant="flat" onClick={() => setPreview(false)}>
                                        Edit
                                    </Button>
                                    <Button>Download PDF</Button>
                                </div>
                            </>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default NDAForm;
