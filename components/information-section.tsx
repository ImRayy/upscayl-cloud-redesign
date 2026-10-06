/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./split-text";
import { useGSAP } from "@gsap/react";
import { useRef, useId } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const highlights = [
  {
    key: "highlight-1",
    src: "https://w.wallhaven.cc/full/3q/wallhaven-3q6m6y.png",
    h: "Low resolution is no fun!",
    p: `
Got a blurry photo or a pixelated mess? Love the memories but hate the quality?

We’ve all been there.
`,
  },
  {
    key: "highlight-2",
    src: "https://w.wallhaven.cc/full/ml/wallhaven-mlg7qm.png",
    h: "Heaven help you",
    p: `
Okay, so you need to up your image game.

You could try guessing your way through image editing or spend a ton of cash on complicated software or help (ouch, your wallet just died 🙃).

Or maybe keep squinting at the screen, that might work, but let’s not count on it.
`,
  },
  {
    key: "highlight-3",
    src: "https://w.wallhaven.cc/full/ml/wallhaven-mlg59k.jpg",
    h: "We’ve got you covered",
    p: `
Here’s Upscayl — an AI image upscaler that turns fuzzy photos into clear works of art! Easy to use and fun to say, it’s the magic wand your images have been waiting for.

Give Upscayl a spin, and your images will thank you!
`,
  },
];

export default function InformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getScrollWidth = () => container.scrollWidth - window.innerWidth;

        const maxTravel = () => Math.min(getScrollWidth(), window.innerHeight * 2)

        const tween = gsap.to(container, {
          x: () => -getScrollWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            end: () => `+=${maxTravel()}`,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div
        ref={containerRef}
        className="flex [&>div]:w-screen w-max min-h-screen"
      >
        <div className=" flex items-center justify-center ">
          <div className="flex flex-col max-w-3xl justify-center items-center text-center gap-3">
            <SplitText
              text={
                <h2 className="text-6xl font-bold">
                  Upscayl your pixels, enhance your life.
                </h2>
              }
              tag="div"
              className="text-center flex-col max-w-4xl gap-3"
              delay={30}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />

            <p className="text-lg text-slate-300 max-w-lg">
              Upscayl lets you enhance your images using AI. Hassle free and
              easy to use.
            </p>
          </div>
        </div>
        {highlights.map((h) => (
          <div
            className="flex flex-col items-center justify-center"
            key={h.key}
          >
            <img src={h.src} alt="" className="w-[80%]" />
          </div>
        ))}
      </div>
    </section>
  );
}
