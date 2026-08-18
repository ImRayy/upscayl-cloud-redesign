/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "./ui/button";

const links = [
  { key: "home", label: "Home" },
  { key: "pricing", label: "Pricing" },
  { key: "cloud", label: "Cloud" },
  { key: "desktop", label: "Desktop" },
  { key: "docs", label: "Docs" },
];

export default function NavBar() {
  return (
    <nav className="fixed pt-4 w-full  z-10 flex items-center justify-center">
      <div className="max-w-2xl bg-black/40 border-white/20 border backdrop-blur-sm w-full rounded-xl inline-flex justify-between p-2">
        <div>
          <img src="logo/64x64.png" alt="" className="w-7" />
        </div>
        <div className="space-x-3">
          {links.map((link) => (
            <a key={link.key} href={link.key} className="text-sm">
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <Button size="sm">Dashboard</Button>
        </div>
      </div>
    </nav>
  );
}
