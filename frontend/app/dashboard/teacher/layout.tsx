"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      userType="teacher"
      userName="Priya Sharma"
      userInitials="PS"
      userAvatar="/placeholder.svg?height=32&width=32"
    >
      {children}
    </DashboardLayout>
  )
}

