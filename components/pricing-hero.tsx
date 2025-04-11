"use client"

import { motion } from "framer-motion"

export default function PricingHero() {
  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1DA1F2]/5 blur-3xl"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-3xl"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-lg bg-[#1DA1F2]/30 border border-[#1DA1F2]/20 px-3 py-1 text-sm text-[#1DA1F2] mb-4">
              Pricing
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              <span className="gradient-text-blue neon-glow-blue">Simple,</span>{" "}
              <span className="gradient-text-purple neon-glow-purple">Transparent</span>{" "}
              <span className="text-white">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              Choose the perfect plan for your needs. All plans include a 14-day free trial with no credit card
              required.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 dual-color-grid -z-10"></div>
    </section>
  )
}
