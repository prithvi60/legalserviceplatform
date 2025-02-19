import React from 'react'
// import { PiStarFill } from "react-icons/pi";
import CalendlyComponent from './CalendlyComponent';
import Image from 'next/image';
const WhatCustomerSay = () => {
    return (
        <section className='padding w-full bg-white h-full space-y-10'>
            <h2 className='font-Archivo w-full font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-secondary'>What Our Customers Say</h2>
            <div className='flex flex-col md:flex-row md:items-center gap-6'>
                <div className='flex items-center gap-2.5'>
                           <Image
              alt="star image"
              src={"/gifs/star.gif"}
              width={100}
              height={100}
            />
                    <h5 className='font-Inter font-bold tracking-wide text-xl md:text-2xl xl:text-3xl text-primary'>4.5/5 on Google</h5>
                </div>
                <div className='flex items-center gap-2.5'>
                           <Image
              alt="star image"
              src={"/gifs/star.gif"}
              width={100}
              height={100}
            />
                    <h5 className='font-Inter font-bold tracking-wide text-xl md:text-2xl xl:text-3xl text-primary'>4.3/5 on TrustPilot</h5>
                </div>
                <div className='flex items-center gap-2.5'>
                           <Image
              alt="star image"
              src={"/gifs/star.gif"}
              width={100}
              height={100}
            />
                    <h5 className='font-Inter font-bold tracking-wide text-xl md:text-2xl xl:text-3xl text-primary'>4.3/5 on MouthShut</h5>
                </div>
            </div>
            <div className='block space-y-10'>
                {customerReview.map((list, idx) => (
                    <div key={idx} className='flex items-center gap-10 p-5 bg-[#F1F2F5] rounded-lg'>
                        <div className='relative rounded-lg size-20 md:size-24 overflow-hidden flex-shrink-0'>
                            <Image fill alt='client image' src={list.img} className='object-cover object-center' />
                        </div>
                        <div className='block space-y-1.5'>
                            <h4 className='font-Archivo tracking-wide text-secondary text-opacity-80 font-semibold text-lg md:text-xl xl:text-2xl'>{list.title}</h4>
                            <p className='text-secondary text-xs md:text-base text-opacity-60 font-Lorin ml-2'>{list.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between pt-6'>
                <p className='font-Archivo w-full md:w-4/5 font-bold tracking-wide text-2xl md:text-3xl xl:text-4xl text-secondary text-center md:text-start'>Start Your Business Hassle-Free - Book a Free Consultation Today!</p>
                <CalendlyComponent text='Get Started' url="https://calendly.com/prithvi-webibee/general
" />
            </div>
        </section>
    )
}

export default WhatCustomerSay


const customerReview = [
    {
        img: "/client-1.jpg",
        title: '"Fast, reliable, and highly professional service! Helped us set up our business smoothly."',
        desc: "clients name 1"
    },
    {
        img: "/client-2.jpg",
        title: '"Great platform for startups! They took care of everything – GST, tax, and legal."',
        desc: "clients name 2"
    }
]