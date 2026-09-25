import FAQSection from "@/components/cloud/faq-section"
import HeroSection from "@/components/cloud/hero-section"

export default function CloudPage() {
  return (
    <div className="w-full z-10  items-center space-y-28 xl:space-y-48 bg-background px-auto [&>section]:px-5 pb-24">
      <HeroSection />
      <FAQSection />
    </div>
  )
}
