// import Image from "next/image";
import React from "react";
import { MarqueeEffect } from "../UI/MarqueeEffect";


interface LogoItem {
    img: string;
    alt: string;
}

const OurClients = () => {
    return (
        <section className="absolute -bottom-8 md:bottom-8 w-full">
            <div className="w-full space-y-2 md:space-y-5">
                <h4 className="font-Archivo text-center tracking-wider text-xl md:text-2xl lg:text-3xl mb-8">Trusted By</h4>
                {/* <div className="flex relative justify-center items-center gap-2 sm:gap-6">
                </div> */}

                <MarqueeEffect data={clientsLogo} />
            </div>
        </section>
    );
};

export default OurClients;

const clientsLogo: LogoItem[] = [
    { img: "/clientlogo-1.svg", alt: "icon" },
    { img: "/clientlogo-2.svg", alt: "icon" },
    { img: "/clientlogo-3.svg", alt: "icon" },
    { img: "/clientlogo-4.svg", alt: "icon" },
]