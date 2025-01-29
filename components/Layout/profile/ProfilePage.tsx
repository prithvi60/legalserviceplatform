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
import { LoaderPinwheel } from "lucide-react";


const ProfilePage = () => {
    const { data: sessionData, status } = useSession();
    const { data: RoleBased, loading } = useQuery<GetUserResponse>(GET_USER, {
        variables: { email: sessionData?.user?.email },
    });
    const userId = RoleBased?.getUser?.id;
    const { data: GetDocType, loading: getDocLoading } = useQuery<GetBFResponse>(
        GET_BUSINESS_FORMS,
        {
            variables: { userId, DocType: "NDA", orderBy: { DocNumber: "desc" } },
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
                <LoaderPinwheel className="animate-spin w-32 h-32 text-primary" />
            </div>
            // <p className="w-full padding h-screen flex justify-center items-center text-2xl md:text-4xl font-Lorin font-bold tracking-widest animate-pulse">
            //     Loading...
            // </p>
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
                                color="primary"
                                isBordered
                                src="/avatar.png"
                            />
                            <div className="block space-y-1">
                                <h5 className="font-Archivo font-medium tracking-wider text-lg md:text-xl">
                                    Alexa Rawles
                                </h5>
                                <p className="text-sm md:text-base font-Lorin opacity-60">
                                    alexarawles@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div className="space-y-2">
                                <h5 className="text-lg font-Lorin tracking-wider">Subscription Status</h5>
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
                                        <p className="text-sm md:text-base font-Lorin opacity-60">
                                            1 month ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button className="font-Archivo hidden lg:block text-primary font-medium bg-[#1E318D] bg-opacity-10" size="lg">
                                {"Upgrade plan now  >"}
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex justify-start md:justify-center items-center lg:hidden">
                        <Button className="font-Archivo text-primary font-medium bg-[#1E318D] bg-opacity-10" size="lg">
                            {"Upgrade plan now  >"}
                        </Button>
                    </div>
                </div>
                {status === "unauthenticated" ? (
                    <p className="font-Archivo font-base md:text-lg text-center font-medium">
                        Please sign in to view your profile.
                    </p>
                ) : (
                    <>
                        <RecentActivity data={filteredDataOfRA ?? []} />
                        <MyDocs data={filteredDataOfMD ?? []} />
                    </>
                )}
            </div>
        </section>
    );
};

export default ProfilePage;

{
    /* <p className="font-Archivo font-base md:text-lg text-center font-medium">
                          Currently, no pending document form is available.
                      </p> */
}
