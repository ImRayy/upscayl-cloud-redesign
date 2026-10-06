"use client"

import {
  animate,
  useMotionValue,
  type ValueAnimationTransition,
} from "motion/react"
import { type CSSProperties, useEffect, useLayoutEffect, useRef } from "react"

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type FadeOptions = ValueAnimationTransition<number>

interface ScrollBlurProps {
  direction?: "top" | "bottom"
  maxBlur?: number
  layerCount?: number
  holdMs?: number
  fadeIn?: FadeOptions
  fadeOut?: FadeOptions
  className?: string
  style?: CSSProperties
}

export default function ScrollBlur({
  direction = "bottom",
  maxBlur = 12,
  layerCount = 6,
  holdMs = 20,
  fadeIn = { type: "spring", stiffness: 300, damping: 30 },
  fadeOut = { type: "spring", stiffness: 540, damping: 99 },
  className,
  style,
}: ScrollBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const strength = useMotionValue(0)
  const scrolling = useRef(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeAnimation = useRef<ReturnType<typeof animate> | null>(null)

  useIsoLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return
    const apply = (v: number) =>
      node.style.setProperty("--scroll-blur", String(Math.max(0, v)))
    apply(strength.get())
    return strength.on("change", apply)
  }, [strength])

  // Drive the motion value from real scroll events.
  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current)
        idleTimer.current = null
      }
    }

    const handleScroll = () => {
      if (!scrolling.current) {
        scrolling.current = true
        activeAnimation.current = animate(strength, 1, fadeIn)
      }
      clearIdleTimer()
      idleTimer.current = setTimeout(() => {
        scrolling.current = false
        activeAnimation.current = animate(strength, 0, fadeOut)
      }, holdMs)
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    })
    return () => {
      window.removeEventListener("scroll", handleScroll, {
        capture: true,
      })
      clearIdleTimer()
      activeAnimation.current?.stop()
    }
  }, [strength, fadeIn, fadeOut, holdMs])

  const gradientDirection = direction === "top" ? "to bottom" : "to top"
  const step = 100 / layerCount

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      {Array.from({ length: layerCount }, (_, i) => {
        const layerBlur = (maxBlur * (i + 1)) / layerCount
        const edge = 100 - i * step
        const start = Math.max(0, edge - step)
        const mask = `linear-gradient(${gradientDirection}, #fff 0%, #fff ${start}%, transparent ${edge}%)`
        const filter = `blur(calc(var(--scroll-blur, 0) * ${layerBlur}px))`

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: filter,
              WebkitBackdropFilter: filter,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}
    </div>
  )
}
