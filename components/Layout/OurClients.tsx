import Image from "next/image";
import React from "react";
import { MarqueeEffect } from "../UI/MarqueeEffect";


interface LogoItem {
    img: string;
    alt: string;
}

const OurClients = () => {
    return (
        <section className="absolute bottom-8 w-full  ">
            <div className="w-full">
                <div className="flex relative justify-center items-center gap-2 sm:gap-6">
                    {/* <div className="w-32 h-20 md:w-48 md:h-28 overflow-hidden relative mb-8">
                        <Image
                            fill
                            src={"/dart_board.png"}
                            alt="icon"
                            className="object-contain object-center"
                        />
                    </div> */}
                    <h4 className="font-Archivo tracking-wider text-2xl sm:text-3xl mb-8">Trusted By</h4>
                </div>
            
            <MarqueeEffect data={clientsLogo} />
            </div>
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
