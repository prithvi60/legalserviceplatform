import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";

const Community = () => {
    return (
        <section className="padding w-full space-y-12">
            <div className="block space-y-2 text-center">
                <h3 className="font-Archivo text-3xl tracking-wider font-semibold md:text-5xl xl:text-6xl text-secondary">
                    Ready to Streamline Your Business Operations.
                </h3>
                <p className="font-Lorin text-sm md:text-base text-[#717171]">
                    350+ Verified CA, CS, and Legal Experts
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:flex-wrap xl:flex-nowrap text-white gap-5 xl:gap-0">
                {communityServices.map((item, idx) => (
                    <Card
                        key={idx}
                        className="py-4 px-6 linear-blue_1 max-w-72 mx-auto md:max-w-80"
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
                            <p className="text-sm text-center font-Lorin font-medium">{item.summary}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Community;

const communityServices = [
    { icon: "/Icon-1.svg", alt: "icons", href: "#", title: "Talk to Lawyer", summary: "Our membership management software provides full automation of membership renewals and payments" },
    { icon: "/Icon-2.svg", alt: "icons", href: "#", title: "Talk to Chattered Account", summary: "Our membership management software provides full automation of membership renewals and payments" },
    { icon: "/Icon-3.svg", alt: "icons", href: "#", title: "Talk to Company Secretary", summary: "Our membership management software provides full automation of membership renewals and payments" },
];
