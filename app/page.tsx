import BenifitsSection from "@/components/benifits-section";
import CTASection from "@/components/cta-section";
import DesktopStepsSection from "@/components/desktop-steps-section";
import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import UpscaylDesktopSection from "@/components/upscayl-desktop-section";

export default function Home() {
  return (
    <div className="z-10 items-center space-y-28 xl:space-y-48 pb-24  bg-background">
      <HeroSection variant="variant-2" />
      <BenifitsSection />
      <UpscaylDesktopSection />
      <DesktopStepsSection />
      <Testimonials />
      <CTASection />
    </div>
  );
}
