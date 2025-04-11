"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const features = [
  {
    name: "AI Twitter Agents",
    starter: "1 agent",
    pro: "3 agents",
    business: "10 agents",
  },
  {
    name: "Automated Replies",
    starter: "100/month",
    pro: "Unlimited",
    business: "Unlimited",
  },
  {
    name: "Content Scheduling",
    starter: "5 posts/day",
    pro: "20 posts/day",
    business: "Unlimited",
  },
  {
    name: "Analytics",
    starter: "Basic",
    pro: "Advanced",
    business: "Enterprise",
  },
  {
    name: "Custom AI Personality",
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: "Audience Growth Tools",
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: "Team Collaboration",
    starter: false,
    pro: false,
    business: true,
  },
  {
    name: "API Access",
    starter: false,
    pro: false,
    business: true,
  },
  {
    name: "Priority Support",
    starter: false,
    pro: true,
    business: "24/7 Support",
  },
]

export default function PricingComparison() {
  return (
    <section className="w-full py-12 md:py-24 relative">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="inline-block rounded-lg bg-purple-900/30 border border-purple-500/20 px-3 py-1 text-sm text-purple-300 mb-4">
            Compare Plans
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className="gradient-text-blue">Feature</span> <span className="gradient-text-purple">Comparison</span>
          </h2>
          <p className="text-muted-foreground max-w-[700px]">
            Compare our plans to find the perfect fit for your Twitter growth strategy.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-blue-500/20">
                <th className="py-4 px-6 text-left">Features</th>
                <th className="py-4 px-6 text-center">Starter</th>
                <th className="py-4 px-6 text-center bg-purple-900/10 border-x border-purple-500/20">Pro</th>
                <th className="py-4 px-6 text-center">Business</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={`border-b border-blue-500/10 ${index % 2 === 0 ? "bg-black/20" : "bg-black/10"}`}
                >
                  <td className="py-4 px-6 text-left font-medium">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.starter === "boolean" ? (
                      feature.starter ? (
                        <Check className="h-5 w-5 text-[#1DA1F2] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#1DA1F2]">{feature.starter}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center bg-purple-900/5 border-x border-purple-500/20">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-purple-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-purple-300">{feature.pro}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.business === "boolean" ? (
                      feature.business ? (
                        <Check className="h-5 w-5 text-[#1DA1F2] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-[#1DA1F2]">{feature.business}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
