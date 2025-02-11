"use client"
import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    // const [isPlaying, setIsPlaying] = useState<boolean>(true);

    // const togglePlayPause = (): void => {
    //     if (videoRef.current) {
    //         if (isPlaying) {
    //             videoRef.current.pause();
    //         } else {
    //             videoRef.current.play();
    //         }
    //         setIsPlaying(!isPlaying);
    //     }
    // };

    return (
        <section className="relative padding !py-[15px] w-full h-full bg-white">
            <video
                ref={videoRef}
                muted
                loop
                autoPlay
                playsInline
                className="h-full w-full object-contain object-center"
            >
                <source src="/demo.mp4" type="video/mp4" />
            </video>
            {/* <button
                onClick={togglePlayPause}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full"
            >
                {isPlaying ? <FaPause className="text-3xl" /> : <FaPlay className="text-3xl" />}
            </button> */}
        </section>
    );
};

export default VideoSection;
