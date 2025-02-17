"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { Spinner } from "@heroui/spinner";
import { navLinks2 } from "@/constants/Data";
import { GET_USER } from "@/constants/Queries";
import type { GetUserResponse } from "@/types/Types";
import DesktopMenu from "../UI/DesktopMenu";
import MobMenu from "../UI/MobMenu";
import { ProfileDropdown } from "../UI/ProfileDropdown";

// const AcmeLogo = () => (
//     <svg
//         fill="none"
//         height="36"
//         viewBox="0 0 32 32"
//         width="36"
//         aria-label="Acme Logo"
//     >
//         <path
//             clipRule="evenodd"
//             d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//             fill="currentColor"
//             fillRule="evenodd"
//         />
//     </svg>
// );

const AuthSection = ({
  status,
  userData,
  loading,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
  userData?: GetUserResponse;
  loading: boolean;
}) => {
  if (status === "loading") {
    return (
      <div className="w-10 h-10 flex-center">
        <Spinner size="md" color="success" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <ProfileDropdown email={userData?.getUser?.email} loading={loading} />
    );
  }

  return (
    <Link
      href="/api/auth/signin"
      className="flex rounded-md py-1 text-sm md:text-base hover:bg-success px-4 border-2 border-white font-semibold"
    >
      Login
    </Link>
  );
};

const NavBar2 = () => {
  const { data: sessionData, status } = useSession();

  const { data: userData, loading } = useQuery<GetUserResponse>(GET_USER, {
    variables: { email: sessionData?.user?.email },
    skip: !sessionData?.user?.email,
  });
  // console.log(sessionData?.user);

  return (
    <header className="px-5 md:px-10 py-8 md:py-3 text-lg z-50 sticky inset-0 flex-center text-white bg-[#3b58de]">
      <nav className="flex-center-between w-full">
        <div>
          <Link
            href="/"
            className="flex-center gap-x-2"
          >
            {/* <AcmeLogo /> */}
            <h3 className="text-base xl:text-lg 2xl:text-2xl font-Inter italic font-bold tracking-widest">
              Rezolvate
            </h3>
          </Link>
        </div>

        <div className="flex-center gap-x-3.5 xl:gap-x-5">
          <ul className="gap-x-1 lg:!flex items-center hidden">
            {navLinks2.map((menu, idx) => (
              <DesktopMenu key={idx} menu={menu} />
            ))}
          </ul>
          <AuthSection
            status={status}
            userData={userData}
            loading={loading}
          />
          <div className="md:ml-4 flex items-center">
            <div className="lg:!hidden ml-2">
              <MobMenu Menus={navLinks2} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar2;
