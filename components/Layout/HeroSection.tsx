"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import OurClients from "./OurClients";
import { motion } from "framer-motion";

// Animation Variants
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: index * 0.3 },
  }),
};

const HeroSection = () => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative w-full h-screen text-white linear-blue_1">
        <div className="padding flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
          <div className="block space-y-4 w-full md:w-3/5">
            {/* Staggered Text Reveal */}
            <motion.h2
              className="font-Archivo font-bold tracking-wide text-3xl md:text-5xl xl:text-7xl"
              variants={textVariant}
              initial="hidden"
              animate="visible"
              custom={0} // First element
            >
              <span className="text-success mr-3">Simplify</span>Legal, Tax & Compliance
            </motion.h2>

            <motion.h5
              className="font-Lorin ml-1 font-medium tracking-wide text-lg md:text-3xl"
              variants={textVariant}
              initial="hidden"
              animate="visible"
              custom={1} // Second element
            >
              Get Expert Help Instantly
            </motion.h5>
          </div>

          {/* Image */}
          <motion.div className="w-[360px] md:w-[450px] h-[250px] md:h-[350px] 2xl:h-[450px] md:basis-2/5 overflow-hidden relative z-0"
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true,amount:0 }}
                custom={2} // Third element
          >
            <Image
              priority
              unoptimized
              className="object-contain object-center"
              alt="bg image"
              src={"/hero-gif-2.gif"}
              fill
            />
          </motion.div>
        </div>
        <motion.div
            className="absolute bottom-24 md:bottom-12 flex justify-center w-full"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2} // Third element
          >
        <OurClients />
        </motion.div>
      </section>

      {/* Trusted Section */}
      <section className="padding bg-white w-full h-full flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
        <div className="block space-y-4 w-full md:w-3/5">
          {/* Trusted by Businesses */}
          <motion.h2
            className="font-Inter font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2} // Third element
          >
            India&apos;s Top-Rated Professional Services Platform
          </motion.h2>

          <motion.h5
            className="font-Lorin text-secondary ml-1 font-medium tracking-wide text-lg md:text-xl"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3} // Fourth element
          >
            Trusted by businesses across India!
          </motion.h5>
        </div>

        {/* Star Rating Section */}
        <motion.div
          className="font-Inter flex flex-col md:flex-row md:items-center gap-3 md:gap-10 text-base md:text-xl w-full md:w-2/5"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4} // Fifth element
        >
          <h4 className="flex text-3xl text-primary font-bold items-center gap-3">
            <motion.div
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={5} // Sixth element
            >
              {/* <FaStar className="text-warning mx-2 text-2xl md:text-4xl xl:text-6xl" /> */}
              <Image
              alt="bg image"
              src={"/gifs/star.gif"}
              width={100}
              height={100}
            />
            </motion.div>
            4.5/5
          </h4>
          <motion.p
            className="font-normal tracking-wide text-sm"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6} // Seventh element
          >
            (17K + Reviews)
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
