"use client";

import { ArrowDown, ArrowUpRightIcon, DownloadIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa6";
import { Button } from "../ui/button";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Release = {
  tag_name: string;
  name: string;
};

export default function DownloadSection() {
  const [release, setRelease] = useState<Release>({
    tag_name: "latest",
    name: "Loading...",
  });

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchRelease = async () => {
      const res = await fetch("https://api.github.com/repos/upscayl/upscayl/releases/latest");
      const release: Release = await res.json();
      setRelease(release);
    };
    fetchRelease();
  }, []);

  const downloadInfo = useMemo(() => {
    const tagName = release?.tag_name;
    const fileVersion = release?.tag_name.replace("v", "");

    return [
      {
        name: "Linux",
        image: "https://img.icons8.com/?size=256&id=49498&format=png&color=000000",
        Icon: FaLinux,
        downloadLinks: [
          {
            name: "AppImage (Universal Portable)",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-linux.AppImage`,
          },
          {
            name: "Flatpak (Universal)",
            link: "https://flathub.org/apps/org.upscayl.Upscayl",
          },
          {
            name: "DEB (Debian/Ubuntu based)",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-linux.deb`,
          },
          {
            name: "RPM (Fedora based)",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-linux.rpm`,
          },
          {
            name: "Portable Zip",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-linux.zip`,
          },
          {
            name: "AUR (Arch Based)",
            link: "https://aur.archlinux.org/packages/upscayl-bin",
          },
          {
            name: "Snap Store",
            link: "https://snapcraft.io/upscayl/",
          },
        ],
      },
      {
        name: "macOS",
        image: "https://img.icons8.com/?size=256&id=48112&format=png&color=000000",
        Icon: FaApple,
        downloadLinks: [
          {
            name: "Mac App Store (Donate)",
            link: "https://apps.apple.com/us/app/upscayl/id6468265473",
          },
          {
            name: "DMG (Free)",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-mac.dmg`,
          },
        ],
      },
      {
        name: "Windows",
        image: "https://img.icons8.com/?size=256&id=Cr2TAn9Hcpoy&format=png&color=000000",
        Icon: FaWindows,
        downloadLinks: [
          {
            name: "Installer",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-win.exe`,
          },
          {
            name: "Portable Zip",
            link: `https://github.com/upscayl/upscayl/releases/download/${tagName}/upscayl-${fileVersion}-win.zip`,
          },
        ],
      },
    ];
  }, [release]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center pt-24">
      <div className="w-full h-full flex-1 max-w-5xl flex flex-col sm:justify-between">
        {/* Hero copy */}
        <div>
          <div className="mx-auto flex max-w-2xl flex-col gap-3 items-center text-center">
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">Download Upscayl</h1>

            <p className="max-w-md text-base font-medium leading-relaxed text-muted-foreground md:text-md">
              Upscayl is a powerful image upscaling tool that uses advanced AI technology to enhance
              your images.
            </p>

            <InteractiveHoverButton className="text-sm pl-3 hover:pl-6">
              v2.15 is out!
            </InteractiveHoverButton>
          </div>

          {/* App screenshot */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:rounded-3xl mt-10  mx-auto">
            <img
              src="https://w.wallhaven.cc/full/6l/wallhaven-6ly3j6.jpg"
              alt=""
              className="absolute inset-0 size-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              <img
                src="desktop-screenshot.webp"
                alt="Upscayl desktop application"
                className="w-[92%] rounded-t-xl shadow-2xl md:w-[94%]"
              />
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="mx-auto mt-6 w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {downloadInfo.map((download) => (
              <button
                type="button"
                key={download.name}
                className="inline-flex items-center gap-4 rounded-2xl bg-secondary/50 px-5 py-4 text-secondary-foreground transition-colors hover:bg-secondary border border-border/50"
              >
                <download.Icon className="size-8 shrink-0" />

                <div className="flex flex-col text-left">
                  <span className="text-xs text-muted-foreground">Download For</span>
                  <span className="text-sm capitalize">{download.name}</span>
                </div>
                <div className="p-2 bg-secondary rounded-full ml-auto">
                  <DownloadIcon className="size-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="mx-auto mt-4 flex w-full max-w-sm gap-3">
            <Select onValueChange={setSelected}>
              <SelectTrigger className="h-9! bg-secondary/80 border-border/60 flex-1">
                <SelectValue placeholder="Alternative Downloads" />
              </SelectTrigger>

              <SelectContent>
                {downloadInfo.map((dl) => (
                  <SelectGroup key={dl.name}>
                    <SelectLabel>{dl.name}</SelectLabel>

                    {dl.downloadLinks.map((link) => (
                      <SelectItem key={link.link} value={link.link}>
                        {link.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="lg"
              className="shrink-0 rounded-full min-w-28"
              asChild
              aria-disabled={!selected.trim()}
            >
              <a
                href={selected.trim() || undefined}
                onClick={(e) => {
                  if (!selected.trim()) e.preventDefault();
                }}
                className={!selected.trim() ? "pointer-events-none opacity-50" : ""}
              >
                {!selected.trim() || selected.includes("download") ? (
                  <>
                    Download
                    <ArrowDown className="size-4!" />
                  </>
                ) : (
                  <>
                    Open
                    <ArrowUpRightIcon className="size-4!" />
                  </>
                )}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
