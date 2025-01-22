"use client";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import Link from "next/link";
import { navLinks } from "@/constants/Data";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { status } = useSession();
    const router = useRouter();
    const [isStatus, setIsStatus] = useState(false);
    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: "/" });
    };
    useEffect(() => {
        if (status === "authenticated") {
            setIsStatus(true);
        } else {
            setIsStatus(false);
        }
    }, [status]);

    const handleClick = (val: string) => {
        setIsMenuOpen(false);
        if (status === "authenticated") {
            router.push(val);
        } else {
            localStorage.setItem("returnUrl", val);
            router.push("/api/auth/signin");
        }
    };

    return (
        <Navbar
            isBordered
            maxWidth="full"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            classNames={{
                base: "bg-[#1E318DEE] text-white font-Archivo"
            }}
        >
            <NavbarContent className="md:hidden pr-3" justify="center">
                <NavbarBrand as={Link} href={"/"} className="">
                    <AcmeLogo />
                    <p className="font-bold text-inherit">XY</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarBrand as={Link} href={"/"}>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">XY</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end" className="hidden md:flex">
                {navLinks.map((list, idx) => (
                    <NavbarItem key={idx} className="mx-2.5">
                        <Dropdown>
                            <DropdownTrigger className="flex items-center gap-4 rounded-md">
                                <div className={`p-2 text-xl cursor-pointer ${list.menu === "Consult an Expert" && "bg-warning font-medium text-black"}`}>
                                    {list.menu}{" "}
                                    <span>
                                        <IoIosArrowDown className="text-xl font-bold" />
                                    </span>
                                </div>
                            </DropdownTrigger>
                            {list.menu === "Documentation" ? (
                                <DropdownMenu aria-label="Static Actions">
                                    {list.subCategories.map((item, index) => (
                                        <DropdownItem
                                            classNames={{
                                                base: "data-[hover=true]:bg-warning"
                                            }}
                                            as={Button}
                                            onPress={() => handleClick(item.href)}
                                            key={index}
                                            className="bg-transparent !text-xl text-[#1E318D]"
                                            endContent={<MdKeyboardArrowRight className="text-xl text-[#1E318D]" />}
                                        >
                                            {item.subMenu}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            ) : (
                                <DropdownMenu aria-label="Static Actions">
                                    {list.subCategories.map((item, index) => (
                                        <DropdownItem
                                            classNames={{
                                                base: "data-[hover=true]:bg-warning"
                                            }}
                                            as={Link}
                                            href={item.href}
                                            key={index}
                                            endContent={<MdKeyboardArrowRight className="text-xl text-[#1E318D]" />}
                                            className="text-[#1E318D]"
                                        >
                                            {item.subMenu}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            )}
                        </Dropdown>
                    </NavbarItem>
                ))}

                {isStatus ? (
                    <NavbarItem>
                        <button
                            className="flex items-center rounded-md py-1 hover:bg-warning px-4 border-2 border-white gap-3.5 font-semibold duration-300 ease-in-out  lg:text-base"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex rounded-md py-1 hover:bg-warning px-4 border-2 border-white font-semibold">
                            <Link href="/api/auth/signin">Login</Link>
                        </NavbarItem>
                        {/* <NavbarItem>
                            <Link
                                href="/auth/signup"
                                className="rounded-md py-2 px-4 bg-primary text-white"
                            >
                                Sign Up
                            </Link>
                        </NavbarItem> */}
                    </>
                )}
            </NavbarContent>

            <NavbarContent className="md:hidden" justify="end">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>

            <NavbarMenu className="!gap-8 pt-10">
                {navLinks.map((list, idx) => (
                    <NavbarMenuItem key={idx} className="mx-2.5">
                        <Dropdown>
                            <DropdownTrigger className="flex justify-between items-center rounded-md">
                                <div className={`p-2 border border-[#1E318DEE] ${list.menu === "Consult an Expert" && "bg-warning font-medium text-black"}`}>
                                    {list.menu}{" "}
                                    <span>
                                        <IoIosArrowDown className="text-xl font-bold" />
                                    </span>
                                </div>
                            </DropdownTrigger>
                            {list.menu === "Documentation" ? (
                                <DropdownMenu aria-label="Static Actions">
                                    {list.subCategories.map((item, index) => (
                                        <DropdownItem
                                            as={Button}
                                            onPress={() => handleClick(item.href)}
                                            key={index}
                                            className="bg-transparent"
                                            endContent={<MdKeyboardArrowRight className="text-xl" />}
                                        >
                                            {item.subMenu}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            ) : (
                                <DropdownMenu aria-label="Static Actions">
                                    {list.subCategories.map((item, index) => (
                                        <DropdownItem
                                            as={Button}
                                            onPress={() => setIsMenuOpen(false)}
                                            key={index}
                                            className="bg-transparent"
                                            endContent={<MdKeyboardArrowRight className="text-xl" />}
                                        >
                                            {item.subMenu}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            )}
                        </Dropdown>
                    </NavbarMenuItem>
                ))}

                {isStatus ? (
                    <NavbarMenuItem>
                        <button
                            className="flex items-center rounded-md py-2 px-4 border border-[#1E318D] text-white gap-3.5 font-medium duration-300 ease-in-out  lg:text-base"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </NavbarMenuItem>
                ) : (
                    <>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)} className="flex lg:hidden w-max mx-auto rounded-md py-2 px-10 border border-[#1E318D] text-[#1E318D] font-semibold">
                            <Link href="/api/auth/signin">Login</Link>
                        </NavbarMenuItem>
                        {/* <NavbarMenuItem>
                            <button
                                onClick={handleLogout}
                                className="rounded-md py-2 px-4 bg-primary text-white"
                            >
                                Sign Up
                            </button>
                        </NavbarMenuItem> */}
                    </>
                )}
            </NavbarMenu>
        </Navbar>
    );
}
