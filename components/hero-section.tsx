"use client";

/* eslint-disable @next/next/no-img-element */
import Autoscroll from "embla-carousel-auto-scroll";
import { SplitText } from "./split-text";
import GrainientBackground from "./grainient-background";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useRef } from "react";

const logos = [
  {
    src: "/logos/digitaltrends.png",
    alt: "Digital Trends",
    className: "invert",
  },
  {
    src: "/logos/makeuseof.png",
    alt: "Make Use Of",
    className: "invert",
  },
  {
    src: "/logos/gigazine.png",
    alt: "Gigazine",
    className: "invert",
  },
  {
    src: "/logos/howtogeek.png",
    alt: "How To Geek",
    className: "invert",
  },
  {
    src: "/logos/ycombinator.png",
    alt: "Y-Combinator",
    className: "invert",
  },
  {
    src: "/logos/itsfossnews.png",
    alt: "It's Foss News",
    className: "invert",
  },
  {
    src: "/logos/beebom.png",
    alt: "Beebom",
    className: "invert",
  },
  {
    src: "/logos/geekworkers.png",
    alt: "Geek Workers",
    className: "invert",
  },
  {
    src: "/logos/nerdschalk.png",
    alt: "Nerds Chalk",
    className: "invert",
  },
  {
    src: "/logos/reddit.png",
    alt: "Reddit",
    className: "invert",
  },
  {
    src: "/logos/medium.png",
    alt: "Medium",
    className: "invert",
  },
  {
    src: "/logos/linuxuprising.png",
    alt: "Linux Uprising",
    className: "invert",
  },
];

export default function HeroSection() {
  const carouselRef = useRef(null);

  return (
    <section className="items-center relative flex flex-col justify-center h-full min-h-screen">
      <div className="absolute inset-0 -z-10 bg-black/40"></div>
      <div className="absolute inset-0 -z-20">
        <GrainientBackground
          color1="#000000"
          color2="#4a78df"
          color3="#000000"
          timeSpeed={0.25}
          colorBalance={-0.02}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={1.5}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.27}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.05}
          grainScale={2}
          grainAnimated={false}
          contrast={1.4}
          gamma={1}
          saturation={1}
          centerX={0.1}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="flex items-center justify-center flex-col max-w-2xl text-center">
        <img src="/icon.png" alt="" className="w-28 mb-8" />
        <SplitText
          text={
            <h1 className="text-7xl font-semibold">
              <span className="text-slate-500 font-medium">From</span> Science
              Fiction <span className="text-slate-500 font-medium">to</span>{" "}
              Reality
            </h1>
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
        <p className="font-medium text-xl text-slate-300">
          Supercharging your images with AI
        </p>
      </div>

      <div
        className="flex absolute bottom-8 flex-col"
        ref={carouselRef}
        id="carousel"
      >
        <p className="mb-1 text-center font-bold text-foreground/30">
          AS SEEN ON
        </p>
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoscroll({
              speed: 2,
              direction: "forward",
              playOnInit: true,
            }),
          ]}
          className="side-fade mx-auto max-w-3xl overflow-hidden"
        >
          <CarouselContent className="mx-65">
            {logos.map((logo, idx) => (
              <CarouselItem key={idx} className="">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={cn(
                    "h-full object-contain px-10 opacity-60",
                    logo.className,
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
