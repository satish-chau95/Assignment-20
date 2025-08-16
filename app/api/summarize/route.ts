import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { transcript, prompt } = await request.json()

    if (!transcript || !prompt) {
      return NextResponse.json({ error: "Missing transcript or prompt" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "system",
          content:
            "You are an expert meeting summarizer. Create clear, actionable summaries based on the user's specific instructions. Focus on key points, decisions, and action items.",
        },
        {
          role: "user",
          content: `Please analyze this meeting transcript and create a summary based on these instructions: "${prompt}"

Meeting Transcript:
${transcript}`,
        },
      ],
      maxTokens: 2000,
      temperature: 0.3,
    })

    return NextResponse.json({ summary: text })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
