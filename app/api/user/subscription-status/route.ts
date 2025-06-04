import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return a mock subscription status
    // In production, this would connect to your Supabase database
    const subscriptionStatus = {
      planConfirmed: true,
      plan: "free", // Default to free plan for demo
    }

    return NextResponse.json(subscriptionStatus)
  } catch (error) {
    console.error("Error fetching subscription status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
