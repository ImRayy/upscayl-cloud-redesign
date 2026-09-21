import {
  ArrowRightIcon,
  ArrowUpRight,
  CheckIcon,
  CircleDashed,
  CloudIcon,
  CodeIcon,
  DotIcon,
  GlobeIcon,
  LayersIcon,
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
import { Separator } from "@/components/ui/separator"
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

export default function CloudPage() {
  return (
    <div className="flex items-center  flex-col bg-background h-full min-h-screen">
      <div className="w-full flex flex-col max-w-[100rem] min-h-screen mx-auto pt-20 px-4">
        <div className="flex h-full bg-linear-to-b from-card to-secondary p-6 rounded-4xl relative w-full items-center justify-center px-16 flex-1">
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col">
              <p className="inline-flex items-center text-muted-foreground tracking-wide text-sm mb-3">
                AI IMAGE UPSCAYLING <DotIcon /> CLOUD
              </p>
              <div className="inline-flex gap-2">
                <h1 className="text-9xl font-bold">Cloud</h1>
                <span className="text-6xl font-semibold">4x</span>
              </div>
              <p className="text-3xl mt-2">Upscayl anything. From anywhere</p>
              <p className="text-xl mt-6 text-muted-foreground">
                Enhance blurry images wiht AI in seconds. <br />
                No Powerful GPU. No installation <br />
                Just Upscayl Cloud
              </p>
            </div>
            <div className="[&>button]:h-14 [&>button]:rounded-full [&>button]:font-bold [&>button]:text-base space-x-5">
              <Button className="px-8">
                Start Upscayling - It&apos;s free
              </Button>
              <Button variant="link">
                Explore Plans <ArrowUpRight />
              </Button>
            </div>
          </div>
          <div className="relative my-auto max-w-3xl self-start px-[6%]">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://cdn.cosmos.so/028f71b1-ec07-4e44-bd0d-579561497b06?format=webp"
                alt=""
                className="size-full object-cover"
              />
            </div>
            <InfoCard
              className="absolute left-0 top-3"
              iconWrapperClassName="bg-blue-500/10"
              icon={<MoveDiagonal className="text-blue-500" />}
              title="4x Upscayl"
              description={
                <>
                  1024x1024 <ArrowRightIcon size={16} /> 4096x4096
                </>
              }
            />

            <div className="absolute right-0 top-10 flex h-full flex-col justify-between pb-20">
              <InfoCard
                iconWrapperClassName="bg-violet-400/20"
                icon={<CloudIcon className="text-violet-400" />}
                title="Cloud Processing"
                description="No GPU Required"
              />

              <InfoCard
                iconWrapperClassName="bg-green-500"
                icon={<CheckIcon className="text-white" />}
                title="Ready"
                description="Processed in 6.2s"
                className="[&>#icon]:p-0 [&>#icon]:rounded-full [&>#icon]:overflow-hidden [&>#icon>div]:p-3 ml-auto"
              />
              <div className="space-y-3 bg-secondary/80 border rounded-2xl p-3 backdrop-blur-sm border-border/20">
                <div className="inline-flex gap-3 items-center">
                  <CircleDashed />
                  <h4 className="font-semibold">3 Images processing...</h4>
                </div>
                <AvatarGroup className="gap-4">
                  <Avatar className="rounded-sm size-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-sm"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="rounded-sm  size-12">
                    <AvatarImage
                      src="https://github.com/maxleiter.png"
                      alt="@maxleiter"
                      className="rounded-sm"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar className="rounded-sm  size-12">
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                      className="rounded-sm"
                    />
                  </Avatar>
                  <Avatar className="rounded-sm  size-12">
                    <AvatarFallback className="font-bold rounded-sm tracking-tight">
                      + 1
                    </AvatarFallback>
                  </Avatar>
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-8 inline-flex px-12 justify-between [&_span]:text-sm [&>div]:items-center">
          <div className="inline-flex gap-2">
            <ZapIcon /> <span className="font-bold">No GPU Required</span>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="inline-flex gap-2">
            <LayersIcon /> <span className="font-bold">Batch Upscayling</span>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="inline-flex gap-2">
            <GlobeIcon /> <span className="font-bold">Works Anywhere</span>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="inline-flex gap-2">
            <ShieldCheck />{" "}
            <span className="font-bold">Private Processing</span>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="inline-flex gap-2">
            <CodeIcon /> <span className="font-bold">API Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}
