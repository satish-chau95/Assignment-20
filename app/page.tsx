"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Sparkles, Mail, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MeetingNotesApp() {
  const [transcript, setTranscript] = useState("")
  const [customPrompt, setCustomPrompt] = useState(
    "Summarize the key points and action items from this meeting in a clear, organized format.",
  )
  const [summary, setSummary] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [emailRecipients, setEmailRecipients] = useState("")
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setTranscript(content)
        toast({
          title: "File uploaded successfully",
          description: "Your transcript has been loaded and is ready for processing.",
        })
      }
      reader.readAsText(file)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt file containing your meeting transcript.",
        variant: "destructive",
      })
    }
  }

  const generateSummary = async () => {
    if (!transcript.trim()) {
      toast({
        title: "No transcript provided",
        description: "Please upload a file or paste your meeting transcript.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: transcript.trim(),
          prompt: customPrompt.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      setSummary(data.summary)
      toast({
        title: "Summary generated successfully",
        description: "Your meeting summary is ready for review and editing.",
      })
    } catch (error) {
      console.error("Error generating summary:", error)
      toast({
        title: "Error generating summary",
        description: "Please try again. If the problem persists, check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const sendEmail = async () => {
    if (!summary.trim()) {
      toast({
        title: "No summary to send",
        description: "Please generate a summary first.",
        variant: "destructive",
      })
      return
    }

    if (!emailRecipients.trim()) {
      toast({
        title: "No recipients specified",
        description: "Please enter email addresses to send the summary to.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: emailRecipients.split(",").map((email) => email.trim()),
          summary: summary.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email")
      }

      toast({
        title: "Email processed successfully",
        description: data.note || data.message,
      })
      setEmailRecipients("")
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error sending email",
        description:
          error instanceof Error ? error.message : "Please try again. Make sure all email addresses are valid.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AI Meeting Summarizer</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Transform your meeting transcripts into actionable summaries with AI-powered insights
          </p>
        </div>

        <div className="grid gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Transcript
              </CardTitle>
              <CardDescription>Upload a text file or paste your meeting transcript directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Text File
                </Label>
                <Input id="file-upload" type="file" accept=".txt" onChange={handleFileUpload} className="mt-1" />
              </div>
              <div className="relative">
                <Label htmlFor="transcript" className="text-sm font-medium">
                  Or Paste Transcript
                </Label>
                <Textarea
                  id="transcript"
                  placeholder="Paste your meeting transcript here..."
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  className="mt-1 min-h-[200px] resize-y"
                />
                {transcript && (
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                    {transcript.length} characters
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Custom Prompt Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Custom Instructions
              </CardTitle>
              <CardDescription>Customize how you want your meeting summary to be generated</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="custom-prompt" className="text-sm font-medium">
                  Summary Instructions
                </Label>
                <Textarea
                  id="custom-prompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="mt-1 min-h-[100px]"
                  placeholder="e.g., Summarize in bullet points for executives, Highlight only action items, Create a detailed technical summary..."
                />
              </div>
              <Button onClick={generateSummary} disabled={isGenerating || !transcript.trim()} className="mt-4 w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Summary Section */}
          {summary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Summary
                </CardTitle>
                <CardDescription>Review and edit your AI-generated summary before sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[300px] resize-y"
                  placeholder="Your generated summary will appear here..."
                />

                {/* Email Sharing */}
                <div className="border-t pt-4">
                  <Label htmlFor="email-recipients" className="text-sm font-medium">
                    Share via Email
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="email-recipients"
                      type="email"
                      placeholder="Enter email addresses (comma-separated)"
                      value={emailRecipients}
                      onChange={(e) => setEmailRecipients(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={sendEmail} disabled={isSending || !summary.trim()} variant="outline">
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
