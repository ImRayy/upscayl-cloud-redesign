import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-5 pt-24 pb-16">
      <Image
        src="/hero/fox.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--background)_55%,transparent)_0%,var(--background)_75%),linear-gradient(0deg,var(--background)_0%,transparent_40%)]" />

      <section className="pricing-reveal flex max-w-xl flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Upscayl Cloud
        </p>
        <h1
          aria-label="404"
          className="not-found-upscale mt-3 select-none font-bytesized text-[9rem] leading-none tracking-[-0.04em] sm:text-[13rem]">
          404
        </h1>
        <h2 className="mt-2 text-3xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-4xl">
          This page got lost in the pixels.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          We tried upscaling it, but there&apos;s nothing here to work with. The
          page may have moved or never existed.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-10 rounded-full px-5">
            <Link href="/">
              Back to home
              <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-10 rounded-full px-5">
            <Link href="/desktop">
              <Download />
              Get Upscayl Desktop
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
