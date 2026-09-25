import FAQSection from "@/components/faq-section"
import { FAQ } from "@/constants/faqs"

export default function DesktopPage() {
  return (
    <div className="z-10  items-center space-y-28 xl:space-y-48 bg-background min-h-screen pt-24">
      <FAQSection faqs={FAQ.desktop} />
    </div>
  )
}
