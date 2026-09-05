"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useRef, useState } from "react"
import DarkVeil from "@/components/dark-vail"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Draggable, Flip)

type Card = {
  number: string
  title: string
  icon: string
  image: string
  hidden?: boolean
}

const cards: Card[] = [
  {
    number: "01",
    title: "Dragon",
    icon: "/hero/dragon-icon.webp",
    image: "/hero/dragon.webp",
  },
  {
    number: "02",
    title: "Tux",
    icon: "/hero/tux-icon.webp",
    image: "/hero/tux.webp",
  },
  {
    number: "03",
    title: "Fox",
    icon: "/hero/fox-icon.webp",
    image: "/hero/fox.webp",
  },
  {
    number: "04",
    title: "Cat",
    icon: "/hero/cat-icon.webp",
    image: "/hero/cat.webp",
  },
  {
    number: "05",
    title: "Lion",
    icon: "/hero/lion-icon.webp",
    image: "/hero/lion.webp",
  },
]

const SCROLL_DISTANCE = 400 // Greater value, slow the scroll will be

export default function HeroSectionVariant02() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

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

      const totalArcDeg = 140
      const angleStepDeg =
        cards.length > 1 ? totalArcDeg / (cards.length - 1) : 0

      function setup() {
        const radius = wheel.offsetHeight / 2
        const center = wheel.offsetWidth / 2

        // degrees between each card — smaller = tighter cluster
        const angleStep = (angleStepDeg * Math.PI) / 180 // 15° between cards, tweak to taste

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

      const totalAngle = (cards.length - 1) * angleStepDeg
      // const snapPoints = cards.map(
      //   (_, idx) => (idx * angleStepDeg) / totalAngle,
      // )

      const scrollDistance = cards.length * SCROLL_DISTANCE + 300

      // track last set index to avoid redundant state updates
      let lastIndex = -1

      function updateActiveByProximity(progress: number) {
        const currentAngle = progress * totalAngle // how far the wheel has rotated so far

        let closestIdx = 0
        let closestDist = Infinity

        cards.forEach((_, idx) => {
          const cardAngle = idx * angleStepDeg
          const dist = Math.abs(cardAngle - currentAngle) // how far this card is from "front"

          if (dist < closestDist) {
            closestDist = dist
            closestIdx = idx
          }
        })

        if (closestIdx !== lastIndex) {
          lastIndex = closestIdx
          setActiveIndex(closestIdx)
        }
      }

      gsap.to("#wheel", {
        rotate: () => -totalAngle,
        ease: "none",
        duration: cards.length,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateActiveByProximity(self.progress),
          onLeave: () => updateActiveByProximity(1),
          onEnterBack: () => updateActiveByProximity(1),
          /// -------------
          /// SNAP METHOD (Too much hack required)
          // --------------
          // onUpdate: (self) => {
          //   if (self.progress >= 0.999) {
          //     setActiveIndex(cards.length - 1)
          //   } else if (self.progress <= 0.001) {
          //     setActiveIndex(0)
          //   }
          // },
          // onLeave: () => setActiveIndex(cards.length - 1),
          // onEnterBack: () => setActiveIndex(cards.length - 1),
          // snap: {
          //   snapTo: (value) => {
          //     const snapped = gsap.utils.snap(snapPoints, value)
          //     const index = snapPoints.indexOf(snapped)
          //
          //     setActiveIndex(index)
          //
          //     return snapped
          //   },
          //   duration: 0.12,
          //   delay: 0.12,
          //   ease: "power2.out",
          // },
        },
      })
    },
    { scope: sectionRef },
  )

  const MotionImage = motion.create(Image)

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: `calc(100vh + ${cards.length * SCROLL_DISTANCE + 400}px)`,
      }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div className="size-full flex items-center justify-center relative">
          <div className="size-full absolute inset-0">
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
            className="absolute w-2xl rounded-2xl left-1/2 bottom-1/2 translate-y-1/2 -translate-x-1/2 aspect-video  z-10 overflow-hidden bg-background"
          >
            <AnimatePresence mode="sync">
              {cards.map(
                (s, idx) =>
                  !s.hidden &&
                  activeIndex === idx && (
                    <MotionImage
                      key={s.title}
                      src={s.image}
                      alt={s.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      width={1920}
                      height={1080}
                      className="absolute inset-0 size-full object-cover rounded-2xl"
                    />
                  ),
              )}
            </AnimatePresence>
          </div>
          <div className="w-full relative">
            <div
              id="wheel"
              className="absolute top-0 flex items-center justify-center w-[300vh] h-[300vh] max-w-[2000px] max-h-[2000px] left-1/2 -translate-x-1/2"
            >
              {cards.map((s) => (
                <div
                  key={`image-${s.number}`}
                  className="absolute top-0 left-0 w-[20%] max-w-50 aspect-square cursor-pointer rounded-4xl overflow-hidden wheel__card bg-zinc-900 shadow-xl shadow-zinc-950 ring-zinc-500 ring-4"
                  style={{
                    backgroundImage: `url(${s.icon})`,
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="size-full flex backdrop-blur-xl bg-black/40 items-center justify-center">
                    <Image
                      src={s.icon}
                      alt=""
                      width={512}
                      height={512}
                      className="w-20 object-cover pointer-none  cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-10 flex flex-col text-center items-center gap-2 left-[50%] -translate-x-1/2 text-sm">
            <h1 className="text-5xl font-bold max-w-2xl">
              From Science Fiction to Reality
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Supercharging your images with AI
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
