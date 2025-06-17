import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    console.log("📧 Submitting email to n8n:", email)

    // Send to your n8n webhook
    const response = await fetch("https://modjo.app.n8n.cloud/webhook/email-capture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    console.log("🔄 n8n Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ n8n Error:", errorText)
      throw new Error(`n8n webhook failed: ${response.status}`)
    }

    console.log("✅ Email successfully sent to n8n")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("💥 Waitlist API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to submit email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
