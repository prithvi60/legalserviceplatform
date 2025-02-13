'use client'

import { Button } from '@heroui/button'
// import Script from 'next/script'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'

interface CalendlyLinkProps {
    url: string
    text?: string
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
}: CalendlyLinkProps) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    useEffect(() => {
        const handleScriptLoad = () => {
            setIsScriptLoaded(true)
        }

        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        script.onload = handleScriptLoad
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handleCalendlyClick = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        if (window.Calendly && isScriptLoaded) {
            window.Calendly.initPopupWidget({ url })
        } else {
            console.error('Calendly script not loaded')
        }
    }

    return (
        <>
            <link
                href="https://assets.calendly.com/assets/external/widget.css"
                rel="stylesheet"
            />
            <Button
                color="success"
                radius="md"
                size={text === "Get Started" ? "md" : "lg"}
                className="font-Inter font-semibold relative z-20"
                endContent={
                    text === "Get a Demo" && <FaLongArrowAltRight className='text-base' />
                }
                onClick={handleCalendlyClick}
                onTouchEnd={handleCalendlyClick}
                aria-label={`Schedule ${text}`}
            >
                {text}
            </Button>
        </>
    )
}

export default CalendlyLink