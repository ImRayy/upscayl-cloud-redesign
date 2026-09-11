import { motion } from "motion/react"
import type React from "react"
import { type JSX, useEffect, useRef, useState } from "react"
import UpscaylSVGLogo from "@/components/icons/upscayl-logo-svg"

const GLASS_CONTAINER: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px) saturate(1.3)",
  WebkitBackdropFilter: "blur(12px) saturate(1.3)",
  boxShadow:
    "0 0 0 0.5px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
}

const GLASS_SHINE =
  "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 60%, transparent 90%)"

const PHASES = ["cnn", "diffusion", "gan"] as const
type Phase = (typeof PHASES)[number]

// Kernel scan path — shared between clip rect and border overlay
const KERNEL_SIZE = 18
const SCAN_PATH = {
  x: [-14, 14, -14, 14, -14],
  y: [-14, -14, 0, 14, 14],
}
const SCAN_TRANSITION = {
  duration: 2.8,
  ease: "easeInOut" as const,
  repeat: Infinity,
}

function GlassPhaseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div
        className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl"
        style={GLASS_CONTAINER}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: GLASS_SHINE }}
        />
        {children}
      </div>
    </div>
  )
}

/**
 * CNN Phase — A scanning kernel grid slides across the logo,
 * extracting features like a convolutional filter.
 * Only the area within the kernel is sharp; the rest is blurred.
 */
