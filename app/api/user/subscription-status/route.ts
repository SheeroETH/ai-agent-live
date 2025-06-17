import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock subscription status - in a real app this would check a database
    const subscriptionStatus = {
      planConfirmed: true,
      plan: "free", // Default to free plan
    }

    return NextResponse.json(subscriptionStatus)
  } catch (error) {
    console.error("Error fetching subscription status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
