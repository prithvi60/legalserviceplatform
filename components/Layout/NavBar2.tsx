"use client"
import { navLinks } from '@/constants/Data';
import React, { useEffect, useState } from 'react'
import DesktopMenu from '../UI/DesktopMenu';
import MobMenu from '../UI/MobMenu';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GetUserResponse } from '@/types/Types';
import { GET_USER } from '@/constants/Queries';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Avatar } from '@heroui/avatar';
import { LoaderPinwheel } from 'lucide-react';


const AcmeLogo = () => {
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

const NavBar2 = () => {
    const { status } = useSession();
    const [isStatus, setIsStatus] = useState(false);
    const { data: sessionData } = useSession();
    const { data: RoleBased, loading } = useQuery<GetUserResponse>(GET_USER, {
        variables: { email: sessionData?.user?.email },
    });
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

    return (
        <header className="px-5 md:px-[40px] py-[20px] text-[15px] z-50 sticky inset-0 flex-center text-white bg-primary">
            <nav className="flex-center-between w-full">
                <div className="z-[999] relative">
                    {/* <Image src={AcmeLogo} alt="" width={20} height={20} /> */}
                    <Link href={"/"} className='flex-center gap-x-2 '>
                        <AcmeLogo />
                        <h3 className="text-lg font-Archivo font-semibold">XY</h3>
                    </Link>
                </div>

                <div className="flex-center gap-x-5">
                    <ul className="gap-x-1 lg:flex-center hidden">
                        {navLinks.map((menu, idx) => (
                            <DesktopMenu key={idx} menu={menu} />
                        ))}
                    </ul>
                    {isStatus ? (
                        <div>
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
                                        <p className="font-semibold text-xs">Signed in as</p>
                                        {loading ? (
                                            <div className="w-full mx-auto flex justify-center items-center">
                                                <LoaderPinwheel className="animate-spin size-6 text-center text-primary" />
                                            </div>
                                        ) : (
                                            <p className="font-semibold text-primary">{RoleBased?.getUser?.email}</p>
                                        )}
                                    </DropdownItem>
                                    <DropdownItem
                                        key="My_Profile"
                                        classNames={{
                                            base: "data-[hover=true]:!bg-warning/80",
                                        }}
                                    >
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
                        </div>
                    ) : (
                        <>
                            <div className="flex rounded-md py-1 hover:bg-warning px-4 border-2 border-white font-semibold">
                                <Link href="/api/auth/signin">Login</Link>
                            </div>
                        </>
                    )}
                    <div className="lg:hidden">
                        <MobMenu Menus={navLinks} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar2
