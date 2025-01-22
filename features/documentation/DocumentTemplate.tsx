import React from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";
const DocumentTemplate = () => {
    return (
        <section className="w-full max-w-7xl mx-auto h-full flex gap-20">
            <div className="p-5 border-2 max-h-[70vh] border-green-600 rounded basis-full md:basis-[35%]"></div>
            <div className="shadow-2xl basis-full md:basis-[65%]">
                <ScrollShadow hideScrollBar size={100} className="max-h-[70vh] bg-white/90 rounded w-full">
                    {/* <ScrollShadow className="w-auto h-auto"> */}
                    <div className="p-10">
                        <h1 className="text-2xl font-bold mb-4 text-center">
                            Request for Remote Work Arrangement
                        </h1>
                        <p className="mb-4">
                            From:{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="Your Name"
                            />
                        </p>
                        <p className="mb-4">
                            To:{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="Manager's Name"
                            />
                        </p>

                        <p className="text-lg mb-4">
                            Date:{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-24 text-center"
                                placeholder="MM/DD/YY"
                            />
                        </p>

                        <p className="mb-4">
                            Dear{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="Manager's Name"
                            />
                            ,
                        </p>

                        <p className="mb-4">
                            I hope this message finds you well. I am writing to request the
                            opportunity to work{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-24"
                                placeholder="full-time/part-time"
                            />{" "}
                            on a{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-24"
                                placeholder="full-time/part-time"
                            />{" "}
                            basis. Considering my{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="role/responsibilities"
                            />{" "}
                            and responsibilities, I am confident I can maintain, or even{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-24"
                                placeholder="increase"
                            />{" "}
                            my productivity while working remotely.
                        </p>

                        <p className="mb-4">
                            Remote work would help me{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="mention benefits"
                            />
                            . With our{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="collaboration tools"
                            />{" "}
                            tools, I will ensure prompt{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-24"
                                placeholder="responses"
                            />{" "}
                            and smooth collaboration.
                        </p>

                        <p className="mb-4">
                            Do you think this arrangement could be beneficial to the team?
                            <select className="border-b border-gray-400 px-2 py-1">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </p>

                        <p className="mb-4">
                            I am committed to overcoming potential{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="challenges"
                            />{" "}
                            by scheduling regular{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="check-ins"
                            />{" "}
                            and maintaining a dedicated workspace.
                        </p>

                        <p className="mb-4">
                            Thank you for considering my request. I look forward to your{" "}
                            <input
                                type="text"
                                className="border-b border-gray-400 px-2 py-1 w-48"
                                placeholder="response/approval"
                            />
                            .
                        </p>

                        <p className="text-right mt-8">Warm regards,</p>
                        <p className="text-right mt-2">[Your Name]</p>
                    </div>
                    {/* </ScrollShadow> */}
                </ScrollShadow>
            </div>
        </section>
    );
};

export default DocumentTemplate;
