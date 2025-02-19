"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { communityServices } from "@/constants/Data";
import { useRef } from "react";
import Slider from "react-slick";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import { motion } from "framer-motion";

const Search = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
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
        <p className="font-Lorin text-lg md:text-xl">
          Explore our suite of products to see how you can simplify, automate
          and accelerate your Legal processes.
        </p>
      </div>
      <div className="slider-container h-fit">
        <Slider {...settings} className="custom-slider_1">
          {communityServices.map((item, idx) => (
            <Card
              key={idx}
              className=" relative bg-[#3b58de] w-full h-[510px] sm:h-[500px] xl:h-[480px] mx-auto hover:scale-105 hover:bg-[#3b58de]/90 cursor-pointer"
            >
              <div className="w-full ">
                <video
                  ref={videoRef}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain object-center"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                </video>
              </div>
              <CardHeader className="pb-1 pt-4  flex-col gap-2 items-start  py-4 px-6">
                <h4 className="text-xl text-white xl:text-2xl font-Archivo font-medium ">
                  {item.title}
                </h4>
                {/* <p className="text-lg text-white text-opacity-70 font-Lorin font-medium">
                                    {item.desc}
                                </p> */}
              </CardHeader>
              <CardBody className="overflow-visible gap-5 justify-center  py-4 px-6">
                <ul className="text-lg px-4 font-medium space-y-1.5 list-disc font-Lorin list-outside text-white z-10">
                  {item.services.map((list, id) => (
                    <div key={id}>
                      <li className="list-none text-success font-semibold">
                        {list.country}
                      </li>
                      <a href={list.href} className="text-default font-light">
                        {list.lists}
                      </a>
                    </div>
                  ))}
                </ul>
              </CardBody>
              <CardFooter className="flex-row justify-between sm:justify-start gap-5 items-center sm:items-start lg:items-center sm:flex-col lg:flex-row lg:justify-between">
                <motion.div
                  className="absolute size-44 md:size-48 -bottom-3 right-0"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }} // Slower pulse (3s)
                >
                  <Image fill alt="icon" src={"/Ellipse2.svg"} />
                </motion.div>
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
      className={`absolute -top-[45px] lg:-top-[105px] xl:-top-[88px] right-20 xl:right-12 cursor-pointer`}
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
      className={`absolute cursor-pointer -top-[45px] right-10 xl:right-5 lg:-top-[105px] xl:-top-[88px] z-30`}
      onClick={onClick}
    >
      <MdArrowForwardIos className="text-3xl hover:text-primary text-secondary" />
    </div>
  );
}
