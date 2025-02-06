import Achievements from "@/components/Layout/Achievements";
import BusinessOverview from "@/components/Layout/BusinessOverview";
import Community from "@/components/Layout/Community";
import Consultants from "@/components/Layout/Consultants";
import CustomerFeedback from "@/components/Layout/CustomerFeedback";
import HeroSection from "@/components/Layout/HeroSection";
import LetsBegin from "@/components/Layout/LetsBegin";
import OurClients from "@/components/Layout/OurClients";
import Search from "@/components/Layout/Search";
import WhatCustomerSay from "@/components/Layout/WhatCustomerSay";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Search />
      <BusinessOverview />
      <WhatCustomerSay />
      {/* <Consultants />
      <OurClients />
      <Community />
      <CustomerFeedback />
      <LetsBegin />
      <Achievements /> */}
    </div>
  );
}
