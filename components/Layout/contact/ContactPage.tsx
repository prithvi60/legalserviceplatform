import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import Image from "next/image";
import React from "react";
import { FaPhoneVolume, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import ContactForm from "./ContactForm";

const ContactPage = () => {
    return (
        <section className="padding w-full space-y-10 md:space-y-20">
            <h3 className="font-Archivo text-2xl tracking-wider font-semibold md:text-3xl xl:text-4xl text-secondary text-center">
                Any question or remarks? Just write us a message!
            </h3>
            <div className="flex flex-col md:flex-row md:justify-center gap-5 bg-white px-6 py-6">
                <div className="w-full md:w-1/2 lg:w-2/5 text-white">
                    <Card className="linear-blue_1 overflow-hidden px-7 md:px-14 py-8 space-y-10 md:space-y-28">
                        <CardHeader className="!p-0 flex-col gap-2 items-start">
                            <div>
                                <h4 className="text-xl md:text-2xl font-Archivo font-medium tracking-wider">
                                    Contact Information
                                </h4>
                                <p className="text-base font-Lorin text-[#C9C9C9]">
                                    Say something to start a live chat!
                                </p>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-visible gap-5 justify-center ">
                            <ul className="space-y-4">
                                {contactLists[0]?.ContactList?.map((contact, idx) => (
                                    <li
                                        key={idx}
                                        className="font-Lorin text-base flex gap-5 md:text-base"
                                    >
                                        <span>{contact.icon}</span>
                                        <h4 className="">{contact.title}</h4>
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                        <CardFooter className="py-4 px-6">
                            <ul className="flex items-center gap-5">
                                {contactLists[1]?.socialMedia?.map((social, idx) => (
                                    <li
                                        key={idx}
                                        className="font-Lorin text-white text-base md:text-base"
                                    >
                                        <Link href={social.href}>{social.icon}</Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="absolute size-56 -bottom-32 rotate-[5.8rad] -right-28 lg:size-80 lg:-bottom-44 lg:rotate-[5.8rad] lg:-right-32">
                                <Image fill alt="icon" src={"/circle-icon-1.svg"} />
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 lg:w-3/5">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactPage;

const contactLists = [
    {
        ContactList: [
            {
                icon: <FaPhoneVolume className="text-xl" />,
                title: "+91-9912 345 789",
            },
            {
                icon: <MdEmail className="text-xl" />,
                title: "demo@gmail.com",
            },
            {
                icon: <FaLocationDot className="text-xl" />,
                title: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
            },
        ],
    },
    {
        socialMedia: [
            {
                icon: <FaXTwitter className="text-3xl md:text-4xl hover:text-primary hover:animate-pulse backdrop-blur shadow-lg text-black p-1.5 rounded-full bg-warning" />,
                href: "#",
            },
            {
                icon: <FaInstagram className="text-3xl md:text-4xl hover:text-primary hover:animate-pulse backdrop-blur shadow-lg text-black p-1.5 rounded-full bg-warning" />,
                href: "#",
            },
            {
                icon: <FaLinkedinIn className="text-3xl md:text-4xl hover:text-primary hover:animate-pulse backdrop-blur shadow-lg text-black p-1.5 rounded-full bg-warning" />,
                href: "#",
            },
        ],
    },
];
