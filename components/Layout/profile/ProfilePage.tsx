"use client";
import { GET_BUSINESS_FORMS, GET_USER } from "@/constants/Queries";
import { GetBFResponse, GetUserResponse } from "@/types/Types";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";
import RecentActivity from "./RecentActivity";
import MyDocs from "./MyDocs";
import { Avatar } from "@heroui/avatar";
import { FaEnvelope } from "react-icons/fa6";
import { Button } from "@heroui/button";
import ProfileEditForm from "./ProfileEditForm";
import { Spinner } from "@heroui/spinner";

const ProfilePage = () => {
    const { data: sessionData } = useSession();
    const { data: RoleBased, loading } = useQuery<GetUserResponse>(GET_USER, {
        variables: { email: sessionData?.user?.email },
    });
    const userId = RoleBased?.getUser?.id;
    const { data: GetDocType, loading: getDocLoading } = useQuery<GetBFResponse>(
        GET_BUSINESS_FORMS,
        {
            variables: { userId, DocType: "BC", orderBy: { DocNumber: "desc" } },
        }
    );
    // console.log(GetDocType?.getBusinessForms);

    const filteredDataOfRA = GetDocType?.getBusinessForms.filter(
        (doc) => doc.status === "IsPending"
    );
    const filteredDataOfMD = GetDocType?.getBusinessForms.filter(
        (doc) => doc.status === "IsComplete"
    );

    if (loading || getDocLoading)
        return (
            <div className="w-full padding h-[80vh] flex justify-center items-center">
                <Spinner
                    size="lg"
                    classNames={{
                        label:
                            "animate-pulse text-base md:text-2xl font-archivo font-semibold tracking-wider",
                    }}
                    color="primary"
                    labelColor="primary"
                    label="Loading..."
                />
            </div>
        );

    return (
        <section className="w-full rounded-lg bg-white h-full overflow-hidden">
            <div className="w-full linear-blue_1 h-24" />
            <div className="block space-y-20 px-7 md:px-14 py-10 ">
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 md:justify-between">
                        <div className="flex items-center gap-5">
                            <Avatar
                                className="w-20 h-20"
                                color="success"
                                isBordered
                                src="/profile.png"
                            />
                            <div className="block space-y-1">
                                <h5 className="font-Archivo font-medium tracking-wider text-lg md:text-xl">
                                    {RoleBased?.getUser?.username}
                                </h5>
                                <p className="text-lg md:text-xl font-Lorin opacity-60">
                                    {RoleBased?.getUser?.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div className="space-y-2">
                                <h5 className="text-lg font-Lorin tracking-wider">
                                    Subscription Status
                                </h5>
                                <div className="flex items-center gap-5">
                                    <Avatar
                                        className="w-10 h-10"
                                        classNames={{
                                            base: "bg-[#1E318D] bg-opacity-10",
                                            icon: "text-black/80",
                                        }}
                                        icon={<FaEnvelope className="text-lg text-primary" />}
                                    />
                                    <div className="block space-y-0.5">
                                        <h5 className="font-Lorin font-normal tracking-wider text-base">
                                            Free Plan
                                        </h5>
                                        <p className="text-lg md:text-xl font-Lorin opacity-60">
                                            1 month ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button
                                className="font-Archivo hidden lg:block text-primary font-medium bg-success "
                                size="lg"
                            >
                                {"Upgrade plan now  >"}
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex justify-start md:justify-center items-center lg:hidden">
                        <Button
                            className="font-Archivo text-primary font-medium bg-[#1E318D] bg-opacity-10"
                            size="lg"
                        >
                            {"Upgrade plan now  >"}
                        </Button>
                    </div>
                </div>
                <RecentActivity data={filteredDataOfRA ?? []} />
                <MyDocs data={filteredDataOfMD ?? []} />
                <ProfileEditForm />
            </div>
        </section>
    );
};

export default ProfilePage;

{
    /* <p className="font-Archivo font-base md:text-xl text-center font-medium">
                            Currently, no pending document form is available.
                        </p> */
}
