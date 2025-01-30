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
import { Avatar } from "@heroui/avatar";

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
        sessionStorage.clear();
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
                base: "bg-primary text-white font-Archivo",
                menu: "!backdrop-blur-0 !bg-primary overflow-hidden",
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

            <NavbarContent justify="end" className="hidden lg:flex">
                {navLinks.map((list, idx) => (
                    <NavbarItem key={idx} className="mx-2.5">
                        <Dropdown>
                            <DropdownTrigger className="flex items-center gap-4 rounded-md">
                                <div
                                    className={`p-2 text-xl cursor-pointer ${list.menu === "Consult an Expert" &&
                                        "bg-warning font-medium text-lg lg:text-xl text-black"
                                        }`}
                                >
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
                                                base: "data-[hover=true]:bg-warning",
                                            }}
                                            as={Button}
                                            onPress={() => handleClick(item.href)}
                                            key={index}
                                            className="bg-transparent !text-xl text-[#1E318D]"
                                            endContent={
                                                <MdKeyboardArrowRight className="text-xl text-[#1E318D]" />
                                            }
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
                                                base: "data-[hover=true]:bg-warning",
                                            }}
                                            as={Link}
                                            href={item.href}
                                            key={index}
                                            endContent={
                                                <MdKeyboardArrowRight className="text-xl text-[#1E318D]" />
                                            }
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
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    size="md"
                                    as="button"
                                    color="warning"
                                    className="transition-transform p-0.5"
                                    src="/avatar.png"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </DropdownItem>
                                <DropdownItem key="My_Profile">
                                    <Link href="/profile" className="w-full block">
                                        My Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    onClick={handleLogout}
                                    color="danger"
                                >
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {/* <button
                            className="flex items-center rounded-md py-1 hover:bg-warning px-4 border-2 border-white gap-3.5 font-semibold duration-300 ease-in-out  lg:text-base"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button> */}
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex rounded-md py-1 hover:bg-warning px-4 border-2 border-white font-semibold">
                            <Link href="/api/auth/signin">Login</Link>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            <NavbarContent className="lg:hidden" justify="end">
                {navLinks.map((list, idx) => (
                    <NavbarItem key={idx} className="hidden sm:flex">
                        <Dropdown>
                            <DropdownTrigger className="flex items-center gap-4 rounded-md">
                                <div
                                    className={`p-2 text-xl cursor-pointer ${list.menu === "Consult an Expert"
                                        ? "bg-warning font-medium text-lg lg:text-xl text-black"
                                        : "hidden"
                                        }`}
                                >
                                    {list.menu}{" "}
                                    <span>
                                        <IoIosArrowDown className="text-xl font-bold" />
                                    </span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {list.subCategories.map((item, index) => (
                                    <DropdownItem
                                        classNames={{
                                            base: "data-[hover=true]:bg-warning",
                                        }}
                                        as={Link}
                                        href={item.href}
                                        key={index}
                                        endContent={
                                            <MdKeyboardArrowRight className="text-xl text-[#1E318D]" />
                                        }
                                        className="text-[#1E318D]"
                                    >
                                        {item.subMenu}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ))}
                {isStatus ? (
                    <NavbarItem className="mr-2 sm:mr-8">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    size="md"
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    src="/avatar.png"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </DropdownItem>
                                <DropdownItem key="My_Profile">
                                    <Link href="/profile" className="w-full block">
                                        My Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    onClick={handleLogout}
                                    color="danger"
                                >
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {/* <button
                            className="flex items-center rounded-md py-1.5 hover:bg-warning px-4 border-2 border-white gap-3.5 font-semibold duration-300 ease-in-out text-sm lg:text-base"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button> */}
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="flex mr-2 sm:mr-8 rounded-md py-1.5 hover:bg-warning px-4 border-2 border-white font-semibold text-sm lg:text-base">
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
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>

            <NavbarMenu className="!gap-8 pt-10">
                {navLinks.map((list, idx) => (
                    <NavbarMenuItem key={idx} className="mx-2.5">
                        <Dropdown>
                            <DropdownTrigger className="flex justify-between items-center rounded-md">
                                <div
                                    className={`p-2 ${list.menu === "Consult an Expert"
                                        ? "sm:hidden bg-warning font-medium text-black"
                                        : "border border-white text-white"
                                        }`}
                                >
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
            </NavbarMenu>
        </Navbar>
    );
}
