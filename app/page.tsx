"use client";
import { motion } from "framer-motion";
import AboutTemplate from "@/components/Layout/AboutTemplate";
import BusinessOverview from "@/components/Layout/BusinessOverview";
import Community from "@/components/Layout/Community";
import CustomerFeedback from "@/components/Layout/CustomerFeedback";
import ExploreSuit from "@/components/Layout/ExploreSuit";
import HeroSection from "@/components/Layout/HeroSection";
// import OurClients from "@/components/Layout/OurClients";
import Search from "@/components/Layout/Search";
import StartYourBusiness from "@/components/Layout/StartYourBusiness";
import VideoSection from "@/components/Layout/VideoSection";
import WhatCustomerSay from "@/components/Layout/WhatCustomerSay";
import { ALCTools, SCGResults, talkToExpert } from "@/constants/Data";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeLeftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="">
      <HeroSection />

      <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <Search />
      </motion.div>

      <motion.div variants={fadeLeftVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <BusinessOverview />
      </motion.div>

      <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <ExploreSuit />
      </motion.div>

      <motion.div variants={fadeLeftVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <Community type="" mainTitle="Security, Confidentiality & Guaranteed Results" desc="" data={SCGResults} />
      </motion.div>

      <motion.div variants={scaleInVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <AboutTemplate />
      </motion.div>

      <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <VideoSection />
      </motion.div>

      <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <Community type="" mainTitle="Expert Consultation - Talk to Our Specialists" desc="Speak to an Expert - Get Legal Help in Minutes!" data={ALCTools} />
      </motion.div>

      <motion.div variants={fadeLeftVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <StartYourBusiness />
      </motion.div>

      <motion.div variants={scaleInVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <WhatCustomerSay />
      </motion.div>

      <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <Community type="true" mainTitle="Expert Consultation - Talk to Our Specialists" desc="Speak to an Expert - Get Legal Help in Minutes!" data={talkToExpert} />
      </motion.div>

      <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <CustomerFeedback />
      </motion.div>
    </div>
  );
}
