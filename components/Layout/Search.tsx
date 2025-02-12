"use client"
import { Card, CardBody } from "@heroui/card";
import { communityServices } from "@/constants/Data";
import { useRef } from "react";
import Link from "next/link";
const Search = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    return (
        <section className="padding w-full bg-[#F1F2F5] space-y-10">
            {/* <div className=" rounded-xl p-10 w-full h-full"> */}
            <div className="block space-y-2">
                <h4 className="font-Archivo text-2xl font-semibold md:text-3xl xl:text-4xl">Explore our suite of products</h4>
                <p className="font-Lorin">Explore our suite of products to see how you can simplify, automate and accelerate your Legal processes.</p>
            </div>
            <div className="grid grid-cols-3 place-content-center place-items-center gap-5 xl:gap-10 w-full">
                {communityServices.map((item, idx) => (
                    <Card
                        key={idx}
                        className={`py-6 px-5 md:px-10 bg-[#EFEFFF] mx-auto w-full h-full col-span-5 `}
                    >
                        <CardBody className="overflow-visible lg:flex-row gap-10 lg:gap-5 py-2">
                            <div className="block space-y-4 w-full md:w-2/5">
                                <h4 className="text-2xl md:text-3xl font-Archivo font-bold tracking-wider">
                                    {item.title}
                                </h4>
                                <ul className="space-y-4">
                                    {item.services.map((service, id) => (
                                        <li
                                            key={id}
                                            className="font-Lorin text-sm block md:text-base border-b-2 border-black"
                                        >
                                            <Link href={service.href} className="space-y-1.5">
                                                {service.country !== "" && (
                                                    <h4
                                                        className="w-full flex justify-between items-center pb-2"
                                                    >
                                                        {service.country}
                                                    </h4>
                                                )}
                                                {service?.lists !== "" && (
                                                    <p className="text-xs pb-2 font-Lorin font-medium">
                                                        {service?.lists}
                                                    </p>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full ">
                                <video
                                    ref={videoRef}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    className="h-full md:h-[330px] w-full object-contain xl:object-cover object-center"
                                >
                                    <source src="/demo.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            {/* </div> */}
        </section>
    );
};

export default Search;

