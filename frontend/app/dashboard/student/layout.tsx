"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      userType="student"
      userName="Arjun Patel"
      userInitials="AP"
      userAvatar="/placeholder.svg?height=32&width=32"
    >
      {children}
    </DashboardLayout>
  )
}

