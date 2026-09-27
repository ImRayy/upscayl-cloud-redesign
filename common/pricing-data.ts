export type PricingTier = {
  id: string
  name: string
  price: string
  detail: string
  description: string
  features: string[]
  action: string
  featured?: boolean
  suffix?: string
}

export const CREDIT_OPTIONS = [100, 300, 500, 1000, 2500, 5000]

const MONTHLY_PRICES: Record<number, number> = {
  100: 9.99,
  300: 24.99,
  500: 39.99,
  1000: 69.99,
  2500: 149.99,
  5000: 249.99,
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    detail: "10 credits per month",
    description: "Get started with Upscayl Cloud.",
    features: ["10 cloud upscales", "Standard quality", "No watermark", "Access to all models"],
    action: "Start for free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$24.99",
    suffix: "/ month",
    detail: "300 credits per month",
    description: "For creators who upscale regularly.",
    features: ["Credits roll over", "High quality upscaling", "No watermark", "Priority processing", "Commercial usage"],
    action: "Choose Pro",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    price: "Let’s talk",
    detail: "Tailored to your team’s needs",
    description: "For teams and high-volume usage.",
    features: ["Custom credit volume", "Team support", "API access", "Flexible workflows", "Priority support"],
    action: "Contact us",
  },
]

export const ONE_TIME_PURCHASE_PRICING_TIERS = [
  {
    id: "one-time-50",
    credits: 50,
    price: "$9.99",
    detail: "One-time purchase",
    features: ["Never expiring credits", "One-time purchase", "Use anytime", "Upscayl up to 256MP", "Generate AI images", "6 months unlimited storage", "Priority support", "Free access to new features and models"],
  },
]

export const getAllCreditOptions = () => CREDIT_OPTIONS

export const getSubscriptionPrice = (credits: number, isAnnual: boolean) => {
  const price = MONTHLY_PRICES[credits] ?? MONTHLY_PRICES[300]
  return `$${(price * (isAnnual ? 0.6 : 1)).toFixed(2)}`
}
