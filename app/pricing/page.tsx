import FAQSection from "@/components/faq-section";
import PricingCardsGrid from "@/components/pricing-cards-grid";
import PricingHero from "@/components/pricing-hero";
import { FAQ } from "@/constants/faqs";

export default function PricingPage() {
  return (
    <main className="w-full bg-background pb-24 ">
      <PricingHero />
      <div className="relative z-10 mx-auto mt-12 -mt-12 max-w-6xl px-5 sm:px-8 lg:px-10">
        <PricingCardsGrid />
        <div className="mt-28">
          <FAQSection faqs={FAQ.pricing} />
        </div>
      </div>
    </main>
  );
}
