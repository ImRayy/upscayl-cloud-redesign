"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85, // shorter glide — one wheel notch no longer scrolls for over a second
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    })
    lenisRef.current = lenis

    const update = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(update)
    // Without this, GSAP's ticker feeds Lenis lag-smoothed deltas whenever the
    // main thread hiccups (shaders, big images) → janky/rubber-band scrolling.
    gsap.ticker.lagSmoothing(0)

    lenis.on("scroll", ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // When the route changes, the new page may be shorter, restore its own scroll
  // position (App Router), and re-create all ScrollTriggers. Lenis keeps
  // animating toward the old, now out-of-range target — leaving scroll "stuck".
  // Reset hard and re-measure so the fresh page starts from a clean state.
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    lenis.scrollTo(0, { immediate: true })
    lenis.resize()
    ScrollTrigger.refresh()
  }, [pathname])

  return <>{children}</>
}

