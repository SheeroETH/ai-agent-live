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
    if (!["free", "business_pending"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 })
    }

    // Mock plan confirmation - in a real app this would update a database
    console.log(`User ${userId} confirmed plan: ${plan}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error confirming plan:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
