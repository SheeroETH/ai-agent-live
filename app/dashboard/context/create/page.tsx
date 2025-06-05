"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Upload, Send, Plus, X } from "lucide-react"

export default function CreateAgentPage() {
  const router = useRouter()
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    category: "",
    universe: "",
    bio: "",
    demeanor: [50],
    vulgarity: [50],
    safeForWork: [50],
    answerLength: [50],
    personalityTraits: [] as string[],
    loves: [] as string[],
    hates: [] as string[],
    characterFacts: "",
  })

  const [newTrait, setNewTrait] = useState("")
  const [newLove, setNewLove] = useState("")
  const [newHate, setNewHate] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setAgentData((prev) => ({ ...prev, [field]: value }))
  }

  const addTrait = (type: "personalityTraits" | "loves" | "hates", value: string) => {
    if (value.trim()) {
      setAgentData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }))
      if (type === "personalityTraits") setNewTrait("")
      if (type === "loves") setNewLove("")
      if (type === "hates") setNewHate("")
    }
  }

  const removeTrait = (type: "personalityTraits" | "loves" | "hates", index: number) => {
    setAgentData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const getDemeanorLabel = (value: number) => {
    if (value < 25) return "Uninterested"
    if (value < 75) return "Neutral"
    return "Inquisitive"
  }

  const getVulgarityLabel = (value: number) => {
    if (value < 25) return "Polite"
    if (value < 75) return "Neutral"
    return "Rude"
  }

  const getSafetyLabel = (value: number) => {
    if (value < 25) return "Safe for work"
    if (value < 75) return "Neutral"
    return "Not safe for work"
  }

  const getAnswerLengthLabel = (value: number) => {
    if (value < 25) return "Short"
    if (value < 50) return "Medium"
    if (value < 75) return "Long"
    return "Super long"
  }

  const handleSaveAgent = () => {
    console.log("Saving agent:", agentData)
    router.push("/dashboard/context")
  }

  const handleCancel = () => {
    router.push("/dashboard/context")
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0F0F13] overflow-hidden">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F13] border-b border-[#1E1E23]">
          <div className="flex items-center justify-between px-6 py-4 ml-60">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleCancel} className="text-white hover:bg-[#1A1A1F] p-2 h-auto">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">Setup your character</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-[#9CA3AF] text-sm">Draft</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-[#333339] text-[#CCCCCC] hover:bg-[#1A1A1F] hover:text-white bg-transparent px-6"
              >
                Publish
              </Button>
              <Button className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white px-6">Add to server</Button>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="pt-20 flex h-screen">
          {/* Left Panel - Scrollable Form */}
          <div className="flex-1 overflow-y-auto px-6 pb-8">
            <div className="max-w-xl mx-auto space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white text-sm font-medium mb-3 block">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Character name"
                    value={agentData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-[#1A1A1F] border-[#407BFF] text-white h-12 rounded-lg focus:border-[#407BFF] focus:ring-2 focus:ring-[#407BFF]/20"
                  />
                  <div className="text-right text-xs text-[#9CA3AF] mt-2">{agentData.name.length} / 40</div>
                </div>

                <div>
                  <Label className="text-white text-sm font-medium mb-3 block">Avatar</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#1A1A1F] rounded-full flex items-center justify-center border-2 border-dashed border-[#333339]">
                      <Plus className="h-8 w-8 text-[#9CA3AF]" />
                    </div>
                    <Button className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white rounded-lg px-4 py-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload image
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white text-sm font-medium mb-3 block">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Short description that will be seen in the character"
                    value={agentData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-[#1A1A1F] border-[#407BFF] text-white min-h-[100px] rounded-lg focus:border-[#407BFF] focus:ring-2 focus:ring-[#407BFF]/20 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-white text-sm font-medium mb-3 block">
                    Category *
                  </Label>
                  <Select value={agentData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-[#1A1A1F] border-[#333339] text-white h-12 rounded-lg focus:border-[#407BFF]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1F] border-[#333339] rounded-lg">
                      <SelectItem value="gaming" className="text-white hover:bg-[#2A2A2F]">
                        Gaming
                      </SelectItem>
                      <SelectItem value="business" className="text-white hover:bg-[#2A2A2F]">
                        Business
                      </SelectItem>
                      <SelectItem value="entertainment" className="text-white hover:bg-[#2A2A2F]">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="education" className="text-white hover:bg-[#2A2A2F]">
                        Education
                      </SelectItem>
                      <SelectItem value="lifestyle" className="text-white hover:bg-[#2A2A2F]">
                        Lifestyle
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="universe" className="text-white text-sm font-medium mb-3 block">
                    Universe
                  </Label>
                  <Input
                    id="universe"
                    placeholder="Universe that will be seen in catalog"
                    value={agentData.universe}
                    onChange={(e) => handleInputChange("universe", e.target.value)}
                    className="bg-[#1A1A1F] border-[#333339] text-white h-12 rounded-lg focus:border-[#407BFF] focus:ring-2 focus:ring-[#407BFF]/20"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-white text-sm font-medium mb-3 block">
                    Bio
                  </Label>
                  <div className="text-[#9CA3AF] text-sm mb-3">
                    Enter the character's bio. It describes the character's personality.
                  </div>
                  <Textarea
                    id="bio"
                    placeholder="Character bio..."
                    value={agentData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="bg-[#1A1A1F] border-[#333339] text-white min-h-[120px] rounded-lg focus:border-[#407BFF] focus:ring-2 focus:ring-[#407BFF]/20 resize-none"
                  />
                </div>
              </div>

              {/* Personality Sliders */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-6">Demeanor</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#9CA3AF]">Uninterested</span>
                      <span className="text-white font-medium">{getDemeanorLabel(agentData.demeanor[0])}</span>
                      <span className="text-[#9CA3AF]">Inquisitive</span>
                    </div>
                    <Slider
                      value={agentData.demeanor}
                      onValueChange={(value) => handleInputChange("demeanor", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-[#9CA3AF] text-sm">
                      Level {Math.floor(agentData.demeanor[0] / 25) + 1}:{" "}
                      {agentData.demeanor[0] < 25
                        ? "Showing little interest in conversations"
                        : agentData.demeanor[0] < 75
                          ? "Showing some curiosity and being engaging with questions"
                          : "Very curious and asks lots of questions"}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-lg font-semibold mb-6">Vulgarity level</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#9CA3AF]">Polite</span>
                      <span className="text-white font-medium">{getVulgarityLabel(agentData.vulgarity[0])}</span>
                      <span className="text-[#9CA3AF]">Rude</span>
                    </div>
                    <Slider
                      value={agentData.vulgarity}
                      onValueChange={(value) => handleInputChange("vulgarity", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-[#9CA3AF] text-sm">
                      Level {Math.floor(agentData.vulgarity[0] / 25) + 1}:{" "}
                      {agentData.vulgarity[0] < 25
                        ? "Always polite and respectful"
                        : agentData.vulgarity[0] < 75
                          ? "Occasionally swears, mostly polite with people, talks in a everyday manner"
                          : "Uses strong language and can be confrontational"}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-lg font-semibold mb-6">Safe for work</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#9CA3AF]">Safe for work</span>
                      <span className="text-white font-medium">{getSafetyLabel(agentData.safeForWork[0])}</span>
                      <span className="text-[#9CA3AF]">Not safe for work</span>
                    </div>
                    <Slider
                      value={agentData.safeForWork}
                      onValueChange={(value) => handleInputChange("safeForWork", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-[#9CA3AF] text-sm">
                      Level {Math.floor(agentData.safeForWork[0] / 25) + 1}:{" "}
                      {agentData.safeForWork[0] < 25
                        ? "Appropriate for all workplace environments"
                        : agentData.safeForWork[0] < 75
                          ? "Can use some sexual, violent or hateful language depending on the conversation"
                          : "May use explicit content not suitable for work"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personality Traits */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Personality traits</h3>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Add a personality trait..."
                      value={newTrait}
                      onChange={(e) => setNewTrait(e.target.value)}
                      className="bg-[#1A1A1F] border-[#333339] text-white rounded-lg flex-1"
                      onKeyPress={(e) => e.key === "Enter" && addTrait("personalityTraits", newTrait)}
                    />
                    <Button
                      onClick={() => addTrait("personalityTraits", newTrait)}
                      className="bg-[#1A1A1F] hover:bg-[#2A2A2F] border border-[#333339] rounded-lg px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agentData.personalityTraits.map((trait, index) => (
                      <div
                        key={index}
                        className="bg-[#2A2A2F] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {trait}
                        <button onClick={() => removeTrait("personalityTraits", index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Loves</h3>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Add something they love..."
                      value={newLove}
                      onChange={(e) => setNewLove(e.target.value)}
                      className="bg-[#1A1A1F] border-[#333339] text-white rounded-lg flex-1"
                      onKeyPress={(e) => e.key === "Enter" && addTrait("loves", newLove)}
                    />
                    <Button
                      onClick={() => addTrait("loves", newLove)}
                      className="bg-[#1A1A1F] hover:bg-[#2A2A2F] border border-[#333339] rounded-lg px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agentData.loves.map((love, index) => (
                      <div
                        key={index}
                        className="bg-[#2A2A2F] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {love}
                        <button onClick={() => removeTrait("loves", index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Hates</h3>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Add something they hate..."
                      value={newHate}
                      onChange={(e) => setNewHate(e.target.value)}
                      className="bg-[#1A1A1F] border-[#333339] text-white rounded-lg flex-1"
                      onKeyPress={(e) => e.key === "Enter" && addTrait("hates", newHate)}
                    />
                    <Button
                      onClick={() => addTrait("hates", newHate)}
                      className="bg-[#1A1A1F] hover:bg-[#2A2A2F] border border-[#333339] rounded-lg px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agentData.hates.map((hate, index) => (
                      <div
                        key={index}
                        className="bg-[#2A2A2F] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {hate}
                        <button onClick={() => removeTrait("hates", index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Character Facts */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Character facts</h3>
                <Textarea
                  placeholder="Type a fact about the character and press Enter"
                  value={agentData.characterFacts}
                  onChange={(e) => handleInputChange("characterFacts", e.target.value)}
                  className="bg-[#1A1A1F] border-[#333339] text-white min-h-[100px] rounded-lg focus:border-[#407BFF] focus:ring-2 focus:ring-[#407BFF]/20 resize-none"
                />
              </div>

              {/* Answer Length */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-6">Answer length</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">Short</span>
                    <span className="text-white font-medium">{getAnswerLengthLabel(agentData.answerLength[0])}</span>
                    <span className="text-[#9CA3AF]">Super long</span>
                  </div>
                  <Slider
                    value={agentData.answerLength}
                    onValueChange={(value) => handleInputChange("answerLength", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Fixed Preview */}
          <div className="w-96 flex-shrink-0 border-l border-[#1E1E23] bg-[#161619]">
            <div className="h-full flex flex-col">
              {/* Preview Header */}
              <div className="p-6 border-b border-[#1E1E23] bg-[#2A2A2E]">
                <div className="flex items-center gap-3">
                  <div className="text-white text-lg">@</div>
                  <h3 className="text-white font-medium">{agentData.name || "Your Character's Name"}</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="text-center py-8 flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-yellow-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">
                      {agentData.name ? agentData.name[0].toUpperCase() : "😊"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {agentData.name || "Your Character's Name"}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    This is the beginning of your direct message history with @{agentData.name || "Character"}
                  </p>
                </div>

                {/* Message Input */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      className="bg-[#1A1A1F] border-[#333339] text-white flex-1 rounded-lg h-10"
                    />
                    <Button size="icon" className="bg-[#407BFF] hover:bg-[#5A8CFF] rounded-lg h-10 w-10">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <Button variant="ghost" className="text-[#9CA3AF] hover:text-white text-sm">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
