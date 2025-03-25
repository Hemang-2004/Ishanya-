"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userInitials="AU"
      userAvatar="/placeholder.svg?height=32&width=32"
    >
      {children}
    </DashboardLayout>
  )
}

