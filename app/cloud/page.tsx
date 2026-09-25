import HeroSection from "@/components/cloud/hero-section"
import FAQSection from "@/components/faq-section"
import { FAQ } from "@/constants/faqs"

export default function CloudPage() {
  return (
    <div className="w-full z-10 items-center space-y-28 xl:space-y-48 bg-background px-auto [&>section]:px-5 pb-24">
      <HeroSection />
      <FAQSection faqs={FAQ.cloud} />
    </div>
  )
}
