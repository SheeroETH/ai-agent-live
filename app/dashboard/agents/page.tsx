"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, Play, Square, Pause, Plus, Bot } from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  delay: number
  interval: number
  active: boolean
  paused: boolean
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "NikolaInCrypto",
    description: "NikolaInCrypto",
    delay: 5000,
    interval: 30000,
    active: false,
    paused: false,
  },
  {
    id: "2",
    name: "CryptoTrader",
    description: "Automated crypto trading agent",
    delay: 3000,
    interval: 60000,
    active: true,
    paused: false,
  },
  {
    id: "3",
    name: "NewsBot",
    description: "AI news aggregator and poster",
    delay: 10000,
    interval: 120000,
    active: true,
    paused: true,
  },
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents)

  const handleDelete = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id))
  }

  const toggleActive = (id: string) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, active: !agent.active } : agent)))
  }

  const togglePause = (id: string) => {
    setAgents(agents.map((agent) => (agent.id === id ? { ...agent, paused: !agent.paused } : agent)))
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center p-8">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">X AI Agents</h1>
            <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
              Create, manage, and monitor your X-based AI Agents
            </p>
          </div>

          {/* Create Agent Button */}
          <div className="flex justify-center">
            <Button className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white font-semibold h-12 px-8 text-lg">
              <Plus className="h-5 w-5 mr-2" />
              Create X AI Agent
            </Button>
          </div>

          {/* Agents Table */}
          <Card className="bg-[#0F0F13] border-[#333339] shadow-xl">
            <CardContent className="p-0">
              {agents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1A1A1F] border-b border-[#333339]">
                        <th className="text-left p-6 text-white font-semibold">Name</th>
                        <th className="text-left p-6 text-white font-semibold">Description</th>
                        <th className="text-left p-6 text-white font-semibold">Delay (ms)</th>
                        <th className="text-left p-6 text-white font-semibold">Interval (ms)</th>
                        <th className="text-left p-6 text-white font-semibold">Active</th>
                        <th className="text-left p-6 text-white font-semibold">Paused</th>
                        <th className="text-left p-6 text-white font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent, index) => (
                        <tr
                          key={agent.id}
                          className={`border-b border-[#333339] last:border-b-0 hover:bg-[#1A1A1F] transition-colors ${
                            index % 2 === 0 ? "bg-[#0F0F13]" : "bg-[#151518]"
                          }`}
                        >
                          <td className="p-6">
                            <button className="text-white font-semibold hover:text-[#1DA1F2] transition-colors text-left">
                              {agent.name}
                            </button>
                          </td>
                          <td className="p-6 text-[#CCCCCC]">{agent.description}</td>
                          <td className="p-6 text-white font-mono">{agent.delay.toLocaleString()}</td>
                          <td className="p-6 text-white font-mono">{agent.interval.toLocaleString()}</td>
                          <td className="p-6">
                            <Badge
                              variant={agent.active ? "default" : "secondary"}
                              className={
                                agent.active
                                  ? "bg-[#10B981] text-white hover:bg-[#059669]"
                                  : "bg-[#374151] text-[#9CA3AF] hover:bg-[#374151]"
                              }
                            >
                              {agent.active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="p-6">
                            <Badge
                              variant={agent.paused ? "default" : "secondary"}
                              className={
                                agent.paused
                                  ? "bg-[#F59E0B] text-white hover:bg-[#D97706]"
                                  : "bg-[#374151] text-[#9CA3AF] hover:bg-[#374151]"
                              }
                            >
                              {agent.paused ? "Paused" : "Normal"}
                            </Badge>
                          </td>
                          <td className="p-6">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="w-10 h-10 p-0 bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0]"
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-10 h-10 p-0 bg-[#DC2626] hover:bg-[#B91C1C]"
                                onClick={() => handleDelete(agent.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="w-10 h-10 p-0 bg-[#10B981] hover:bg-[#059669]"
                                onClick={() => toggleActive(agent.id)}
                                disabled={agent.active}
                                title="Start"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-10 h-10 p-0 bg-[#1A1A1F] border-[#333339] text-white hover:bg-[#2A2A2F] hover:border-[#1DA1F2]"
                                onClick={() => toggleActive(agent.id)}
                                disabled={!agent.active}
                                title="Stop"
                              >
                                <Square className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-10 h-10 p-0 bg-[#1A1A1F] border-[#333339] text-white hover:bg-[#2A2A2F] hover:border-[#1DA1F2]"
                                onClick={() => togglePause(agent.id)}
                                disabled={!agent.active}
                                title={agent.paused ? "Resume" : "Pause"}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-16 text-center">
                  <Bot className="h-20 w-20 text-[#666] mx-auto mb-6" />
                  <p className="text-white text-2xl mb-3">No X AI Agents found.</p>
                  <p className="text-[#CCCCCC] text-lg mb-8">Click 'Create X AI Agent' to start.</p>
                  <Button className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white font-semibold h-12 px-8">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Agent
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer Note */}
          <p className="text-[#9CA3AF] text-center">Note: Interval and Delay values are in milliseconds.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
