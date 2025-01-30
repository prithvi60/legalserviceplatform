import Image from "next/image";
import React from "react";
import CalendlyComponent from "./CalendlyComponent";

const LetsBegin = () => {
    return (
        <section className="padding w-full h-full flex items-center flex-col md:flex-row overflow-hidden gap-5">
            <div className="w-[100px] h-[150px] sm:w-[280px] sm:h-[280px] lg:w-[480px] lg:h-[480px]  md:basis-2/5 overflow-hidden relative">
                <Image
                    className="object-contain object-center"
                    alt="bg image"
                    src={"/trophy.png"}
                    fill
                    priority
                />
            </div>
            <div className="block space-y-6 w-full text-center md:text-start md:w-3/5">
                <h2 className="font-Archivo font-bold tracking-wide text-xl md:text-2xl xl:text-4xl text-secondary">
                    Starting a Business and Confused Where to Begin?
                </h2>
                <p className="text-base text-secondary md:text-lg font-Lorin">
                    At Vakilsearch, we take care of Accounting, Business, Compliance, and
                    handle end-to-end solutions.
                </p>
                <CalendlyComponent text='Get Started' />
                {/* <Button
                    radius="none"
                    size="md"
                    color="warning"
                    className="font-Inter font-medium"
                >
                    Get Started
                </Button> */}
            </div>
        </section>
    );
};

export default LetsBegin;
