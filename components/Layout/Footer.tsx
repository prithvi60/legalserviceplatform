"use client"
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";

type FormDataType = {
    email: string; // Add more fields if the form has other inputs.
} | null;

const Footer = () => {
    const [submitted, setSubmitted] = useState<FormDataType>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

        if (formData.email) {
            setSubmitted({ email: formData.email });
        }
    };

    // console.log(submitted?.email);

    return (
        <footer className="padding w-full font-Inter bg-primary/90 text-white flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-12 lg:gap-8">
            <div className="block space-y-8">
                <Link href={"/"} className="flex justify-center lg:justify-start items-center gap-2">
                    <p className="font-bold font-Inter italic font-semibold">Resolve</p>
                </Link>
                <div className="text-sm text-center lg:text-start md:text-base space-y-3">
                    <p>Copyright © {new Date().getFullYear()}</p>
                    <p>All rights reserved</p>
                </div>
                <ul className="flex items-center gap-2.5">
                    {socialLinks.map((list, idx) => (
                        <li key={idx}>
                            <Link href={list.href} className="">
                                {list.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center md:items-start md:justify-start md:flex-row gap-10 md:gap-20">
                <div className="flex flex-row sm:justify-center gap-8 md:gap-16">
                    <div className="block space-y-3">
                        <h4 className="text-lg font-semibold capitalize tracking-wider md:text-xl">Company</h4>
                        <ul className="block space-y-4">
                            {footerLinks1.map((list, idx) => (
                                <li key={idx} className="text-sm capitalize md:text-base tracking-wide hover:text-warning">
                                    <Link href={list.href}>
                                        {list.menu}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="block space-y-3">
                        <h4 className="text-lg font-semibold capitalize tracking-wider md:text-xl">Support</h4>
                        <ul className="block space-y-4">
                            {footerLinks2.map((list, idx) => (
                                <li key={idx} className="text-sm capitalize md:text-base tracking-wide hover:text-warning">
                                    <Link href={list.href}>
                                        {list.menu}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="block space-y-3">
                    <h4 className="text-lg font-semibold tracking-wider md:text-xl text-center md:text-start">Stay up to date</h4>
                    <Form className="w-full max-w-xs" validationBehavior="native" onSubmit={onSubmit}>
                        <Input
                            isRequired
                            endContent={
                                <button type="submit" className="bg-transparent cursor-pointer">
                                    <TbSend className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                </button>
                            }
                            labelPlacement="outside"
                            errorMessage="Please enter a valid email"
                            placeholder="Your email address"
                            type="email"
                            name="email"
                            classNames={{
                                input: "placeholder:!text-white/60 !text-white",
                                innerWrapper: "bg-transparent",
                                inputWrapper: "!bg-transparent data-[hover=true]:!bg-white/10 group-data-[focus=true]:!bg-white/10 group-data-[focus=true]:!text-white !cursor-text",
                                helperWrapper: "!text-[#f26161]",
                                errorMessage: "!text-[#f26161]"
                            }}
                            className="bg-white/20 rounded-lg"
                        />
                    </Form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

const footerLinks1 = [
    { menu: "About us", href: "/about" },
    { menu: "Blog", href: "#" },
    { menu: "Contact us", href: "/contact" },
    { menu: "Pricing", href: "#" },
    { menu: "Testimonials", href: "#" },
];

const footerLinks2 = [
    { menu: "Help center", href: "#" },
    { menu: "Terms of service", href: "/termsAndConditions" },
    { menu: "Legal", href: "#" },
    { menu: "Privacy policy", href: "/privacyPolicy" },
    { menu: "Status", href: "#" },
];

const socialLinks = [
    {
        icon: (
            <FaInstagram className="text-3xl md:text-4xl hover:text-warning hover:animate-pulse backdrop-blur p-1.5 rounded-full bg-white/25" />
        ),
        href: "#",
    },
    {
        icon: (
            <FaLinkedinIn className="text-3xl md:text-4xl hover:text-warning hover:animate-pulse backdrop-blur p-1.5 rounded-full bg-white/25" />
        ),
        href: "#",
    },
    {
        icon: (
            <FaWhatsapp className="text-3xl md:text-4xl hover:text-warning hover:animate-pulse backdrop-blur p-1.5 rounded-full bg-white/25" />
        ),
        href: "#",
    },
    {
        icon: (
            <FaXTwitter className="text-3xl md:text-4xl hover:text-warning hover:animate-pulse backdrop-blur p-1.5 rounded-full bg-white/25" />
        ),
        href: "#",
    },
];
