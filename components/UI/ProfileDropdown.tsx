"use client"

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Avatar } from '@heroui/avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Spinner } from "@heroui/spinner";

export const ProfileDropdown = ({ email, loading }: { email?: string; loading: boolean }) => (
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <Avatar
                size="md"
                as="button"
                color="success"
                className="transition-transform p-0.5"
                src="/profile.png"
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-xs">Signed in as</p>
                {loading ? (
                    <div className="w-full mx-auto flex-center">
                        <Spinner size="sm" color="primary" />
                    </div>
                ) : (
                    <p className="font-semibold text-primary">{email}</p>
                )}
            </DropdownItem>
            <DropdownItem
                key="My_Profile"
                classNames={{
                    base: "data-[hover=true]:!bg-success/80",
                }}
            >
                <Link href="/profile" className="w-full block">
                    My Profile
                </Link>
            </DropdownItem>
            <DropdownItem
                key="logout"
                onClick={() => {
                    sessionStorage.clear();
                    signOut({ redirect: true, callbackUrl: "/" });
                }}
                color="danger"
            >
                Log Out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
);