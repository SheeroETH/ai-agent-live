"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function PricingCta() {
  return (
    <section id="contact-sales" className="w-full py-12 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,161,242,0.05)_0%,transparent_70%)] z-0"></div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-sm border border-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              <span className="gradient-text-blue">Need a</span>{" "}
              <span className="gradient-text-purple">Custom Solution?</span>
            </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Our team can create a tailored plan that perfectly fits your organization's needs. Get in touch with our
              sales team to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="btn-dual-gradient text-white border-none hover:opacity-90 transition-opacity"
              >
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-900/20"
              >
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
