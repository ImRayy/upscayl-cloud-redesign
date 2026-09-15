/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: false */

import {
  GroupIcon,
  HandHeartIcon,
  Layers2Icon,
  MonitorIcon,
  PaletteIcon,
  PuzzleIcon,
  SparklesIcon,
} from "lucide-react"
import { useId } from "react"
import HeaderText from "../header-text"
import { Button } from "../ui/button"

const features = [
  {
    Icon: HandHeartIcon,
    name: "Free and Open Source",
    description:
      "A 100% free, open-source AI image upscaler. Download once and use forever — no subscriptions, no hidden costs.",
  },
  {
    Icon: PaletteIcon,
    name: "Save in High Quality",
    description:
      "Upscale images up to 16x resolution with AI, turning low-res photos into crisp, high-quality images.",
  },
  {
    Icon: PuzzleIcon,
    name: "Models for Every Need",
    description:
      "Pick from multiple AI upscaling models optimized for photos, art, anime, and more.",
  },
  {
    Icon: SparklesIcon,
    name: "Vast Customization",
    description:
      "Fine-tune output quality, formats, and app settings to match your exact image upscaling workflow.",
  },
  {
    Icon: GroupIcon,
    name: "Batch Image Upscaling",
    description:
      "Upscale hundreds of images at once with batch processing — save time on large photo libraries.",
  },
  {
    Icon: Layers2Icon,
    name: "Double Upscayl",
    description:
      "Run a second upscaling pass for even sharper detail and higher resolution results.",
  },
]

export default function UpscaylDesktopSection() {
  const componentId = useId()
  return (
    <section className="max-w-5xl flex mx-auto items-start justify-center p-4 flex-col gap-8">
      <HeaderText
        title="The app you know and love"
        description="Upscayl Desktop continues to be the best image upscaler for Linux,
          MacOS and Windows with new features and improvements."
      >
        <Button variant="outline" size="sm" className="rounded-full">
          <MonitorIcon />
          Upscayl Desktop
        </Button>
      </HeaderText>

      <div className="aspect-video rounded-3xl overflow-hidden relative">
        <img
          src="https://w.wallhaven.cc/full/6l/wallhaven-6ly3j6.jpg"
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-center">
          <img
            src="/home/cloud-upscayl-screenshot.webp"
            alt=""
            className="max-w-[92%] rounded-t-xl "
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-6 sm:gap-3">
        {features.map((feature, idx) => (
          <div
            key={`${componentId}-${idx}`}
            className="space-y-2 p-3 flex gap-2 sm:flex-col"
          >
            <Button
              variant="ghost"
              size="icon-lg"
              className="[&>svg]:size-5! sm:bg-secondary sm:[&>svg]:size-4!"
              asChild
            >
              <div>
                <feature.Icon />
              </div>
            </Button>
            <div>
              <h1 className="font-semibold">{feature.name}</h1>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
