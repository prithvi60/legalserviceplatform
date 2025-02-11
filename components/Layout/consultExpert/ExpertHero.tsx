import Image from "next/image";
import React from "react";
import ExpertContactForm from "./ExpertContactForm";
import CalendlyComponent from "../CalendlyComponent";

const ExpertHero = ({ categories }: { categories: string }) => {
    return (
        <section className="padding w-full h-full flex relative flex-col lg:flex-row overflow-hidden gap-8 xl:gap-5">
            <div className="block space-y-4 w-full md:w-1/2 lg:w-3/5">
                <h2 className="font-Archivo font-bold tracking-wide text-3xl md:text-5xl xl:text-7xl">
                    Online Lawyer Consultation
                </h2>
                <p className="text-base w-full md:w-4/5 text-[#717171] lg:text-lg font-Lorin">
                    At Vakilsearch, we take care of Accounting, Business, Compliance, and
                    handle end-to-end solutions.
                </p>
                <CalendlyComponent
                    text="Book Now"
                    url={`${categories === "lawyers"
                        ? "https://calendly.com/prithvi-webibee/ritu"
                        : "https://calendly.com/prithvi-webibee/prithvi "
                        }`}
                />
                <ul className="block space-y-3 text-[#717171] w-full lg:w-3/4">
                    {expertContentList.map((list, idx) => (
                        <li
                            key={idx}
                            className="font-Lorin flex items-center gap-5 font-medium text-base md:text-lg"
                        >
                            <div className="size-8 flex-shrink-0 overflow-hidden relative z-0">
                                <Image
                                    priority
                                    className="object-contain object-center"
                                    alt="bg image"
                                    src={"/expert-icon.png"}
                                    fill
                                />
                            </div>
                            <p>{list}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5">
                <ExpertContactForm />
            </div>
        </section>
    );
};

export default ExpertHero;

const expertContentList = [
    "Affordable legal solutions from expert lawyers. Full litigation, documentation and support",
    "Guaranteed satisfaction or your money back",
    "Affordable legal solutions from expert lawyers. Full litigation, documentation and support",
    "Guaranteed satisfaction or your money back",
];
