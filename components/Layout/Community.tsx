import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";

interface CommunityList {
    icon: string;
    alt: string;
    href: string;
    title: string;
    lists?: string[];
    summary?: string;
}

const Community = ({
    mainTitle,
    desc,
    data,
}: {
    mainTitle: string;
    desc?: string;
    data: CommunityList[];
}) => {
    return (
        <section className="padding bg-white w-full space-y-12">
            <div className="block space-y-2">
                <h3 className="font-Archivo text-3xl tracking-wider font-semibold md:text-5xl xl:text-6xl text-secondary">
                    {mainTitle}
                </h3>
                <p className="font-Lorin text-lg md:text-xl text-[#717171]">{desc}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:flex-wrap text-white gap-5">
                {data.map((item, idx) => (
                    <Card
                        key={idx}
                        className="py-4 px-6 linear-blue_1 w-72 mx-auto md:w-80"
                    >
                        <CardHeader className="pb-3 pt-2 px-4 flex-col gap-2 items-start">
                            <div className="relative overflow-hidden size-14 md:size-20 mx-auto">
                                <Image
                                    alt={item.alt}
                                    className="object-contain rounded-xl"
                                    src={item.icon}
                                    fill
                                />
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-visible gap-5 justify-center py-2">
                            <h4 className="text-lg md:text-xl text-center font-Archivo font-bold tracking-wider">
                                {item.title}
                            </h4>
                            {item.lists ? (
                                <ul className="text-lg mx-auto pl-2 w-1/2 space-y-1.5 list-disc font-Lorin font-medium list-outside">
                                    {item.lists.map((list, id) => (
                                        <li key={id}>{list}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-lg text-center font-Lorin font-medium">
                                    {item.summary}
                                </p>
                            )}
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Community;
