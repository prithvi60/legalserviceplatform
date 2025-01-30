import Image from 'next/image'
import React from 'react'

const AboutHero = () => {
    return (
        <section className="padding w-full linear-blue_1 h-[85vh] text-white linear-blue_1 flex items-center relative flex-col md:flex-row overflow-hidden gap-5">
            <div className='block space-y-4 w-full md:w-3/5' >
                <h2 className='font-Archivo font-bold tracking-wide text-3xl md:text-5xl xl:text-7xl'>About Us</h2>
                <p className='text-base md:text-lg font-Lorin'>The User is further aware that the Websiteuses data collection devices such as cookies on certain pages of the Website to help analyse web page flow, measure promotional effectiveness, and promote trust and safety, and that certain features of the Website are only available through the use of such cookies. While the User is free to decline the Website’s cookies if the User’s browser permits, the User may consequently be unable to use certain features on the Website</p>
            </div>
            <div className='w-[200px] h-[200px] md:w-[480px] md:h-[480px] basis-full md:basis-2/5 overflow-hidden relative z-0'>
                <Image priority className='object-contain object-center' alt='bg image' src={"/magnifying_glass.png"} fill />
            </div>
        </section>
    )
}

export default AboutHero
