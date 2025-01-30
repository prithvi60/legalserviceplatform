import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { IoSearch } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

const Search = () => {
    return (
        <section className="padding w-full space-y-10 bg-white">
            <Input
                isRequired
                variant="bordered"
                startContent={
                    <button type="submit" className="bg-transparent cursor-pointer">
                        <IoSearch className="text-2xl text-[#666666] pointer-events-none flex-shrink-0" />
                    </button>
                }
                radius="full"
                labelPlacement="outside"
                color="secondary"
                // errorMessage="Please enter a valid email"
                placeholder="Search..."
                type="text"
                classNames={{
                    input: "placeholder:!text-[#666666] !text-black",
                    innerWrapper: "bg-transparent",
                    inputWrapper:
                        "!bg-transparent !border-[#585757CC] data-[hover=true]:!bg-white/10 group-data-[focus=true]:!bg-white/10 group-data-[focus=true]:!text-black !cursor-text",
                    helperWrapper: "!text-[#f26161]",
                    errorMessage: "!text-[#f26161]",
                }}
                className="bg-transparent rounded-lg text-black"
            />
            <div className="flex mx-auto items-center no_scrollbar gap-5 xl:gap-10 w-full overflow-x-scroll">
                {communityServices.map((item, idx) => (
                    <Card
                        key={idx}
                        className="py-4 px-4 text-white bg-primary min-w-64 mx-auto md:min-w-80"
                    >
                        <CardHeader className="pb-3 pt-2 flex-col items-start">
                            <div className="flex flex-col">
                                <h4 className="text-base md:text-lg font-Archivo font-bold tracking-wider">
                                    {item.title}
                                </h4>
                                <p className="text-sm font-Lorin font-medium">
                                    {item.price}
                                </p>
                                <div className="absolute size-24 rotate-[4rad] -top-10 -right-10 md:size-36 md:rotate-[4rad] md:-top-16 md:-right-14">
                                    <Image fill alt="icon" src={"/circle-icon-1.svg"} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-visible gap-5 justify-center py-2">
                            <ul className="space-y-4">
                                {item.lists.map((list, id) => (
                                    <li
                                        key={id}
                                        className="font-Lorin text-sm flex justify-between items-center md:text-base"
                                    >
                                        <Link
                                            href={"#"}
                                            className="w-4/5 pb-2 border-b-2 border-white"
                                        >
                                            <h4>{list}</h4>
                                        </Link>
                                        <RiArrowDownSLine className="text-lg md:text-xl" />
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Search;

const communityServices = [
    {
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        title: "Register your company",
        price: "Starting from ₹999/-",
    },
    {
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        title: "Register your company",
        price: "Starting from ₹999/-",
    },
    {
        lists: [
            "Private limited company",
            "Limited liability",
            "Private limited company",
            "Limited liability",
        ],
        title: "Register your company",
        price: "Starting from ₹999/-",
    },
];
