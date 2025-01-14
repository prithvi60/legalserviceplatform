import React from 'react'
// import { Progress } from "@nextui-org/progress";
const ProgressBar = () => {
    return (
        <section className='w-full flex px-10 py-10 max-w-7xl mx-auto gap-6 md:gap-0 flex-col md:flex-row md:justify-between '>
            <h3 className='capitalize text-2xl text-center md:text-start md:text-3xl tracking-wider font-semibold text-[#1E318D]'>Letter Requesting Remote Work</h3>
            {/* <div className='space-y-2 w-full md:w-1/4'>
                <h4 className='text-lg md:text-xl'>Progress:</h4>
                <Progress isStriped aria-label="Loading..." size="md" className="max-w-lg" color="primary" value={60} />
            </div> */}
        </section>
    )
}

export default ProgressBar
