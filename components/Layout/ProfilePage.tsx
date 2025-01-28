"use client";
import { GET_BUSINESS_FORM, GET_USER } from "@/constants/Queries";
import { GetBFResponse, GetUserResponse } from "@/types/Types";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ProfilePage = ({ url }: { url: string }) => {
    const { data: sessionData, status } = useSession();
    const { data: RoleBased, loading } = useQuery<GetUserResponse>(GET_USER, {
        variables: { email: sessionData?.user?.email },
    });
    const userId = RoleBased?.getUser?.id;
    const { data: GetDocType, loading: getDocLoading } = useQuery<GetBFResponse>(GET_BUSINESS_FORM, {
        variables: { userId, DocType: "NDA", orderBy: { DocNumber: "desc" } },
    });
    console.log(GetDocType?.getBusinessForms?.[0]);

    if (loading || getDocLoading)
        return (
            <p className="w-full padding h-[80vh] flex justify-center items-center text-2xl md:text-4xl font-Lorin font-bold tracking-widest animate-pulse">
                Loading...
            </p>
        );

    return (
        <section className="padding w-full h-[80vh] flex-col gap-10 flex justify-center items-center">
            <h1 className="text-xl md:text-3xl text-center font-Archivo tracking-wider font-semibold text-primary">
                User Profile
            </h1>
            {status === "unauthenticated" ? (
                <p className="font-Archivo font-base md:text-lg text-center font-medium">
                    Please sign in to view your profile.
                </p>
            ) : (<>
                {GetDocType?.getBusinessForms?.[0] ? (
                    <Link
                        href={url}
                        className="px-4 py-2 font-Lorin font-medium bg-warning text-white rounded-sm"
                    >
                        Resume Business Contract
                    </Link>
                ) : (
                    <p className="font-Archivo font-base md:text-lg text-center font-medium">
                        Currently, no pending document form is available.
                    </p>
                )}
            </>)}

        </section>
    );
};

export default ProfilePage;
