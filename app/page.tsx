"use client";

import HeroSection from "@/components/hero-section";
import InformationSection from "@/components/information-section";
import NavBar from "@/components/nav-bar";
import ProblemSection from "@/components/problem-section";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div className="z-10 relative h-full items-center space-y-36">
      <NavBar />
      <HeroSection />
      {/* <InformationSection /> */}
      <ProblemSection />
      <Testimonials />
    </div>
  );
}
