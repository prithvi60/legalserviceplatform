import { Button } from '@heroui/button'
import Image from 'next/image'
import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import CalendlyComponent from './CalendlyComponent';

const Information = () => {
    return (
        <section className="padding w-full space-y-6 sm:space-y-12">
            <div className="w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] overflow-hidden mx-auto relative">
                <Image
                    className="object-contain object-center"
                    alt="bg image"
                    src={"/download.png"}
                    fill
                    priority
                />
            </div>
            <h2 className="font-Archivo font-bold text-center tracking-wide text-2xl md:text-4xl xl:text-6xl">
                Access Legal Advice Instantly - Fast, Easy, and Hassle-Free!
            </h2>
            <div className='w-full text-center space-y-10'>
                <Button
                    radius="none"
                    size="md"
                    color="warning"
                    className="font-Inter font-medium"
                    endContent={
                        <FaLongArrowAltRight className='text-base' />
                    }
                >
                    Get a Demo
                </Button>
                <CalendlyComponent
                />
            </div>

        </section>
    )
}

export default Information
