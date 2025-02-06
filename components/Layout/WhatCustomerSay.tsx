import React from 'react'
import { IoIosPerson } from "react-icons/io";
import { PiStarFill } from "react-icons/pi";
import CalendlyComponent from './CalendlyComponent';
const WhatCustomerSay = () => {
    return (
        <section className='padding w-full bg-white h-full space-y-10'>
            <h2 className='font-Archivo w-full font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-secondary'>What Our Customers Say</h2>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2.5'>
                    <PiStarFill className='text-warning text-opacity-90 text-4xl' />
                    <h5 className='font-Inter font-bold tracking-wide text-xl md:text-2xl xl:text-3xl text-primary'>4.5/5 on Google</h5>
                </div>
                <div className='flex items-center gap-2.5'>
                    <PiStarFill className='text-warning text-opacity-90 text-4xl' />
                    <h5 className='font-Inter font-bold tracking-wide text-xl md:text-2xl xl:text-3xl text-primary'>4.3/5 on TrustPilot</h5>
                </div>
                <div className='flex items-center gap-2.5'>
                    <PiStarFill className='text-warning text-opacity-90 text-4xl' />
                    <h5 className='font-Inter font-bold tracking-wide text-xl md:text-2xl xl:text-3xl text-primary'>4.3/5 on MouthShut</h5>
                </div>
            </div>
            <div className='block space-y-10'>
                {customerReview.map((list, idx) => (
                    <div key={idx} className='flex items-center gap-10 p-5 bg-[#F1F2F5] rounded-lg'>
                        <div className='bg-white p-2 rounded-lg'>
                            {list.icon}
                        </div>
                        <div className='block space-y-1.5'>
                            <h4 className='font-Archivo tracking-wide text-secondary text-opacity-80 font-semibold text-lg md:text-xl xl:text-2xl'>{list.title}</h4>
                            <p className='text-secondary text-xs md:text-base text-opacity-60 font-Lorin'>{list.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-between pt-6'>
                <p className='font-Archivo w-full md:w-4/5 font-bold tracking-wide text-2xl md:text-3xl xl:text-4xl text-secondary'>Start Your Business Hassle-Free - Book a Free Consultation Today!</p>
                <CalendlyComponent text='Get Started' />
            </div>
        </section>
    )
}

export default WhatCustomerSay


const customerReview = [
    {
        icon: (<IoIosPerson className='text-4xl md:text-5xl text-primary flex-shrink-0' />),
        title: '"Fast, reliable, and highly professional service! Helped us set up our business smoothly."',
        desc: "clients name"
    },
    {
        icon: (<IoIosPerson className='text-4xl md:text-5xl text-primary flex-shrink-0' />),
        title: '"Great platform for startups! They took care of everything – GST, tax, and legal."',
        desc: "clients name"
    }
]