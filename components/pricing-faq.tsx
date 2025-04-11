"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const pricingFaqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
    color: "blue",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 14-day free trial. No credit card is required to start your trial. You'll only be charged once you decide to continue using Tweezy after your trial ends.",
    color: "purple",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency payments (Bitcoin, Ethereum).",
    color: "blue",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no cancellation fees. Your subscription will remain active until the end of your current billing period.",
    color: "purple",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day money-back guarantee if you're not satisfied with our service. After this period, we do not provide refunds for subscription payments already processed.",
    color: "blue",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer:
      "The Enterprise plan includes everything in the Business plan plus custom integrations, dedicated account management, custom AI training, and SLA guarantees. Contact our sales team for a custom quote.",
    color: "purple",
  },
]

export default function PricingFaq() {
  return (
    <section id="pricing-faq" className="w-full py-12 md:py-24 section-dark relative">
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
            <div className="inline-block rounded-lg bg-gradient-to-r from-[#1DA1F2]/30 to-purple-900/30 border border-[#1DA1F2]/20 px-3 py-1 text-sm text-[#1DA1F2] mb-4">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              <span className="gradient-text-blue">Pricing</span>{" "}
              <span className="gradient-text-purple">Questions</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Find answers to common questions about our pricing and plans.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {pricingFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className={faq.color === "blue" ? "border-blue-500/20" : "border-purple-500/20"}
                >
                  <AccordionTrigger
                    className={`text-left ${
                      faq.color === "blue"
                        ? "hover:text-[#1DA1F2] transition-colors"
                        : "hover:text-purple-300 transition-colors"
                    }`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
