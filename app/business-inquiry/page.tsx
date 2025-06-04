"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function BusinessInquiryPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    numAgents: "",
    customAgents: "",
    numAccounts: "",
    customAccounts: "",
    notes: "",
    teamSize: "",
    budgetRange: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting inquiry:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F0F13] py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <Card className="bg-[#1C1C21] border border-[#333339]">
            <CardContent className="p-8 text-center">
              <div className="bg-[#2E7D32] text-[#E8F5E9] p-4 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-2">Thank You!</h2>
                <p>Our Sales team will review your inquiry and contact you within 1–2 business days.</p>
              </div>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#407BFF] hover:bg-[#5A8CFF] text-white">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F13] py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumb */}
        <button
          onClick={() => router.push("/pricing-selection")}
          className="flex items-center gap-2 text-[#407BFF] hover:text-[#5A8CFF] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pricing
        </button>

        <Card className="bg-[#1C1C21] border border-[#333339]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white">Business Plan Inquiry</CardTitle>
            <p className="text-[#CCCCCC] text-sm">
              Help us understand your team's needs so we can tailor an enterprise package.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <Label htmlFor="companyName" className="text-[#CCCCCC]">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    required
                    placeholder="Enter your company or team name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="bg-[#2A2A2E] border-[#333339] text-white"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <Label htmlFor="contactEmail" className="text-[#CCCCCC]">
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    required
                    placeholder="you@yourcompany.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    className="bg-[#2A2A2E] border-[#333339] text-white"
                  />
                </div>

                {/* Number of Agents */}
                <div>
                  <Label htmlFor="numAgents" className="text-[#CCCCCC]">
                    Number of AI Tweezy Agents Required *
                  </Label>
                  <Select value={formData.numAgents} onValueChange={(value) => handleInputChange("numAgents", value)}>
                    <SelectTrigger className="bg-[#2A2A2E] border-[#333339] text-white">
                      <SelectValue placeholder="Select number of agents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Accounts */}
                <div>
                  <Label htmlFor="numAccounts" className="text-[#CCCCCC]">
                    How many X accounts will you connect? *
                  </Label>
                  <Select
                    value={formData.numAccounts}
                    onValueChange={(value) => handleInputChange("numAccounts", value)}
                  >
                    <SelectTrigger className="bg-[#2A2A2E] border-[#333339] text-white">
                      <SelectValue placeholder="Select number of accounts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Size */}
                <div>
                  <Label htmlFor="teamSize" className="text-[#CCCCCC]">
                    Estimated Team Size
                  </Label>
                  <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                    <SelectTrigger className="bg-[#2A2A2E] border-[#333339] text-white">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1–5</SelectItem>
                      <SelectItem value="6-20">6–20</SelectItem>
                      <SelectItem value="21-50">21–50</SelectItem>
                      <SelectItem value="50+">50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div>
                  <Label htmlFor="budgetRange" className="text-[#CCCCCC]">
                    Monthly Budget Range
                  </Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => handleInputChange("budgetRange", value)}
                  >
                    <SelectTrigger className="bg-[#2A2A2E] border-[#333339] text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$500-$1,000">$500–$1,000</SelectItem>
                      <SelectItem value="$1,000-$5,000">$1,000–$5,000</SelectItem>
                      <SelectItem value="$5,000+">$5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-[#CCCCCC]">
                  Additional Requirements or Questions
                </Label>
                <Textarea
                  id="notes"
                  rows={5}
                  placeholder="Tell us about integrations, compliance needs, custom AI personalities, etc."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="bg-[#2A2A2E] border-[#333339] text-white"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  loading ||
                  !formData.companyName ||
                  !formData.contactEmail ||
                  !formData.numAgents ||
                  !formData.numAccounts
                }
                className="w-full md:w-auto bg-[#407BFF] hover:bg-[#5A8CFF] text-white px-8 py-3"
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
