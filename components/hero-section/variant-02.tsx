"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LoaderCircle } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useRef, useState } from "react"
import GradientWaves from "../gradient-waves"
import { Button } from "../ui/button"

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Draggable, Flip)

type Card = {
  number: string
  title: string
  icon: string
  image: string
  hidden?: boolean
  horizonColor: string
  waveColor: string
  crestColor: string
}

const cards: Card[] = [
  {
    number: "01",
    title: "Dragon",
    icon: "/hero/dragon-icon.webp",
    image: "/hero/dragon.webp",
    horizonColor: "#5227FF",
    waveColor: "#FF9FFC",
    crestColor: "#FFFFFF",
  },
  {
    number: "02",
    title: "Tux",
    icon: "/hero/tux-icon.webp",
    image: "/hero/tux.webp",
    horizonColor: "#00B4D8",
    waveColor: "#90E0EF",
    crestColor: "#CAF0F8",
  },
  {
    number: "03",
    title: "Fox",
    icon: "/hero/fox-icon.webp",
    image: "/hero/fox.webp",
    horizonColor: "#FF6B35",
    waveColor: "#FFB703",
    crestColor: "#FFF3B0",
  },
  {
    number: "04",
    title: "Cat",
    icon: "/hero/cat-icon.webp",
    image: "/hero/cat.webp",
    horizonColor: "#7B2CBF",
    waveColor: "#C77DFF",
    crestColor: "#E0AAFF",
  },
  {
    number: "05",
    title: "Lion",
    icon: "/hero/lion-icon.webp",
    image: "/hero/lion.webp",
    horizonColor: "#00897B",
    waveColor: "#4DB6AC",
    crestColor: "#B2DFDB",
  },
]

const SCROLL_DISTANCE = 400 // Greater value, slow the scroll will be

export default function HeroSectionVariant02() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useGSAP(
    () => {
      const wheel = document.querySelector("#wheel") as HTMLDivElement
      const wheelContainer = document.querySelector("#wheel-container")
      const cards = gsap.utils.toArray(".wheel__card") as HTMLDivElement[]

      const totalArcDeg = 140
      const angleStepDeg =
        cards.length > 1 ? totalArcDeg / (cards.length - 1) : 0

      function setup() {
        const radius = wheel.offsetHeight / 2
        const center = wheel.offsetWidth / 2

        const angleStep = (angleStepDeg * Math.PI) / 180 // 15° between cards, tweak to taste

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

      setIsReady(true)

      const totalAngle = (cards.length - 1) * angleStepDeg

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

      function createScrollRotation() {
        gsap.to(wheel, {
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
          },
        })
      }

      const introTl = gsap.timeline({ onComplete: createScrollRotation })

      introTl
        .fromTo(
          "#loading",
          { height: "100%" },
          {
            height: 0,
            delay: 0.2,
            duration: 1.2,
            ease: "power3.out",
          },
        )
        .fromTo(
          "#center-box",
          {
            opacity: 0,
            scale: 0.5,
            filter: "grayscale(1)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "grayscale(0)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .fromTo(
          wheelContainer,
          { y: 1500 },
          { y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.8",
        )
        .fromTo(
          wheel,
          { rotation: -360 },
          {
            rotation: 0,
            duration: 1.4,
            ease: "power3.out",
            onComplete: createScrollRotation,
          },
          "<",
        )

      introTl
        .fromTo(
          "#heading h1",
          { y: 180, scale: 0.85 },
          { y: 0, scale: 1, duration: 1, ease: "power3.out" },
        )
        .fromTo(
          "#heading p",
          { y: 170, scale: 0.85 },
          { y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          "#heading-container button",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
        )

        .set("#heading h1, #heading p", {
          filter: "blur(20px)",
          opacity: 0,
          scale: 0.9,
          fontFamily: "var(--font-heading)",
        })
        .to("#heading h1, #heading p", {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
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
      {!isReady && (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-999">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
      <div
        id="loading"
        className="fixed left-0 right-0 bottom-0 bg-background  z-10"
      ></div>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div className="size-full flex items-center justify-center relative">
          <div className="size-full absolute inset-0">
            <GradientWaves
              horizonColor={cards[activeIndex].horizonColor}
              waveColor={cards[activeIndex].waveColor}
              crestColor={cards[activeIndex].crestColor}
              speed={0.4}
              amplitude={2.5}
              waveScale={0.6}
              waveRatio={0.9}
              swell={35}
              turbulence={20}
              tilt={1.11}
              zoom={1}
              height={5.5}
              fogDepth={15}
              detail="medium"
              brightness={1}
              opacity={1}
              mouseInteraction
              parallaxStrength={0.5}
              grain
              grainIntensity={0.05}
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
                      loading="eager"
                    />
                  ),
              )}
            </AnimatePresence>
          </div>
          <div id="wheel-container" className="w-full relative">
            <div
              id="wheel"
              className="absolute -top-14 flex items-center justify-center w-[300vh] h-[300vh] max-w-[2000px] max-h-[2000px] left-1/2 -translate-x-1/2"
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
                      loading="eager"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            id="heading-container"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
          >
            <Button
              variant="outline"
              className="rounded-full border-2 bg-white/10 border-white/20 backdrop-blur-lg"
            >
              <div className="size-2 rounded-full bg-green-400" />
              New Upscayl Cloud is Out
            </Button>

            <div
              id="heading"
              className="flex flex-col items-center gap-2 text-center font-bytesized"
            >
              <h1 className="max-w-2xl text-5xl font-bold">
                From Science Fiction to Reality
              </h1>

              <p className="max-w-2xl text-lg text-muted-foreground">
                Supercharging your images with AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
