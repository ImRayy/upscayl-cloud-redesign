import { MonitorIcon } from "lucide-react"
import { useId } from "react"
import HeaderText from "../header-text"
import InfoCard from "../info-card"
import { Button } from "../ui/button"

const steps = [
  {
    name: "Upload File",
    summary:
      "Upload your image and prepare it for enhancement without changing the original file.",
    image: "/desktop-steps/step-1.webp",
  },
  {
    name: "Choose Model",
    summary:
      "Choose an AI model designed to enhance details, textures, and overall image quality.",
    image: "/desktop-steps/step-2.webp",
  },
  {
    name: "Select Scale",
    summary:
      "Select your desired upscale factor and increase the image resolution to your needs.",
    image: "/desktop-steps/step-3.webp",
  },
  {
    name: "Preview Result",
    summary:
      "Compare the original and enhanced images to check details before exporting your result.",
    image: "/desktop-steps/step-4.webp",
  },
]

export default function DesktopStepsSection() {
  const componentId = useId()
  return (
    <section className="w-full max-w-5xl px-4 mx-auto space-y-6">
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
      <div className="grid sm:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <InfoCard
            key={`${componentId}-${idx}`}
            title={step.name}
            description={step.summary}
            img={step.image}
            width={2816}
            height={1536}
          />
        ))}
      </div>
    </section>
  )
}
