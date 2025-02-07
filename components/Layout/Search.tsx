// import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody } from "@heroui/card";
// import { IoSearch } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import Image from "next/image";
import { communityServices } from "@/constants/Data";

const Search = () => {
    return (
        <section className="padding w-full bg-[#F1F2F5] space-y-10">
            {/* <div className=" rounded-xl p-10 w-full h-full"> */}
            <div className="block space-y-2">
                <h4 className="font-Archivo text-2xl font-semibold md:text-3xl xl:text-4xl">Explore our suite of products</h4>
                <p className="font-Lorin">Explore our suite of products to see how you can simplify, automate and accelerate your Legal processes.</p>
            </div>
            {/* <Input
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
            /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-5 xl:gap-10 w-full">
                {communityServices.map((item, idx) => (
                    <Card
                        key={idx}
                        className={`py-4 px-4 text-white bg-primary mx-auto w-full h-full md:h-80 lg:h-72 ${idx === 3 ? "lg:col-span-2" : ""}`}
                    >
                        <CardHeader className="pb-3 pt-2 flex-col items-start">
                            <div className="flex flex-col">
                                <h4 className="text-base md:text-lg font-Archivo font-bold tracking-wider">
                                    {item.title}
                                </h4>
                                <div className="absolute size-24 rotate-[4rad] -top-10 -right-10 md:size-36 md:rotate-[4rad] md:-top-16 md:-right-14">
                                    <Image fill alt="icon" src={"/circle-icon-1.svg"} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-visible gap-5 py-2">
                            <ul className="space-y-4">
                                {item.services.map((service, id) => (
                                    <li
                                        key={id}
                                        className="font-Lorin text-sm block space-y-1.5 md:text-base border-b-2 border-white"
                                    >
                                        {service.country !== "" && (
                                            <h4
                                                className="w-full flex justify-between items-center pb-2"
                                            >
                                                {service.country} <span><RiArrowDownSLine className="text-lg md:text-xl" /></span>
                                            </h4>
                                        )}
                                        {service?.lists !== "" && (
                                            <p className="text-xs pb-2 font-Lorin font-medium">
                                                {service?.lists}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                ))}
            </div>
            {/* </div> */}
        </section>
    );
};

export default Search;

