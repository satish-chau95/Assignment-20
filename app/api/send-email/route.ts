import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { recipients, summary } = await request.json()

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "Missing or invalid recipients" }, { status: 400 })
    }

    if (!summary) {
      return NextResponse.json({ error: "Missing summary content" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = recipients.filter((email) => !emailRegex.test(email))

    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: `Invalid email addresses: ${invalidEmails.join(", ")}` },
        { status: 400 },
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "noreply@yourdomain.com", // ⚠️ Must be a verified domain in Resend
      to: recipients,
      subject: "Meeting Summary",
      html: `
        <h2>Meeting Summary</h2>
        <div style="white-space: pre-wrap; font-family: monospace;">${summary}</div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email via Resend" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Meeting summary successfully shared with ${recipients.length} recipient(s)`,
      resendId: data?.id,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email. Please check your connection and try again." },
      { status: 500 },
    )
  }
}
