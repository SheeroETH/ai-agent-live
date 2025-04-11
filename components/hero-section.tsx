"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="w-full py-32 md:py-40 lg:py-52 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1DA1F2]/5 blur-3xl"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-3xl"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="block gradient-text-blue neon-glow-blue">Tweet Fast.</span>
              <span className="block gradient-text-purple neon-glow-purple">Grow Faster.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-[800px] text-gray-400 text-xl md:text-2xl mx-auto"
            >
              Bring your Twitter presence to life in minutes with Tweezy's intelligent agent builder.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-12"
          >
            <Button
              size="lg"
              className="btn-dual-gradient text-white border-none hover:opacity-90 transition-opacity text-lg px-8 py-6 h-auto"
              href="/agent"
            >
              Create My AI Agent
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-300 hover:bg-purple-900/20 text-lg px-8 py-6 h-auto"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-24 relative w-full"
          >
            <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden border border-[#1DA1F2]/20 glowing-border-blue">
              <div className="absolute inset-0 bg-gradient-to-br from-black to-[#1DA1F2]/20 flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text-mixed neon-glow-blue">Tweezy Dashboard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#1DA1F2]/10 to-transparent -z-10" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#1DA1F2]/10 blur-3xl -z-10" />
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl -z-10" />

      {/* Dual-color grid */}
      <div className="absolute inset-0 dual-color-grid -z-10"></div>
    </section>
  )
}
