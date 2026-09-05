/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: false */
"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"
import DarkVeil from "@/components/dark-vail"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Draggable, Flip)

type Series = {
  number: string
  title: string
  icon: string
  image: string
  hidden?: boolean
}

const series: Series[] = [
  {
    number: "01",
    title: "Dragon",
    icon: "hero/dragon-icon.webp",
    image: "hero/dragon.webp",
  },
  {
    number: "02",
    title: "Tux",
    icon: "hero/tux-icon.webp",
    image: "hero/tux.webp",
  },
  {
    number: "03",
    title: "Fox",
    icon: "hero/fox-icon.webp",
    image: "hero/fox.webp",
  },
  {
    number: "04",
    title: "Cat",
    icon: "hero/cat-icon.webp",
    image: "hero/cat.webp",
  },
  {
    number: "05",
    title: "Lion",
    icon: "hero/lion-icon.webp",
    image: "hero/lion.webp",
  },
]

export default function RotatingWheelSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wheel = document.querySelector("#wheel") as HTMLDivElement
      const cards = gsap.utils.toArray(".wheel__card") as HTMLDivElement[]

      gsap.to(".arrow", {
        y: 5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })

      function setup() {
        const radius = wheel.offsetHeight / 2
        const center = wheel.offsetWidth / 2

        // degrees between each card — smaller = tighter cluster
        const angleStep = (35 * Math.PI) / 180 // 15° between cards, tweak to taste

        // center the whole arc around the top (angle 0)
        // const startAngle = -((total - 1) * angleStep) / 2

        const startAngle = 0

        cards.forEach((item, idx) => {
          const angle = startAngle + idx * angleStep

          const x = center + radius * Math.sin(angle)
          const y = center - radius * Math.cos(angle)

          gsap.set(item, {
            rotation: `${angle}_rad`,
            xPercent: -50,
            yPercent: -50,
            x,
            y,
          })
        })
      }

      setup()

      window.addEventListener("resize", setup)

      const angleStepDeg = 35
      const snapPoints = cards.map((_, idx) => (idx * angleStepDeg) / 360)

      gsap.to("#wheel", {
        rotate: () => -360,
        ease: "none",
        duration: cards.length,
        scrollTrigger: {
          start: 0,
          end: "+=5000",
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => {
              const snapped = gsap.utils.snap(snapPoints, value)
              const index = snapPoints.indexOf(snapped)

              setActiveIndex(index)

              return snapped
            },
            duration: 0.12,
            delay: 0.12,
            ease: "power2.out",
          },
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <div ref={mainRef} className="relative w-full h-[293vh]">
      <div className="size-full fixed inset-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.06}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      <div
        id="center-box"
        className="fixed w-2xl rounded-2xl left-1/2 bottom-1/2 translate-y-1/2 -translate-x-1/2 aspect-video  z-10 overflow-hidden bg-background"
      >
        <AnimatePresence mode="sync">
          {series.map(
            (s, idx) =>
              !s.hidden &&
              activeIndex === idx && (
                <motion.img
                  key={s.title}
                  src={s.image}
                  alt={s.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 size-full object-cover"
                />
              ),
          )}
        </AnimatePresence>
      </div>
      <section ref={sectionRef} className="h-[50vh] bottom-0 fixed w-full">
        <div
          id="wheel"
          className="absolute top-0 flex items-center justify-center w-[300vh] h-[300vh] max-w-[2000px] max-h-[2000px] left-1/2 -translate-x-1/2"
        >
          {series.map((s) => (
            <div
              key={`image-${s.number}`}
              className="absolute top-0 left-0 w-[20%] max-w-50 aspect-square cursor-pointer rounded-xl overflow-hidden wheel__card"
            >
              <img
                src={s.image}
                alt=""
                className="size-full object-cover pointer-none  cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>
      <div className="fixed flex flex-col text-center items-center gap-2 bottom-5 left-[50%] -translate-x-1/2 text-sm">
        <h1 className="text-5xl font-bold max-w-2xl">
          From Science Fiction to Reality
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Supercharging your images with AI
        </p>
      </div>
    </div>
  )
}
