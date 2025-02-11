import AboutTemplate from "@/components/Layout/AboutTemplate";
import BusinessOverview from "@/components/Layout/BusinessOverview";
import Community from "@/components/Layout/Community";
import CustomerFeedback from "@/components/Layout/CustomerFeedback";
import ExploreSuit from "@/components/Layout/ExploreSuit";
import HeroSection from "@/components/Layout/HeroSection";
import Search from "@/components/Layout/Search";
import StartYourBusiness from "@/components/Layout/StartYourBusiness";
import VideoSection from "@/components/Layout/VideoSection";
import WhatCustomerSay from "@/components/Layout/WhatCustomerSay";
import { ALCTools, SCGResults, talkToExpert } from "@/constants/Data";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Search />
      <BusinessOverview />
      <ExploreSuit />
      <Community mainTitle="Security, Confidentiality & Guaranteed Results" desc="" data={SCGResults} />
      <AboutTemplate />
      <VideoSection />
      <Community mainTitle="Expert Consultation - Talk to Our Specialists" desc="Speak to an Expert - Get Legal Help in Minutes!" data={ALCTools} />
      <StartYourBusiness />
      <WhatCustomerSay />
      <Community mainTitle="Expert Consultation - Talk to Our Specialists" desc="Speak to an Expert - Get Legal Help in Minutes!" data={talkToExpert} />
      <CustomerFeedback />
    </div>
  );
}
