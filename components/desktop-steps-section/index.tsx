import { CheckIcon, FolderOpenIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import HeaderText from "../header-text";
import { Progress } from "../ui/progress";

const PROJECT_IMAGES = [
  "before-upscayl/vintage.webp",
  "before-upscayl/cinematic.webp",
  "before-upscayl/oil-paint.webp",
  "before-upscayl/realistic.webp",
];

const MODELS = [
  {
    name: "Upscayl Standard",
    image: "model-comparison/upscayl-standard-4x/before.webp",
  },
  {
    name: "Digital Art",
    image: "model-comparison/digital-art-4x/before.webp",
  },
  {
    name: "High Fidelity",
    image: "model-comparison/high-fidelity-4x/before.webp",
  },
];

const PROCESSED = 12;
const TOTAL = 16;

function FeatureCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl flex flex-col bg-secondary p-1.5 pb-0">
      <div className="flex flex-col  gap-4 rounded-xl border bg-card p-4 min-h-52 justify-center">
        {children}
      </div>
      <div className="space-y-1 p-3">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm tracking-wide text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}

export default function DesktopStepsSection() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 px-4">
      <HeaderText
        title="I've got something to show you!"
        description="Upscayl your images, remove backgrounds and more, with several model options and settings."
      >
        <p className="text-sm font-medium text-muted-foreground">SEE WHAT WE OFFER</p>
      </HeaderText>
      <div className="md:grid-cols-9 flex flex-col md:grid gap-6 [&_div]:rounded-xl [&_div]:overflow-hidden [&>div]:bg-card/80 [&>div>div>p]:text-muted-foreground [&>div]:border-border/20">
        <div className="col-span-5 flex flex-col gap-4 justify-between border p-3">
          <div className="px-1.5">
            <h4 className="text-xl font-semibold">Big Problems</h4>
            <p className="text-sm">All photos processed in one single go</p>
          </div>
          <div className="bg-secondary/60 p-3 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <p>Project Folder</p>
              <FolderOpenIcon className="size-4.5" aria-hidden="true" />
            </div>

            <ul className="grid grid-cols-4 gap-3">
              {PROJECT_IMAGES.map((src) => (
                <li key={src} className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                  <span className="absolute right-2 bottom-2 rounded-full bg-green-500 p-1 text-green-50">
                    <CheckIcon size={14} aria-label="Processed" strokeWidth={3} />
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 max-w-sm mx-auto w-full">
              <Progress
                value={(PROCESSED / TOTAL) * 100}
                aria-label={`${PROCESSED} of ${TOTAL} images processed`}
                className="h-2 flex-1"
              />
              <span className="shrink-0 text-sm font-medium tabular-nums">
                {PROCESSED}/{TOTAL}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-3 p-3 border">
          <div className="px-1.5">
            <h4 className="text-lg font-semibold">Models for every style</h4>
            <p className="text-sm">
              Got a digital painting? vacation photos? low quality logos? Bring them on!
            </p>
          </div>
          <div className="h-full flex items-center bg-secondary/60 md:p-1.5 md:px-2.5 lg:px-3.5 p-4">
            <ul className="flex flex-col gap-2 w-full">
              {MODELS.map(({ name, image }, idx) => (
                <li
                  key={name}
                  className={cn("flex items-center gap-3 rounded-lg bg-card p-1.5", {
                    "ring-2 ring-primary/90 relative": idx === 0,
                  })}
                >
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-10 rounded-md object-cover"
                  />
                  <p className="text-sm font-medium">{name}</p>
                  {idx === 0 && (
                    <CheckIcon className="absolute right-4 size-5 top-1/2 -translate-y-1/2" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
