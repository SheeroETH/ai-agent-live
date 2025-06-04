"use client"

import type { ReactNode } from "react"
import DashboardLayout from "@/components/dashboard-layout"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function Layout({ children }: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}
