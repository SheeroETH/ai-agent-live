"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Eye, Plus, Upload, Send } from "lucide-react"

interface Avatar {
  id: string
  name: string
  type: string
  userId: number
  created: string
}

const mockAvatars: Avatar[] = [
  {
    id: "avatar_abc123def456ghi789",
    name: "Gaming Buddy",
    type: "Gaming Assistant",
    userId: 2,
    created: "06/04/2025, 2:39:36 PM",
  },
  {
    id: "avatar_xyz789uvw456rst123",
    name: "Crypto Expert",
    type: "Financial Advisor",
    userId: 2,
    created: "06/03/2025, 1:15:22 PM",
  },
  {
    id: "avatar_mno345pqr678stu901",
    name: "Social Media Manager",
    type: "Content Creator",
    userId: 2,
    created: "06/02/2025, 10:30:45 AM",
  },
]

export default function AvatarPage() {
  const [avatars, setAvatars] = useState<Avatar[]>(mockAvatars)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    category: "",
    personality: "",
    replyStyle: "",
  })

  const truncateId = (id: string) => {
    return id.length > 20 ? `${id.substring(0, 20)}...` : id
  }

  const handleInputChange = (field: string, value: string) => {
    setAgentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveAgent = () => {
    console.log("Saving agent:", agentData)
    // Create a new avatar
    const newAvatar = {
      id: `avatar_${Date.now()}`,
      name: agentData.name || "New Avatar",
      type: agentData.category || "General",
      userId: 2,
      created: new Date().toLocaleString(),
    }
    setAvatars((prev) => [newAvatar, ...prev])
    setIsModalOpen(false)
    // Reset form
    setAgentData({
      name: "",
      description: "",
      category: "",
      personality: "",
      replyStyle: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Avatar</h1>
          <p className="text-[#B0B0B0]">Manage your AI avatars and personalities</p>
        </div>
        <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
          <SheetTrigger asChild>
            <Button className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Avatar
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-none p-0 bg-[#0F0F13] border-l border-[#333339]">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#333339]">
                <div>
                  <h2 className="text-2xl font-bold text-white">Configure Your Avatar</h2>
                  <p className="text-[#B0B0B0]">Set up your AI avatar's personality and behavior</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="border-[#333339] text-white hover:bg-[#2A2A2E]"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAgent} className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white">
                    Save Avatar
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Configuration */}
                <div className="w-1/2 p-6 overflow-y-auto">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1C1C21]">
                      <TabsTrigger
                        value="basic"
                        className="data-[state=active]:bg-[#407BFF] data-[state=active]:text-white"
                      >
                        Basic Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="personality"
                        className="data-[state=active]:bg-[#407BFF] data-[state=active]:text-white"
                      >
                        Personality
                      </TabsTrigger>
                      <TabsTrigger
                        value="reply"
                        className="data-[state=active]:bg-[#407BFF] data-[state=active]:text-white"
                      >
                        Reply
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6 mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-white">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your Avatar's Name"
                            value={agentData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-[#2A2A2E] border-[#333339] text-white mt-2"
                          />
                        </div>

                        <div>
                          <Label className="text-white">Avatar</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="w-16 h-16 bg-[#2A2A2E] rounded-full flex items-center justify-center border border-[#333339]">
                              <Upload className="h-6 w-6 text-[#B0B0B0]" />
                            </div>
                            <Button
                              variant="outline"
                              className="border-[#407BFF] text-[#407BFF] hover:bg-[#407BFF] hover:text-white"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-white">
                            Description *
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your avatar's purpose and personality"
                            value={agentData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="bg-[#2A2A2E] border-[#333339] text-white mt-2 min-h-[100px]"
                          />
                        </div>

                        <div>
                          <Label htmlFor="category" className="text-white">
                            Category *
                          </Label>
                          <Select
                            value={agentData.category}
                            onValueChange={(value) => handleInputChange("category", value)}
                          >
                            <SelectTrigger className="bg-[#2A2A2E] border-[#333339] text-white mt-2">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2A2A2E] border-[#333339]">
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="entertainment">Entertainment</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Advanced Settings */}
                        <div className="pt-4">
                          <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-[#1C1C21] p-4 text-white hover:bg-[#2A2A2E]">
                              <span className="font-medium">Advanced Settings</span>
                              <span className="transition group-open:rotate-180">
                                <svg
                                  fill="none"
                                  height="24"
                                  shapeRendering="geometricPrecision"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  viewBox="0 0 24 24"
                                  width="24"
                                >
                                  <path d="m6 9 6 6 6-6"></path>
                                </svg>
                              </span>
                            </summary>
                            <div className="mt-4 space-y-4 px-4">
                              <div>
                                <Label className="text-white">Response Delay (ms)</Label>
                                <Input placeholder="1000" className="bg-[#2A2A2E] border-[#333339] text-white mt-2" />
                              </div>
                              <div>
                                <Label className="text-white">Max Response Length</Label>
                                <Input placeholder="280" className="bg-[#2A2A2E] border-[#333339] text-white mt-2" />
                              </div>
                            </div>
                          </details>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="personality" className="space-y-6 mt-6">
                      <div>
                        <Label htmlFor="personality" className="text-white">
                          Personality Traits
                        </Label>
                        <Textarea
                          id="personality"
                          placeholder="Describe how your avatar should behave and respond. For example: 'Friendly and helpful, uses casual language, loves gaming and crypto, always optimistic...'"
                          value={agentData.personality}
                          onChange={(e) => handleInputChange("personality", e.target.value)}
                          className="bg-[#2A2A2E] border-[#333339] text-white mt-2 min-h-[200px]"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Tone & Style</Label>
                        <Select>
                          <SelectTrigger className="bg-[#2A2A2E] border-[#333339] text-white mt-2">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2A2A2E] border-[#333339]">
                            <SelectItem value="casual">Casual & Friendly</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="reply" className="space-y-6 mt-6">
                      <div>
                        <Label htmlFor="replyStyle" className="text-white">
                          Reply Style & Templates
                        </Label>
                        <Textarea
                          id="replyStyle"
                          placeholder="Define how your avatar should reply to messages. Include example responses and conversation starters..."
                          value={agentData.replyStyle}
                          onChange={(e) => handleInputChange("replyStyle", e.target.value)}
                          className="bg-[#2A2A2E] border-[#333339] text-white mt-2 min-h-[200px]"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Auto-Reply Settings</Label>
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="auto-reply" className="rounded border-[#333339]" />
                            <Label htmlFor="auto-reply" className="text-white">
                              Enable auto-reply
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="smart-replies" className="rounded border-[#333339]" />
                            <Label htmlFor="smart-replies" className="text-white">
                              Use smart reply suggestions
                            </Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right Panel - Live Preview */}
                <div className="w-1/2 p-6 border-l border-[#333339]">
                  <Card className="bg-[#1C1C21] border-[#333339] h-full">
                    <div className="p-4 border-b border-[#333339]">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#407BFF] rounded-full"></div>
                        <h3 className="text-white font-medium">Live Preview</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-4 h-full">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-[#407BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-xl font-bold">
                            {agentData.name ? agentData.name[0].toUpperCase() : "A"}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{agentData.name || "Your Avatar's Name"}</h3>
                        <p className="text-[#B0B0B0] mb-6">
                          This is the beginning of your direct message history with this avatar.
                        </p>
                      </div>

                      {/* Sample conversation */}
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-[#2A2A2E] rounded-lg p-3 max-w-xs">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 bg-[#B0B0B0] rounded-full flex items-center justify-center text-xs">
                                U
                              </div>
                            </div>
                            <p className="text-white text-sm">Hello, can you help me with something?</p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div className="bg-[#407BFF] rounded-lg p-3 max-w-xs">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 bg-[#5A8CFF] rounded-full flex items-center justify-center text-xs text-white">
                                {agentData.name ? agentData.name[0].toUpperCase() : "A"}
                              </div>
                            </div>
                            <p className="text-white text-sm">
                              {agentData.personality
                                ? "Hey there! Absolutely, I'd love to help! What's on your mind?"
                                : "Hey there! Sure thing, what's up? How can I help?"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Message input */}
                      <div className="flex gap-2 mt-6">
                        <Input
                          placeholder="Type a message..."
                          className="bg-[#2A2A2E] border-[#333339] text-white flex-1"
                        />
                        <Button size="icon" className="bg-[#407BFF] hover:bg-[#5A8CFF]">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Avatars Table */}
      <Card className="bg-[#1C1C21] border-[#333339]">
        <CardContent className="p-0">
          {avatars.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#2A2A2E] border-b border-[#333339]">
                    <th className="text-left p-4 text-white font-medium">Avatar ID</th>
                    <th className="text-left p-4 text-white font-medium">Avatar Name</th>
                    <th className="text-left p-4 text-white font-medium">Type</th>
                    <th className="text-left p-4 text-white font-medium">Created</th>
                    <th className="text-left p-4 text-white font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {avatars.map((avatar, index) => (
                    <tr
                      key={avatar.id}
                      className={`border-b border-[#333339] last:border-b-0 ${
                        index % 2 === 0 ? "bg-[#1C1C21]" : "bg-[#1F1F24]"
                      }`}
                    >
                      <td className="p-4">
                        <span className="text-white font-mono text-sm cursor-help" title={avatar.id}>
                          {truncateId(avatar.id)}
                        </span>
                      </td>
                      <td className="p-4 text-white">{avatar.name}</td>
                      <td className="p-4 text-[#B0B0B0]">{avatar.type}</td>
                      <td className="p-4 text-[#B0B0B0]">{avatar.created}</td>
                      <td className="p-4">
                        <Button variant="link" className="text-[#407BFF] hover:text-[#5A8CFF] p-0 h-auto">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-white text-lg mb-2">No avatars found.</p>
              <p className="text-[#B0B0B0]">Click '+ Create Avatar' to add one.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination (if needed) */}
      {avatars.length > 10 && (
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="bg-[#2A2A2E] border-[#333339] text-white hover:bg-[#3C3C44]">
            Previous
          </Button>
          <Button variant="outline" className="bg-[#2A2A2E] border-[#333339] text-white hover:bg-[#3C3C44]">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
