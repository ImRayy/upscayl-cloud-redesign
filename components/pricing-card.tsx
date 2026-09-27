import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getSubscriptionPrice, type PricingTier } from "@/common/pricing-data"

type PricingCardProps = {
  tier: PricingTier
  selectedCredits: number
  isAnnual: boolean
  selectedPlan: string | null
  onSelect: (plan: string) => void
}

type OneTimePricingCardProps = {
  credits: number
  price: string
  detail: string
  features: string[]
  selectedPlan: string | null
  onSelect: (plan: string) => void
}

export function PricingCard({ tier, selectedCredits, isAnnual, selectedPlan, onSelect }: PricingCardProps) {
  const isSelected = selectedPlan === tier.name
  const isPro = tier.id === "pro"
  const price = isPro ? getSubscriptionPrice(selectedCredits, isAnnual) : tier.price
  const detail = isPro
    ? `${selectedCredits.toLocaleString()} credits per month${isAnnual ? ", billed annually" : ""}`
    : tier.detail

  return (
    <article className={cn(
      "flex min-h-[395px] flex-col rounded-2xl border bg-card p-6 shadow-xl",
      isPro ? "border-foreground/30 bg-secondary/30" : "border-border",
    )}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold">{tier.name}</h2>
        {tier.featured && <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">Most popular</span>}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{tier.description}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <p className={cn("font-semibold tracking-[-0.04em]", tier.name === "Business" ? "text-3xl" : "text-4xl")}>{price}</p>
        {tier.suffix && <span className="text-xs text-muted-foreground">{tier.suffix}</span>}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>

      <div className="my-5 h-px bg-border" />
      <ul className="space-y-2.5 text-xs">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <span className="grid size-4 place-items-center rounded-full bg-secondary text-foreground"><Check className="size-2.5" strokeWidth={3} /></span>
            {feature}
          </li>
        ))}
      </ul>

      <Button type="button" variant={tier.featured ? "default" : "outline"} className="mt-auto w-full rounded-xl" onClick={() => onSelect(tier.name)}>
        {isSelected ? "Selected" : tier.action}
        <ArrowRight />
      </Button>
    </article>
  )
}

export function OneTimePricingCard({ credits, price, detail, features, selectedPlan, onSelect }: OneTimePricingCardProps) {
  const isSelected = selectedPlan === "One-Time"

  return (
    <section className="pricing-reveal mx-auto max-w-sm rounded-3xl border border-border bg-[linear-gradient(145deg,var(--card),color-mix(in_oklch,var(--secondary)_55%,var(--card)))] p-7 shadow-2xl">
      <div className="text-center">
        <p className="text-xl font-semibold">{credits} Credits</p>
        <p className="mt-3 text-5xl font-semibold tracking-[-0.06em]">{price}</p>
        <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
      </div>
      <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
        {features.map((feature) => <li key={feature} className="flex items-start gap-3"><Check className="mt-0.5 size-4 shrink-0 text-foreground" />{feature}</li>)}
      </ul>
      <Button type="button" size="lg" className="mt-8 w-full rounded-xl" onClick={() => onSelect("One-Time")}>
        {isSelected ? "Selected" : "Buy 50 credits"}
        <ArrowRight />
      </Button>
    </section>
  )
}
