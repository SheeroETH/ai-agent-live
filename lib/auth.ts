export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
    username?: string
  }
}

interface AuthResult {
  user: User | null
  error: string | null
}

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null
  private listeners: ((user: User | null) => void)[] = []
  private initialized = false

  private constructor() {
    // Don't initialize immediately, wait for explicit call
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private initialize(): void {
    if (this.initialized || typeof window === "undefined") {
      return
    }

    try {
      const stored = localStorage.getItem("tweezy_user")
      if (stored && stored !== "null" && stored !== "undefined") {
        const userData = JSON.parse(stored)
        if (userData && typeof userData === "object" && userData.id && userData.email) {
          this.currentUser = userData
        }
      }
    } catch (error) {
      console.error("Error loading stored user:", error)
      this.clearStoredUser()
    }

    this.initialized = true
  }

  private clearStoredUser(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("tweezy_user")
      } catch (error) {
        console.error("Error clearing stored user:", error)
      }
    }
  }

  getCurrentUser(): User | null {
    if (!this.initialized) {
      this.initialize()
    }
    return this.currentUser
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!this.initialized) {
      this.initialize()
    }

    if (typeof callback !== "function") {
      console.error("Auth state change callback must be a function")
      return () => {}
    }

    this.listeners.push(callback)

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => {
      try {
        if (typeof callback === "function") {
          callback(this.currentUser)
        }
      } catch (error) {
        console.error("Error in auth state change listener:", error)
      }
    })
  }

  private setUser(user: User | null): void {
    this.currentUser = user

    if (typeof window !== "undefined") {
      try {
        if (user && user.id && user.email) {
          localStorage.setItem("tweezy_user", JSON.stringify(user))
        } else {
          localStorage.removeItem("tweezy_user")
        }
      } catch (error) {
        console.error("Error storing user:", error)
      }
    }

    this.notifyListeners()
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    if (!email || !password) {
      return { user: null, error: "Email and password are required" }
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock authentication - check against demo users
      const demoUsers = [
        {
          email: "demo@tweezy.ai",
          password: "demo123",
          user: {
            id: "1",
            email: "demo@tweezy.ai",
            user_metadata: {
              full_name: "Demo User",
              username: "demo",
              avatar_url: "/placeholder.svg",
            },
          },
        },
        {
          email: "john@example.com",
          password: "password123",
          user: {
            id: "2",
            email: "john@example.com",
            user_metadata: {
              full_name: "John Doe",
              username: "john",
              avatar_url: "/placeholder.svg",
            },
          },
        },
        {
          email: "github@example.com",
          password: "github123",
          user: {
            id: "3",
            email: "github@example.com",
            user_metadata: {
              full_name: "GitHub User",
              username: "github",
              avatar_url: "/placeholder.svg",
            },
          },
        },
        {
          email: "twitter@example.com",
          password: "twitter123",
          user: {
            id: "4",
            email: "twitter@example.com",
            user_metadata: {
              full_name: "Twitter User",
              username: "twitter",
              avatar_url: "/placeholder.svg",
            },
          },
        },
      ]

      const foundUser = demoUsers.find((u) => u.email === email && u.password === password)

      if (foundUser && foundUser.user) {
        this.setUser(foundUser.user)
        return { user: foundUser.user, error: null }
      } else {
        return { user: null, error: "Invalid email or password" }
      }
    } catch (error) {
      console.error("Sign in error:", error)
      return { user: null, error: "An error occurred during sign in" }
    }
  }

  async signUp(email: string, password: string, username?: string): Promise<AuthResult> {
    if (!email || !password) {
      return { user: null, error: "Email and password are required" }
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        user_metadata: {
          full_name: username || email.split("@")[0],
          username: username || email.split("@")[0],
          avatar_url: "/placeholder.svg",
        },
      }

      this.setUser(newUser)
      return { user: newUser, error: null }
    } catch (error) {
      console.error("Sign up error:", error)
      return { user: null, error: "An error occurred during sign up" }
    }
  }

  async signOut(): Promise<void> {
    try {
      this.setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }
}
