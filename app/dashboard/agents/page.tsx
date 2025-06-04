"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, Play, Square, Pause, Plus } from "lucide-react"

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
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">X AI Agents</h1>
            <p className="text-[#B0B0B0]">Create, manage, and monitor your X-based AI Agents</p>
          </div>
          <Button className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create X AI Agent
          </Button>
        </div>

        {/* Agents Table */}
        <Card className="bg-[#1C1C21] border-[#333339]">
          <CardContent className="p-0">
            {agents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2A2A2E] border-b border-[#333339]">
                      <th className="text-left p-4 text-white font-medium">Name</th>
                      <th className="text-left p-4 text-white font-medium">Description</th>
                      <th className="text-left p-4 text-white font-medium">Delay (ms)</th>
                      <th className="text-left p-4 text-white font-medium">Interval (ms)</th>
                      <th className="text-left p-4 text-white font-medium">Active</th>
                      <th className="text-left p-4 text-white font-medium">Paused</th>
                      <th className="text-left p-4 text-white font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent, index) => (
                      <tr
                        key={agent.id}
                        className={`border-b border-[#333339] last:border-b-0 ${
                          index % 2 === 0 ? "bg-[#1C1C21]" : "bg-[#1F1F24]"
                        }`}
                      >
                        <td className="p-4">
                          <button className="text-white font-medium hover:underline text-left">{agent.name}</button>
                        </td>
                        <td className="p-4 text-[#B0B0B0]">{agent.description}</td>
                        <td className="p-4 text-white">{agent.delay.toLocaleString()}</td>
                        <td className="p-4 text-white">{agent.interval.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge
                            variant={agent.active ? "default" : "secondary"}
                            className={
                              agent.active
                                ? "bg-[#2E7D32] text-[#E8F5E9] hover:bg-[#2E7D32]"
                                : "bg-[#333339] text-[#B0B0B0] hover:bg-[#333339]"
                            }
                          >
                            {agent.active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={agent.paused ? "default" : "secondary"}
                            className={
                              agent.paused
                                ? "bg-[#FFA000] text-[#FFF8E1] hover:bg-[#FFA000]"
                                : "bg-[#333339] text-[#B0B0B0] hover:bg-[#333339]"
                            }
                          >
                            {agent.paused ? "Paused" : "Normal"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" className="w-8 h-8 p-0 bg-[#407BFF] hover:bg-[#5A8CFF]" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-8 h-8 p-0 bg-[#FF4B4B] hover:bg-[#E04343]"
                              onClick={() => handleDelete(agent.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="w-8 h-8 p-0 bg-[#407BFF] hover:bg-[#5A8CFF]"
                              onClick={() => toggleActive(agent.id)}
                              disabled={agent.active}
                              title="Start"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-8 h-8 p-0 bg-[#333339] border-[#333339] text-white hover:bg-[#3C3C44]"
                              onClick={() => toggleActive(agent.id)}
                              disabled={!agent.active}
                              title="Stop"
                            >
                              <Square className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-8 h-8 p-0 bg-[#333339] border-[#333339] text-white hover:bg-[#3C3C44]"
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
              <div className="p-12 text-center">
                <p className="text-white text-lg mb-2">No X AI Agents found.</p>
                <p className="text-[#B0B0B0]">Click '+ Create X AI Agent' to start.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-[#999] text-sm">Note: Interval and Delay values are in milliseconds.</p>
      </div>
    </DashboardLayout>
  )
}
