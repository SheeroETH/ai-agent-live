"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals just getting started.",
    price: "$16",
    period: "/month",
    features: [
      "1 Twitter Account",
      "3 AI Twitter Agents",
      "500 automated replies/month",
      "Track 3 hashtags/mentions",
      "1 tone training slot",
    ],
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "Growth Hacker",
    description: "Ideal for creators and growing influencers.",
    price: "$39",
    period: "/month",
    features: [
      "3 Twitter Accounts",
      "10 AI Twitter Agents",
      "2,000 automated replies/month",
      "Track 10 hashtags/mentions",
      "3 tone training slots",
      "Smart delay & filters",
      "Audience growth tools",
      "Priority support",
    ],
    popular: true,
    buttonText: "Get Started",
    buttonVariant: "default" as const,
  },
  {
    name: "Agency",
    description: "For teams and businesses managing multiple accounts.",
    price: "$99",
    period: "/month",
    features: [
      "10 Twitter Accounts",
      "30+ AI Twitter Agents",
      "10,000+ automated replies/month",
      "Unlimited hashtag/mention tracking",
      "10+ tone training slots",
      "Smart delay & filters",
      "Audience growth tools",
      "Team collaboration features",
      "24/7 priority support",
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  },
]

export default function PricingSection() {
  const containerRef = useRef(null)

  return (
    <section id="pricing" ref={containerRef} className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.03)_0%,transparent_50%)] z-0"></div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-purple-900/30 border border-purple-500/20 px-3 py-1 text-sm text-purple-300 mb-4">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${plan.popular ? "lg:-mt-8" : ""}`}
            >
              <Card
                className={`h-full flex flex-col bg-black/40 backdrop-blur-sm ${
                  plan.popular
                    ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
                    : "border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] text-white text-xs font-medium px-3 py-1 rounded-t-lg w-full text-center">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature.replace("Twitter", "Tweezy")}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white border-none hover:opacity-90 transition-opacity"
                        : "border-purple-500/30 text-purple-300 hover:bg-purple-900/20"
                    }`}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom plan?{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
