"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null; data: User | null }>
  signUp: (email: string, password: string, username?: string) => Promise<{ error: string | null; data: User | null }>
  signInWithGithub: () => Promise<void>
  signInWithTwitter: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const initializeAuth = async () => {
      try {
        const authService = AuthService.getInstance()

        // Get initial user
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)

        // Listen for auth changes
        unsubscribe = authService.onAuthStateChange((newUser) => {
          setUser(newUser)

          // Redirect logic - only if we're in the browser
          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname
            if (newUser && currentPath === "/sign-in") {
              router.push("/pricing-selection")
            } else if (!newUser && currentPath.startsWith("/dashboard")) {
              router.push("/sign-in")
            }
          }
        })
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    return () => {
      if (unsubscribe) {
        try {
          unsubscribe()
        } catch (error) {
          console.error("Error unsubscribing from auth changes:", error)
        }
      }
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const authService = AuthService.getInstance()
      const result = await authService.signIn(email, password)
      return { error: result.error, data: result.user }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: "An error occurred during sign in", data: null }
    }
  }

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      const authService = AuthService.getInstance()
      const result = await authService.signUp(email, password, username)
      return { error: result.error, data: result.user }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: "An error occurred during sign up", data: null }
    }
  }

  const signInWithGithub = async () => {
    try {
      const authService = AuthService.getInstance()
      const result = await authService.signIn("github@example.com", "github123")
      if (result.error) {
        console.error("GitHub authentication failed:", result.error)
      }
    } catch (error) {
      console.error("Error signing in with GitHub:", error)
    }
  }

  const signInWithTwitter = async () => {
    try {
      const authService = AuthService.getInstance()
      const result = await authService.signIn("twitter@example.com", "twitter123")
      if (result.error) {
        console.error("Twitter authentication failed:", result.error)
      }
    } catch (error) {
      console.error("Error signing in with Twitter:", error)
    }
  }

  const signOut = async () => {
    try {
      const authService = AuthService.getInstance()
      await authService.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const contextValue: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signInWithGithub,
    signInWithTwitter,
    signOut,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
