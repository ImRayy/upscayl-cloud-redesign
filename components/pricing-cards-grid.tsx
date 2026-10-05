"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ArrowSVG from "@/components/ui/arrow-svg";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  getAllCreditOptions,
  ONE_TIME_PURCHASE_PRICING_TIERS,
  PRICING_TIERS,
} from "@/common/pricing-data";
import { OneTimePricingCard, PricingCard } from "@/components/pricing-card";

type PricingCardsGridProps = {
  smallerWidth?: boolean;
};

const PricingCardsGrid = ({ smallerWidth = false }: PricingCardsGridProps) => {
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">(
    "subscription",
  );
  const [isAnnual, setIsAnnual] = useState(false);
  const allCreditOptions = getAllCreditOptions();
  const [selectedCredits, setSelectedCredits] = useState(
    allCreditOptions[1] || 300,
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const selectedCreditIndex = allCreditOptions.indexOf(selectedCredits);

  return (
    <>
      <div className="mb-14 flex justify-center">
        <div className="relative inline-flex rounded-full border border-border bg-card p-1 shadow-lg">
          <Badge className="absolute -left-4 -top-5 -rotate-12 bg-primary text-[10px] uppercase text-primary-foreground">
            New!
          </Badge>
          <Button
            type="button"
            size="lg"
            variant={purchaseType === "one-time" ? "secondary" : "ghost"}
            className={cn(
              "rounded-full px-5",
              purchaseType === "one-time" && "ring-1 ring-foreground/50",
            )}
            onClick={() => setPurchaseType("one-time")}>
            One-Time Purchase
          </Button>
          <Button
            type="button"
            size="lg"
            variant={purchaseType === "subscription" ? "secondary" : "ghost"}
            className={cn(
              "rounded-full px-5",
              purchaseType === "subscription" && "ring-1 ring-foreground/50",
            )}
            onClick={() => setPurchaseType("subscription")}>
            Subscription
          </Button>
        </div>
      </div>

      {purchaseType === "subscription" ? (
        <div className="pricing-reveal" key="subscription">
          <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="shrink-0 lg:w-40">
                <p className="text-xs text-muted-foreground">Monthly usage</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {selectedCredits.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    credits
                  </span>
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <Slider
                  aria-label="Credits per month"
                  min={0}
                  max={allCreditOptions.length - 1}
                  step={1}
                  value={[selectedCreditIndex]}
                  onValueChange={(value) =>
                    setSelectedCredits(allCreditOptions[value[0]])
                  }
                  className="mt-4"
                />
                <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                  {allCreditOptions.map((credits) => (
                    <button
                      type="button"
                      key={credits}
                      onClick={() => setSelectedCredits(credits)}
                      className={cn(
                        "transition-colors hover:text-foreground",
                        credits === selectedCredits &&
                          "font-medium text-foreground",
                      )}>
                      {credits.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="shrink-0 lg:w-52 lg:text-right">
                <div
                  className="billing-toggle"
                  data-billing={isAnnual ? "annual" : "monthly"}>
                  <span
                    className="billing-toggle-indicator"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    aria-pressed={!isAnnual}
                    onClick={() => setIsAnnual(false)}>
                    Monthly
                  </button>
                  <button
                    type="button"
                    aria-pressed={isAnnual}
                    onClick={() => setIsAnnual(true)}>
                    Annual
                    <span className="absolute -end-28 -top-10 start-auto">
                      <span className="flex items-center">
                        <ArrowSVG />
                        <Badge className="mt-3 text-[10px] uppercase">
                          Up to 40% off!
                        </Badge>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section
            className={cn(
              "mt-12 grid gap-6 lg:grid-cols-3",
              smallerWidth ? "max-w-6xl" : "max-w-7xl",
              "mx-auto",
            )}>
            {PRICING_TIERS.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                isAnnual={isAnnual}
                selectedCredits={selectedCredits}
                selectedPlan={selectedPlan}
                onSelect={setSelectedPlan}
              />
            ))}
          </section>
        </div>
      ) : (
        <section key="one-time" className="pricing-reveal">
          {ONE_TIME_PURCHASE_PRICING_TIERS.map((tier) => (
            <OneTimePricingCard
              key={tier.id}
              credits={tier.credits}
              price={tier.price}
              detail={tier.detail}
              features={tier.features}
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default PricingCardsGrid;
