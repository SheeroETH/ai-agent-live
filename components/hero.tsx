"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full py-32 md:py-40 lg:py-52 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block rounded-lg bg-purple-900/20 border border-purple-500/20 px-4 py-1.5 text-sm"
              >
                <span className="flex items-center gap-1 text-purple-300">
                  <span>AI-Powered Twitter Agent</span>
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-500 neon-glow"
              >
                Your AI Twitter Agent in Just a Few Clicks
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-[600px] text-gray-400 md:text-xl"
              >
                Create an AI-powered Twitter agent that engages with your audience, grows your following, and saves you
                hours every day.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-3 min-[400px]:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-violet-600 text-white border-none hover:opacity-90 transition-opacity"
                  href="/agent"
                >
                  Create My AI Agent
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <Button variant="outline" size="lg" className="border-purple-500 text-purple-300 hover:bg-purple-900/20">
                Watch Demo
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-4 text-sm text-gray-400"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full border-2 border-black overflow-hidden"
                    style={{
                      backgroundColor: `hsl(${(i * 40 + 240) % 360}, 70%, 60%)`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                      U{i}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-medium text-purple-300">1,200+</span> users already growing with Tweezy
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-full blur-3xl" />
              <div className="relative bg-black/40 border border-purple-500/20 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
                <div className="w-full h-[600px] bg-gradient-to-br from-purple-900/20 to-violet-900/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500 neon-glow">
                    Tweezy Dashboard
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent -z-10" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl -z-10" />
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl -z-10" />

      {/* Vape.gg inspired grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>
    </section>
  )
}
