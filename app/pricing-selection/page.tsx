"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown } from "lucide-react"
import Header from "@/components/header"

const plans = {
  starter: {
    name: "Starter",
    description: "Perfect for individuals just getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 AI Twitter Agent",
      "Up to 100 automated replies/month",
      "Basic analytics",
      "Content scheduling (5 posts/day)",
      "Email support",
    ],
    color: "#407BFF",
    popular: false,
  },
  pro: {
    name: "Pro",
    description: "Ideal for creators and growing influencers",
    monthlyPrice: 49,
    yearlyPrice: 39, // 20% discount
    features: [
      "3 AI Twitter Agents",
      "Unlimited automated replies",
      "Advanced analytics & insights",
      "Content scheduling (20 posts/day)",
      "Priority support",
      "Custom AI personality",
      "Audience growth tools",
    ],
    color: "#9B59B6",
    popular: true,
  },
  business: {
    name: "Business",
    description: "For teams and businesses managing multiple accounts",
    monthlyPrice: 99,
    yearlyPrice: 79, // 20% discount
    features: [
      "Unlimited AI Twitter Agents",
      "Unlimited automated replies",
      "Enterprise analytics & reporting",
      "Unlimited content scheduling",
      "24/7 priority support",
      "Custom AI personality",
      "Team collaboration features",
      "API access",
      "Dedicated account manager",
    ],
    color: "#407BFF",
    popular: false,
  },
}

export default function PricingSelectionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState<string | null>(null)
  const [showCanceledToast, setShowCanceledToast] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user was redirected from canceled checkout
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("canceled") === "true") {
        setShowCanceledToast(true)
      }
    }
  }, [])

  const handleFreePlan = async () => {
    setLoading("starter")
    setError(null)

    try {
      // For free plan, we can directly redirect to dashboard
      // In a real app, you might want to update the user's plan in the database

      // Simulate a brief loading state for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect directly to dashboard for free plan
      router.push("/dashboard")
    } catch (error) {
      console.error("Error selecting free plan:", error)
      setError("Failed to select plan. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleProPlan = async () => {
    setLoading("pro")
    setError(null)

    try {
      // For demo purposes, simulate the checkout process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real implementation, this would create a Stripe checkout session
      // For now, just show a message
      alert("Stripe integration would be implemented here. Redirecting to dashboard for demo.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating checkout session:", error)
      setError("Failed to start checkout. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleBusinessPlan = () => {
    router.push("/business-inquiry")
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0F0F13] pt-24 pb-20">
        {/* Canceled Toast */}
        {showCanceledToast && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-[#FF4B4B] text-white px-4 py-3 rounded-lg flex items-center gap-2">
              <span className="text-sm">Checkout was canceled. Please select a plan or try again.</span>
              <button onClick={() => setShowCanceledToast(false)} className="text-white hover:text-gray-200 ml-2">
                ×
              </button>
            </div>
          </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-[#FF4B4B] text-white px-4 py-3 rounded-lg flex items-center gap-2">
              <span className="text-sm">{error}</span>
              <button onClick={() => setError(null)} className="text-white hover:text-gray-200 ml-2">
                ×
              </button>
            </div>
          </div>
        )}

        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
            <p className="text-[#CCCCCC] text-lg">Select the perfect plan for your AI Twitter automation needs</p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#1C1C21] rounded-lg p-1 flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-[#407BFF] text-white" : "text-[#CCCCCC] hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "yearly" ? "bg-[#407BFF] text-white" : "text-[#CCCCCC] hover:text-white"
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className={`relative bg-[#1C1C21] border border-[#333339] rounded-xl p-8 ${
                  plan.popular ? "ring-2 ring-[#9B59B6]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#407BFF] to-[#9B59B6] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-[#CCCCCC] text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold" style={{ color: plan.color }}>
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-[#CCCCCC] text-sm ml-1">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                    {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-[#407BFF] mt-1">
                        Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 flex-shrink-0" style={{ color: plan.color }} />
                        <span className="text-sm text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    {key === "starter" && (
                      <Button
                        onClick={handleFreePlan}
                        disabled={loading === "starter"}
                        className="w-full h-12 border border-[#407BFF] text-[#407BFF] bg-transparent hover:bg-[#407BFF] hover:text-white transition-colors disabled:opacity-50"
                      >
                        {loading === "starter" ? "Setting up your account..." : "Get Started Free"}
                      </Button>
                    )}

                    {key === "pro" && (
                      <Button
                        onClick={handleProPlan}
                        disabled={loading === "pro"}
                        className="w-full h-12 bg-gradient-to-r from-[#407BFF] to-[#9B59B6] hover:from-[#5A8CFF] hover:to-[#AB78C1] text-white transition-all"
                      >
                        {loading === "pro" ? "Processing..." : "Get Started"}
                      </Button>
                    )}

                    {key === "business" && (
                      <Button
                        onClick={handleBusinessPlan}
                        className="w-full h-12 border border-[#407BFF] text-[#407BFF] bg-transparent hover:bg-[#407BFF] hover:text-white transition-colors"
                      >
                        Contact Sales
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back to Dashboard Link */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-[#407BFF] hover:text-[#5A8CFF] text-sm underline"
            >
              Skip for now and go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
