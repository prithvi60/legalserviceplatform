import React from 'react'
import Image from 'next/image'
import { FaStar } from "react-icons/fa6";

const HeroSection = () => {
    return (
        <>
            <section className="padding w-full h-screen text-white linear-blue_1 flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
                <div className='block space-y-4 w-full md:w-3/5' >
                    <h2 className='font-Archivo font-bold tracking-wide text-3xl md:text-5xl xl:text-7xl'><span className='text-warning mr-3'>Simplify</span>Legal, Tax & Compliance</h2>
                    <h5 className='font-Lorin ml-1 font-medium tracking-wide text-lg md:text-xl'>Get Expert Help Instantly</h5>
                    {/* <h4 className='font-Archivo font-semibold tracking-wide text-xl md:text-2xl xl:text-4xl'>India’s Top-Rated Professional Services Platform</h4>
                <div className='font-Inter flex flex-col md:flex-row md:items-center gap-3 font-semibold text-base md:text-lg'> <h4 className='flex md:items-center gap-3'>4.5/5<span><FaStar className='text-warning mx-2 text-xl' /></span>(17K + Reviews)</h4><span className='font-normal'> - Trusted by businesses across India!</span></div>
                <h5 className='font-Archivo font-semibold text-xl md:text-2xl underline decoration-warning underline-offset-8'>Explore our suite of products</h5>
                <p className='text-base md:text-lg font-Lorin'>Explore our suite of products to see how you can simplify, automate and accelerate your Legal processes.</p> */}
                </div>
                <div className='w-[200px] h-[200px] md:w-[480px] md:h-[480px] basis-full md:basis-2/5 overflow-hidden relative z-0'>
                    <Image priority className='object-contain object-center' alt='bg image' src={"/megaphone.png"} fill />
                </div>
            </section >
            <section className="padding bg-white w-full h-full flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
                <div className='block space-y-4 w-full md:w-3/5' >
                    <h2 className='font-Inter font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl'>India’s Top-Rated Professional Services Platform</h2>
                    <h5 className='font-Lorin text-secondary ml-1 font-medium tracking-wide text-base md:text-lg'>Trusted by businesses across India!</h5>
                </div>
                <div className='font-Inter flex flex-col md:flex-row md:items-center gap-10  text-base md:text-lg w-full md:w-2/5'><h4 className='flex text-3xl text-primary font-bold md:items-center gap-3'><span><FaStar className='text-warning mx-2 text-2xl md:text-4xl xl:text-6xl' /></span>4.5/5</h4>
                    <p className='font-normal tracking-wide text-sm'>(17K + Reviews)</p>
                </div>
            </section >
        </>
    )
}

export default HeroSection
