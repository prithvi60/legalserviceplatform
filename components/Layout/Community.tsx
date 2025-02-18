"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import { motion } from "framer-motion";

interface CommunityList {
  icon: string;
  alt: string;
  href: string;
  title: string;
  lists?: string[];
  summary?: string;
}

const Community = ({
  mainTitle,
  desc,
  data,
  type,
}: {
  mainTitle: string;
  desc?: string;
  data: CommunityList[];
  type: string;
}) => {
  return (
    <section className="padding bg-white w-full space-y-12">
      <div className="block space-y-2">
        <h3 className="font-Archivo text-3xl tracking-wider font-semibold md:text-5xl xl:text-6xl text-secondary">
          {mainTitle}
        </h3>
        <p className="font-Lorin text-lg md:text-xl text-[#717171]">{desc}</p>
      </div>

      {/* Container can also be animated if desired */}
      <div className="flex flex-col md:flex-row justify-center md:flex-wrap text-white gap-5">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3  }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="py-4 px-6 linear-blue_1 w-72 mx-auto md:w-80">
              <CardHeader className="pb-3 pt-2 px-4 flex-col gap-2 items-start">
                <div className="relative overflow-hidden size-14 md:size-20 mx-auto">
                  <Image
                    alt={item.alt}
                    className="object-contain rounded-xl"
                    src={item.icon}
                    fill
                  />
                </div>
              </CardHeader>
              <CardBody className="overflow-visible gap-5 justify-center py-2">
                <h4 className="text-lg md:text-xl text-center font-Archivo font-bold tracking-wider">
                  {item.title}
                </h4>
                {item.lists ? (
                  <ul
                    className={`text-lg mx-auto pl-2 space-y-1.5 list-none font-Lorin font-medium ${
                      type === "true" ? "w-full text-center" : "w-1/2"
                    }`}
                  >
                    {item.lists.map((list, id) => (
                      <li key={id}>{list}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-center font-Lorin font-medium">
                    {item.summary}
                  </p>
                )}
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Community;
