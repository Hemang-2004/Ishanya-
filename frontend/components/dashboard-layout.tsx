"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LogOut,
  Menu,
  Bell,
  Search,
  Home,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  MessageSquare,
  ClipboardList,
  BookOpen,
  BarChart3,
  UserPlus,
  Layers,
  DollarSign,
  PieChart,
  ChevronRight,
  ChevronLeft,
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
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"

type UserType = "student" | "teacher" | "admin"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: UserType
  userName: string
  userInitials: string
  userAvatar: string
}

export function DashboardLayout({ children, userType, userName, userInitials, userAvatar }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { t } = useLanguage()

  // Define navigation based on user type
  const getNavigation = () => {
    switch (userType) {
      case "student":
        return [
          { name: "Dashboard", href: "/dashboard/student", icon: Home },
          { name: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
          { name: "Progress Tracker", href: "/dashboard/student/progress", icon: GraduationCap },
          { name: "Assignments", href: "/dashboard/student/assignments", icon: FileText, badge: 2 },
          { name: "Reports", href: "/dashboard/student/reports", icon: BarChart3 },
          { name: "Schedule", href: "/dashboard/student/schedule", icon: Calendar },
          { name: "Messages", href: "/dashboard/student/messages", icon: MessageSquare, badge: 1 },
          { name: "Settings", href: "/dashboard/student/settings", icon: Settings },
        ]
      case "teacher":
        return [
          { name: t("Dashboard"), href: "/dashboard/teacher", icon: Home },
          { name: t("My Courses"), href: "/dashboard/teacher/courses", icon: BookOpen },
          { name: t("My Students"), href: "/dashboard/teacher/students", icon: Users },
          { name: t("Progress Reports"), href: "/dashboard/teacher/reports", icon: GraduationCap },
          { name: t("Assignments"), href: "/dashboard/teacher/assignments", icon: FileText },
          { name: t("Feedback Forms"), href: "/dashboard/teacher/feedback", icon: ClipboardList },
          { name: t("Schedule"), href: "/dashboard/teacher/schedule", icon: Calendar },
          { name: t("Messages"), href: "/dashboard/teacher/messages", icon: MessageSquare, badge: 3 },
          { name: t("Settings"), href: "/dashboard/teacher/settings", icon: Settings },
        ]
      case "admin":
        return [
          { name: t("Dashboard"), href: "/dashboard/admin", icon: Home },
          { name: t("Students"), href: "/dashboard/admin/students", icon: Users },
          { name: t("Staff"), href: "/dashboard/admin/staff", icon: GraduationCap },
          { name: t("Programs"), href: "/dashboard/admin/programs", icon: Layers },
          { name: t("Analytics"), href: "/dashboard/admin/analytics", icon: PieChart },
          { name: t("Reports"), href: "/dashboard/admin/reports", icon: BarChart3 },
          { name: t("Funds"), href: "/dashboard/admin/funds", icon: DollarSign },
          {
            name: t("Registration Requests"),
            href: "/dashboard/admin/registration-requests",
            icon: UserPlus,
            badge: 5,
          },
          { name: t("Settings"), href: "/dashboard/admin/settings", icon: Settings },
        ]
      default:
        return []
    }
  }

  const navigation = getNavigation()

  const NavLink = ({ item }: { item: (typeof navigation)[0] }) => {
    const isActive =
      pathname === item.href ||
      (pathname.startsWith(item.href + "/") &&
        // Prevent dashboard from being highlighted for all sub-paths
        !(item.href === `/dashboard/${userType}` && pathname !== `/dashboard/${userType}`))
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <item.icon className="h-5 w-5" />
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{item.name}</span>
            {item.badge && (
              <Badge variant={userType === "admin" ? "destructive" : "secondary"} className="ml-auto">
                {item.badge}
              </Badge>
            )}
          </>
        )}
        {isCollapsed && item.badge && (
          <Badge variant={userType === "admin" ? "destructive" : "secondary"} className="ml-auto">
            {item.badge}
          </Badge>
        )}
      </Link>
    )
  }

  const getUserEmail = () => {
    switch (userType) {
      case "student":
        return "arjun.p@example.com"
      case "teacher":
        return "priya.s@ishanya.org"
      case "admin":
        return "admin@ishanya.org"
      default:
        return ""
    }
  }

  const getUserRoleBadge = () => {
    switch (userType) {
      case "student":
        return "Student"
      case "teacher":
        return t("Teacher")
      case "admin":
        return t("Administrator")
      default:
        return ""
    }
  }

  return (
    <div className="flex h-screen bg-background dark:bg-background">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col border-r border-border transition-all duration-300 ${isCollapsed ? "w-[70px]" : "w-64"}`}
      >
        <div className="flex h-16 items-center border-b px-4 bg-primary">
          <Link href={`/dashboard/${userType}`} className="flex items-center gap-2">
            <IshanyaLogo className="h-10 w-10" showTagline={false} />
            {!isCollapsed && (
              <div>
                <span className="font-bold text-primary-foreground block leading-tight">Ishanya Connect</span>
                <span className="text-xs text-primary-foreground/80">
                  {userType === "student"
                    ? "Student Portal"
                    : userType === "teacher"
                      ? t("Teacher Dashboard")
                      : "Admin Portal"}
                </span>
              </div>
            )}
          </Link>
        </div>
        <div className="flex items-center px-4 py-2 bg-muted/50 justify-between">
          {!isCollapsed && (
            <Badge variant="outline" className="w-full justify-center py-1 border-secondary text-secondary">
              {getUserRoleBadge()}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={isCollapsed ? "mx-auto" : ""}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-4 geometric-pattern overflow-y-auto">
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">{getUserEmail()}</p>
              </div>
            )}
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
              href={`/dashboard/${userType}`}
              className="flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IshanyaLogo className="h-10 w-10" showTagline={false} />
              <div>
                <span className="font-bold text-primary-foreground block leading-tight">Ishanya Connect</span>
                <span className="text-xs text-primary-foreground/80">
                  {userType === "student"
                    ? "Student Portal"
                    : userType === "teacher"
                      ? t("teacherDashboard")
                      : "Admin Portal"}
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center px-4 py-2 bg-muted/50">
            <Badge variant="outline" className="w-full justify-center py-1 border-secondary text-secondary">
              {getUserRoleBadge()}
            </Badge>
          </div>
          <nav className="flex-1 space-y-1 p-4 geometric-pattern">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge variant={userType === "admin" ? "destructive" : "secondary"} className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">{getUserEmail()}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:px-6 sticky top-0 z-10">
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
                  placeholder={userType === "student" ? "Search courses..." : t("search")}
                  className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">{t("notifications")}</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt="User" />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/dashboard/${userType}/profile`} className="flex w-full items-center">
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/dashboard/${userType}/settings`} className="flex w-full items-center">
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

        {/* Footer */}
        <footer className="border-t border-border py-3 px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ishanya Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

