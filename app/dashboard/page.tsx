"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Users, Zap, Eye, Lock } from "lucide-react"

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
    <div className="min-h-screen bg-[#0F0F13]">
      {/* Header */}
      <header className="bg-[#0F0F13] border-b border-[#333339] h-16 flex items-center justify-between px-6">
        <div className="text-white text-2xl font-bold">Tweezy</div>
        <Button
          variant="outline"
          onClick={() => {
            // Handle sign out
            router.push("/")
          }}
          className="border-[#333339] text-white hover:bg-[#1C1C21]"
        >
          Sign Out
        </Button>
      </header>

      {/* Business Pending Banner */}
      {isBusinessPending && (
        <div className="bg-[#FFA000] text-[#FFF8E1] px-4 py-3 text-center text-sm">
          Your Business inquiry is under review. You currently have Starter access. Our Sales team will contact you
          soon.
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#1C1C21] border-[#333339]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Projects</CardTitle>
              <Users className="h-4 w-4 text-[#B0B0B0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-[#B0B0B0]">+2 since last month</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1C21] border-[#333339]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Completed</CardTitle>
              <Zap className="h-4 w-4 text-[#B0B0B0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-[#B0B0B0]">+1 since last month</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1C21] border-[#333339]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                In Progress
                {!isPro && !isBusiness && <Lock className="h-3 w-3 text-[#B0B0B0]" />}
              </CardTitle>
              <Clock className="h-4 w-4 text-[#B0B0B0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-[#B0B0B0]">
                {!isPro && !isBusiness ? "Available on Pro plan" : "+0 since last month"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1C21] border-[#333339]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Pending</CardTitle>
              <CalendarDays className="h-4 w-4 text-[#B0B0B0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1</div>
              <p className="text-xs text-[#B0B0B0]">-1 since last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1C1C21] border-[#333339]">
              <CardHeader>
                <CardTitle className="text-white text-xl font-semibold">Recent Activity</CardTitle>
                <CardDescription className="text-[#B0B0B0]">Your recent project activity and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-[#333339] last:border-b-0"
                  >
                    <div>
                      <div className="text-white font-medium">Project update {i}</div>
                      <div className="text-[#B0B0B0] text-sm">6/4/2025</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#407BFF] hover:text-[#5A8CFF] hover:bg-[#407BFF]/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-[#407BFF] hover:bg-[#5A8CFF] text-white">View All Activity</Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div>
            <Card className="bg-[#1C1C21] border-[#333339]">
              <CardHeader>
                <CardTitle className="text-white text-xl font-semibold">Account Info</CardTitle>
                <CardDescription className="text-[#B0B0B0]">Your profile and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-[#B0B0B0] text-sm mb-1">Email</div>
                  <div className="text-white">{user?.email || "Not available"}</div>
                </div>
                <div>
                  <div className="text-[#B0B0B0] text-sm mb-1">Name</div>
                  <div className="text-white">{user?.user_metadata?.full_name || "Not available"}</div>
                </div>
                <div>
                  <div className="text-[#B0B0B0] text-sm mb-1 flex items-center gap-2">
                    Account Type
                    {isPro && <span className="bg-[#9B59B6] text-white px-2 py-1 rounded text-xs">Pro</span>}
                    {isBusiness && <span className="bg-[#407BFF] text-white px-2 py-1 rounded text-xs">Business</span>}
                    {isBusinessPending && (
                      <span className="bg-[#FFA000] text-white px-2 py-1 rounded text-xs">Business Pending</span>
                    )}
                  </div>
                  <div className="text-white capitalize">{subscriptionStatus.plan.replace("_", " ")}</div>
                </div>
                <Button className="w-full bg-[#407BFF] hover:bg-[#5A8CFF] text-white">Edit Profile</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
