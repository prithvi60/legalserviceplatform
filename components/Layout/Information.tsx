import React from 'react'
import CalendlyComponent from './CalendlyComponent';

const Information = () => {
    return (
        <section className="padding bg-white w-full space-y-6 sm:space-y-12">
            <h2 className="font-Archivo font-bold text-center tracking-wide text-2xl md:text-4xl xl:text-6xl">
                Access Legal Advice Instantly - Fast, Easy, and Hassle-Free!
            </h2>
            <div className='w-full text-center space-y-10'>
                <div className='flex justify-center items-center'>
                    <CalendlyComponent text='Get a Demo' url="https://calendly.com/prithvi-webibee/general" />
                </div>
            </div>

        </section>
    )
}

export default Information
