import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

const CustomerFeedback = () => {
    return (
        <section className='padding w-full linear-yellow_1 flex flex-col md:flex-row overflow-hidden gap-5'>
            <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[420px] lg:h-[420px] mx-auto md:basis-2/5 overflow-hidden relative">
                <Image
                    className="object-contain object-center"
                    alt="bg image"
                    src={"/avatar.png"}
                    fill
                    priority
                />
            </div>
            <div className="block space-y-4 md:space-y-6 w-full text-center md:text-start md:w-3/5">
                <p className="text-base text-secondary md:text-lg font-Lorin">
                    Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.
                </p>
                <h2 className="font-Archivo font-bold tracking-wide text-xl md:text-2xl xl:text-4xl">
                    Tim Smith
                </h2>
                <p className="text-base md:text-lg font-Lorin">British Dragon Boat Racing Association</p>
                <div className='flex flex-col md:flex-row justify-center md:justify-start items-center gap-3 mt-5'>
                    <div className='flex items-center gap-3'>
                        <div className='relative bg-white/90 rounded-lg p-2 overflow-hidden size-10'>
                            <Image alt='' src={"/client-Logo 1.svg"} fill className='object-contain object-center' />
                        </div>
                        <div className='relative bg-white/90 rounded-lg p-2 overflow-hidden size-10'>
                            <Image alt='' src={"/client-Logo 2.svg"} fill className='object-contain object-center' />
                        </div>
                        <div className='relative bg-white/90 rounded-lg p-2 overflow-hidden size-10'>
                            <Image alt='' src={"/client-Logo 1.svg"} fill className='object-contain object-center' />
                        </div>
                        <div className='relative bg-white/90 rounded-lg p-2 overflow-hidden size-10'>
                            <Image alt='' src={"/client-Logo 2.svg"} fill className='object-contain object-center' />
                        </div>
                    </div>
                    <Link href={"#"} className='flex font-Inter font-bold items-center gap-3'>
                        Meet all customers
                        <span><FaLongArrowAltRight className='text-base' /></span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CustomerFeedback
