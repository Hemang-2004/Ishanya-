// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   BarChart3,
//   Users,
//   Settings,
//   LogOut,
//   Menu,
//   Bell,
//   Search,
//   Home,
//   UserCheck,
//   UserPlus,
//   Layers,
//   DollarSign,
//   PieChart,
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { IshanyaLogo } from "@/components/ishanya-logo"
// import { useLanguage } from "@/components/language-provider"

// export default function AdminDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const { t } = useLanguage()

//   const navigation = [
//     { name: t("Dashboard"), href: "/dashboard/admin", icon: Home },
//     { name: t("Students"), href: "/dashboard/admin/students", icon: Users },
//     { name: t("Staff"), href: "/dashboard/admin/staff", icon: UserCheck },
//     { name: t("Programs"), href: "/dashboard/admin/programs", icon: Layers },
//     { name: t("Analytics"), href: "/dashboard/admin/analytics", icon: PieChart },
//     { name: t("Reports"), href: "/dashboard/admin/reports", icon: BarChart3 },
//     { name: t("Funds"), href: "/dashboard/admin/funds", icon: DollarSign },
//     { name: t("Registration Requests"), href: "/dashboard/admin/registration-requests", icon: UserPlus, badge: 5 },
//     { name: t("Settings"), href: "/dashboard/admin/settings", icon: Settings },
//   ]

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Home,
  UserCheck,
  UserPlus,
  Layers,
  DollarSign,
  PieChart,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { IshanyaLogo } from "@/components/ishanya-logo"
import { useLanguage } from "@/components/language-provider"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const [registrationCount, setRegistrationCount] = useState(0)

  useEffect(() => {
    async function fetchRegistrationRequests() {
      try {
        const response = await fetch("http://127.0.0.1:5000/admins/registration-requests")
        const data = await response.json()
        if (data.success) {
          const count = (data.students?.length || 0) + (data.educators?.length || 0)
          setRegistrationCount(count)
        }
      } catch (error) {
        console.error("Error fetching registration requests:", error)
      }
    }

    fetchRegistrationRequests()
  }, [])

  const navigation = [
    { name: t("Dashboard"), href: "/dashboard/admin", icon: Home },
    { name: t("Students"), href: "/dashboard/admin/students", icon: Users },
    { name: t("Staff"), href: "/dashboard/admin/staff", icon: UserCheck },
    { name: t("Programs"), href: "/dashboard/admin/programs", icon: Layers },
    { name: t("Analytics"), href: "/dashboard/admin/analytics", icon: PieChart },
    { name: t("Reports"), href: "/dashboard/admin/reports", icon: BarChart3 },
    { name: t("Funds"), href: "/dashboard/admin/funds", icon: DollarSign },
    {
      name: t("Registration Requests"),
      href: "/dashboard/admin/registration-requests",
      icon: UserPlus,
      badge: registrationCount
    },
    { name: t("Settings"), href: "/dashboard/admin/settings", icon: Settings },
  ]


  const NavLink = ({ item }: { item: (typeof navigation)[0] }) => {
    const isActive = pathname === item.href
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          isActive
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.name}</span>
        {item.badge && (
          <Badge variant="destructive" className="ml-auto">
            {item.badge}
          </Badge>
        )}
      </Link>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r">
        <div className="flex h-16 items-center border-b px-4 bg-primary">
          <Link href="/dashboard/admin" className="flex items-center gap-2">
            <IshanyaLogo className="h-10 w-10" showTagline={false} />
            <div>
              <span className="font-bold text-primary-foreground block leading-tight">Ishanya Connect</span>
              <span className="text-xs text-primary-foreground/80">Admin Portal</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center px-4 py-2 bg-muted/50">
          <Badge variant="outline" className="w-full justify-center py-1 border-secondary text-secondary">
            {t("administrator")}
          </Badge>
        </div>
        <nav className="flex-1 space-y-1 p-4 geometric-pattern">
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@ishanya.org</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-4 bg-primary">
            <Link
              href="/dashboard/admin"
              className="flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IshanyaLogo className="h-10 w-10" showTagline={false} />
              <div>
                <span className="font-bold text-primary-foreground block leading-tight">Ishanya Connect</span>
                <span className="text-xs text-primary-foreground/80">Admin Portal</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center px-4 py-2 bg-muted/50">
            <Badge variant="outline" className="w-full justify-center py-1 border-secondary text-secondary">
              {t("administrator")}
            </Badge>
          </div>
          <nav className="flex-1 space-y-1 p-4 geometric-pattern">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === item.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@ishanya.org</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("search")}
                  className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">{t("notifications")}</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/admin/profile" className="flex w-full items-center">
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/admin/settings" className="flex w-full items-center">
                    {t("settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/login" className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 geometric-pattern">{children}</main>
      </div>
    </div>
  )
}

