import type { Metadata } from "next"
import Footer from "@/components/footer"
import PricingHero from "@/components/pricing-hero"
import PricingPlans from "@/components/pricing-plans"
import PricingComparison from "@/components/pricing-comparison"
import PricingFaq from "@/components/pricing-faq"
import PricingCta from "@/components/pricing-cta"

export const metadata: Metadata = {
  title: "Pricing - Tweezy",
  description:
    "Choose the perfect plan for your Twitter growth needs. Flexible pricing options for individuals, creators, and businesses.",
  keywords: "Tweezy pricing, Twitter AI pricing, social media automation pricing",
}

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col pt-24">
      <PricingHero />
      <PricingPlans />
      <PricingComparison />
      <PricingFaq />
      <PricingCta />
      <Footer />
    </main>
  )
}
