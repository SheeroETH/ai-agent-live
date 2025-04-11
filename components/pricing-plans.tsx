"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals just getting started.",
    monthlyPrice: "$19",
    yearlyPrice: "$190",
    period: "/month",
    yearlyPeriod: "/year",
    features: [
      "1 AI Twitter Agent",
      "Up to 100 automated replies/month",
      "Basic analytics",
      "Content scheduling (5 posts/day)",
      "Email support",
    ],
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    color: "blue",
  },
  {
    name: "Pro",
    description: "Ideal for creators and growing influencers.",
    monthlyPrice: "$49",
    yearlyPrice: "$490",
    period: "/month",
    yearlyPeriod: "/year",
    features: [
      "3 AI Twitter Agents",
      "Unlimited automated replies",
      "Advanced analytics & insights",
      "Content scheduling (20 posts/day)",
      "Priority support",
      "Custom AI personality",
      "Audience growth tools",
    ],
    popular: true,
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    color: "purple",
  },
  {
    name: "Business",
    description: "For teams and businesses managing multiple accounts.",
    monthlyPrice: "$99",
    yearlyPrice: "$990",
    period: "/month",
    yearlyPeriod: "/year",
    features: [
      "10 AI Twitter Agents",
      "Unlimited automated replies",
      "Enterprise analytics & reporting",
      "Unlimited content scheduling",
      "24/7 priority support",
      "Custom AI personality",
      "Audience growth tools",
      "Team collaboration features",
      "API access",
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    color: "blue",
  },
]

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <section className="w-full py-12 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(29,161,242,0.03)_0%,transparent_50%)] z-0"></div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center p-1 bg-black/40 border border-blue-500/20 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              className={`${
                billingCycle === "monthly" ? "bg-blue-900/30 text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              Monthly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBillingCycle("yearly")}
              className={`${
                billingCycle === "yearly" ? "bg-purple-900/30 text-white" : "text-muted-foreground hover:text-white"
              }`}
            >
              Yearly (Save 20%)
            </Button>
          </div>
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
                    : plan.color === "blue"
                      ? "border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 transition-all duration-300"
                      : "border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#1DA1F2] to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-t-lg w-full text-center">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline">
                    <span
                      className={`text-4xl font-bold ${plan.color === "blue" ? "text-[#1DA1F2]" : "text-purple-400"}`}
                    >
                      {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {billingCycle === "monthly" ? plan.period : plan.yearlyPeriod}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div className={`mt-1 text-sm ${plan.color === "blue" ? "text-[#1DA1F2]" : "text-purple-400"}`}>
                      Save 20% with annual billing
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check
                          className={`h-4 w-4 ${plan.color === "blue" ? "text-blue-500" : "text-purple-500"} mr-2 flex-shrink-0`}
                        />
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
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 text-white border-none hover:opacity-90 transition-opacity"
                        : plan.color === "blue"
                          ? "border-blue-500/30 text-blue-300 hover:bg-blue-900/20"
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
            <a href="#contact-sales" className="text-blue-400 hover:text-purple-300 hover:underline transition-colors">
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
