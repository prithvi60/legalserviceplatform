'use client'

import { Button } from '@heroui/button'
import Script from 'next/script'
import { FaLongArrowAltRight } from 'react-icons/fa'

interface CalendlyLinkProps {
    url: string
    text?: string
    // className?: string
}

interface CalendlyInterface {
    initPopupWidget: (options: { url: string }) => void
}

declare global {
    interface Window {
        Calendly?: CalendlyInterface
    }
}

const CalendlyLink = ({
    url,
    text
    // className = "text-blue-500 hover:text-blue-700 underline"
}: CalendlyLinkProps) => {
    return (
        <>
            <link
                href="https://assets.calendly.com/assets/external/widget.css"
                rel="stylesheet"
            />
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
            />
            <Button
                color="warning"
                radius="md"
                size={text === "Get Started" ? "md" : "lg"}
                className="font-Inter font-medium"
                endContent={
                    text === "Get a Demo" && <FaLongArrowAltRight className='text-base' />
                }
                onClick={(e) => {
                    e.preventDefault()
                    if (window.Calendly) {
                        window.Calendly.initPopupWidget({ url })
                    }
                }}
            >
                {text}
            </Button>
        </>
    )
}

export default CalendlyLink