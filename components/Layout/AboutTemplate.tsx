import React from 'react'
import CalendlyComponent from './CalendlyComponent'
import Image from 'next/image'

const AboutTemplate = () => {
    return (
        <section className='w-full h-full space-y-10 bg-white'>
            <p className='px-[40px] py-[40px] bg-white md:px-[80px] xl:px-[144px] font-Inter text-xl md:text-2xl xl:text-3xl'>With<span className="text-primary font-bold mx-3">Rezolvate</span>, crafting airtight contracts is no longer a tedious process.<span className="text-primary font-bold mx-3">Customize, manage, and deploy contract templates in minutes</span> — without the constant back-and-forth with Legal.</p>
            <div className="px-[40px] py-[40px] md:px-[80px] xl:px-[144px] w-full h-full bg-[#F8F8FA] flex relative flex-col lg:flex-row overflow-hidden gap-5">
                <div className="w-full h-[320px] md:h-[520px] overflow-hidden relative z-0 lg:basis-3/5">
                    <Image
                        className="object-contain object-center"
                        alt="bg image"
                        src={"/sample.png"}
                        fill
                    />
                </div>
                <div className="block space-y-4 w-full lg:w-2/5 mx-auto">
                    <div className='block space-y-3.5'>
                        <h2 className="font-Archivo text-secondary font-semibold tracking-wide text-2xl md:text-3xl xl:text-4xl">
                            Build a Library of Reusable, Customizable Templates
                        </h2>
                        <h5 className="font-Lorin ml-1 font-medium tracking-wide text-base md:text-xl text-secondary/60">
                            Track compliance, legal, and tax matters seamlessly.
                        </h5>
                    </div>
                    <ul className='block space-y-4'>
                        {RCtLists.map((list, id) => (
                            <li key={id} className='flex gap-4 items-center'>
                                <div className="size-8 flex-shrink-0 overflow-hidden relative z-0">
                                    <Image
                                        priority
                                        className="object-contain object-center"
                                        alt="bg image"
                                        src={"/expert-icon.png"}
                                        fill
                                    />
                                </div>
                                <div className='block space-y-1.5'>
                                    <h4 className='font-Lorin tracking-wide text-secondary text-opacity-80 font-semibold text-base md:text-xl'>{list.title}</h4>
                                    <p className='text-secondary text-lg text-opacity-60 font-Lorin'>{list.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="px-[40px] py-[40px] md:px-[80px] xl:px-[144px] w-full h-full bg-[#F8F8FA] flex relative flex-col-reverse lg:flex-row  overflow-hidden gap-5">
                <div className="block space-y-4 w-full lg:w-2/5 ">
                    <div className='block space-y-3.5'>
                        <h2 className="font-Archivo text-secondary font-semibold tracking-wide text-2xl md:text-3xl xl:text-4xl">
                            Automate & Personalize Contract Creation
                        </h2>
                        <h5 className="font-Lorin ml-1 font-medium tracking-wide text-base md:text-xl text-secondary/60">
                            Track compliance, legal, and tax matters seamlessly.
                        </h5>
                    </div>
                    <ul className='block space-y-4'>
                        {APCCLists.map((list, id) => (
                            <li key={id} className='flex gap-4 items-center'>
                                <div className="size-8 flex-shrink-0 overflow-hidden relative z-0">
                                    <Image
                                        priority
                                        className="object-contain object-center"
                                        alt="bg image"
                                        src={"/expert-icon.png"}
                                        fill
                                    />
                                </div>
                                <div className='block space-y-1.5'>
                                    <h4 className='font-Lorin tracking-wide text-secondary text-opacity-80 font-semibold text-base md:text-xl'>{list.title}</h4>
                                    <p className='text-secondary text-lg text-opacity-60 font-Lorin'>{list.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full h-[320px] md:h-[520px] overflow-hidden relative z-0 lg:basis-3/5">
                    <Image
                        className="object-contain object-center"
                        alt="bg image"
                        src={"/sample.png"}
                        fill
                    />
                </div>
            </div>
            <div className='padding bg-white w-full h-full block space-y-5 text-center'>
                <p className='font-Archivo w-full font-bold tracking-wide text-2xl md:text-3xl xl:text-4xl text-secondary'>Start Your Business Hassle-Free - Book a Free Consultation Today!</p>
                <div className='flex justify-center items-center'>
                    <CalendlyComponent text='Get Started' url="https://calendly.com/prithvi-webibee/general" />
                </div>
            </div>
        </section>
    )
}

export default AboutTemplate



const RCtLists = [
    {
        title: "Turn Existing Contracts into Smart Templates ", desc: "Save time by converting frequently used agreements into reusable formats."
    },
    { title: "Create & Edit Templates in a Few Clicks ", desc: 'No technical expertise needed—just select, modify, and save.' },
    { title: "Ensure Consistency & Compliance", desc: 'Always use the latest, legally-approved version of your contracts.' },
    { title: "Centralized Template Library", desc: 'Organize and access all templates from one secure location.' },
]

const APCCLists = [
    {
        title: "Interactive Questionnaires ", desc: "Allow teams to generate contracts by simply answering a few guided questions."
    },
    { title: "Auto-Populated Fields ", desc: 'Responses seamlessly integrate into the contract, reducing manual input errors.' },
    { title: "Dynamic Clause Adjustments", desc: 'Apply conditional logic to modify terms based on specific responses.' },
    { title: "Faster Approvals & Execution ", desc: 'Eliminate bottlenecks with a streamlined, automated process.' },
]