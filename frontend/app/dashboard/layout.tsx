import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Josefin_Sans } from "next/font/google"
import "../globals.css"

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, this would come from authentication
  const userType = "teacher" // This would be dynamic based on the logged-in user
  const userName = "Admin User" // This would be dynamic
  const userInitials = "AU" // This would be dynamic
  const userAvatar = "/placeholder.svg?height=32&width=32" // This would be dynamic

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={josefinSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

