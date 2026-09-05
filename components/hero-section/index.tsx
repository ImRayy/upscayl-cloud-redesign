import HeroSectionVariant01 from "./variant-01"
import HeroSectionVariant02 from "./variant-02"

interface PropsType {
  variant: "variant-1" | "variant-2"
}

export default function HeroSection({ variant }: PropsType) {
  if (variant === "variant-1") {
    return <HeroSectionVariant01 />
  }

  return <HeroSectionVariant02 />
}
