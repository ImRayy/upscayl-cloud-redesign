"use client";

import HeroSection from "@/components/hero-section";
import InformationSection from "@/components/information-section";
import NavBar from "@/components/nav-bar";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div className="z-10 relative h-full  items-center gap-10">
      <NavBar />
      <HeroSection />
      <InformationSection />
      <Testimonials />
    </div>
  );
}
