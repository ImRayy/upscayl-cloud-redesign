/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: false */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ComponentProps, type ReactNode, useEffect, useState } from "react"
import { FaBars, FaGithub, FaXmark } from "react-icons/fa6"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { Button } from "./ui/button"

/* -------------------------------------------------------------------------- */
/*  Data — one source of truth for both layouts                               */
/* -------------------------------------------------------------------------- */

const LINKS = {
  home: { label: "Home", href: "/" },
  cloud: { label: "Cloud", href: "/cloud" },
  pricing: { label: "Pricing", href: "/pricing" },
  desktop: { label: "Desktop", href: "/desktop" },
  docs: { label: "Docs", href: "/docs" },
  download: { label: "Download", href: "/download" },
  github: { label: "GitHub", href: "https://github.com/your-repo" },
  privacy: { label: "Privacy Policy", href: "/privacy" },
  terms: { label: "Terms of Service", href: "/terms" },
}

// Pill in the desktop navbar
const mainLinks = [
  LINKS.home,
  LINKS.cloud,
  LINKS.pricing,
  LINKS.desktop,
  LINKS.docs,
]

// Full-screen mobile menu
const menuGroups = [
  {
    title: "Product",
    links: [LINKS.home, LINKS.cloud, LINKS.pricing, LINKS.desktop],
  },
  { title: "Resources", links: [LINKS.docs, LINKS.download, LINKS.github] },
  { title: "Company", links: [LINKS.privacy, LINKS.terms] },
]

const isExternal = (href: string) => /^https?:\/\//.test(href)

const isActive = (pathname: string, href: string) => {
  if (isExternal(href)) return false
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

type NavLinkProps = {
  label: string
  href: string
  size?: ComponentProps<typeof Button>["size"]
  className?: string
  onClick?: () => void
}

const NavLink = ({ label, href, size, className, onClick }: NavLinkProps) => {
  const pathname = usePathname()
  const active = isActive(pathname, href)
  const external = isExternal(href)

  return (
    <Button
      asChild
      size={size}
      variant={active ? "secondary" : "ghost"}
      className={className}
    >
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        {...(external && { target: "_blank", rel: "noreferrer" })}
      >
        {label}
      </Link>
    </Button>
  )
}

const NavShell = ({ children }: { children: ReactNode }) => (
  <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-background p-4">
    {children}
  </nav>
)

const DesktopLayout = () => (
  <NavShell>
    <Link href="/">
      <img src="/logo/64x64.png" alt="Upscayl" className="w-7" />
    </Link>

    <div className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border p-0.5">
      {mainLinks.map((link) => (
        <NavLink key={link.href} size="lg" className="rounded-full" {...link} />
      ))}
    </div>

    <div className="space-x-2">
      <Button variant="ghost">Download</Button>
      <Button>Dashboard</Button>
    </div>
  </NavShell>
)

const MobileLayout = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the menu after navigating
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <NavShell>
        <Button size="lg" variant="outline" className="pl-1.5" asChild>
          <Link href="/">
            <img src="/logo/64x64.png" alt="" className="w-6" />
            Upscayl
          </Link>
        </Button>

        <div className="rounded-full border border-border/80 p-0.5 [&>button]:rounded-full [&>button>svg]:size-4!">
          <Button variant="ghost" size="icon" asChild>
            <a
              href={LINKS.github.href}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FaXmark /> : <FaBars />}
          </Button>
        </div>
      </NavShell>

      {open && (
        <div className="fixed inset-0 z-20 bg-background">
          <div className="flex h-full flex-col justify-between p-4">
            <div className="mt-20 grid w-full max-w-sm gap-10 pl-2">
              {menuGroups.map(({ title, links }) => (
                <div key={title} className="space-y-3">
                  <h4 className="text-md font-medium text-muted-foreground">
                    {title}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {links.map((link) => (
                      <NavLink
                        key={link.href}
                        size="lg"
                        className="-ml-3 justify-start px-3 text-2xl font-semibold"
                        {...link}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid w-full grid-cols-2 gap-3 border-t pt-4">
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
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}
