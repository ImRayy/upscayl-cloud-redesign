"use client"

import { ArrowRight, MessageCircleQuestionMark } from "lucide-react"
import { useId, useState } from "react"
import { FAQ } from "@/constants/faqs"
import HeaderText from "../header-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RainbowButton } from "../ui/rainbow-button"
import { Textarea } from "../ui/textarea"

export default function FAQSection() {
  const [open, setOpen] = useState(false)

  const componentId = useId()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = "support@upscayl.org"
    const formData = new FormData(e.currentTarget)

    const subject = formData.get("subject") as string
    const body = formData.get("body") as string

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(mailto, "_blank")
    setOpen(false)
  }

  return (
    <section className="w-full max-w-6xl mx-auto flex-col flex md:flex-row gap-8 justify-between">
      <div className="flex flex-col gap-8">
        <HeaderText
          title="Frequently Asked Questions"
          description="Find quick answers to common questions about the platform, pricing, and security."
          className="sm:max-w-lg [&>p]:max-w-sm"
        >
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <div>
              <MessageCircleQuestionMark />
              FAQs
            </div>
          </Button>
        </HeaderText>
        <div className="bg-card rounded-3xl max-w-xs p-4">
          <h4>Can&apos;t find the answer you're looking for?</h4>
          <p className="text-sm text-muted-foreground">
            Reach out to Upscayl Support
          </p>
          <RainbowButton
            variant="outline"
            className="mt-6 w-full rounded-full"
            onClick={() => setOpen(true)}
          >
            <span className="text-whtie z-10 text-black">Contact with us</span>
            <ArrowRight className="text-black" />
          </RainbowButton>
        </div>
      </div>

      <div className="md:max-w-lg bg-card p-2 rounded-3xl w-full h-full">
        <Accordion type="multiple" className="space-y-1.5 ">
          {FAQ.cloud.map((faq, idx) => (
            <AccordionItem
              key={`${componentId}-${idx}`}
              value={`cloud-accordion-${idx}`}
              className="border-transparent bg-secondary/40 rounded-2xl "
            >
              <AccordionTrigger className="text-base font-medium bg-secondary px-4 items-center rounded-2xl h-12 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="pt-2">{faq.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send an email</DialogTitle>
            <DialogDescription>
              Compose your email below. Your default email client will open with
              the recipient, subject, and body prefilled.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  name="subject"
                  placeholder="Email Subject"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-body">Body</Label>
                <Textarea
                  id="email-body"
                  name="body"
                  placeholder="Body"
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
