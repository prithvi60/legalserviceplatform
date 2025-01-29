import { DeleteDocument } from "@/features/profile/DeleteDocument";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdDownload } from "react-icons/md";

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

const MyDocs = ({ data }: RecentActivityProps) => {
    return (
        <section className="w-full space-y-8 md:space-y-12">
            <h2 className="text-lg tracking-wider capitalize">My Documents</h2>
            <div className="flex flex-col md:flex-row justify-center md:flex-wrap xl:flex-nowrap gap-4">
                {data.map((item) => (
                    <Card
                        key={item.DocNumber}
                        className="bg-[#F2F1F1] max-w-80 mx-auto md:max-w-96"
                    >
                        <CardHeader className="pb-0 pt-2 px-6 flex-col gap-2 items-start">
                            <h4 className="flex items-center gap-2 text-base tracking-wider">
                                <span className="font-bold">{item.DocType}</span>
                                Document
                            </h4>
                        </CardHeader>
                        <CardBody className="overflow-visible pb-4 px-6 gap-5 justify-center">
                            <div className="relative rounded-md overflow-hidden w-full h-44 mx-auto">
                                <Image
                                    alt={"sample image"}
                                    className="object-cover rounded-xl"
                                    src={"/sample-doc.png"}
                                    fill
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="justify-center gap-5 items-center linear-blue_1">
                            <DeleteDocument
                                docId={item.DocNumber}
                                docType={item.DocType}
                                status={item.status}
                                url={item.url}
                            />
                            <Button
                                radius="md"
                                size="md"
                                color="warning"
                                className="font-semibold font-Lorin"
                                endContent={<MdDownload className="text-lg" />}
                                as={Link}
                                href={`${item.url}?DT=${item.DocType}&DN=${item.DocNumber}`}
                                onClick={() => sessionStorage.removeItem(STORAGE_KEY)}
                            >
                                Download
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default MyDocs;
