import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import DemoSection from "@/components/demo-section"
import PricingSection from "@/components/pricing-section"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Tweezy - Create your AI Twitter agent in minutes",
  description:
    "TweetAI helps you create an AI-powered Twitter agent in just a few clicks. Automate your Twitter presence and grow your audience effortlessly.",
  keywords: "AI Twitter Agent, Twitter automation, social media AI, Twitter bot",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
