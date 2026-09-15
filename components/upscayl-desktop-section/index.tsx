/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: false */

import {
  GroupIcon,
  HandHeartIcon,
  Layers2Icon,
  PaletteIcon,
  PuzzleIcon,
  SparklesIcon,
} from "lucide-react"
import { useId } from "react"
import { Button } from "../ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

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
    <section className="max-w-5xl flex mx-auto items-start justify-center p-4 flex-col">
      <div className="sm:max-w-2/3 space-y-2 pb-8">
        <h2 className="text-4xl font-semibold">The app you know and love</h2>
        <p className="text-muted-foreground">
          Upscayl Desktop continues to be the best image upscaler for Linux,
          MacOS and Windows with new features and improvements.
        </p>
      </div>
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
      <Carousel className="w-full pt-4">
        <CarouselContent className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:w-full sm:gap-6">
          {features.map((feature, idx) => (
            <CarouselItem key={`${componentId}-${idx}`}>
              <div className="flex flex-col gap-2 sm:p-3 p-4  rounded-2xl sm:bg-transparent bg-card sm:min-h-auto min-h-60  select-none">
                <Button
                  variant="secondary"
                  className="size-12 sm:size-9"
                  asChild
                >
                  <div>
                    <feature.Icon />
                  </div>
                </Button>
                <h1 className="pt-10 sm:pt-0 mt-auto font-semibold">
                  {feature.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pt-4 inline-flex justify-end w-full pr-3 sm:hidden">
          <CarouselNext className="size-10 relative" />
          <CarouselPrevious className="size-10 relative" />
        </div>
      </Carousel>
    </section>
  )
}
