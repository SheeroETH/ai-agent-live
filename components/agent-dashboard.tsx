"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Send, MoreVertical, X, Plus, ChevronDown, ChevronUp } from "lucide-react"

export default function AgentDashboard() {
  const [agentName, setAgentName] = useState("Your Agent's Name")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [answerLength, setAnswerLength] = useState([50])
  const [demeanor, setDemeanor] = useState([50])
  const [vulgarity, setVulgarity] = useState([50])
  const [workSafety, setWorkSafety] = useState([50])
  const [avatarSrc, setAvatarSrc] = useState("")
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([])
  const [loves, setLoves] = useState<string[]>([])
  const [hates, setHates] = useState<string[]>([])
  const [newTrait, setNewTrait] = useState("")
  const [newLove, setNewLove] = useState("")
  const [newHate, setNewHate] = useState("")
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [headline, setHeadline] = useState("Web3 Gamer want to dominate the wasteland")

  // Ajoutez ces états après les autres états existants
  const [hashtags, setHashtags] = useState<string[]>([])
  const [mentions, setMentions] = useState<string[]>([])
  const [newHashtag, setNewHashtag] = useState("")
  const [newMention, setNewMention] = useState("")
  const hashtagInputRef = useRef<HTMLInputElement>(null)
  const mentionInputRef = useRef<HTMLInputElement>(null)

  const traitInputRef = useRef<HTMLInputElement>(null)
  const loveInputRef = useRef<HTMLInputElement>(null)
  const hateInputRef = useRef<HTMLInputElement>(null)

  // Function to get level description based on slider value
  const getLevelDescription = (value: number[], type: string) => {
    const level = Math.floor((value[0] / 100) * 4) + 1

    switch (type) {
      case "answerLength":
        return level === 1
          ? "Very short responses (1-2 sentences)"
          : level === 2
            ? "Short responses (2-3 sentences)"
            : level === 3
              ? "Medium responses (1 paragraph)"
              : "Detailed responses (multiple paragraphs)"
      case "demeanor":
        return level === 1
          ? "Professional and formal"
          : level === 2
            ? "Friendly but professional"
            : level === 3
              ? "Casual and conversational"
              : "Enthusiastic and expressive"
      case "vulgarity":
        return level === 1
          ? "Always polite, no slang"
          : level === 2
            ? "Occasionally uses mild slang"
            : level === 3
              ? "Uses casual language and some slang"
              : "Can use strong language when appropriate"
      case "workSafety":
        return level === 1
          ? "Always work-appropriate"
          : level === 2
            ? "Generally safe for work"
            : level === 3
              ? "May discuss sensitive topics professionally"
              : "No content restrictions"
      default:
        return ""
    }
  }

  const addPersonalityTrait = () => {
    if (newTrait.trim() && personalityTraits.length < 20) {
      setPersonalityTraits([...personalityTraits, newTrait.trim()])
      setNewTrait("")
      if (traitInputRef.current) {
        traitInputRef.current.focus()
      }
    }
  }

  const removePersonalityTrait = (index: number) => {
    setPersonalityTraits(personalityTraits.filter((_, i) => i !== index))
  }

  const addLove = () => {
    if (newLove.trim()) {
      setLoves([...loves, newLove.trim()])
      setNewLove("")
      if (loveInputRef.current) {
        loveInputRef.current.focus()
      }
    }
  }

  const removeLove = (index: number) => {
    setLoves(loves.filter((_, i) => i !== index))
  }

  const addHate = () => {
    if (newHate.trim()) {
      setHates([...hates, newHate.trim()])
      setNewHate("")
      if (hateInputRef.current) {
        hateInputRef.current.focus()
      }
    }
  }

  const removeHate = (index: number) => {
    setHates(hates.filter((_, i) => i !== index))
  }

  const addHashtag = () => {
    if (newHashtag.trim()) {
      // Assurez-vous que le hashtag commence par #
      const formattedHashtag = newHashtag.trim().startsWith("#") ? newHashtag.trim() : `#${newHashtag.trim()}`
      setHashtags([...hashtags, formattedHashtag])
      setNewHashtag("")
      if (hashtagInputRef.current) {
        hashtagInputRef.current.focus()
      }
    }
  }

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index))
  }

  const addMention = () => {
    if (newMention.trim()) {
      // Assurez-vous que la mention commence par @
      const formattedMention = newMention.trim().startsWith("@") ? newMention.trim() : `@${newMention.trim()}`
      setMentions([...mentions, formattedMention])
      setNewMention("")
      if (mentionInputRef.current) {
        mentionInputRef.current.focus()
      }
    }
  }

  const removeMention = (index: number) => {
    setMentions(mentions.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent, addFunction: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addFunction()
    }
  }

  return (
    <div className="flex min-h-screen bg-[#1A1B1F] text-white">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-[#1A1B1F]/80 backdrop-blur-sm border-b border-[#1DA1F2]/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-[#1DA1F2]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Configure Your Agent</h1>
              <div className="px-2 py-1 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] text-xs">Draft</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
                Save Draft
              </Button>
              <Link href="/publish-agent">
                <Button className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90">Publish Agent</Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="basic" className="data-[state=active]:bg-[#1DA1F2]/20">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="personality" className="data-[state=active]:bg-[#1DA1F2]/20">
                  Personality
                </TabsTrigger>
                <TabsTrigger value="reply" className="data-[state=active]:bg-[#1DA1F2]/20">
                  Reply
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Name <span className="text-[#1DA1F2]">*</span>
                    </label>
                    <Input
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Enter your agent's name"
                      className="bg-[#25262B] border-[#34353A] focus:border-[#1DA1F2]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Avatar</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-[#25262B] border border-[#34353A] flex items-center justify-center overflow-hidden">
                        {avatarSrc ? (
                          <img
                            src={avatarSrc || "/placeholder.svg"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-[#1DA1F2]">
                            <Upload className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Description <span className="text-[#1DA1F2]">*</span>
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your agent's purpose and personality"
                      className="bg-[#25262B] border-[#34353A] focus:border-[#1DA1F2] min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Category <span className="text-[#1DA1F2]">*</span>
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-[#25262B] border-[#34353A] focus:border-[#1DA1F2]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#25262B] border-[#34353A]">
                        <SelectItem value="assistant">Personal Assistant</SelectItem>
                        <SelectItem value="customer_support">Customer Support</SelectItem>
                        <SelectItem value="social_media">Social Media Manager</SelectItem>
                        <SelectItem value="content_creator">Content Creator</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="web3">Web3 & Crypto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Remplacer complètement la section Advanced Settings pour qu'elle soit déroulable */}
                <div className="border border-[#34353A] rounded-lg bg-[#25262B]/50 hover:border-[#1DA1F2]/30 transition-colors">
                  <button
                    className="w-full p-4 flex items-center justify-between cursor-pointer text-left"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  >
                    <h3 className="text-sm font-medium text-gray-300">Advanced Settings</h3>
                    {isAdvancedOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#1DA1F2]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#1DA1F2]" />
                    )}
                  </button>

                  {isAdvancedOpen && (
                    <div className="p-4 pt-0 space-y-4 border-t border-[#34353A]">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-gray-400">Answer Length</label>
                          <span className="text-xs text-[#1DA1F2]">
                            {getLevelDescription(answerLength, "answerLength")}
                          </span>
                        </div>
                        <Slider
                          value={answerLength}
                          onValueChange={setAnswerLength}
                          max={100}
                          step={1}
                          className="[&>span]:bg-[#1DA1F2]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-gray-400">Demeanor</label>
                          <span className="text-xs text-[#1DA1F2]">{getLevelDescription(demeanor, "demeanor")}</span>
                        </div>
                        <Slider
                          value={demeanor}
                          onValueChange={setDemeanor}
                          max={100}
                          step={1}
                          className="[&>span]:bg-[#1DA1F2]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-gray-400">Language Style</label>
                          <span className="text-xs text-[#1DA1F2]">{getLevelDescription(vulgarity, "vulgarity")}</span>
                        </div>
                        <Slider
                          value={vulgarity}
                          onValueChange={setVulgarity}
                          max={100}
                          step={1}
                          className="[&>span]:bg-[#1DA1F2]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-gray-400">Content Safety</label>
                          <span className="text-xs text-[#1DA1F2]">
                            {getLevelDescription(workSafety, "workSafety")}
                          </span>
                        </div>
                        <Slider
                          value={workSafety}
                          onValueChange={setWorkSafety}
                          max={100}
                          step={1}
                          className="[&>span]:bg-[#1DA1F2]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="personality" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-300">
                      Personality traits <span className="text-xs text-gray-500">(up to 20)</span>
                    </h3>
                    <span className="text-xs text-gray-500">{personalityTraits.length}/20</span>
                  </div>

                  <div className="p-4 border border-[#1DA1F2]/30 rounded-lg bg-[#25262B]">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {personalityTraits.map((trait, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2A2B30] text-sm"
                        >
                          {trait}
                          <button
                            onClick={() => removePersonalityTrait(index)}
                            className="ml-1 text-gray-400 hover:text-white"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center">
                        <Input
                          ref={traitInputRef}
                          value={newTrait}
                          onChange={(e) => setNewTrait(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, addPersonalityTrait)}
                          placeholder="Add trait..."
                          className="bg-transparent border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 w-24 min-w-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={addPersonalityTrait}
                          className="h-6 w-6 rounded-full"
                          disabled={!newTrait.trim() || personalityTraits.length >= 20}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300">Loves</h3>
                  <div className="p-4 border border-[#34353A] rounded-lg bg-[#25262B]">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {loves.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2A2B30] text-sm"
                        >
                          {item}
                          <button onClick={() => removeLove(index)} className="ml-1 text-gray-400 hover:text-white">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center">
                        <Input
                          ref={loveInputRef}
                          value={newLove}
                          onChange={(e) => setNewLove(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, addLove)}
                          placeholder="Add item..."
                          className="bg-transparent border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 w-24 min-w-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={addLove}
                          className="h-6 w-6 rounded-full"
                          disabled={!newLove.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-300">Hates</h3>
                  <div className="p-4 border border-[#34353A] rounded-lg bg-[#25262B]">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hates.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2A2B30] text-sm"
                        >
                          {item}
                          <button onClick={() => removeHate(index)} className="ml-1 text-gray-400 hover:text-white">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center">
                        <Input
                          ref={hateInputRef}
                          value={newHate}
                          onChange={(e) => setNewHate(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, addHate)}
                          placeholder="Add item..."
                          className="bg-transparent border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 w-24 min-w-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={addHate}
                          className="h-6 w-6 rounded-full"
                          disabled={!newHate.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reply" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-300">Hashtags to Reply</h3>
                    <span className="text-xs text-gray-500">{hashtags.length} hashtags</span>
                  </div>

                  <div className="p-4 border border-[#1DA1F2]/30 rounded-lg bg-[#25262B]">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hashtags.map((hashtag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2A2B30] text-sm"
                        >
                          {hashtag}
                          <button onClick={() => removeHashtag(index)} className="ml-1 text-gray-400 hover:text-white">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center">
                        <Input
                          ref={hashtagInputRef}
                          value={newHashtag}
                          onChange={(e) => setNewHashtag(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, addHashtag)}
                          placeholder="Add hashtag..."
                          className="bg-transparent border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 w-24 min-w-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={addHashtag}
                          className="h-6 w-6 rounded-full"
                          disabled={!newHashtag.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-300">Accounts to Reply (@mentions)</h3>
                    <span className="text-xs text-gray-500">{mentions.length} accounts</span>
                  </div>

                  <div className="p-4 border border-[#34353A] rounded-lg bg-[#25262B]">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentions.map((mention, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2A2B30] text-sm"
                        >
                          {mention}
                          <button onClick={() => removeMention(index)} className="ml-1 text-gray-400 hover:text-white">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center">
                        <Input
                          ref={mentionInputRef}
                          value={newMention}
                          onChange={(e) => setNewMention(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, addMention)}
                          placeholder="Add @mention..."
                          className="bg-transparent border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 w-24 min-w-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={addMention}
                          className="h-6 w-6 rounded-full"
                          disabled={!newMention.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview panel */}
          <div className="sticky top-24">
            <div className="rounded-xl overflow-hidden border border-[#1DA1F2]/20 bg-[#25262B] backdrop-blur-sm">
              <div className="p-4 border-b border-[#1DA1F2]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1DA1F2]"></div>
                  <h3 className="text-sm font-medium">Live Preview</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6 flex flex-col items-center">
                <div className="w-full mb-6 text-center">
                  <h2 className="text-xl font-bold">{headline}</h2>
                </div>

                <Avatar className="h-20 w-20 mb-4 border-2 border-[#1DA1F2]/30">
                  {avatarSrc ? (
                    <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={agentName} />
                  ) : (
                    <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2] text-xl">
                      {agentName.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <h2 className="text-2xl font-bold mb-2">{agentName}</h2>

                <p className="text-gray-400 text-sm mb-6 text-center">
                  {description || "This is the beginning of your direct message history with this agent."}
                </p>

                {(personalityTraits.length > 0 || loves.length > 0 || hates.length > 0) && (
                  <div className="w-full mb-6 space-y-4">
                    {personalityTraits.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs text-gray-400">Personality traits</h4>
                        <div className="flex flex-wrap gap-2">
                          {personalityTraits.map((trait, index) => (
                            <div key={index} className="px-2 py-1 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] text-xs">
                              {trait}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {loves.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs text-gray-400">Loves</h4>
                        <div className="flex flex-wrap gap-2">
                          {loves.map((item, index) => (
                            <div key={index} className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {hates.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs text-gray-400">Hates</h4>
                        <div className="flex flex-wrap gap-2">
                          {hates.map((item, index) => (
                            <div key={index} className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="w-full space-y-4">
                  <Card className="bg-[#2A2B30] border-[#34353A]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-700 text-gray-300">U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">Hello, can you help me with something?</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#1DA1F2]/10 border-[#1DA1F2]/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border border-[#1DA1F2]/30">
                          {avatarSrc ? (
                            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={agentName} />
                          ) : (
                            <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2]">
                              {agentName.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            {getLevelDescription(demeanor, "demeanor").includes("Professional")
                              ? "Certainly, I'd be happy to assist you. What do you need help with today?"
                              : getLevelDescription(demeanor, "demeanor").includes("Casual")
                                ? "Hey there! Sure thing, what's up? How can I help?"
                                : "Of course! I'm here to help. What can I do for you?"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-full mt-6 relative">
                  <Input
                    placeholder="Type a message..."
                    className="pr-10 bg-[#2A2B30] border-[#34353A] focus:border-[#1DA1F2]"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 rounded-full"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
