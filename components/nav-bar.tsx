/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: <explanation> */
"use client"

import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { FaBars, FaGithub, FaX, FaXmark } from "react-icons/fa6"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { Button } from "./ui/button"

const links = [
  { key: "home", label: "Home" },
  { key: "cloud", label: "Cloud" },
  { key: "pricing", label: "Pricing" },
  { key: "desktop", label: "Desktop" },
  { key: "docs", label: "Docs" },
]

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Cloud", href: "/cloud" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Download", href: "/download" },
      { label: "GitHub", href: "https://github.com/your-repo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

const DesktopLayout = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-background p-4">
      <div>
        <img src="logo/64x64.png" alt="" className="w-7" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-1 border rounded-full p-0.5 [&>button]:rounded-full">
        {links.map((link, idx) => (
          <Button
            size="lg"
            variant={idx === 0 ? "secondary" : "ghost"}
            key={link.key}
          >
            {link.label}
          </Button>
        ))}
      </div>

      <div className="space-x-2">
        <Button variant="ghost">Download</Button>
        <Button>Dashboard</Button>
      </div>
    </nav>
  )
}

const MobileLayout = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-background p-4 z-20">
        <Button size="lg" variant="outline" className="pl-1.5">
          <img src="logo/64x64.png" alt="" className="w-6" />
          Upscayl
        </Button>
        <div className="p-0.5 [&>button]:rounded-full border rounded-full border-border/80 [&>button>svg]:size-4!">
          <Button variant="ghost" size="icon">
            <FaGithub />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FaXmark /> : <FaBars />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="fixed z-10  h-full inset-0 bg-background">
          <div className="flex justify-between p-4 h-full flex-col">
            <div className="max-w-sm w-full mt-20 grid gap-10">
              {footerLinks.map(({ title, links }) => (
                <div key={title} className="space-y-3">
                  <h4 className="text-md text-muted-foreground font-medium">
                    {title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {links.map(({ label, href }) => (
                      <Button
                        variant="link"
                        className="justify-start text-2xl font-semibold pl-0"
                        key={href}
                        asChild
                      >
                        <li>
                          <a
                            href={href}
                            className="transition-colors hover:text-foreground"
                          >
                            {label}
                          </a>
                        </li>
                      </Button>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="w-full grid grid-cols-2 gap-3 border-t pt-4">
              <Button size="lg" variant="outline">
                Download
              </Button>
              <Button size="lg">Dashboard</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function NavBar() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileLayout />
  }

  return <DesktopLayout />
}
