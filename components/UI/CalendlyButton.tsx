'use client'

// import { Button } from '@heroui/button'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
    const [isAnimating, setIsAnimating] = useState(false)

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

    // Auto-play hover effect every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true)
            setTimeout(() => setIsAnimating(false), 800) // Reset after animation
        }, 2000) // Repeat every 4s

        return () => clearInterval(interval)
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
            <motion.button
                onClick={handleCalendlyClick}
                onTouchEnd={handleCalendlyClick}
                className="z-10 group flex h-8 md:h-14 items-center gap-3 rounded-full pl-4 pr-6 transition-all duration-300 ease-in-out  hover:pl-3 bg-success text-black font-semibold hover:bg-success/90 relative overflow-hidden"
                aria-label={`Schedule ${text}`}
            >
                <motion.span
                    className="animate-pulse rounded-full bg-primary p-1 md:p-2 text-sm transition-colors duration-300 group-hover:bg-white"
                    animate={isAnimating ? { x: [-50, 0], opacity: [0, 1] } : {}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.div
                        className="text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45"
                        animate={isAnimating ? { x: [-50, 0], opacity: [0, 1] } : {}}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <FaLongArrowAltRight />
                    </motion.div>
                </motion.span>
                <motion.span
                    className="text-sm md:text-xl font-semibold w-[80px] md:w-auto"
                    animate={isAnimating ? { x: [-10, 0], opacity: [0, 1] } : {}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {text}
                </motion.span>
            </motion.button>
        </>
    )
}

export default CalendlyLink
