/* eslint-disable @next/next/no-img-element */
import ReactLenis from "lenis/react";
import { cn } from "@/lib/utils";
import { SplitText } from "./split-text";
import { Button } from "./ui/button";
import { useRef } from "react";

const ProblemCard = ({
  serial,
  img,
  title,
  body,
  flip = false,
}: {
  serial: number;
  img: string;
  title: string;
  body: string;
  flip?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl  bg-background p-2 border flex md:flex-row gap-4 flex-col",
        { "md:flex-row-reverse": flip },
      )}
      style={{
        zIndex: serial,
      }}
    >
      <div className="aspect-video max-w-full md:aspect-square md:max-w-1/2 shrink-0  overflow-hidden rounded-xl ">
        <img src={img} alt="" className="size-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-4 w-full">
        <div className="inline-flex items-center justify-between">
          <span className="font-semibold  tracking-widest">/0{serial}</span>
          <Button size="lg">Problem</Button>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default function ProblemSection() {
  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto relative">
      {/* Heading */}
      <SplitText
        text={
          <h2 className="text-4xl font-semibold">
            Upscayl your pixels, enhance your life.
          </h2>
        }
        tag="div"
        className="text-center flex-col  gap-3"
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
        Upscayl lets you enhance your images using AI. Hassle free and easy to
        use.
      </p>

      <div className="flex-row  flex gap-48 pt-22">
        <div className="shrink-0 hidden lg:block">
          <div className="sticky top-26 space-y-3">
            <p className="space-x-4">
              <span>01</span>{" "}
              <span className="text-3xl font-bold">Problem</span>
            </p>
            <p className="space-x-4">
              <span>02</span>{" "}
              <span className="text-3xl font-bold">Problem Two</span>
            </p>
            <p className="space-x-4">
              <span>03</span>{" "}
              <span className="text-3xl font-bold">Solution</span>
            </p>
          </div>
        </div>
        <div className="space-y-6 [&>div]:sticky [&>div]:top-26 lg:space-y-32">
          <ProblemCard
            img="/home/problem-1.webp"
            title="Low resolution is no fun!"
            body="Got a blurry photo or a pixelated mess? Love the memories but hate the quality? We’ve all been there."
            serial={1}
          />

          <ProblemCard
            img="/home/problem-2.webp"
            title="Heaven help you"
            body="Okay, so you need to up your image game. You could try guessing your way through image editing or spend a ton of cash on complicated software or help (ouch, your wallet just died 🙃). Or maybe keep squinting at the screen, that might work, but let’s not count on it."
            serial={2}
            flip
          />

          <ProblemCard
            img="/home/problem-3.webp"
            title="We’ve got you covered"
            body="Here’s Upscayl — an AI image upscaler that turns fuzzy photos into clear works of art! Easy to use and fun to say, it’s the magic wand your images have been waiting for. Give Upscayl a spin, and your images will thank you!"
            serial={3}
          />
          <div className="h-40"></div>
        </div>
      </div>
    </div>
  );
}
