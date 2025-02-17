import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

interface LogoItem {
    img: string;
    alt: string;
}

export const MarqueeEffect = ({ data }: { data: LogoItem[] }) => {
    return (
        <Marquee autoFill speed={50}>
            {data.map((item, idx) => (
                <div key={idx} className="size-10 md:size-14 mx-10 overflow-hidden relative">
                    <Image
                        fill
                        src={item.img}
                        alt={item.alt}
                        className="object-contain object-center"
                    />
                </div>
            ))}
        </Marquee>
    );
};
