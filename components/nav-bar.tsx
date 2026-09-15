/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "./ui/button"

const links = [
  { key: "home", label: "Home" },
  { key: "pricing", label: "Pricing" },
  { key: "cloud", label: "Cloud" },
  { key: "desktop", label: "Desktop" },
  { key: "docs", label: "Docs" },
]

export default function NavBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-background p-4">
      <div>
        <img src="logo/64x64.png" alt="" className="w-7" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-1 border rounded-full p-0.5 [&>button]:rounded-full">
        <Button size="lg" variant="secondary">
          Home
        </Button>
        <Button size="lg" variant="ghost">
          Cloud
        </Button>
        <Button size="lg" variant="ghost">
          Desktop
        </Button>
        <Button size="lg" variant="ghost">
          Pricing
        </Button>
        <Button size="lg" variant="ghost">
          Docs
        </Button>
      </div>

      <div className="space-x-2">
        <Button variant="ghost">Download</Button>
        <Button>Dashboard</Button>
      </div>
    </nav>
  )
}
