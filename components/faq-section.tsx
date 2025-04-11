"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Tweezy work?",
    answer:
      "Tweezy uses advanced artificial intelligence to learn your writing style, preferences, and audience. It then creates and schedules content, engages with your followers, and provides analytics to help you grow your Twitter presence.",
  },
  {
    question: "Will people know it's an AI responding?",
    answer:
      "No, Tweezy is designed to mimic your unique voice and style. The responses are natural and personalized, making it virtually impossible for your audience to tell the difference between you and your AI agent.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Setting up your Tweezy agent takes just a few minutes. Simply connect your Twitter account, answer a few questions about your preferences, and your AI agent will be ready to go.",
  },
  {
    question: "Can I customize what my AI agent posts?",
    answer:
      "You have full control over your AI agent. You can set topics to focus on, approve posts before they go live, and even create custom responses for specific scenarios.",
  },
  {
    question: "Is there a limit to how many tweets my agent can post?",
    answer:
      "The number of tweets and responses depends on your plan. Our Starter plan includes up to 5 posts per day, while our Pro and Business plans offer more flexibility with up to 20 and unlimited posts respectively.",
  },
  {
    question: "What if I want to cancel my subscription?",
    answer:
      "You can cancel your subscription at any time. We offer a 14-day free trial, and there are no long-term contracts or cancellation fees.",
  },
]

export default function Faq() {
  const containerRef = useRef(null)

  return (
    <section id="faq" ref={containerRef} className="w-full py-12 md:py-24 lg:py-32 section-dark relative">
      <div className="gradient-overlay"></div>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-blue-900/30 border border-blue-500/20 px-3 py-1 text-sm text-blue-300 mb-4">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about Tweezy.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="border-blue-500/20">
                  <AccordionTrigger className="text-left hover:text-blue-300 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
              Contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
