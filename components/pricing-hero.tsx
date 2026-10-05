import { Layers3, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

const assurances = [
  { icon: Sparkles, label: "No GPU required" },
  { icon: ShieldCheck, label: "Private & secure" },
  { icon: Layers3, label: "Highest quality" },
];

export default function PricingHero() {
  return (
    <section className="relative isolate min-h-[430px] overflow-hidden pt-24">
      <Image
        src="/hero/dragon.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_8%,color-mix(in_oklch,var(--background)_8%,transparent)_44%,color-mix(in_oklch,var(--background)_30%,transparent)_78%),linear-gradient(0deg,var(--background)_0%,transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 lg:px-10">
        <header className="pricing-reveal max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Upscayl Cloud
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            Simple pricing.
            <br />
            Serious quality.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Start free, then choose the amount of image upscaling you need. No
            installation or powerful GPU required.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {assurances.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="grid size-6 place-items-center rounded-full bg-secondary/80">
                  <Icon className="size-3.5" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </header>
      </div>
    </section>
  );
}
