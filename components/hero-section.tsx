"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      if (!email || !email.includes("@")) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        })
        return
      }

      setIsSubmitting(true)

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        toast({
          title: "🎉 Success!",
          description: "You've been added to the waitlist!",
        })
        setEmail("")
      } else {
        throw new Error(result?.error || "Failed to submit")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-32 md:py-40 lg:py-52 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1DA1F2]/5 blur-3xl"></div>
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
            <div className="inline-block rounded-lg bg-blue-900/30 border border-blue-500/20 px-3 py-1 text-sm text-blue-300 mb-4">
              AI Reply Guy
            </div>
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
            className="flex flex-col items-center gap-4 mt-12"
          >
            <form onSubmit={handleSubmit} className="flex gap-3 p-3 bg-gray-900/50 rounded-2xl border border-gray-800">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  if (e?.target?.value !== undefined) {
                    setEmail(e.target.value)
                  }
                }}
                placeholder="Enter your email address"
                className="border-0 bg-transparent focus-visible:ring-0 flex-1 text-white placeholder:text-gray-500 text-lg"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4A9EFF] hover:bg-[#3A8EEF] text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
              >
                ✅ Successfully added to waitlist!
              </motion.div>
            )}
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
