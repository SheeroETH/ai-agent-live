"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Github, Twitter, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SignInForm() {
  const router = useRouter()
  const { signIn, signInWithGithub, signInWithTwitter } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        return
      }

      // Redirect will be handled by the auth context
    } catch (err: any) {
      console.error("Sign in error:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub()
    } catch (err: any) {
      console.error("GitHub sign in error:", err)
      setError("Failed to authenticate with GitHub. Please try again.")
    }
  }

  const handleTwitterSignIn = async () => {
    try {
      await signInWithTwitter()
    } catch (err: any) {
      console.error("Twitter sign in error:", err)
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
            Sign in to your account to manage your AI Twitter agents.
          </div>

          <div className="mt-12 relative">
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-[#1DA1F2]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1DA1F2]/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-4">Welcome Back</div>
                  <p className="text-gray-400">Manage your AI Twitter agents</p>
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
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-400 mt-2">Choose your preferred sign in method</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200">{error}</div>}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-[#1DA1F2] hover:text-[#1DA1F2]/80">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-900/50 border-gray-800 focus:border-[#1DA1F2] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-gray-800 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/50"
              onClick={handleGithubSignIn}
              type="button"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="border-gray-800 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/50"
              onClick={handleTwitterSignIn}
              type="button"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
