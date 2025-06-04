import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, plan } = body

    // Validate required fields
    if (!userId || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate plan type
    if (!["pro_monthly", "pro_yearly"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 })
    }

    // For demo purposes, return a mock session ID
    // In production, this would create a real Stripe checkout session
    const mockSessionId = `cs_demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log(`Creating checkout session for user ${userId} with plan ${plan}`)

    return NextResponse.json({ sessionId: mockSessionId })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
