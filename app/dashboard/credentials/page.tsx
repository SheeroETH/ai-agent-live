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
import { Edit, Trash2, CheckCircle, Key } from "lucide-react"

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
    console.log("Form submitted:", formData)
  }

  const handleDelete = (id: string) => {
    setCredentials(credentials.filter((cred) => cred.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center p-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">X Credentials</h1>
            <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
              Add, verify, or manage your X credentials for AI Agents
            </p>
          </div>

          {/* Add Credential Form */}
          <Card className="bg-[#0F0F13] border-[#333339] shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Add Credential</CardTitle>
              <p className="text-[#CCCCCC]">Fill the form to add a new credential.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[#CCCCCC] text-sm font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter X username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-[#1A1A1F] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#CCCCCC] text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#1A1A1F] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#CCCCCC] text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-[#1A1A1F] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otpCode" className="text-[#CCCCCC] text-sm font-medium">
                      OTP Unique Code
                    </Label>
                    <Input
                      id="otpCode"
                      placeholder="Enter OTP code"
                      value={formData.otpCode}
                      onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                      className="bg-[#1A1A1F] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookies" className="text-[#CCCCCC] text-sm font-medium">
                    Cookies (optional)
                  </Label>
                  <Textarea
                    id="cookies"
                    placeholder="Paste cookies string here"
                    value={formData.cookies}
                    onChange={(e) => setFormData({ ...formData, cookies: e.target.value })}
                    className="bg-[#1A1A1F] border-[#333339] text-white placeholder:text-[#666] min-h-[100px] focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                  />
                </div>

                <div className="flex justify-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                      className="border-[#555559] data-[state=checked]:bg-[#1DA1F2] data-[state=checked]:border-[#1DA1F2]"
                    />
                    <Label htmlFor="active" className="text-white font-medium">
                      Active?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="useCookies"
                      checked={formData.useCookies}
                      onCheckedChange={(checked) => setFormData({ ...formData, useCookies: checked as boolean })}
                      className="border-[#555559] data-[state=checked]:bg-[#1DA1F2] data-[state=checked]:border-[#1DA1F2]"
                    />
                    <Label htmlFor="useCookies" className="text-white font-medium">
                      Use Cookies?
                    </Label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full max-w-md bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white font-semibold h-12 text-lg"
                  >
                    Create Credential
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Existing Credentials */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Your X Credentials</h2>
            {credentials.length > 0 ? (
              <div className="space-y-4">
                {credentials.map((credential) => (
                  <Card
                    key={credential.id}
                    className="bg-[#0F0F13] border-[#333339] shadow-lg hover:border-[#1DA1F2] transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{credential.username}</h3>
                          <p className="text-[#CCCCCC] mb-3">{credential.email}</p>
                          <div className="text-sm text-[#9CA3AF] space-x-4">
                            <span>Active: {credential.active ? "Yes" : "No"}</span>
                            <span>•</span>
                            <span>Use Cookies: {credential.useCookies ? "Yes" : "No"}</span>
                            <span>•</span>
                            <span>Cookies: {credential.cookies.substring(0, 50)}...</span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-[#1A1A1F] border-[#333339] text-white hover:bg-[#2A2A2F] hover:border-[#1DA1F2]"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(credential.id)}
                            className="bg-[#DC2626] hover:bg-[#B91C1C]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0]"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#0F0F13] border-[#333339] shadow-lg">
                <CardContent className="p-12 text-center">
                  <Key className="h-16 w-16 text-[#666] mx-auto mb-4" />
                  <p className="text-white text-xl mb-2">No X credentials added.</p>
                  <p className="text-[#CCCCCC] mb-6">Use the form above to add a credential.</p>
                  <Button variant="link" className="text-[#1DA1F2] hover:text-[#5ab9f5] text-lg">
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
