import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDownSLine } from "react-icons/ri";
import CalendlyComponent from "./CalendlyComponent";

const Consultants = () => {
    return (
        <section className="padding w-full space-y-12">
            <h3 className="font-Archivo text-3xl tracking-wider font-semibold text-center md:text-5xl xl:text-6xl text-secondary">
                Scholarly work by our panel of Consultants
            </h3>
            <div className="flex flex-col md:flex-row justify-center md:flex-wrap xl:flex-nowrap gap-4">
                {consultantLists.map((item, idx) => (
                    <Card key={idx} className="linear-blue_1 border-2 border-primary max-w-80 mx-auto md:max-w-96">
                        {/* <CardHeader className="pb-0 pt-2 px-4 flex-col gap-2 items-start">
                            <h4 className="text-lg font-Archivo font-bold tracking-wider">
                                {item.title}
                            </h4>
                            <p className="text-base font-Lorin font-medium">{item.summary}</p>
                        </CardHeader> */}
                        <div className="relative overflow-hidden w-full h-72">
                            <Image
                                alt={item.alt}
                                className="object-cover"
                                src={item.img}
                                fill
                            />
                        </div>
                        <CardBody className="overflow-visible text-white gap-5 justify-center py-4 px-6">
                            <h4 className="text-lg font-Archivo font-bold tracking-wider">
                                {item.title}
                            </h4>
                            <p className="text-base font-Lorin font-medium">{item.summary}</p>
                            <ul className="space-y-4">
                                {item.lists.map((list, id) => (
                                    <li
                                        key={id}
                                        className="font-Lorin text-white text-sm flex justify-between items-center md:text-base"
                                    >
                                        <Link
                                            href={"#"}
                                            className="w-4/5 pb-2 border-b-2 border-white"
                                        >
                                            <h4 className="underline underline-offset-4">{list}</h4>
                                        </Link>
                                        <RiArrowDownSLine className="text-white text-lg md:text-xl" />
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                        <CardFooter className="justify-center items-center">
                            <CalendlyComponent text='Book Now' />
                            {/* <Button
                                color="warning"
                                radius="md"
                                size="lg"
                                className="font-Inter"
                            >
                                Book Now
                            </Button> */}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Consultants;

const consultantLists = [
    {
        title: "SJ Anakha",
        summary: "Solves check bouce, money recovery & DRT",
        img: "/advocate.png",
        alt: "consultant image",
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        href: "#",
    },
    {
        title: "SJ Anakha",
        summary: "Solves check bouce, money recovery & DRT",
        img: "/advocate.png",
        alt: "consultant image",
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        href: "#",
    },
    {
        title: "SJ Anakha",
        summary: "Solves check bouce, money recovery & DRT",
        img: "/advocate.png",
        alt: "consultant image",
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        href: "#",
    },
];
