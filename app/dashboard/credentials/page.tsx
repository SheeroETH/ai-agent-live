"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, CheckCircle } from "lucide-react"

interface Credential {
  id: string
  username: string
  email: string
  active: boolean
  useCookies: boolean
  cookies: string
}

const mockCredentials: Credential[] = [
  {
    id: "1",
    username: "OxNikoIAI",
    email: "guedebalihouse@gmail.com",
    active: true,
    useCookies: true,
    cookies: '{"session": "abc123", "auth": "xyz789"}',
  },
]

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>(mockCredentials)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    otpCode: "",
    cookies: "",
    active: false,
    useCookies: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleDelete = (id: string) => {
    setCredentials(credentials.filter((cred) => cred.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">X Credentials</h1>
          <p className="text-[#B0B0B0]">Add, verify, or manage your X credentials for AI Agents</p>
        </div>

        {/* Add Credential Form */}
        <Card className="bg-[#1C1C21] border-[#333339]">
          <CardHeader>
            <CardTitle className="text-white text-xl">Add Credential</CardTitle>
            <p className="text-[#B0B0B0] text-sm">Fill the form to add a new credential.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username" className="text-[#B0B0B0] text-sm">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter X username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-[#2A2A2E] border-[#333339] text-white placeholder:text-[#666] mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#B0B0B0] text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#2A2A2E] border-[#333339] text-white placeholder:text-[#666] mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-[#B0B0B0] text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-[#2A2A2E] border-[#333339] text-white placeholder:text-[#666] mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="otpCode" className="text-[#B0B0B0] text-sm">
                    OTP Unique Code
                  </Label>
                  <Input
                    id="otpCode"
                    placeholder="Enter OTP code"
                    value={formData.otpCode}
                    onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                    className="bg-[#2A2A2E] border-[#333339] text-white placeholder:text-[#666] mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cookies" className="text-[#B0B0B0] text-sm">
                  Cookies (optional)
                </Label>
                <Textarea
                  id="cookies"
                  placeholder="Paste cookies string here"
                  value={formData.cookies}
                  onChange={(e) => setFormData({ ...formData, cookies: e.target.value })}
                  className="bg-[#2A2A2E] border-[#333339] text-white placeholder:text-[#666] mt-1 h-24"
                />
              </div>

              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                    className="border-[#555559] data-[state=checked]:bg-[#407BFF] data-[state=checked]:border-[#407BFF]"
                  />
                  <Label htmlFor="active" className="text-white">
                    Active?
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useCookies"
                    checked={formData.useCookies}
                    onCheckedChange={(checked) => setFormData({ ...formData, useCookies: checked as boolean })}
                    className="border-[#555559] data-[state=checked]:bg-[#407BFF] data-[state=checked]:border-[#407BFF]"
                  />
                  <Label htmlFor="useCookies" className="text-white">
                    Use Cookies?
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#407BFF] hover:bg-[#5A8CFF] text-white">
                Create
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Credentials */}
        <div className="space-y-4">
          {credentials.length > 0 ? (
            credentials.map((credential) => (
              <Card key={credential.id} className="bg-[#1C1C21] border-[#333339]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">{credential.username}</h3>
                      <p className="text-[#B0B0B0] mb-3">{credential.email}</p>
                      <div className="text-sm text-[#B0B0B0] space-x-4">
                        <span>Active: {credential.active ? "Yes" : "No"}</span>
                        <span>•</span>
                        <span>Use Cookies: {credential.useCookies ? "Yes" : "No"}</span>
                        <span>•</span>
                        <span>Cookies: {credential.cookies.substring(0, 50)}...</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-[#333339] border-[#333339] text-white hover:bg-[#3C3C44]"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(credential.id)}
                        className="bg-[#FF4B4B] hover:bg-[#E04343]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-[#407BFF] hover:bg-[#5A8CFF]">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-[#1C1C21] border-[#333339]">
              <CardContent className="p-12 text-center">
                <p className="text-white text-lg mb-2">No X credentials added.</p>
                <p className="text-[#B0B0B0] mb-4">Use the form above to add a credential.</p>
                <Button variant="link" className="text-[#407BFF] hover:text-[#5A8CFF]">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
