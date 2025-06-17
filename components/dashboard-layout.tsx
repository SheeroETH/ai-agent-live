"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Key, MessageSquare, Bot, LogOut, User } from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "X Credentials", href: "/dashboard/credentials", icon: Key },
  { name: "AI Agent Context", href: "/dashboard/context", icon: MessageSquare },
  { name: "X AI Agent", href: "/dashboard/agents", icon: Bot },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user, signOut, isLoading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F13] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F13]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0F0F13] border-b border-[#333339] z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] bg-clip-text text-transparent"
          >
            Tweezy
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-[#CCCCCC] hover:text-[#1DA1F2] transition-colors"
            >
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-[#CCCCCC] hover:text-[#1DA1F2] transition-colors">
              Pricing
            </Link>
            <Link href="/agent" className="text-sm font-medium text-[#CCCCCC] hover:text-[#1DA1F2] transition-colors">
              Agent
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-[#CCCCCC] hover:text-[#1DA1F2] transition-colors">
              FAQ
            </Link>
          </nav>

          {/* User Avatar or Sign In Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                      alt={user.email || "User"}
                    />
                    <AvatarFallback className="bg-[#1DA1F2]/20 text-[#1DA1F2]">
                      {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1A1A1F] border-[#333339]" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none text-white">{user.email || "Unknown User"}</p>
                  <p className="text-xs leading-none text-[#9CA3AF]">Premium Account</p>
                </div>
                <DropdownMenuSeparator className="bg-[#333339]" />
                <DropdownMenuItem asChild className="text-[#CCCCCC] hover:bg-[#2A2A2F] hover:text-white">
                  <Link href="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#333339]" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-[#CCCCCC] hover:bg-[#2A2A2F] hover:text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-[#1DA1F2] to-[#5ab9f5] text-white border-none hover:opacity-90 transition-opacity">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Fixed Sidebar */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#0F0F13] border-r border-[#333339] z-40 overflow-y-auto">
        <nav className="p-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#1DA1F2]/10 text-[#1DA1F2] border-l-4 border-[#1DA1F2]"
                        : "text-[#CCCCCC] hover:bg-[#1A1A1F] hover:text-white"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen bg-[#0F0F13]">{children}</main>
    </div>
  )
}
