import Image from "next/image";
import React from "react";
import { MarqueeEffect } from "../UI/MarqueeEffect";


interface LogoItem {
    img: string;
    alt: string;
}

const OurClients = () => {
    return (
        <section className="padding !pt-0 !pb-4 md:!pb-8 w-full bg-warning space-y-7 md:space-y-14">
            <div className="w-full">
                <div className="flex relative justify-center items-center gap-2 sm:gap-6">
                    <div className="w-32 h-20 md:w-48 md:h-28 overflow-hidden relative">
                        <Image
                            fill
                            src={"/dart_board.png"}
                            alt="icon"
                            className="object-contain object-center"
                        />
                    </div>
                    <h4 className="font-Archivo tracking-wider text-2xl sm:text-3xl">Our Clients</h4>
                </div>
                <p className="text-base text-center font-Lorin">
                    We have been working with some Fortune 500+ clients
                </p>
            </div>
            {/* <div className='flex justify-center items-center gap-8 w-full h-full'>
                {clientsLogo.map((item, idx) => (
                    <div key={idx} className='size-20 overflow-hidden relative'>
                        <Image fill src={item.img} alt={item.alt} className='object-contain object-center' />
                    </div>
                ))}
            </div> */}
            <MarqueeEffect data={clientsLogo} />
        </section>
    );
};

export default OurClients;

const clientsLogo: LogoItem[] = [
    { img: "/client-icon.svg", alt: "icon" },
    { img: "/client-icon.svg", alt: "icon" },
    { img: "/client-icon.svg", alt: "icon" },
    { img: "/client-icon.svg", alt: "icon" },
];
