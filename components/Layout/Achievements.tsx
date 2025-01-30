import Image from "next/image";
import React from "react";

const Achievements = () => {
    return (
        <section className="padding w-full h-full bg-gradient-to-t from-[#1E318D] to-[#FFFBEE] flex items-center flex-col md:flex-row overflow-hidden  gap-5">
            <div className="block space-y-4 w-full md:w-3/5 text-center md:text-start">
                <h2 className="font-Archivo font-bold tracking-wide text-xl md:text-2xl xl:text-4xl">
                    Helping a local{" "}
                    <span className="text-white">business reinvent itself</span>
                </h2>
                <p className="text-sm md:text-base font-Inter">
                    We reached here with our hard work and dedication
                </p>
            </div>
            <div className="basis-full grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 md:basis-2/5">
                {achievementsList.map((list, id) => (
                    <div key={id} className="flex gap-4">
                        <div className="size-10 md:size-12 overflow-hidden relative">
                            <Image
                                priority
                                className="object-contain object-center"
                                alt="icon"
                                src={list.icon}
                                fill
                            />
                        </div>
                        <div>
                            <h5 className="text-xl font-Inter font-bold md:text-2xl">
                                {list.count}
                            </h5>
                            <p className="text-sm font-Inter tracking-wide capitalize">
                                {list.countName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;

const achievementsList = [
    { icon: "/achievementIcon-1.svg", count: "2,245,341", countName: "Members" },
    { icon: "/achievementIcon-2.svg", count: "46,328", countName: "Clubs" },
    {
        icon: "/achievementIcon-3.svg",
        count: "828,867",
        countName: "Event Bookings",
    },
    { icon: "/achievementIcon-4.svg", count: "1,926,436", countName: "Payments" },
];
