// CalendlyComponent.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

// Define props interface
interface CalendlyProps {
    url: string;
    text: string;
}

// Dynamically import the CalendlyButton component
const DynamicCalendly = dynamic<CalendlyProps>(
    () => import("../UI/CalendlyButton").then((mod) => mod.default),
    {
        ssr: false,
        // loading: () => (
        //     <Spinner
        //         size="md"
        //         color="primary"
        //     />
        // ),
    }
);

const CalendlyComponent = ({ text, url }: { text: string, url: string }) => {
    return (
        <Suspense fallback={<Spinner size="md" color="primary" />}>
            <div className="relative z-auto">
                <DynamicCalendly
                    url={url}
                    text={text}
                />
            </div>
        </Suspense>
    );
};

export default CalendlyComponent;
