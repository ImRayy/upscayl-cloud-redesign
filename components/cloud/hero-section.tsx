import {
  ArrowRightIcon,
  ArrowUpRight,
  CheckIcon,
  ChevronRight,
  CircleDashed,
  CloudIcon,
  CodeIcon,
  DotIcon,
  GlobeIcon,
  LayersIcon,
  type LucideIcon,
  MoveDiagonal,
  ShieldCheck,
  ZapIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type InfoCardProps = {
  icon: React.ReactNode
  iconWrapperClassName: string
  title: string
  description: React.ReactNode
  className?: string
}

function InfoCard({
  icon,
  iconWrapperClassName,
  title,
  description,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "bg-secondary/80 border rounded-2xl p-3 flex items-center gap-3 pr-5 border-border/20 backdrop-blur-sm self-start",
        className,
      )}
    >
      <div id="icon" className="p-1 bg-card/40 rounded-xl">
        <div className={`p-3 rounded-lg ${iconWrapperClassName}`}>{icon}</div>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-bold">{title}</h4>
        <p className="inline-flex text-sm items-center text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function HighlightCard({
  icon: Icon,
  name,
}: {
  icon: LucideIcon
  name: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 md:border-white/10 lg:border-0 lg:px-0 lg:py-0">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10">
        <Icon size={16} />
      </div>

      <span className="whitespace-nowrap text-xs font-semibold md:text-sm">
        {name}
      </span>

      <ChevronRight size={15} className="text-white/40 md:hidden ml-auto" />
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="flex items-center  flex-col bg-background h-full min-h-screen">
      <div className="w-full flex flex-col max-w-[100rem] min-h-screen mx-auto pt-20 ">
        <div className="flex h-full flex-col lg:flex-row gap-12 lg:gap-0 bg-linear-to-b from-card to-secondary p-6 rounded-4xl relative w-full items-center justify-center lg:px-16 flex-1">
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col">
              <p className="inline-flex items-center text-muted-foreground tracking-wide text-xs sm:text-sm mb-3">
                AI IMAGE UPSCAYLING <DotIcon /> CLOUD
              </p>
              <div className="inline-flex gap-2">
                <h1 className=" text-6xl sm:text-9xl font-bold">Cloud</h1>
                <span className="text-3xl sm:text-6xl font-semibold">4x</span>
              </div>
              <p className="text-xl sm:text-3xl mt-2">
                Upscayl anything. From anywhere
              </p>
              <p className="text-sm sm:text-xl mt-6 text-muted-foreground">
                Enhance blurry images wiht AI in seconds. <br />
                No Powerful GPU. No installation <br />
                Just Upscayl Cloud
              </p>
            </div>
            <div className="sm:[&>button]:h-14 [&>button]:rounded-full sm:[&>button]:font-bold sm:[&>button]:text-base space-x-2.5 sm:space-x-5 flex">
              <Button className="sm:px-8">
                Start Upscayling - It&apos;s free
              </Button>
              <Button variant="link">
                Explore Plans <ArrowUpRight />
              </Button>
            </div>
          </div>
          <div className="relative my-auto w-full lg:max-w-3xl self-start  lg:px-[6%]">
            <div className="aspect-square sm:aspect-video lg:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden">
              <img
                src="https://cdn.cosmos.so/028f71b1-ec07-4e44-bd0d-579561497b06?format=webp"
                alt=""
                className="size-full object-cover"
              />
            </div>

            <InfoCard
              className="absolute left-2 lg:left-0 top-2  lg:top-4 scale-90 sm:scale-100 origin-top-left hidden sm:flex"
              iconWrapperClassName="bg-blue-500/10"
              icon={<MoveDiagonal className="text-blue-500 size-4 sm:size-5" />}
              title="4x Upscayl"
              description={
                <span className="flex items-center gap-1 text-xs sm:text-sm">
                  1024x1024 <ArrowRightIcon size={14} className="sm:size-4" />{" "}
                  4096x4096
                </span>
              }
            />

            <div className="absolute right-2 lg:right-0 top-2 lg:top-6  sm:flex h-full flex-col items-end justify-between hidden pb-4 lg:pb-12 gap-3">
              <InfoCard
                iconWrapperClassName="bg-violet-400/20"
                icon={
                  <CloudIcon className="text-violet-400 size-4 sm:size-5" />
                }
                title="Cloud Processing"
                description="No GPU Required"
                className="ml-auto scale-90 sm:scale-100 origin-top-right"
              />

              <InfoCard
                iconWrapperClassName="bg-green-500"
                icon={<CheckIcon className="text-white size-4 sm:size-5" />}
                title="Ready"
                description="Processed in 6.2s"
                className="[&>#icon]:p-0 [&>#icon]:rounded-full [&>#icon]:overflow-hidden [&>#icon>div]:p-2 sm:[&>#icon>div]:p-3 ml-auto scale-90 sm:scale-100 origin-top-right"
              />

              <div className="space-y-2 sm:space-y-3 bg-secondary/80 border rounded-xl sm:rounded-2xl p-2 sm:p-3 backdrop-blur-sm border-border/20 max-w-[90vw] sm:max-w-none">
                <div className="inline-flex gap-2 sm:gap-3 items-center">
                  <CircleDashed className="size-4 sm:size-5" />
                  <h4 className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    3 Images processing...
                  </h4>
                </div>
                <AvatarGroup className="gap-2 sm:gap-4">
                  <Avatar className="rounded-sm size-8 sm:size-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-sm"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="rounded-sm size-8 sm:size-12">
                    <AvatarImage
                      src="https://github.com/maxleiter.png"
                      alt="@maxleiter"
                      className="rounded-sm"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar className="rounded-sm size-8 sm:size-12">
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                      className="rounded-sm"
                    />
                  </Avatar>
                  <Avatar className="rounded-sm size-8 sm:size-12">
                    <AvatarFallback className="font-bold rounded-sm tracking-tight text-xs sm:text-sm">
                      + 1
                    </AvatarFallback>
                  </Avatar>
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 lg:py-4 grid gap-2 lg:mx-auto lg:inline-flex lg:gap-8">
          <HighlightCard icon={ZapIcon} name="No GPU Required" />
          <HighlightCard icon={LayersIcon} name="Batch Upscaling" />
          <HighlightCard icon={GlobeIcon} name="Works Anywhere" />
          <HighlightCard icon={ShieldCheck} name="Private Processing" />
          <HighlightCard icon={CodeIcon} name="API Ready" />
        </div>
      </div>
    </section>
  )
}
