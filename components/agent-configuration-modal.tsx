"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Send } from "lucide-react"

interface AgentConfigurationModalProps {
  onSave: (agentData: any) => void
  onClose: () => void
}

export default function AgentConfigurationModal({ onSave, onClose }: AgentConfigurationModalProps) {
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    category: "",
    personality: "",
    replyStyle: "",
  })

  const handleSave = () => {
    onSave(agentData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setAgentData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="h-full flex flex-col bg-[#0F0F13]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#333339]">
        <div>
          <h2 className="text-2xl font-bold text-white">Configure Your Agent</h2>
          <p className="text-[#B0B0B0]">Set up your AI agent's personality and behavior</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="border-[#333339] text-white hover:bg-[#2A2A2E]">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white">
            Save Agent
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Configuration */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1C1C21]">
              <TabsTrigger value="basic" className="data-[state=active]:bg-[#407BFF] data-[state=active]:text-white">
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="personality"
                className="data-[state=active]:bg-[#407BFF] data-[state=active]:text-white"
              >
                Personality
              </TabsTrigger>
              <TabsTrigger value="reply" className="data-[state=active]:bg-[#407BFF] data-[state=active]:text-white">
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
                    placeholder="Your Agent's Name"
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
                    placeholder="Describe your agent's purpose and personality"
                    value={agentData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-[#2A2A2E] border-[#333339] text-white mt-2 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-white">
                    Category *
                  </Label>
                  <Select value={agentData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
              </div>
            </TabsContent>

            <TabsContent value="personality" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="personality" className="text-white">
                  Personality Traits
                </Label>
                <Textarea
                  id="personality"
                  placeholder="Describe how your agent should behave and respond..."
                  value={agentData.personality}
                  onChange={(e) => handleInputChange("personality", e.target.value)}
                  className="bg-[#2A2A2E] border-[#333339] text-white mt-2 min-h-[200px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="reply" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="replyStyle" className="text-white">
                  Reply Style
                </Label>
                <Textarea
                  id="replyStyle"
                  placeholder="Define how your agent should reply to messages..."
                  value={agentData.replyStyle}
                  onChange={(e) => handleInputChange("replyStyle", e.target.value)}
                  className="bg-[#2A2A2E] border-[#333339] text-white mt-2 min-h-[200px]"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="w-1/2 p-6 border-l border-[#333339]">
          <Card className="bg-[#1C1C21] border-[#333339] h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#407BFF] rounded-full"></div>
                <CardTitle className="text-white">Live Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-white mb-2">{agentData.name || "Your Agent's Name"}</h3>
                <p className="text-[#B0B0B0] mb-6">
                  This is the beginning of your direct message history with this agent.
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
                        ? "Hey there! Sure thing, what's up? How can I help?"
                        : "Hey there! Sure thing, what's up? How can I help?"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message input */}
              <div className="flex gap-2 mt-6">
                <Input placeholder="Type a message..." className="bg-[#2A2A2E] border-[#333339] text-white flex-1" />
                <Button size="icon" className="bg-[#407BFF] hover:bg-[#5A8CFF]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
