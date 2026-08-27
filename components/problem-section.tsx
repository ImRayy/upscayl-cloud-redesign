/* eslint-disable @next/next/no-img-element */

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

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
]

const ProblemCard = React.forwardRef<
  HTMLDivElement,
  {
    serial: number
    img: string
    label: string
    title: string
    body: string
    flip?: boolean
    className?: string
  }
>(({ serial, img, label, title, body, className, flip = false }, ref) => {
  return (
    <div
      ref={ref}
      data-index={serial}
      id={`card-${serial}`}
      className={cn(
        "rounded-xl  bg-background p-2 border flex md:flex-row gap-4 flex-col",
        { "md:flex-row-reverse": flip },
        className,
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
  )
})

ProblemCard.displayName = "ProblemCard"

export default function ProblemSection() {
  const componentId = useId()

  const containerRef = useRef(null)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const intersecting = useRef<Set<number>>(new Set())

  const [activeIndex, setActiveIndex] = useState(1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            intersecting.current.add(index)
          } else {
            intersecting.current.delete(index)
          }
        })

        if (intersecting.current.size > 0) {
          setActiveIndex(Math.max(...intersecting.current))
        }
      },
      {
        rootMargin: `-104px 0px -${
          typeof window !== "undefined" ? window.innerHeight - 104 - 2 : 0
        }px 0px`,
        threshold: 0,
      },
    )

    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      gsap.from("#heading h1, #subheading p", {
        scrollTrigger: {
          trigger: "#header",
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1.1,
        },
        stagger: 0.5,
        scaleY: 1.1,
        opacity: 0,
        y: "100%",
      })

      mm.add("(min-width: 1280px)", () => {
        gsap.from("#card-topic, #cards", {
          scrollTrigger: {
            trigger: "#cards-container",
            start: "top 110%",
            end: "top+=600 center",
            scrub: 1.2,
          },
          opacity: 0,
          y: "100%",
        })
      })

      mm.add("(max-width: 1279px)", () => {
        gsap.from("#card-1, #card-2, #card-3", {
          scrollTrigger: {
            trigger: "#cards",
            start: "top 80%",
            end: "top+=600 center",
            scrub: 1.2,
          },
          opacity: 0,
          y: "100%",
          stagger: 0.3,
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="min-h-screen p-6 max-w-7xl mx-auto relative"
    >
      {/* Heading */}

      <div id="header">
        <div id="heading">
          <h1 className="text-4xl font-semibold">
            Upscayl your pixels, enhance your life.
          </h1>
        </div>

        <div id="subheading">
          <p className="text-lg text-slate-300 max-w-lg">
            Upscayl lets you enhance your images using AI. Hassle free and easy
            to use.
          </p>
        </div>
      </div>

      <div
        id="cards-container"
        className="flex-row  flex gap-48 pt-10 xl:pt-20"
      >
        <div id="card-topic" className="shrink-0 hidden lg:block">
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
        <div
          id="cards"
          className="space-y-6 xl:[&>div]:sticky [&>div]:top-26 lg:space-y-32"
        >
          {problems.map((problem, idx) => (
            <ProblemCard
              key={`${componentId}-${idx}`}
              ref={(el) => {
                refs.current[idx] = el
              }}
              serial={idx + 1}
              img={problem.img}
              label={problem.label}
              title={problem.title}
              body={problem.body}
              flip={problem.flip}
              className={activeIndex === 3 && idx < 2 ? "opacity-0" : ""}
            />
          ))}

          <div className="h-40"></div>
        </div>
      </div>
    </section>
  )
}
