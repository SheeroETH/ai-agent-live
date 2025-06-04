"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Github, Twitter } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SignUpForm() {
  const router = useRouter()
  const { signUp, signInWithGithub, signInWithTwitter } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await signUp(email, password, username)

      if (error) {
        setError(error.message)
        return
      }

      setSuccess("Check your email to confirm your account before signing in.")
    } catch (err: any) {
      console.error("Sign up error:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGithubSignUp = async () => {
    try {
      await signInWithGithub()
    } catch (err: any) {
      console.error("GitHub sign up error:", err)
      setError("Failed to authenticate with GitHub. Please try again.")
    }
  }

  const handleTwitterSignUp = async () => {
    try {
      await signInWithTwitter()
    } catch (err: any) {
      console.error("Twitter sign up error:", err)
      setError("Failed to authenticate with Twitter. Please try again.")
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(29,161,242,0.1)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
          <div className="text-4xl md:text-6xl font-bold gradient-text neon-glow mb-6">Tweezy</div>

          <div className="text-xl text-center text-gray-400 max-w-md">
            Create an account to start building your AI Twitter agents.
          </div>

          <div className="mt-12 relative">
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-[#1DA1F2]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1DA1F2]/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-4">Join Tweezy</div>
                  <p className="text-gray-400">Create your AI Twitter agent in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-[#1DA1F2] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <div className="ml-auto md:hidden">
              <div className="text-2xl font-bold gradient-text neon-glow">Tweezy</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-gray-400 mt-2">Sign up to get started with Tweezy</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200">{error}</div>}

          {success && (
            <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-md text-green-200">{success}</div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-800 focus:border-[#1DA1F2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-800 focus:border-[#1DA1F2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-gray-900/50 border-gray-800 focus:border-[#1DA1F2]"
                />
                <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-gray-800 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/50"
              onClick={handleGithubSignUp}
              type="button"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="border-gray-800 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/50"
              onClick={handleTwitterSignUp}
              type="button"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
