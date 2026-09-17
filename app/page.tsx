"use client"

import BenifitsSection from "@/components/benifits-section"
import CTASection from "@/components/cta-section"
import DesktopStepsSection from "@/components/desktop-steps-section"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import InformationSection from "@/components/information-section"
import NavBar from "@/components/nav-bar"
import ProblemSection from "@/components/problem-section"
import Testimonials from "@/components/testimonials"
import UpscaylDesktopSection from "@/components/upscayl-desktop-section"

export default function Home() {
  return (
    <div className="z-10  items-center space-y-28 xl:space-y-48 bg-background">
      <NavBar />
      <HeroSection variant="variant-2" />
      {/* <InformationSection /> */}
      {/* <ProblemSection /> */}
      <BenifitsSection />
      <UpscaylDesktopSection />
      <DesktopStepsSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
