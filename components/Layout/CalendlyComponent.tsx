import dynamic from "next/dynamic";
// import CalendlyPopup from "../UI/CalendlyButton";
const Calendly = dynamic(() => import("../UI/CalendlyButton"), {
    ssr: false
});

const CalendlyComponent = () => {
    return (
        <div>
            <Calendly
                url="https://calendly.com/gokulgandhi2301"
                text="Schedule a Call"
            />
        </div>
    )
}

export default CalendlyComponent
