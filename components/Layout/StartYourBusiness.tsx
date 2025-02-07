import { startBusiness } from '@/constants/Data'
import { Card, CardBody, CardHeader } from '@heroui/card'
import React from 'react'

const StartYourBusiness = () => {
    return (
        <section className="padding bg-white w-full space-y-12">
            <div className="block space-y-2 text-center">
                <h3 className='font-Archivo w-full font-bold tracking-wide text-2xl md:text-3xl xl:text-5xl text-secondary'>
                    Start Your Business with Confidence - We&apos;ve Got You Covered!
                </h3>
            </div>
            <div className="flex gap-5 md:gap-10 overflow-x-scroll no_scrollbar h-full mx-auto">
                {startBusiness.map((item, idx) => (
                    <Card
                        key={idx}
                        className="py-4 px-6 bg-[#FFBF0033] min-w-72 mx-auto md:min-w-96"
                    >
                        <CardHeader className="pb-3 pt-2 px-4 flex-col gap-2 items-start">
                            <div>
                                {item.icon}
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-visible gap-5 justify-center py-2">
                            <h4 className="text-xl md:text-2xl font-Archivo font-bold tracking-wider">
                                {item.title}
                            </h4>
                            <p className="text-sm md:text-base font-Lorin font-medium">
                                {item.desc}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default StartYourBusiness
