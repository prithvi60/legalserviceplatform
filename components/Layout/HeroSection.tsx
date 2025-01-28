import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <section className="padding w-full h-screen text-white linear-blue_1 flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
            <div className='block space-y-4 w-full md:w-3/5' >
                <h2 className='font-Archivo font-bold tracking-wide text-3xl md:text-5xl xl:text-7xl'>India’s <span className='text-warning'>Expert</span>{" "}Services Platform</h2>
                <p className='text-base md:text-lg font-Lorin'>Effortlessly connect with top professionals for legal, tax, and compliance services. Simplifying complex processes so you can focus on what matters.</p>
            </div>
            <div className='w-[200px] h-[200px] md:w-[480px] md:h-[480px] basis-full md:basis-2/5 overflow-hidden relative z-0'>
                <Image priority className='object-contain object-center' alt='bg image' src={"/megaphone.png"} fill />
            </div>
        </section >
    )
}

export default HeroSection
