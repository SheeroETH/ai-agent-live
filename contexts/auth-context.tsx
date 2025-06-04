"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any; data: any }>
  signUp: (email: string, password: string, username?: string) => Promise<{ error: any; data: any }>
  signInWithGithub: () => Promise<void>
  signInWithTwitter: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => ({ error: null, data: null }),
  signUp: async () => ({ error: null, data: null }),
  signInWithGithub: async () => {},
  signInWithTwitter: async () => {},
  signOut: async () => {},
})

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
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data.session?.user ?? null)
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)

        // Only redirect to pricing selection after successful sign in from sign-in page
        // Don't redirect if user is already navigating within the app
        if (
          session?.user &&
          _event === "SIGNED_IN" &&
          !window.location.pathname.includes("/pricing") &&
          !window.location.pathname.includes("/dashboard") &&
          !window.location.pathname.includes("/agent") &&
          window.location.pathname === "/sign-in"
        ) {
          router.push("/pricing-selection")
        }
      })

      return () => {
        if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe()
        }
      }
    } catch (error) {
      console.error("Error setting up auth listener:", error)
      setIsLoading(false)
      return () => {}
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const result = await supabase.auth.signInWithPassword({ email, password })
      return result
    } catch (error) {
      console.error("Error signing in:", error)
      return { error, data: null }
    }
  }

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split("@")[0],
          },
        },
      })
      return result
    } catch (error) {
      console.error("Error signing up:", error)
      return { error, data: null }
    }
  }

  const signInWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error("Error signing in with GitHub:", error)
    }
  }

  const signInWithTwitter = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error("Error signing in with Twitter:", error)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signInWithGithub, signInWithTwitter, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
