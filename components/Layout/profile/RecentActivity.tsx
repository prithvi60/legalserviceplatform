import { formatTimestamp } from "@/constants/Helper";
import { DeleteDocument } from "@/features/profile/DeleteDocument";
import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";
import { MdArrowRight } from "react-icons/md";

interface RecentActivityProps {
    data: {
        DocNumber: number;
        DocType: string;
        url: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

const STORAGE_KEY = "nda-form-data";

const RecentActivity = ({ data }: RecentActivityProps) => {
    // const filteredData = data.filter((doc) => doc.);
    return (
        <section className="w-full font-Lorin space-y-8 md:space-y-12">
            <h2 className="text-lg tracking-wider capitalize">Recent Activity</h2>
            {!data?.length ? (
                <p className="text-center font-Archivo tracking-wider text-base md:text-xl text-slate-500">
                    Currently, no pending data is available.
                </p>
            ) : (
                <>
                    {data.map((doc, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-start items-start bg-[#F2F1F1] px-8 py-4 md:p-5 md:flex-row gap-5 md:gap-0 md:justify-between md:items-center rounded-lg"
                        >
                            <div>
                                <h4 className="flex items-center gap-2 text-base tracking-wider">
                                    <span className="font-bold">{doc.DocType}</span>
                                    Document
                                </h4>
                                <p className="opacity-60">
                                    {formatTimestamp(doc.createdAt || doc.updatedAt)}
                                </p>
                            </div>
                            <div className="flex items-center gap-5">
                                <DeleteDocument
                                    docId={doc.DocNumber}
                                    docType={doc.DocType}
                                    status={doc.status}
                                    url={doc.url}
                                />
                                <Button
                                    radius="md"
                                    size="md"
                                    color="warning"
                                    className="font-medium"
                                    endContent={<MdArrowRight className="text-xl" />}
                                    as={Link}
                                    href={`${doc.url}?DT=${doc.DocType}&DN=${doc.DocNumber}`}
                                    onClick={() => sessionStorage.removeItem(STORAGE_KEY)}
                                >
                                    Resume
                                </Button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};

export default RecentActivity;
