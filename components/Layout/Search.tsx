"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { communityServices } from "@/constants/Data";
import { useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
const Search = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
        },
      },
    ],
  };
  return (
    <section className="padding w-full bg-[#F1F2F5] space-y-10">
      {/* <div className=" rounded-xl p-10 w-full h-full"> */}
      <div className="block space-y-2">
        <h4 className="font-Archivo text-2xl font-semibold md:text-3xl xl:text-4xl">
          Explore our suite of products
        </h4>
        <p className="font-Lorin">
          Explore our suite of products to see how you can simplify, automate
          and accelerate your Legal processes.
        </p>
      </div>
      {/* <div className="grid grid-cols-3 place-content-center place-items-center gap-5 xl:gap-10 w-full">
                {communityServices.map((item, idx) => (
                    <Card
                        key={idx}
                        className={`py-6 px-5 md:px-10 linear-blue_1 text-white mx-auto w-full h-full col-span-5 `}
                    >
                        <CardBody className="overflow-visible lg:flex-row gap-10 lg:gap-5 py-2">
                            <div className="block space-y-4 w-full md:w-2/5">
                                <h4 className="text-2xl md:text-3xl font-Archivo font-bold tracking-wider">
                                    {item.title}
                                </h4>
                                <ul className="space-y-4">
                                    {item.services.map((service, id) => (
                                        <li
                                            key={id}
                                            className="font-Lorin text-sm block md:text-base border-b-2 border-white"
                                        >
                                            <Link href={service.href} className="space-y-1.5">
                                                {service.country !== "" && (
                                                    <h4
                                                        className="w-full flex justify-between items-center pb-2"
                                                    >
                                                        {service.country}
                                                    </h4>
                                                )}
                                                {service?.lists !== "" && (
                                                    <p className="text-xs pb-2 font-Lorin font-medium">
                                                        {service?.lists}
                                                    </p>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full ">
                                <video
                                    ref={videoRef}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    className="h-full md:h-[330px] w-full object-contain xl:object-cover object-center"
                                >
                                    <source src="/demo.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div> */}
      <div className="slider-container">
        <Slider {...settings} className="custom-slider">
          {communityServices.map((item, idx) => (
            <Card
              key={idx}
              className=" relative bg-[#FFC10733] w-full mx-auto md:w-[450px] hover:scale-110"
            >
              <div className="w-full ">
                <video
                  ref={videoRef}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="h-full md:h-[330px] w-full object-contain xl:object-cover object-center"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                </video>
              </div>
              <CardHeader className="pb-3 pt-2 px-4 flex-col gap-2 items-start">
                <h4 className="text-xl text-black text-opacity-80 xl:text-2xl font-Archivo font-semibold tracking-wider">
                  {item.title}
                </h4>
                {/* <p className="text-sm text-black text-opacity-70 font-Lorin font-medium">
                                    {item.desc}
                                </p> */}
              </CardHeader>
              <CardBody className="overflow-visible gap-5 justify-center py-2">
                <ul className="text-sm px-4 font-light space-y-1.5 list-disc font-Lorin list-outside text-black text-opacity-70 z-10">
                  {item.services.map((list, id) => (

                    <div key={id}>

                        <li >{list.country}</li>
                        <a href={list.href}>{list.lists}</a>
                    </div>
                  ))}
                </ul>
              </CardBody>
              <CardFooter className="flex-row justify-between sm:justify-start gap-5 items-center sm:items-start lg:items-center sm:flex-col lg:flex-row lg:justify-between">
                {/* <h4 className="text-base md:text-lg w-3/5 xl:text-xl font-Inter font-semibold tracking-wider text-black text-opacity-80">
                                    {item.footerName}
                                </h4> */}
                {/* <CalendlyComponent text={item.btnName} url="https://calendly.com/prithvi-webibee/general" /> */}
                <div className="absolute size-44 md:size-48 -bottom-3 right-0">
                  <Image fill alt="icon" src={"/Ellipse.svg"} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </Slider>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Search;

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
