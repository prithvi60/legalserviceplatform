import Image from "next/image";
import React from "react";

const MissionAndVision = () => {
    return (
        <section className="block space-y-5">
            <div className="padding w-full h-full flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
                <div className="w-[200px] h-[200px] md:w-[480px] md:h-[480px] basis-full md:basis-2/5 overflow-hidden relative z-0">
                    <Image
                        priority
                        className="object-contain object-center"
                        alt="bg image"
                        src={"/badge.png"}
                        fill
                    />
                </div>
                <div className="block space-y-5 md:space-y-10 w-full md:w-3/5">
                    <h2 className="font-Archivo text-start md:text-center font-bold tracking-wider text-3xl md:text-5xl xl:text-7xl">
                        Mission
                    </h2>
                    <ul className="block space-y-3 list-disc list-outside">
                        {MissionAndVisionList[0].list.map((list, idx) => (
                            <li
                                key={idx}
                                className="font-Lorin font-medium text-lg md:text-xl"
                            >
                                {list}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="padding w-full linear-blue_1 h-full flex items-center relative linear-yellow_2 flex-col md:flex-row overflow-hidden gap-5">
                <div className="block space-y-5 md:space-y-10 w-full md:w-3/5">
                    <h2 className="font-Archivo text-start md:text-center font-bold tracking-wider text-3xl md:text-5xl xl:text-7xl">
                        Vision
                    </h2>
                    <ul className="block space-y-3 list-disc list-outside">
                        {MissionAndVisionList[1].list.map((list, idx) => (
                            <li
                                key={idx}
                                className="font-Lorin font-medium text-lg md:text-xl"
                            >
                                {list}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-[200px] h-[200px] md:w-[480px] md:h-[480px] basis-full md:basis-2/5 overflow-hidden relative z-0">
                    <Image
                        priority
                        className="object-contain object-center"
                        alt="bg image"
                        src={"/bulb.png"}
                        fill
                    />
                </div>
            </div>
        </section>
    );
};

export default MissionAndVision;

const MissionAndVisionList = [
    {
        list: [
            "Deliver innovation and high-quality furnace, analytical instruments, laboratory equipment, and material processing equipment",
            "Exceed customer expectations through excellence in engineering and unparalleled technical expertise",
            "Provide dedicated customer service and tailored turnkey solutions",
            "Support the diverse needs of clients, fostering advancements in research, industry, and education",
        ],
    },
    {
        list: [
            "Deliver innovation and high-quality furnace, analytical instruments, laboratory equipment, and material processing equipment",
            "Exceed customer expectations through excellence in engineering and unparalleled technical expertise",
            "Provide dedicated customer service and tailored turnkey solutions",
            "Support the diverse needs of clients, fostering advancements in research, industry, and education",
        ],
    },
];
