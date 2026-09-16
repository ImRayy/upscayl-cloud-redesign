/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: <explanation> */
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="mx-auto max-w-5xl w-full px-4 flex justify-center">
      <div className="bg-card w-full flex flex-col items-center justify-center min-h-90 rounded-3xl gap-4 relative overflow-hidden">
        <h1 className="text-center z-10">
          <span className="text-4xl font-bold">Psst...</span>
          <br />{" "}
          <span className="text-xl font-semibold">
            Give it a try It&apos;s free 🤫
          </span>
        </h1>
        <button
          type="button"
          className="inline-flex items-center border p-1 pl-3 rounded-full gap-3 text-sm font-medium active:scale-95 bg-background text-foreground z-10"
        >
          Get started, we don&apos;t bite
          <span className="p-2 bg-primary text-primary-foreground rounded-full">
            <ArrowRight size={18} />
          </span>
        </button>
        <img
          src="https://w.wallhaven.cc/full/rq/wallhaven-rq68qq.jpg"
          alt=""
          className="absolute size-full object-cover"
        />
      </div>
    </section>
  )
}
