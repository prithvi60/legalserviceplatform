import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import CalendlyComponent from "../Layout/CalendlyComponent";

interface Lists {
    title: string
    summary: string
    img: string
    alt: string
    lists: string[],
    href: string,
    url: string
}

export const CardComponent = ({ data }: { data: Lists }) => {
    return (
        <Card className="linear-blue_1 overflow-hidden border-2 border-primary max-w-80 mx-auto md:max-w-96">
            <CardHeader className="!p-0 flex-col gap-2 items-start">
                <div className="relative overflow-hidden w-full h-72 md:h-80">
                    <Image
                        alt={data.alt}
                        className="object-cover"
                        src={data.img}
                        fill
                    />
                </div>
            </CardHeader>
            <CardBody className="overflow-visible text-white gap-5 justify-center py-4 px-6">
                <div>
                    <h4 className="text-lg md:text-xl font-Archivo font-medium tracking-wider">
                        {data.title}
                    </h4>
                    <p className="text-sm font-Lorin">{data.summary}</p>
                </div>
                <ul className="space-y-4">
                    {data.lists.map((list, id) => (
                        <li
                            key={id}
                            className="font-Lorin text-white text-sm flex justify-between items-center md:text-base"
                        >
                            <Link
                                href={"#"}
                                className="w-4/5 border-white"
                            >
                                <h4 className="underline underline-offset-8">{list}</h4>
                            </Link>
                        </li>
                    ))}
                </ul>
            </CardBody>
            <CardFooter className="py-4 px-6">
                <CalendlyComponent text='Book Now' url={data.url} />
                <div className="absolute size-72 -bottom-48 -right-36">
                    <Image fill alt="icon" src={"/circle-icon-1.svg"} />
                </div>
            </CardFooter>
        </Card>
    )
}
