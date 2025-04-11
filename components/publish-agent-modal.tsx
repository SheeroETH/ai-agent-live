"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check, Copy, Globe, Share2, Twitter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PublishAgentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: {
    name: string
    headline: string
    description: string
    avatarSrc: string
    category: string
    personalityTraits: string[]
    loves: string[]
    hates: string[]
  }
}

export default function PublishAgentModal({ open, onOpenChange, agent }: PublishAgentModalProps) {
  const [isPublic, setIsPublic] = useState(true)
  const [allowCloning, setAllowCloning] = useState(false)
  const [shareLink, setShareLink] = useState("https://tweezy.ai/agent/web3-gamer")
  const [copied, setCopied] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#1A1B1F] border border-[#34353A] text-white">
        {!isPublished ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Publish Your Agent</DialogTitle>
            </DialogHeader>

            <div className="py-4 space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-[#1DA1F2]/30">
                  {agent.avatarSrc ? (
                    <AvatarImage src={agent.avatarSrc} alt={agent.name} />
                  ) : (
                    <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2] text-xl">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1">
                  <h3 className="text-lg font-bold">{agent.name}</h3>
                  <p className="text-sm text-gray-400">{agent.headline}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
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
                </div>
              </div>

              <div className="space-y-4 border border-[#34353A] rounded-lg p-4 bg-[#25262B]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#1DA1F2]" />
                    <Label htmlFor="public-toggle" className="text-sm font-medium cursor-pointer">
                      Make this agent public
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
                    ? "Your agent will be visible to everyone and may be featured in the Tweezy marketplace."
                    : "Your agent will only be accessible to you and people you share the link with."}
                </p>
              </div>

              <div className="space-y-4 border border-[#34353A] rounded-lg p-4 bg-[#25262B]">
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
                      className="pr-10 bg-[#25262B] border-[#34353A] focus:border-[#1DA1F2]"
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
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-[#34353A] text-gray-300 hover:bg-[#34353A]/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePublish}
                className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
                disabled={isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish Agent"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center">
              <Check className="h-8 w-8 text-[#1DA1F2]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold">Agent Published Successfully!</h2>
              <p className="text-gray-400">Your agent is now live and ready to interact with users.</p>
            </div>

            <div className="space-y-4 w-full max-w-md">
              <div className="flex gap-2">
                <Input value={shareLink} readOnly className="bg-[#25262B] border-[#34353A]" />
                <Button
                  variant="outline"
                  className="border-[#34353A] text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                  onClick={handleCopyLink}
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-[#34353A] text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="flex-1 border-[#34353A] text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => {
                  onOpenChange(false)
                  // Redirect to agent page in a real app
                }}
                className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
              >
                View My Agent
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
