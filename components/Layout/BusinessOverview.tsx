import { businessOverviews } from "@/constants/Data";
import React from "react";
import CalendlyComponent from "./CalendlyComponent";
import Image from "next/image";

const BusinessOverview = () => {
  return (
    <section className="padding w-full bg-white h-full space-y-10">
        <div className="flex justify-between">
      <h2 className="flex font-Archivo w-full lg:w-4/5 font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-secondary">
        Complete Business Overview - All in One Place

      </h2>
              <CalendlyComponent
              text={"Get a Demo"}
              url="https://calendly.com/prithvi-webibee/general"
            />
      </div>
      <p className="font-Inter font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-primary">
        Run Your Business with Confidence – Let Rezolvate Handle the Rest!
      </p>
      <div className="block space-y-10">
        {businessOverviews.map((list, idx) => (
          <div
            key={idx}
            className="relative flex items-center gap-10 p-5 bg-[#F1F2F5] rounded-lg"
          >
            {/* <div>{list.icon}</div> */}
            <div className="relative overflow-hidden size-14 md:size-20">
                  <Image
                    alt={list.title}
                    className="object-contain rounded-xl"
                    src={list.icon}
                    fill
                  />
                </div>
            <div className=" block space-y-1.5">
              <h4 className="font-Archivo tracking-wide text-secondary text-opacity-80 font-semibold text-xl md:text-2xl xl:text-3xl">
                {list.title}
              </h4>
              <p className="text-secondary  text-lg md:text-xl text-opacity-60 font-Lorin">
                {list.desc}
              </p>
            </div>
            <div className="absolute right-8">
            {/* <CalendlyComponent
              text={"Get Started"}
              url="https://calendly.com/prithvi-webibee/general"
            /> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessOverview;
