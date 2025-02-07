import AboutTemplate from "@/components/Layout/AboutTemplate";
import BusinessOverview from "@/components/Layout/BusinessOverview";
import Community from "@/components/Layout/Community";
import HeroSection from "@/components/Layout/HeroSection";
import Search from "@/components/Layout/Search";
import StartYourBusiness from "@/components/Layout/StartYourBusiness";
import WhatCustomerSay from "@/components/Layout/WhatCustomerSay";
import { ALCTools, SCGResults, talkToExpert } from "@/constants/Data";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Search />
      <BusinessOverview />
      {/* <Consultants />
      <OurClients /> */}
      <Community mainTitle="Security, Confidentiality & Guaranteed Results" desc="" data={SCGResults} />
      <AboutTemplate />
      <Community mainTitle="Expert Consultation - Talk to Our Specialists" desc="Speak to an Expert – Get Legal Help in Minutes!" data={ALCTools} />
      <StartYourBusiness />
      <WhatCustomerSay />
      <Community mainTitle="Expert Consultation - Talk to Our Specialists" desc="Speak to an Expert – Get Legal Help in Minutes!" data={talkToExpert} />
      {/* <CustomerFeedback />
      <LetsBegin />
      <Achievements /> */}
    </div>
  );
}
