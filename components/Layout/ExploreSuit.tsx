"use client"
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import CalendlyComponent from "./CalendlyComponent";
import Slider from "react-slick";
import { exploreSuitLists } from "@/constants/Data";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";


const ExploreSuit = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <section className="padding bg-white w-full space-y-12">
            <div className="block space-y-2">
                <h3 className="font-Archivo text-3xl tracking-wider font-semibold md:text-5xl xl:text-6xl text-secondary">
                    Explore our suite of products
                </h3>
            </div>
            <div className="slider-container">
                <Slider {...settings} className="custom-slider">
                    {exploreSuitLists.map((item, idx) => (
                        <Card
                            key={idx}
                            className="py-4 px-6 relative bg-[#FFC10733] w-full mx-auto md:w-[450px]"
                        >
                            <CardHeader className="pb-3 pt-2 px-4 flex-col gap-2 items-start">
                                <h4 className="text-xl text-black text-opacity-80 xl:text-2xl font-Archivo font-semibold tracking-wider">
                                    {item.mainTitle}
                                </h4>
                                <p className="text-sm text-black text-opacity-70 font-Lorin font-medium">
                                    {item.desc}
                                </p>
                            </CardHeader>
                            <CardBody className="overflow-visible gap-5 justify-center py-2">

                                <ul className="text-sm px-4 font-light space-y-1.5 list-disc font-Lorin list-outside text-black text-opacity-70 z-10">
                                    {item.lists.map((list, id) => (
                                        <li key={id}>{list}</li>
                                    ))}
                                </ul>
                            </CardBody>
                            <CardFooter className="justify-between">
                                <h4 className="text-base md:text-lg w-3/5 xl:text-xl font-Inter font-semibold tracking-wider text-black text-opacity-80">
                                    {item.footerName}
                                </h4>
                                <CalendlyComponent text={item.btnName} />
                                <div className="absolute size-44 md:size-48 -bottom-3 right-0">
                                    <Image fill alt="icon" src={"/Ellipse.svg"} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default ExploreSuit

interface ArrowProps {
    onClick?: () => void;
}

function SampleNextArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
        <div
            className={`absolute -top-[45px] lg:-top-[88px] right-20 xl:right-12 cursor-pointer`}
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
            className={`absolute cursor-pointer -top-[45px] right-10 xl:right-5 lg:-top-[88px] z-30`}
            onClick={onClick}
        >
            <MdArrowForwardIos className="text-3xl hover:text-primary text-secondary" />
        </div>
    );
}