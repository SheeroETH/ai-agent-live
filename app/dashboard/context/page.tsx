"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Plus, MessageSquare } from "lucide-react"

interface Session {
  id: string
  userId: number
  created: string
}

const mockSessions: Session[] = [
  {
    id: "session_abc123def456ghi789",
    userId: 2,
    created: "06/04/2025, 2:39:36 PM",
  },
  {
    id: "session_xyz789uvw456rst123",
    userId: 2,
    created: "06/03/2025, 1:15:22 PM",
  },
  {
    id: "session_mno345pqr678stu901",
    userId: 2,
    created: "06/02/2025, 10:30:45 AM",
  },
]

export default function ContextPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const router = useRouter()

  const truncateId = (id: string) => {
    return id.length > 20 ? `${id.substring(0, 20)}...` : id
  }

  const handleCreateSession = () => {
    router.push("/dashboard/context/create")
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center p-8">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">AI Agent Context</h1>
            <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">Manage your agent sessions and contexts</p>
          </div>

          {/* Create Session Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleCreateSession}
              className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white font-semibold h-12 px-8 text-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Session
            </Button>
          </div>

          {/* Sessions Table */}
          <Card className="bg-[#0F0F13] border-[#333339] shadow-xl">
            <CardContent className="p-0">
              {sessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1A1A1F] border-b border-[#333339]">
                        <th className="text-left p-6 text-white font-semibold text-lg">Session ID</th>
                        <th className="text-left p-6 text-white font-semibold text-lg">User ID</th>
                        <th className="text-left p-6 text-white font-semibold text-lg">Created</th>
                        <th className="text-left p-6 text-white font-semibold text-lg">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((session, index) => (
                        <tr
                          key={session.id}
                          className={`border-b border-[#333339] last:border-b-0 hover:bg-[#1A1A1F] transition-colors ${
                            index % 2 === 0 ? "bg-[#0F0F13]" : "bg-[#151518]"
                          }`}
                        >
                          <td className="p-6">
                            <span className="text-white font-mono text-sm cursor-help" title={session.id}>
                              {truncateId(session.id)}
                            </span>
                          </td>
                          <td className="p-6 text-white font-medium">{session.userId}</td>
                          <td className="p-6 text-[#CCCCCC]">{session.created}</td>
                          <td className="p-6">
                            <Button
                              variant="link"
                              className="text-[#1DA1F2] hover:text-[#5ab9f5] p-0 h-auto font-medium"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-16 text-center">
                  <MessageSquare className="h-20 w-20 text-[#666] mx-auto mb-6" />
                  <p className="text-white text-2xl mb-3">No sessions found.</p>
                  <p className="text-[#CCCCCC] text-lg mb-8">Click 'Create Session' to add one.</p>
                  <Button
                    onClick={handleCreateSession}
                    className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white font-semibold h-12 px-8"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination (if needed) */}
          {sessions.length > 10 && (
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="bg-[#1A1A1F] border-[#333339] text-white hover:bg-[#2A2A2F] hover:border-[#1DA1F2]"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="bg-[#1A1A1F] border-[#333339] text-white hover:bg-[#2A2A2F] hover:border-[#1DA1F2]"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
