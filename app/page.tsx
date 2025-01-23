// import Image from "next/image";

import Community from "@/components/Layout/Community";
import Consultants from "@/components/Layout/Consultants";
import HeroSection from "@/components/Layout/HeroSection";
import Information from "@/components/Layout/Information";
import LetsBegin from "@/components/Layout/LetsBegin";
import OurClients from "@/components/Layout/OurClients";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Consultants />
      <OurClients />
      <Community />
      <LetsBegin />
      <Information />
    </div>
  );
}
