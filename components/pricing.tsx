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
    price: "$19",
    period: "/month",
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
  },
  {
    name: "Pro",
    description: "Ideal for creators and growing influencers.",
    price: "$49",
    period: "/month",
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
  },
  {
    name: "Business",
    description: "For teams and businesses managing multiple accounts.",
    price: "$99",
    period: "/month",
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
  },
]

export default function Pricing() {
  const containerRef = useRef(null)

  const updatedPricingPlans = pricingPlans.map((plan) => ({
    ...plan,
    features: plan.features.map((feature) => feature.replace(/Twitter/g, "Tweezy")),
  }))

  return (
    <section id="pricing" ref={containerRef} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-600 dark:text-blue-400">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updatedPricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${plan.popular ? "lg:-mt-8" : ""}`}
            >
              <Card
                className={`h-full flex flex-col ${
                  plan.popular ? "border-blue-500 shadow-lg dark:border-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-t-lg w-full text-center">
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
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.buttonVariant} className="w-full" size="lg">
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
            <a href="#" className="text-blue-500 hover:underline">
              Contact us
            </a>{" "}
            for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
