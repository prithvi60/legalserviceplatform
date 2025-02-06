import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FaArrowsToDot } from "react-icons/fa6";
import { SiPivotaltracker } from "react-icons/si";
const BusinessOverview = () => {
    return (
        <section className='padding w-full bg-white h-full space-y-10'>
            <h2 className='font-Archivo w-full lg:w-4/5 font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-secondary'>Complete Business Overview - All in One Place</h2>
            <p className='font-Inter font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-primary'>Run Your Business with Confidence – Let Resolve Handle the Rest!</p>
            <div className='block space-y-10'>
                {businessOverviews.map((list, idx) => (
                    <div key={idx} className='flex items-center gap-10 p-5 bg-[#F1F2F5] rounded-lg'>
                        <div className='bg-white p-2 rounded-lg'>
                            {list.icon}
                        </div>
                        <div className='block space-y-1.5'>
                            <h4 className='font-Archivo tracking-wide text-secondary text-opacity-80 font-semibold text-xl md:text-2xl xl:text-3xl'>{list.title}</h4>
                            <p className='text-secondary text-xs md:text-base text-opacity-60 font-Lorin'>{list.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BusinessOverview


const businessOverviews = [
    {
        icon: (<MdSpaceDashboard className='text-4xl md:text-5xl text-primary flex-shrink-0' />),
        title: "Unified Dashboard",
        desc: "Track compliance, legal, and tax matters seamlessly."
    },
    {
        icon: (<RiTeamFill className='text-4xl md:text-5xl text-primary flex-shrink-0' />),
        title: "Your Legal & Compliance Team",
        desc: "Lawyers + CAs + CSs in your pocket."
    },
    {
        icon: (<FaArrowsToDot className='text-4xl md:text-5xl text-primary flex-shrink-0' />),
        title: "Automatic Reminders",
        desc: "Stay on top of deadlines & legal requirements."
    },
    {
        icon: (<SiPivotaltracker className='text-4xl md:text-5xl text-primary flex-shrink-0' />),
        title: "Efficient Tracking",
        desc: "Real-time updates on compliance & financial health."
    },
]