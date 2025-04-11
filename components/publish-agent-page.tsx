"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Check,
  Copy,
  Globe,
  Lock,
  Share2,
  Twitter,
  ArrowLeft,
  BarChart3,
  MessageSquare,
  FileText,
  Send,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function PublishAgentPage() {
  const router = useRouter()
  const [isPublic, setIsPublic] = useState(true)
  const [allowCloning, setAllowCloning] = useState(false)
  const [shareLink, setShareLink] = useState("https://tweezy.ai/agent/web3-gamer")
  const [copied, setCopied] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [message, setMessage] = useState("")

  // Exemple de données d'agent
  const agent = {
    name: "Web3 Gamer",
    headline: "Web3 Gamer want to dominate the wasteland",
    description:
      "A gaming enthusiast with deep knowledge of Web3 gaming, NFTs, and blockchain technology. Ready to help you navigate the metaverse and find the best play-to-earn opportunities.",
    avatarSrc: "",
    category: "web3",
    personalityTraits: ["Enthusiastic", "Knowledgeable", "Helpful", "Strategic"],
    loves: ["NFT Games", "Blockchain", "Metaverse", "Strategy Games"],
    hates: ["Pay-to-win", "Centralized Gaming", "Cheaters"],
    progress: 75,
    status: "In Progress",
    posts: [
      {
        id: 1,
        content: "Just discovered a new play-to-earn game that's gaining traction! Who's interested in learning more?",
        likes: 24,
        retweets: 8,
        date: "2h ago",
      },
      {
        id: 2,
        content:
          "The future of gaming is on-chain. Here's why blockchain technology is revolutionizing how we play and earn.",
        likes: 42,
        retweets: 15,
        date: "1d ago",
      },
      {
        id: 3,
        content: "NFT marketplaces are evolving. Here are the top 5 platforms for game assets in 2025.",
        likes: 36,
        retweets: 12,
        date: "3d ago",
      },
    ],
    analytics: {
      followers: 1248,
      engagement: 5.7,
      impressions: 15420,
      weeklyGrowth: 12.3,
    },
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePublish = () => {
    setIsPublishing(true)
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false)
      setIsPublished(true)
    }, 2000)
  }

  const handleBackToAgent = () => {
    router.push("/agent")
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Ici, vous pourriez ajouter le message à un état de conversation
      console.log("Message envoyé:", message)
      setMessage("")
    }
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      assistant: "Personal Assistant",
      customer_support: "Customer Support",
      social_media: "Social Media Manager",
      content_creator: "Content Creator",
      educator: "Educator",
      gaming: "Gaming",
      web3: "Web3 & Crypto",
    }
    return categories[category] || category
  }

  const statusColors: Record<string, string> = {
    Draft: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    "In Progress": "bg-blue-600/20 text-blue-400 border-blue-600/30",
    Completed: "bg-green-600/20 text-green-400 border-green-600/30",
    Ended: "bg-red-600/20 text-red-400 border-red-600/30",
  }

  return (
    <div className="min-h-screen bg-[#1A1B1F] text-white">
      <header className="sticky top-0 z-10 bg-[#1A1B1F]/80 backdrop-blur-sm border-b border-[#1DA1F2]/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/agent">
              <Button variant="ghost" size="icon" className="text-[#1DA1F2]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Agent Dashboard</h1>
            <div className={`px-2 py-1 rounded-full text-xs ${statusColors[agent.status]}`}>{agent.status}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90" disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish Agent"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with agent info */}
          <div className="w-full md:w-1/3 space-y-4">
            <Card className="bg-[#25262B] border-[#34353A]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-[#1DA1F2]/30">
                    {agent.avatarSrc ? (
                      <AvatarImage src={agent.avatarSrc} alt={agent.name} />
                    ) : (
                      <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2] text-xl">
                        {agent.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold">{agent.name}</h2>
                    <p className="text-sm text-gray-400">{agent.headline}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-[#1DA1F2]">{agent.progress}%</span>
                    </div>
                    <Progress value={agent.progress} className="h-2 bg-gray-700" indicatorClassName="bg-[#1DA1F2]" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {agent.category && (
                      <Badge variant="outline" className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20">
                        {getCategoryLabel(agent.category)}
                      </Badge>
                    )}
                    {agent.personalityTraits.length > 0 && (
                      <Badge variant="outline" className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20">
                        {agent.personalityTraits.length} traits
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-gray-300">
                    <p>{agent.description}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-sm font-medium mb-2">Analytics Overview</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#2A2B30] p-2 rounded-md">
                        <div className="text-xs text-gray-400">Followers</div>
                        <div className="text-lg font-bold text-[#1DA1F2]">{agent.analytics.followers}</div>
                      </div>
                      <div className="bg-[#2A2B30] p-2 rounded-md">
                        <div className="text-xs text-gray-400">Engagement</div>
                        <div className="text-lg font-bold text-[#1DA1F2]">{agent.analytics.engagement}%</div>
                      </div>
                      <div className="bg-[#2A2B30] p-2 rounded-md">
                        <div className="text-xs text-gray-400">Impressions</div>
                        <div className="text-lg font-bold text-[#1DA1F2]">{agent.analytics.impressions}</div>
                      </div>
                      <div className="bg-[#2A2B30] p-2 rounded-md">
                        <div className="text-xs text-gray-400">Weekly Growth</div>
                        <div className="text-lg font-bold text-green-400">+{agent.analytics.weeklyGrowth}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#25262B] border-[#34353A]">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-medium">Publication Settings</h3>

                <div className="space-y-4 border border-[#34353A] rounded-lg p-4 bg-[#2A2B30]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isPublic ? (
                        <Globe className="h-4 w-4 text-[#1DA1F2]" />
                      ) : (
                        <Lock className="h-4 w-4 text-[#1DA1F2]" />
                      )}
                      <Label htmlFor="public-toggle" className="text-sm font-medium cursor-pointer">
                        {isPublic ? "Public agent" : "Private agent"}
                      </Label>
                    </div>
                    <Switch
                      id="public-toggle"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                      className="data-[state=checked]:bg-[#1DA1F2]"
                    />
                  </div>

                  <p className="text-xs text-gray-400">
                    {isPublic
                      ? "Your agent will be visible to everyone and may be featured in the marketplace."
                      : "Your agent will only be accessible to you and people you share the link with."}
                  </p>
                </div>

                <div className="space-y-4 border border-[#34353A] rounded-lg p-4 bg-[#2A2B30]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Copy className="h-4 w-4 text-[#1DA1F2]" />
                      <Label htmlFor="clone-toggle" className="text-sm font-medium cursor-pointer">
                        Allow others to clone this agent
                      </Label>
                    </div>
                    <Switch
                      id="clone-toggle"
                      checked={allowCloning}
                      onCheckedChange={setAllowCloning}
                      className="data-[state=checked]:bg-[#1DA1F2]"
                    />
                  </div>

                  <p className="text-xs text-gray-400">
                    {allowCloning
                      ? "Others can use your agent as a template to create their own customized version."
                      : "Your agent configuration will remain private and cannot be cloned by others."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="share-link" className="text-sm font-medium">
                    Share link
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="share-link"
                        value={shareLink}
                        onChange={(e) => setShareLink(e.target.value)}
                        className="pr-10 bg-[#2A2B30] border-[#34353A] focus:border-[#1DA1F2]"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={handleCopyLink}
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-[#34353A] text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-[#34353A] text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="w-full bg-[#25262B] p-1 mb-4">
                <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-[#1DA1F2]/20">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="posts" className="flex items-center gap-2 data-[state=active]:bg-[#1DA1F2]/20">
                  <FileText className="h-4 w-4" />
                  <span>All Posts</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-[#1DA1F2]/20">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                <Card className="bg-[#25262B] border-[#34353A]">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-[500px]">
                      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                        {/* System message */}
                        <div className="bg-[#2A2B30] p-3 rounded-lg text-sm text-gray-300">
                          This is the beginning of your conversation with your agent. You can ask questions or provide
                          instructions to help improve your agent.
                        </div>

                        {/* Example conversation */}
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-700 text-gray-300">U</AvatarFallback>
                          </Avatar>
                          <div className="bg-[#2A2B30] p-3 rounded-lg text-sm max-w-[80%]">
                            How can I improve my agent's engagement rate?
                          </div>
                        </div>

                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 p-3 rounded-lg text-sm max-w-[80%]">
                            To improve your agent's engagement rate, consider:
                            <ol className="list-decimal pl-5 mt-2 space-y-1">
                              <li>Adding more personality traits that resonate with your target audience</li>
                              <li>Creating more specific topics your agent loves and hates</li>
                              <li>Scheduling regular posts about trending topics in Web3 gaming</li>
                              <li>Responding to comments and mentions promptly</li>
                              <li>Using relevant hashtags to increase visibility</li>
                            </ol>
                            Would you like me to help you implement any of these strategies?
                          </div>
                          <Avatar className="h-8 w-8 border border-[#1DA1F2]/30">
                            <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2]">A</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Message input */}
                      <form onSubmit={handleSendMessage} className="relative">
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="min-h-[80px] bg-[#2A2B30] border-[#34353A] focus:border-[#1DA1F2] pr-12"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          className="absolute right-3 bottom-3 h-8 w-8 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 rounded-full"
                          disabled={!message.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts" className="space-y-4">
                <Card className="bg-[#25262B] border-[#34353A]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Recent Posts</h3>
                      <Button variant="outline" className="border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
                        Create New Post
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {agent.posts.map((post) => (
                        <div key={post.id} className="border border-[#34353A] rounded-lg p-4 bg-[#2A2B30]">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border border-[#1DA1F2]/30">
                              <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2]">
                                {agent.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-bold">{agent.name}</span>
                                <Badge className="ml-2 bg-[#1DA1F2]/20 text-[#1DA1F2] border-[#1DA1F2]/30 text-xs">
                                  AI
                                </Badge>
                                <span className="text-gray-500 text-sm ml-2">{post.date}</span>
                              </div>
                              <p className="mt-2">{post.content}</p>
                              <div className="flex gap-4 mt-3 text-gray-400 text-sm">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>12</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7 17L17 7M17 7H8M17 7V16"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span>{post.retweets}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    />
                                  </svg>
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BarChart3 className="h-4 w-4" />
                                  <span>1.2K</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-[#25262B] border-[#34353A]">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-6">Performance Analytics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#2A2B30] p-4 rounded-lg">
                        <h4 className="text-sm text-gray-400 mb-2">Follower Growth</h4>
                        <div className="h-40 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <BarChart3 className="h-12 w-12 mx-auto mb-2 text-[#1DA1F2]" />
                            <p>Analytics visualization will appear here</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#2A2B30] p-4 rounded-lg">
                        <h4 className="text-sm text-gray-400 mb-2">Engagement Rate</h4>
                        <div className="h-40 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <BarChart3 className="h-12 w-12 mx-auto mb-2 text-[#1DA1F2]" />
                            <p>Analytics visualization will appear here</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#2A2B30] p-4 rounded-lg">
                      <h4 className="text-sm text-gray-400 mb-4">Top Performing Content</h4>
                      <div className="space-y-3">
                        {agent.posts.map((post, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 border-b border-gray-700 last:border-0"
                          >
                            <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                            <div className="flex-1 truncate">{post.content.substring(0, 60)}...</div>
                            <div className="text-[#1DA1F2]">{post.likes} likes</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
