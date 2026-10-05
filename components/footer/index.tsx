import Image from "next/image";
import { FaEnvelope, FaGithub, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";

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
];

export default function Footer() {
  return (
    <footer className="footer-reveal p-4 bg-zinc-900 pt-10">
      <div className="space-y-5 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:gap-0 gap-6 justify-between pb-2 sm:pb-8">
          <div className="max-w-sm">
            <div className="inline-flex gap-2 items-center">
              <Image
                src="/logo/64x64.png"
                alt=""
                height={64}
                width={64}
                className="w-8"
              />
              <h3 className="font-bold text-xl">Upscayl.</h3>
            </div>
            <p className="text-sm">
              Upscayl lets you enhance your images using AI. Hassle free and
              easy to use.
            </p>
          </div>
          <div className="grid grid-cols-3 max-w-sm w-full">
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-md font-semibold">{title}</h4>
                <ul className="flex flex-col">
                  {links.map(({ label, href }) => (
                    <Button
                      variant="link"
                      className="justify-start pl-0 text-muted-foreground"
                      key={href}
                      asChild>
                      <li>
                        <a
                          href={href}
                          className="transition-colors hover:text-foreground">
                          {label}
                        </a>
                      </li>
                    </Button>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex gap-4 sm:flex-row flex-col-reverse items-center sm:justify-between">
          <p className="text-sm text-muted-foreground max-w-xs sm:text-start text-center sm:max-w-full">
            Copyright © 2026 - Upscayl. All rights reserved.
          </p>
          <div className="[&>button]:rounded-full space-x-2">
            <Button variant="outline" size="icon-lg">
              <FaGithub />
            </Button>
            <Button variant="outline" size="icon-lg">
              <FaXTwitter />
            </Button>
            <Button variant="outline" size="icon-lg">
              <FaTelegram />
            </Button>
            <button
              type="button"
              className="inline-flex items-center gap-2 border p-0.5 pr-3 text-sm h-9">
              <Button className="size-8 rounded-full" asChild>
                <div>
                  <FaEnvelope />
                </div>
              </Button>
              support@upscayl.org
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
