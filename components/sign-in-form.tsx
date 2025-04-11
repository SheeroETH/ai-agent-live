"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Wallet, Github, Twitter } from "lucide-react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email sign in logic here
    console.log("Signing in with email:", email, password)
  }

  const handleWalletConnect = () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setWalletAddress("0x1234...5678")
      setIsConnecting(false)
    }, 1500)
  }

  const handleWalletDisconnect = () => {
    setWalletAddress("")
  }

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(29,161,242,0.1)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold gradient-text neon-glow mb-6"
          >
            Tweezy
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-center text-gray-400 max-w-md"
          >
            Sign in to manage your AI Twitter agents and grow your online presence.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 relative"
          >
            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-4">Welcome Back</div>
                  <p className="text-gray-400">Your AI agents are waiting for you</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors"
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

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="email" className="flex items-center gap-2 data-[state=active]:bg-blue-900/30">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-2 data-[state=active]:bg-purple-900/30">
                <Wallet className="h-4 w-4" />
                <span>Wallet</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-6">
              <form onSubmit={handleEmailSignIn}>
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
                      className="bg-gray-900/50 border-gray-800 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-900/50 border-gray-800 focus:border-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white border-none hover:opacity-90 transition-opacity"
                  >
                    Sign In with Email
                  </Button>
                </div>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-gray-800 hover:bg-blue-900/20 hover:border-blue-500/50">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="border-gray-800 hover:bg-purple-900/20 hover:border-purple-500/50">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              {!walletAddress ? (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
                    <Wallet className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Connect your crypto wallet to sign in securely without a password.
                    </p>
                    <Button
                      onClick={handleWalletConnect}
                      disabled={isConnecting}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white border-none hover:opacity-90 transition-opacity"
                    >
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                  </div>

                  <div className="text-center text-xs text-gray-400">
                    <p>
                      By connecting your wallet, you agree to our{" "}
                      <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                      <Wallet className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Wallet Connected</h3>
                    <p className="text-purple-400 font-mono text-sm mb-4">{walletAddress}</p>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleWalletDisconnect}
                        variant="outline"
                        className="w-1/2 border-gray-800 hover:bg-purple-900/20 hover:border-purple-500/50"
                      >
                        Disconnect
                      </Button>
                      <Button className="w-1/2 bg-gradient-to-r from-purple-500 to-violet-600 text-white border-none hover:opacity-90 transition-opacity">
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
