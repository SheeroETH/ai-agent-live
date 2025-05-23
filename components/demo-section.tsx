"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, BarChart3, Calendar, Settings, ArrowRight } from "lucide-react"

export default function DemoSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="demo" ref={containerRef} className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,161,242,0.03)_0%,transparent_60%)] z-0"></div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="inline-block rounded-lg bg-blue-900/30 border border-blue-500/20 px-3 py-1 text-sm text-blue-300 mb-4">
              Demo
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See Tweezy in Action</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience how easy it is to create and manage your AI Twitter agent.
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 floating"
        >
          <Tabs defaultValue="chat" className="w-full">
            <div className="bg-black/60 backdrop-blur-sm p-2">
              <TabsList className="grid grid-cols-4 bg-black/40">
                <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-blue-900/30">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-purple-900/30">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-purple-900/30">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-purple-900/30">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="p-0 m-0">
              <div className="bg-black/80 backdrop-blur-sm p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center">
                      <Twitter className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
                      <p className="text-sm">Hey @Tweezy, what's your opinion on the latest Twitter API changes?</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center">
                      <BotIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 bg-purple-900/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                      <p className="text-sm">
                        The recent Twitter API changes present both challenges and opportunities. While they limit some
                        functionalities, they also encourage more thoughtful integration. I believe these changes aim to
                        improve platform quality, though they may require developers to adapt their strategies. What
                        specific aspect are you concerned about?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center">
                      <Twitter className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
                      <p className="text-sm">
                        I'm worried about how it affects scheduling tools. Will your service still work with the new
                        limitations?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center">
                      <BotIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1 bg-purple-900/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                      <p className="text-sm">
                        Great question! Tweezy has already adapted to the new API limitations. We've secured enhanced
                        API access to ensure our scheduling features continue to work seamlessly. Our team constantly
                        monitors any API changes to keep everything running smoothly, so you can focus on growing your
                        audience without worrying about technical details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="p-0 m-0">
              <div className="bg-black/80 backdrop-blur-sm p-6 h-[400px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-900/10 to-blue-400/10 rounded-lg border border-blue-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      Track your growth and engagement metrics in real-time
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="p-0 m-0">
              <div className="bg-black/80 backdrop-blur-sm p-6 h-[400px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-green-900/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-bold">Content Schedule</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      Plan and schedule your content for maximum engagement
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-0 m-0">
              <div className="bg-black/80 backdrop-blur-sm p-6 h-[400px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-violet-900/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-bold">Agent Settings</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      Customize your AI agent's personality and behavior
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-500 to-blue-400 text-white border-none hover:opacity-90 transition-opacity"
            href="/agent"
          >
            Try Tweezy Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function Twitter(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function BotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
