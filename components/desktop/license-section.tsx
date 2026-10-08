"use client";

import confetti from "canvas-confetti";
import { GiftIcon } from "lucide-react";
import { motion } from "motion/react";
import HeaderText from "../header-text";

export default function LicenseSection() {
  const handleClick = () => {
    const duration = 1 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <section className="flex items-center pt-24 max-w-6xl mx-auto gap-12 justify-between md:flex-row flex-col">
      <HeaderText
        title="Free and Open Source"
        description="Upscayl Desktop continues to be the best free and open source image upscaler for Linux, MacOS and Windows with new features and improvements."
        className="sm:max-w-md"
      >
        <p className="text-muted-foreground font-medium">Made With Love</p>
      </HeaderText>

      <div className="grid w-full gap-3 rounded-3xl border border-border/50 bg-card p-2 md:max-w-md grid-cols-2 [&>a,&>div]:cursor-pointer [&>a,&>div]:rounded-2xl [&>a,&>div]:bg-secondary/60 [&>a,&>div]:p-8 [&>a,&>div]:transition-colors [&>a,&>div]:hover:bg-secondary">
        <a
          href="https://github.com/upscayl/upscayl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Upscayl source code on GitHub"
          className="col-span-2 flex items-center justify-center gap-3"
        >
          <img src="download/github.svg" alt="" className="w-14" />
          <p className="text-2xl font-bold">Open Source</p>
        </a>

        <a
          href="https://github.com/upscayl/upscayl/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Upscayl License GitHub"
          className="flex items-center justify-center"
        >
          <img src="download/agpl.svg" alt="AGPL-3.0 License" className="w-52" />
        </a>

        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className="flex items-center justify-center gap-2"
        >
          <GiftIcon className="size-9" />
          <span className="text-2xl font-semibold">FREE</span>
        </motion.div>
      </div>
    </section>
  );
}
