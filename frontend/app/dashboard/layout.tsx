import type { ReactNode } from "react"
// Import necessary components for the dashboard layout

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar and other layout elements */}
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

