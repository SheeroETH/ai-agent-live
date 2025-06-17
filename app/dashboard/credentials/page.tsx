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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Trash2, Lock, Check, Edit, X } from "lucide-react"

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
    username: "OxNikolAI",
    email: "Guedebalihouse@gmail.com",
    active: true,
    useCookies: true,
    cookies: '{"session": "abc123", "auth": "xyz789"}',
  },
  {
    id: "2",
    username: "OxMoonRock",
    email: "galactikkaclub@gmail.com",
    active: false,
    useCookies: false,
    cookies: "",
  },
]

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>(mockCredentials)
  const [showAddForm, setShowAddForm] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null)
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
    if (editingCredential) {
      // Update existing credential
      setCredentials(
        credentials.map((cred) =>
          cred.id === editingCredential.id
            ? {
                ...cred,
                username: formData.username,
                email: formData.email,
                active: formData.active,
                useCookies: formData.useCookies,
                cookies: formData.cookies,
              }
            : cred,
        ),
      )
      setEditingCredential(null)
      setIsEditDialogOpen(false)
    } else {
      // Add new credential
      const newCredential: Credential = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        active: formData.active,
        useCookies: formData.useCookies,
        cookies: formData.cookies,
      }
      setCredentials([...credentials, newCredential])
      setShowAddForm(false)
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      otpCode: "",
      cookies: "",
      active: false,
      useCookies: false,
    })
  }

  const handleEdit = (credential: Credential) => {
    setEditingCredential(credential)
    setFormData({
      username: credential.username,
      email: credential.email,
      password: "",
      otpCode: "",
      cookies: credential.cookies,
      active: credential.active,
      useCookies: credential.useCookies,
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCredentials(credentials.filter((cred) => cred.id !== id))
  }

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      otpCode: "",
      cookies: "",
      active: false,
      useCookies: false,
    })
    setEditingCredential(null)
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
    if (showAddForm) {
      resetForm()
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0F0F13] p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">X Credentials</h1>
            <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
              Add, verify, or manage your X credentials for AI Agents
            </p>
          </div>

          {/* Add Credential Button */}
          <div className="flex justify-end">
            <Button
              onClick={toggleAddForm}
              className={`font-semibold px-6 py-3 rounded-lg transition-all ${
                showAddForm
                  ? "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                  : "bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white"
              }`}
            >
              {showAddForm ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Credential
                </>
              )}
            </Button>
          </div>

          {/* Add Credential Form */}
          {showAddForm && (
            <Card className="bg-[#1A1A1F] border-[#333339] shadow-xl">
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
                        className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                        required
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
                        className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                        required
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
                        className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
                        required
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
                        className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] h-12 focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
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
                      className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] min-h-[100px] focus:border-[#1DA1F2] focus:ring-[#1DA1F2]"
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
          )}

          {/* Credentials List */}
          <div className="space-y-6">
            {credentials.map((credential) => (
              <Card
                key={credential.id}
                className="bg-[#1A1A1F] border-[#333339] hover:border-[#1DA1F2] transition-colors"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-2">{credential.username}</h3>
                      <p className="text-[#CCCCCC] text-lg">{credential.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(credential)}
                        className="bg-[#2A2A2F] border-[#333339] text-white hover:bg-[#3A3A3F] hover:border-[#1DA1F2] w-12 h-12 p-0 rounded-lg"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(credential.id)}
                        className="bg-[#DC2626] hover:bg-[#B91C1C] w-12 h-12 p-0 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] w-12 h-12 p-0 rounded-lg"
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Unlock Section */}
          <Card className="bg-[#1A1A1F] border-[#1DA1F2] border-l-4">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Lock className="h-10 w-10 text-white" />
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Unlock</h3>
                    <p className="text-[#CCCCCC] text-lg">+1 Twitter Account & 2 AI Agents</p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white font-semibold px-8 py-3 text-lg rounded-lg">
                  Add for $5/month
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-[#1A1A1F] border-[#333339] text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">Edit Credential</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-username" className="text-[#CCCCCC] text-sm">
                      Username
                    </Label>
                    <Input
                      id="edit-username"
                      placeholder="Enter X username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] focus:border-[#1DA1F2]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email" className="text-[#CCCCCC] text-sm">
                      Email
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] focus:border-[#1DA1F2]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-password" className="text-[#CCCCCC] text-sm">
                      Password
                    </Label>
                    <Input
                      id="edit-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] focus:border-[#1DA1F2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-otpCode" className="text-[#CCCCCC] text-sm">
                      OTP Unique Code
                    </Label>
                    <Input
                      id="edit-otpCode"
                      placeholder="Enter OTP code"
                      value={formData.otpCode}
                      onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                      className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] focus:border-[#1DA1F2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-cookies" className="text-[#CCCCCC] text-sm">
                    Cookies (optional)
                  </Label>
                  <Textarea
                    id="edit-cookies"
                    placeholder="Paste cookies string here"
                    value={formData.cookies}
                    onChange={(e) => setFormData({ ...formData, cookies: e.target.value })}
                    className="bg-[#0F0F13] border-[#333339] text-white placeholder:text-[#666] focus:border-[#1DA1F2] min-h-[80px]"
                  />
                </div>

                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                      className="border-[#555559] data-[state=checked]:bg-[#1DA1F2] data-[state=checked]:border-[#1DA1F2]"
                    />
                    <Label htmlFor="edit-active" className="text-white">
                      Active?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-useCookies"
                      checked={formData.useCookies}
                      onCheckedChange={(checked) => setFormData({ ...formData, useCookies: checked as boolean })}
                      className="border-[#555559] data-[state=checked]:bg-[#1DA1F2] data-[state=checked]:border-[#1DA1F2]"
                    />
                    <Label htmlFor="edit-useCookies" className="text-white">
                      Use Cookies?
                    </Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="border-[#333339] text-white hover:bg-[#2A2A2F]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] hover:from-[#0d8bd9] hover:to-[#4aa3e0] text-white"
                  >
                    Update Credential
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  )
}
