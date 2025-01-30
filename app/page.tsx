import Achievements from "@/components/Layout/Achievements";
import Community from "@/components/Layout/Community";
import Consultants from "@/components/Layout/Consultants";
import CustomerFeedback from "@/components/Layout/CustomerFeedback";
import HeroSection from "@/components/Layout/HeroSection";
import LetsBegin from "@/components/Layout/LetsBegin";
import OurClients from "@/components/Layout/OurClients";
import Search from "@/components/Layout/Search";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Search />
      <Consultants />
      <OurClients />
      <Community />
      <CustomerFeedback />
      <LetsBegin />
      <Achievements />
    </div>
  );
}
