"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Bot, BarChart, Clock, Users, MessageSquare, Zap } from "lucide-react"

const features = [
  {
    icon: <Bot className="h-10 w-10 text-blue-500" />,
    title: "AI-Powered Responses",
    description: "Our advanced AI understands context and generates human-like responses to engage with your audience.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-blue-500" />,
    title: "Growth Analytics",
    description: "Track your growth with detailed analytics on engagement, followers, and content performance.",
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "Automated Scheduling",
    description: "Schedule tweets at optimal times to maximize engagement and reach.",
  },
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "Audience Insights",
    description: "Understand your audience better with detailed demographic and interest data.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
    title: "Smart Replies",
    description: "Automatically reply to mentions and DMs with contextually relevant responses.",
  },
  {
    icon: <Zap className="h-10 w-10 text-blue-500" />,
    title: "Quick Setup",
    description: "Get started in minutes with our simple setup process and intuitive interface.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 section-dark relative">
      <div className="gradient-overlay"></div>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-blue-900/30 border border-blue-500/20 px-3 py-1 text-sm text-blue-300 mb-4">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Grow on Twitter</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered platform provides all the tools you need to create, manage, and grow your Twitter presence.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 bg-black/40 backdrop-blur-sm border border-blue-500/10 rounded-xl hover:border-blue-500/30 transition-all duration-300"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="p-3 rounded-full bg-blue-900/20 mb-4 glow-blue"
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  )
}
