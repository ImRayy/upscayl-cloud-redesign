import DownloadSection from "@/components/desktop/download-section";
import LicenseSection from "@/components/desktop/license-section";
import FAQSection from "@/components/faq-section";
import { FAQ } from "@/constants/faqs";

export default function DesktopPage() {
  return (
    <div className="min-h-screen pb-24 bg-background px-4 space-y-28 xl:space-y-48 [&>section]:max-w-5xl [&>section]:mx-auto">
      <DownloadSection />
      <LicenseSection />
      <FAQSection faqs={FAQ.desktop} />
    </div>
  );
}
