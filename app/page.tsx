// import Image from "next/image";

import Achievements from "@/components/Layout/Achievements";
import Community from "@/components/Layout/Community";
import Consultants from "@/components/Layout/Consultants";
import CustomerFeedback from "@/components/Layout/CustomerFeedback";
import HeroSection from "@/components/Layout/HeroSection";
import Information from "@/components/Layout/Information";
import LetsBegin from "@/components/Layout/LetsBegin";
import OurClients from "@/components/Layout/OurClients";
import Search from "@/components/Layout/Search";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Consultants />
      <Search />
      <OurClients />
      <Community />
      <LetsBegin />
      <CustomerFeedback />
      <Achievements />
      <Information />
    </div>
  );
}
