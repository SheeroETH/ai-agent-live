"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Zap, Eye, Lock, TrendingUp, Activity, CheckCircle, AlertCircle } from "lucide-react"

interface SubscriptionStatus {
  planConfirmed: boolean
  plan: "free" | "pro" | "business_pending" | "business_active"
}

export default function DashboardPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await fetch("/api/user/subscription-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const status: SubscriptionStatus = await response.json()

        if (!status.planConfirmed) {
          router.push("/pricing-selection")
          return
        }

        setSubscriptionStatus(status)
      } catch (error) {
        console.error("Error checking subscription status:", error)
        // For demo purposes, set a default status instead of redirecting
        setSubscriptionStatus({
          planConfirmed: true,
          plan: "free",
        })
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      checkSubscriptionStatus()
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push("/sign-in")
    return null
  }

  if (!subscriptionStatus) {
    return (
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center">
        <div className="text-white">Loading subscription status...</div>
      </div>
    )
  }

  const isPro = subscriptionStatus.plan === "pro"
  const isBusiness = subscriptionStatus.plan === "business_active"
  const isBusinessPending = subscriptionStatus.plan === "business_pending"

  return (
    <div className="min-h-screen bg-[#0F0F13] text-white">
      {/* Business Pending Banner */}
      {isBusinessPending && (
        <div className="bg-gradient-to-r from-[#FFA000] to-[#FF8F00] text-white px-6 py-4 text-center text-sm font-medium">
          Your Business inquiry is under review. You currently have Starter access. Our Sales team will contact you
          soon.
        </div>
      )}

      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Welcome back!</h1>
          <p className="text-[#9CA3AF] text-lg">Here's what's happening with your AI agents today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#0F0F13] border-[#333339] hover:border-[#1DA1F2]/50 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[#CCCCCC]">Total Projects</CardTitle>
              <Users className="h-5 w-5 text-[#407BFF]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +2 since last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F0F13] border-[#333339] hover:border-[#1DA1F2]/50 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[#CCCCCC]">Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">8</div>
              <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +1 since last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F0F13] border-[#333339] hover:border-[#1DA1F2]/50 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[#CCCCCC] flex items-center gap-2">
                In Progress
                {!isPro && !isBusiness && <Lock className="h-3 w-3 text-[#9CA3AF]" />}
              </CardTitle>
              <Activity className="h-5 w-5 text-[#FFA000]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <p className="text-xs text-[#9CA3AF]">
                {!isPro && !isBusiness ? "Available on Pro plan" : "No change from last month"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F0F13] border-[#333339] hover:border-[#1DA1F2]/50 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[#CCCCCC]">Pending</CardTitle>
              <AlertCircle className="h-5 w-5 text-[#FF6B6B]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">1</div>
              <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
                <span className="text-red-400">-1</span> since last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-[#0F0F13] border-[#333339]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-xl font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#407BFF]" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">Your recent project activity and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "AI Agent deployed successfully", time: "2 hours ago", status: "success" },
                  { title: "New credentials added", time: "4 hours ago", status: "info" },
                  { title: "Project configuration updated", time: "6 hours ago", status: "info" },
                  { title: "Weekly report generated", time: "1 day ago", status: "success" },
                  { title: "System maintenance completed", time: "2 days ago", status: "warning" },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-[#333339] last:border-b-0 hover:bg-[#2A2A2F]/30 rounded-lg px-3 -mx-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <div className="text-white font-medium text-sm">{activity.title}</div>
                        <div className="text-[#9CA3AF] text-xs">{activity.time}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#407BFF] hover:text-[#5A8CFF] hover:bg-[#407BFF]/10 h-8 px-3"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
                <Button className="w-full mt-6 bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#1DA1F2]/90 hover:to-[#5ab9f5]/90 text-white font-medium py-3 rounded-lg transition-all duration-200">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div>
            <Card className="bg-[#0F0F13] border-[#333339]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#407BFF]" />
                  Account Info
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">Your profile and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-[#9CA3AF] text-sm mb-1">Email</div>
                    <div className="text-white font-medium">{user?.email || "Not available"}</div>
                  </div>
                  <div>
                    <div className="text-[#9CA3AF] text-sm mb-1">Name</div>
                    <div className="text-white font-medium">{user?.user_metadata?.full_name || "Not available"}</div>
                  </div>
                  <div>
                    <div className="text-[#9CA3AF] text-sm mb-2 flex items-center gap-2">
                      Account Type
                      {isPro && (
                        <span className="bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] text-white px-2 py-1 rounded-full text-xs font-medium">
                          Pro
                        </span>
                      )}
                      {isBusiness && (
                        <span className="bg-gradient-to-r from-[#407BFF] to-[#5A8CFF] text-white px-2 py-1 rounded-full text-xs font-medium">
                          Business
                        </span>
                      )}
                      {isBusinessPending && (
                        <span className="bg-gradient-to-r from-[#FFA000] to-[#FF8F00] text-white px-2 py-1 rounded-full text-xs font-medium">
                          Business Pending
                        </span>
                      )}
                    </div>
                    <div className="text-white font-medium capitalize">{subscriptionStatus.plan.replace("_", " ")}</div>
                  </div>
                </div>
                <Button className="w-full bg-[#407BFF] hover:bg-[#5A8CFF] text-white font-medium py-3 rounded-lg transition-colors">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-[#0F0F13] border-[#333339] mt-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#333339] text-[#CCCCCC] hover:bg-[#1A1A1F] hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50"
                  onClick={() => router.push("/dashboard/credentials")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Credentials
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#333339] text-[#CCCCCC] hover:bg-[#1A1A1F] hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50"
                  onClick={() => router.push("/dashboard/context/create")}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Create Agent
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#333339] text-[#CCCCCC] hover:bg-[#1A1A1F] hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50"
                  onClick={() => router.push("/dashboard/agents")}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  View Agents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
