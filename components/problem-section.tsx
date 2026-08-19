/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { SplitText } from "./split-text";
import { Button } from "./ui/button";
import React, { useRef, useState, useEffect, useId } from "react";
import { AnimatePresence, motion } from "motion/react";

const problems = [
  {
    img: "/home/problem-1.webp",
    label: "Problem",
    title: "Low resolution is no fun!",
    body: "Got a blurry photo or a pixelated mess? Love the memories but hate the quality? We’ve all been there.",
    flip: false,
  },
  {
    img: "/home/problem-2.webp",
    label: "Expensive",
    title: "Heaven help you",
    body: "Okay, so you need to up your image game. You could try guessing your way through image editing or spend a ton of cash on complicated software or help (ouch, your wallet just died 🙃). Or maybe keep squinting at the screen, that might work, but let’s not count on it.",
    flip: true,
  },
  {
    img: "/home/problem-3.webp",
    label: "The Solution",
    title: "We’ve got you covered",
    body: "Here’s Upscayl — an AI image upscaler that turns fuzzy photos into clear works of art! Easy to use and fun to say, it’s the magic wand your images have been waiting for. Give Upscayl a spin, and your images will thank you!",
    flip: false,
  },
];

const ProblemCard = React.forwardRef<
  HTMLDivElement,
  {
    serial: number;
    img: string;
    label: string;
    title: string;
    body: string;
    flip?: boolean;
  }
>(({ serial, img, label, title, body, flip = false }, ref) => {
  return (
    <div
      ref={ref}
      data-index={serial}
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
          <Button size="sm">{label}</Button>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
      </div>
    </div>
  );
});

ProblemCard.displayName = "ProblemCard";

export default function ProblemSection() {
  const componentId = useId();

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const intersecting = useRef<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            intersecting.current.add(index);
          } else {
            intersecting.current.delete(index);
          }
        });

        if (intersecting.current.size > 0) {
          setActiveIndex(Math.max(...intersecting.current));
        }
      },
      {
        rootMargin: `-104px 0px -${
          typeof window !== "undefined" ? window.innerHeight - 104 - 2 : 0
        }px 0px`,
        threshold: 0,
      },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
            {problems.map((p, idx) => (
              <p
                className="space-x-3 text-4xl font-bold overflow-hidden"
                key={`${componentId}-label-${idx}`}
              >
                <span className="text-muted-foreground text-sm font-semibold">
                  0{idx}
                </span>
                <span className="relative inline-block overflow-hidden align-bottom">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {activeIndex < idx + 1 ? (
                      <motion.span
                        key="inactive"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-muted-foreground block"
                      >
                        {p.label}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="active"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="block"
                      >
                        {p.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-6 [&>div]:sticky [&>div]:top-26 lg:space-y-32">
          {problems.map((problem, idx) => (
            <ProblemCard
              key={`${componentId}-${idx}`}
              ref={(el) => {
                refs.current[idx] = el;
              }}
              serial={idx + 1}
              img={problem.img}
              label={problem.label}
              title={problem.title}
              body={problem.body}
              flip={problem.flip}
            />
          ))}
          <div className="h-40"></div>
        </div>
      </div>
    </div>
  );
}
