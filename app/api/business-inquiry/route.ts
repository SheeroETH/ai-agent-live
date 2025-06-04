import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      companyName,
      contactEmail,
      numAgents,
      numAccounts,
      notes,
      teamSize,
      budgetRange,
      customAgents,
      customAccounts,
    } = body

    // Validate required fields
    if (!userId || !companyName || !contactEmail || !numAgents || !numAccounts) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "Company name, contact email, number of agents, and number of accounts are required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // For demo purposes, just log the inquiry and return success
    // In production, this would save to your database and send notifications
    console.log("Business inquiry received:", {
      userId,
      companyName,
      contactEmail,
      numAgents: numAgents === "custom" ? customAgents : numAgents,
      numAccounts: numAccounts === "custom" ? customAccounts : numAccounts,
      notes,
      teamSize,
      budgetRange,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing business inquiry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
