"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, BarChart3, Calendar, Settings, ArrowRight, ArrowUp } from "lucide-react"

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
                  <span className="hidden sm:inline">Audience</span>
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
              <div className="bg-black/80 backdrop-blur-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Engagement Rate Card */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-600/10 rounded-lg border border-blue-500/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-blue-300">Engagement Rate</h4>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        +12.5%
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">8.4%</div>
                    <div className="text-xs text-gray-400">vs last week</div>
                  </div>

                  {/* Followers Growth Card */}
                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-600/10 rounded-lg border border-purple-500/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-purple-300">Followers</h4>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        +847
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">12.4K</div>
                    <div className="text-xs text-gray-400">this month</div>
                  </div>

                  {/* Replies Sent Card */}
                  <div className="bg-gradient-to-br from-green-900/20 to-green-600/10 rounded-lg border border-green-500/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-green-300">AI Replies</h4>
                      <div className="text-xs text-blue-400">Today</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">247</div>
                    <div className="text-xs text-gray-400">automated responses</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-lg border border-blue-500/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Engagement Over Time</h4>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                        <span className="text-gray-300">Likes</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                        <span className="text-gray-300">Replies</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                        <span className="text-gray-300">Retweets</span>
                      </div>
                    </div>
                  </div>

                  {/* Y-axis labels */}
                  <div className="flex mb-2">
                    <div className="w-8 flex flex-col justify-between text-xs text-gray-500 h-32">
                      <span>500</span>
                      <span>400</span>
                      <span>300</span>
                      <span>200</span>
                      <span>100</span>
                      <span>0</span>
                    </div>

                    {/* Chart Container */}
                    <div className="flex-1 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="border-t border-gray-800/30 w-full"></div>
                        ))}
                      </div>

                      {/* Stacked Bar Chart */}
                      <div className="h-32 flex items-end justify-between gap-1 relative z-10">
                        {[
                          { likes: 120, replies: 45, retweets: 25, date: "Jun 1" },
                          { likes: 180, replies: 65, retweets: 35, date: "Jun 8" },
                          { likes: 95, replies: 30, retweets: 20, date: "Jun 15" },
                          { likes: 220, replies: 80, retweets: 45, date: "Jun 22" },
                          { likes: 150, replies: 55, retweets: 30, date: "Jun 29" },
                          { likes: 280, replies: 90, retweets: 55, date: "Jul 6" },
                          { likes: 200, replies: 70, retweets: 40, date: "Jul 13" },
                          { likes: 320, replies: 85, retweets: 60, date: "Jul 20" },
                          { likes: 160, replies: 60, retweets: 35, date: "Jul 27" },
                          { likes: 380, replies: 95, retweets: 70, date: "Aug 3" },
                          { likes: 240, replies: 75, retweets: 45, date: "Aug 10" },
                          { likes: 350, replies: 88, retweets: 65, date: "Aug 17" },
                        ].map((data, index) => {
                          const total = data.likes + data.replies + data.retweets
                          const maxHeight = 128 // h-32 in pixels
                          const scale = maxHeight / 500 // 500 is our max scale

                          const likesHeight = data.likes * scale
                          const repliesHeight = data.replies * scale
                          const retweetsHeight = data.retweets * scale

                          return (
                            <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
                              {/* Tooltip */}
                              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 min-w-[120px]">
                                <div className="text-xs text-white font-medium mb-1">Total: {total}</div>
                                <div className="space-y-1 text-xs">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-300">Likes: {data.likes}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    <span className="text-gray-300">Replies: {data.replies}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-gray-300">Retweets: {data.retweets}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Stacked bars */}
                              <div className="w-full flex flex-col justify-end relative">
                                {/* Retweets (top) */}
                                <div
                                  className="w-full bg-gradient-to-t from-green-500/80 to-green-400/60 rounded-t-sm shadow-lg shadow-green-500/20 transition-all duration-300 group-hover:shadow-green-500/40"
                                  style={{ height: `${retweetsHeight}px` }}
                                ></div>
                                {/* Replies (middle) */}
                                <div
                                  className="w-full bg-gradient-to-t from-purple-500/80 to-purple-400/60 shadow-lg shadow-purple-500/20 transition-all duration-300 group-hover:shadow-purple-500/40"
                                  style={{ height: `${repliesHeight}px` }}
                                ></div>
                                {/* Likes (bottom) */}
                                <div
                                  className="w-full bg-gradient-to-t from-blue-500/80 to-blue-400/60 rounded-b-sm shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:shadow-blue-500/40"
                                  style={{ height: `${likesHeight}px` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="flex justify-between text-xs text-gray-500 mt-2 ml-8">
                    {[
                      "Jun 1",
                      "Jun 8",
                      "Jun 15",
                      "Jun 22",
                      "Jun 29",
                      "Jul 6",
                      "Jul 13",
                      "Jul 20",
                      "Jul 27",
                      "Aug 3",
                      "Aug 10",
                      "Aug 17",
                    ].map((date, index) => (
                      <span key={index} className={index % 2 === 0 ? "block" : "hidden sm:block"}>
                        {date}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Weekly Performance</span>
                    <span>Analytics Dashboard</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="p-0 m-0">
              <div className="bg-black/80 backdrop-blur-sm p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Discover Your Audience</h3>
                  <p className="text-gray-400 text-sm">Find and connect with influential accounts in your niche</p>
                </div>

                <div className="space-y-6">
                  {/* Web3 Influencers */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🚀</span>
                      <h4 className="text-lg font-semibold text-white">Web3 Influencers</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-900/20 to-blue-600/10 rounded-lg border border-blue-500/20 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            C
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium">@cobie</span>
                              <div className="flex items-center gap-1 text-xs">
                                <span>🔥</span>
                                <span className="text-orange-400 font-medium">9.6/10</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">Co-host of UpOnlyTV. Crypto OG.</p>
                            <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-md border border-blue-500/30 transition-colors">
                              Add to Agent
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-900/20 to-purple-600/10 rounded-lg border border-purple-500/20 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                            P
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium">@punk6529</span>
                              <div className="flex items-center gap-1 text-xs">
                                <span>🔥</span>
                                <span className="text-orange-400 font-medium">8.9/10</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">Metaverse maximalist.</p>
                            <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs px-3 py-1 rounded-md border border-purple-500/30 transition-colors">
                              Add to Agent
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Startup Builders */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🧠</span>
                      <h4 className="text-lg font-semibold text-white">Startup Builders</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-green-900/20 to-green-600/10 rounded-lg border border-green-500/20 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                            N
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium">@naval</span>
                              <div className="flex items-center gap-1 text-xs">
                                <span>🔥</span>
                                <span className="text-orange-400 font-medium">9.8/10</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">Philosopher. Angel investor.</p>
                            <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 text-xs px-3 py-1 rounded-md border border-green-500/30 transition-colors">
                              Add to Agent
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-600/10 rounded-lg border border-cyan-500/20 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            K
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium">@thisiskp_</span>
                              <div className="flex items-center gap-1 text-xs">
                                <span>🔥</span>
                                <span className="text-orange-400 font-medium">8.7/10</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">Building @Lasso. Tweets about startups.</p>
                            <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs px-3 py-1 rounded-md border border-cyan-500/30 transition-colors">
                              Add to Agent
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-0 m-0">
              <div className="bg-black/80 backdrop-blur-sm p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Agent Settings</h3>
                  <p className="text-gray-400 text-sm">Customize your AI agent's personality and behavior</p>
                </div>

                {/* Single Card Layout */}
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20 p-6 max-w-2xl mx-auto">
                  {/* Personality Presets */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-xl">🎭</span>
                      Personality Presets
                    </h4>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { name: "Funny", emoji: "😄", active: true },
                        { name: "Professional", emoji: "👔", active: false },
                        { name: "Sarcastic", emoji: "😏", active: false },
                        { name: "Chill", emoji: "🧘", active: false },
                        { name: "Custom", emoji: "✍️", active: false },
                      ].map((preset) => (
                        <div
                          key={preset.name}
                          className={`group cursor-pointer p-3 rounded-lg border text-center transition-all duration-300 hover:scale-105 ${
                            preset.active
                              ? "bg-blue-500/30 border-blue-400/50 shadow-lg shadow-blue-500/20"
                              : "bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50"
                          }`}
                        >
                          <div
                            className={`text-2xl mb-1 transition-all duration-300 ${
                              preset.active ? "animate-pulse" : "group-hover:scale-110"
                            }`}
                          >
                            {preset.emoji}
                          </div>
                          <div
                            className={`text-xs font-medium ${
                              preset.active ? "text-blue-300" : "text-gray-400 group-hover:text-gray-300"
                            }`}
                          >
                            {preset.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reply Behavior Controls */}
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-xl">⚙️</span>
                      Reply Behavior
                    </h4>
                  </div>

                  {/* Preview Badge */}
                  <div className="mt-6 pt-4 border-t border-gray-700/30">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>Live preview in dashboard</span>
                    </div>
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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Join Waitlist Now
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
