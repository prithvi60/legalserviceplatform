"use client";
import { customerFeedbackLists } from "@/constants/Data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";

const CustomerFeedback = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />,
    };
    return (
        <section className="w-full bg-white space-y-12">
            <div className="px-[40px] py-[20px] md:px-[80px] xl:px-[144px] block space-y-2">
                <h3 className="font-Archivo text-3xl tracking-wider font-semibold md:text-5xl xl:text-6xl text-secondary">
                    Featured in Top News & Media
                </h3>
            </div>
            <div className="padding slider-container bg-[#F8F8FA]">
                <Slider {...settings}>
                    {customerFeedbackLists.map((list, idx) => (
                        <div key={idx} className="w-full !flex flex-col md:flex-row items-center md:gap-5">
                            <div className="w-[200px] h-[200px] sm:w-full sm:h-32 md:basis-2/5 overflow-hidden relative">
                                <Image
                                    className="object-contain object-center"
                                    alt={list.alt}
                                    src={list.img}
                                    fill
                                />
                            </div>
                            <div className="block space-y-4 md:space-y-6 w-full md:w-3/5">
                                <p className="text-base text-secondary font-Lorin">
                                    {list.review}
                                </p>
                                <div className="space-y-2.5">
                                    <h2 className="font-Archivo font-bold tracking-wide text-xl md:text-2xl xl:text-4xl">
                                        {list.reviewer}
                                    </h2>
                                    <div>
                                        <Link
                                            href="#"
                                            className="text-base md:text-lg font-Lorin underline underline-offset-4"
                                        >
                                            Read More in Our Blog
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CustomerFeedback;

interface ArrowProps {
    onClick?: () => void;
}

function SampleNextArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
        <div
            className={`absolute -top-[85px] lg:-top-[178px] right-8 cursor-pointer`}
            onClick={onClick}
        >
            <MdArrowBackIos className="text-3xl hover:text-primary text-secondary" />
        </div>
    );
}

function SamplePrevArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
        <div
            className={`absolute cursor-pointer -top-[85px] right-0 lg:-top-[178px] z-30`}
            onClick={onClick}
        >
            <MdArrowForwardIos className="text-3xl hover:text-primary text-secondary" />
        </div>
    );
}
