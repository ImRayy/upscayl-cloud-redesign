import {
  BrainIcon,
  ImageUpscaleIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react"
import { useId } from "react"
import HeaderText from "../header-text"
import { Button } from "../ui/button"

const features = [
  {
    Icon: ImageUpscaleIcon,
    name: "Upscayl Image",
    description:
      "The brilliance of Upscayl, with the power of Cloud. No hardware, no device constraints, just pure upscaling power.",
  },
  {
    Icon: BrainIcon,
    name: "Generate AI Image",
    description:
      "Transform your imagination into beautiful images in seconds. Just describe what you see in your mind, and watch it come to life.",
  },
  {
    Icon: WandSparklesIcon,
    name: "Image Editing",
    description:
      "No complex software needed. Just select what you want to change and describe your vision. AI-powered editing that understands exactly what you mean.",
  },
]

export default function BenifitsSection() {
  const componentId = useId()
  return (
    <section className="max-w-5xl mx-auto p-4 space-y-8">
      <HeaderText
        title="Upscayl Cloud"
        description="Now do more than just upscaling. Generate images and edit images with
          the power of AI."
      >
        <Button variant="outline" size="sm" className="rounded-full">
          <SparklesIcon />
          Features
        </Button>
      </HeaderText>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="rounded-3xl p-2 bg-card md:max-w-sm">
          <div className="aspect-video overflow-hidden rounded-2xl md:aspect-square shrink-0">
            <img
              src="https://cdn.cosmos.so/028f71b1-ec07-4e44-bd0d-579561497b06?format=webp"
              alt=""
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 my-auto max-w-lg">
          {features.map((feature, idx) => (
            <div
              key={`${componentId}-${idx}`}
              className="flex items-start gap-2"
            >
              <Button
                variant="ghost"
                size="icon-lg"
                className="[&>svg]:size-5!"
                asChild
              >
                <div>
                  <feature.Icon strokeWidth={1.8} />
                </div>
              </Button>
              <div className="space-y-1.5">
                <h3 className="font-bold">{feature.name}</h3>
                <p className=" text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
