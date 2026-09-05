"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { type ReactNode, useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    const update = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(update)

    lenis.on("scroll", ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