function CNNPhase() {
  const [clip, setClip] = useState("inset(0px 0px 0px 0px)")
  const containerSize = 64
  const half = KERNEL_SIZE / 2

  return (
    <GlassPhaseWrapper>
      <div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ filter: "blur(3px)", opacity: 0.5 }}
      >
        <UpscaylSVGLogo className="h-10 w-10" />
      </div>

      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ clipPath: clip }}
      >
        <UpscaylSVGLogo className="h-10 w-10" />
      </div>

      <motion.div
        className="pointer-events-none absolute z-20 rounded-[3px]"
        style={{
          width: KERNEL_SIZE,
          height: KERNEL_SIZE,
          border: "1.5px solid rgba(135,189,255,0.5)",
          background: "rgba(135,189,255,0.05)",
          boxShadow:
            "0 0 8px rgba(135,189,255,0.12), inset 0 0 4px rgba(135,189,255,0.08)",
        }}
        animate={SCAN_PATH}
        transition={SCAN_TRANSITION}
        onUpdate={(latest) => {
          const kx = typeof latest.x === "number" ? latest.x : 0
          const ky = typeof latest.y === "number" ? latest.y : 0
          const cx = containerSize / 2 + kx
          const cy = containerSize / 2 + ky
          const top = Math.max(0, cy - half)
          const right = Math.max(0, containerSize - (cx + half))
          const bottom = Math.max(0, containerSize - (cy + half))
          const left = Math.max(0, cx - half)
          setClip(`inset(${top}px ${right}px ${bottom}px ${left}px)`)
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0"
            style={{
              top: `${25 + i * 25}%`,
              height: 0.5,
              background: "rgba(135,189,255,0.08)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute bottom-0 top-0"
            style={{
              left: `${25 + i * 25}%`,
              width: 0.5,
              background: "rgba(135,189,255,0.08)",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
        ))}
      </div>

      {[
        { x: -8, y: -8, d: 0.8 },
        { x: 8, y: -8, d: 1.2 },
        { x: 0, y: 0, d: 1.6 },
        { x: -8, y: 8, d: 2.0 },
        { x: 8, y: 8, d: 2.4 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute z-20 rounded-full"
          style={{
            width: 4,
            height: 4,
            background: "rgba(135,189,255,0.6)",
            boxShadow: "0 0 6px rgba(135,189,255,0.3)",
            left: "50%",
            top: "50%",
            marginLeft: dot.x - 2,
            marginTop: dot.y - 2,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
          transition={{
            delay: dot.d,
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </GlassPhaseWrapper>
  )
}

/**
 * Diffusion Phase — The logo emerges from buzzing TV static noise,
 * mimicking the denoising process of a diffusion model.
 */
const DIFFUSION_CYCLE = 3.5
const STATIC_SIZE = 40
const STATIC_SCALE = 1

function useStaticNoise(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rafRef = useRef<number>(0)
  const opacityRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = STATIC_SIZE
    const h = STATIC_SIZE
    const imageData = ctx.createImageData(w, h)
    const data = imageData.data
    const startTime = performance.now()

    const draw = (now: number) => {
      const elapsed = ((now - startTime) / 1000) % DIFFUSION_CYCLE
      const progress = elapsed / DIFFUSION_CYCLE

      // 0..0.08: full opaque static
      // 0.08..0.3: dissolve to semi-transparent
      // 0.3..0.4: semi-transparent buzzing noise over blurry logo
      // 0.4..0.5: noise fades out, logo sharpens
      // 0.5..0.9: hold clear (shimmer at ~0.6)
      // 0.9..1: rebuild to full static
      let opacity: number
      if (progress < 0.08) opacity = 1
      else if (progress < 0.3) opacity = 1 - ((progress - 0.08) / 0.22) * 0.7
      else if (progress < 0.4) opacity = 0.3
      else if (progress < 0.5) opacity = 0.3 * (1 - (progress - 0.4) / 0.1)
      else if (progress < 0.9) opacity = 0
      else opacity = (progress - 0.9) / 0.1

      opacityRef.current = opacity

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.floor(Math.random() * 255)
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      canvas.style.opacity = String(opacity)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [canvasRef])

  return opacityRef
}

function DiffusionPhase() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useStaticNoise(canvasRef)

  return (
    <GlassPhaseWrapper>
      <canvas
        ref={canvasRef}
        width={STATIC_SIZE}
        height={STATIC_SIZE}
        className="pointer-events-none absolute z-20 rounded-md"
        style={{
          width: STATIC_SIZE * STATIC_SCALE,
          height: STATIC_SIZE * STATIC_SCALE,
          imageRendering: "pixelated",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div
        className="relative z-10"
        animate={{
          filter: [
            "blur(8px)",
            "blur(5px)",
            "blur(3px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
          ],
          opacity: [0, 0.4, 0.7, 1, 1, 1],
        }}
        transition={{
          duration: DIFFUSION_CYCLE,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <UpscaylSVGLogo className="h-10 w-10" />
      </motion.div>

      {/* Glass shimmer when logo is clear */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl"
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{
          duration: 1.2,
          delay: DIFFUSION_CYCLE * 0.5,
          repeat: Infinity,
          repeatDelay: DIFFUSION_CYCLE - 1.2,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, transparent 70%)",
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 0.8,
            delay: DIFFUSION_CYCLE * 0.52,
            repeat: Infinity,
            repeatDelay: DIFFUSION_CYCLE - 0.8,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </GlassPhaseWrapper>
  )
}

/**
 * GAN Phase — Two hue-shifted logos (Generator & Discriminator) converge
 * inside a frosted glass container. They clash with red flashes,
 * then merge into the final clear logo with a green acceptance glow.
 */
const GAN_CYCLE = 3.5

function GANPhase() {
  return (
    <GlassPhaseWrapper>
      {/* Generator — warm hue, approaches from left */}
      <motion.div
        className="absolute z-10"
        style={{
          filter: "hue-rotate(25deg) brightness(1.15)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [-10, -4, 0, 0, 0, -10],
          opacity: [0.4, 0.7, 0.8, 0, 0, 0.4],
        }}
        transition={{
          duration: GAN_CYCLE,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.5, 0.95, 1],
        }}
      >
        <UpscaylSVGLogo className="h-10 w-10" />
      </motion.div>

      {/* Discriminator — cool hue, approaches from right */}
      <motion.div
        className="absolute z-10"
        style={{
          filter: "hue-rotate(-25deg) brightness(0.85)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [10, 4, 0, 0, 0, 10],
          opacity: [0.4, 0.7, 0.8, 0, 0, 0.4],
        }}
        transition={{
          duration: GAN_CYCLE,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.5, 0.95, 1],
        }}
      >
        <UpscaylSVGLogo className="h-10 w-10" />
      </motion.div>

      {/* Red clash flash — as the two meet */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(248,113,113,0.18) 0%, transparent 70%)",
          boxShadow: "inset 0 0 16px rgba(248,113,113,0.1)",
        }}
        animate={{ opacity: [0, 0, 1, 0, 0] }}
        transition={{
          duration: GAN_CYCLE,
          repeat: Infinity,
          times: [0, 0.3, 0.4, 0.5, 1],
        }}
      />

      {/* Merged result — emerges after clash */}
      <motion.div
        className="z-15 relative"
        animate={{
          opacity: [0, 0, 1, 1, 1, 0],
          scale: [0.9, 0.9, 1, 1, 1, 0.9],
        }}
        transition={{
          duration: GAN_CYCLE,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.42, 0.55, 0.7, 0.92, 1],
        }}
      >
        <UpscaylSVGLogo className="h-10 w-10" />
      </motion.div>

      {/* Green acceptance glow — when merged logo appears */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)",
          boxShadow: "inset 0 0 16px rgba(74,222,128,0.08)",
        }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: GAN_CYCLE,
          repeat: Infinity,
          times: [0, 0.5, 0.58, 0.85, 0.93],
        }}
      />
    </GlassPhaseWrapper>
  )
}

const PHASE_COMPONENTS: Record<Phase, () => JSX.Element> = {
  cnn: CNNPhase,
  diffusion: DiffusionPhase,
  gan: GANPhase,
}

const DASHBOARD_LOADING_SCALE = 3.2

const DashboardLoading = () => {
  const [phase, setPhase] = useState<Phase | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(PHASES[Math.floor(Math.random() * PHASES.length)])
  }, [])

  if (!phase) {
    return (
      <div className="fixed inset-0 flex h-full w-full items-center justify-center" />
    )
  }

  const PhaseComponent = PHASE_COMPONENTS[phase]

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center">
      <div
        style={{
          transform: `scale(${DASHBOARD_LOADING_SCALE})`,
          transformOrigin: "center",
        }}
      >
        <PhaseComponent />
      </div>
    </div>
  )
}

export default DashboardLoading
export { PHASES, PHASE_COMPONENTS }
export type { Phase }
