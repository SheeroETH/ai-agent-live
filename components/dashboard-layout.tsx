"use client"

import type React from "react"

import { useState } from "react"
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
import { Home, Key, MessageSquare, Bot, LogOut, Menu, X } from "lucide-react"

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-[#0F0F13]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1B1B1F] border-b border-[#333339] z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-[#2A2A2E] mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/dashboard" className="text-2xl font-bold text-white">
              Tweezy
            </Link>
          </div>

          {/* Right side - User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} alt={user?.email || ""} />
                  <AvatarFallback className="bg-[#407BFF]/20 text-[#407BFF]">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#1C1C21] border-[#333339]" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none text-white">{user?.email}</p>
                <p className="text-xs leading-none text-[#B0B0B0]">Premium Account</p>
              </div>
              <DropdownMenuSeparator className="bg-[#333339]" />
              <DropdownMenuItem onClick={handleSignOut} className="text-white hover:bg-[#2A2A2E] cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 w-60 h-[calc(100vh-4rem)] bg-[#1B1B1F] border-r border-[#333339] transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
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
                        ? "bg-[#2A2A2E] text-white border-l-4 border-[#407BFF]"
                        : "text-[#B0B0B0] hover:bg-[#2A2A2E] hover:text-white"
                    }`}
                    onClick={() => setSidebarOpen(false)}
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

      {/* Main content */}
      <main className="md:ml-60 pt-16">
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
