"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import {
  Users,
  GraduationCap,
  BookOpen,
  Award,
  UserPlus,
  Download,
  FileText,
  BarChart3,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("month")
  const [programFilter, setProgramFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at Ishanya Connect</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => router.push("/dashboard/admin/add-student")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="digital-literacy">Digital Literacy</SelectItem>
              <SelectItem value="vocational-training">Vocational Training</SelectItem>
              <SelectItem value="community-leadership">Community Leadership</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Students"
          value="1,856"
          change="+12%"
          trend="up"
          description="vs. previous period"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Teachers"
          value="42"
          change="+8%"
          trend="up"
          description="vs. previous period"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Programs"
          value="12"
          change="+2"
          trend="up"
          description="vs. previous period"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <MetricCard
          title="Completion Rate"
          value="78%"
          change="+5%"
          trend="up"
          description="vs. previous period"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Student Growth</CardTitle>
              <CardDescription>Monthly student acquisition and retention</CardDescription>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <StudentGrowthChart />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Program Distribution</CardTitle>
              <CardDescription>Students enrolled by program</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ProgramDistributionChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Completion Rates</CardTitle>
            <CardDescription>Program completion statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Digital Literacy</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Vocational Training</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Community Leadership</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Health & Wellness</span>
                  <span className="text-sm text-muted-foreground">79%</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Financial Literacy</span>
                  <span className="text-sm text-muted-foreground">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Monthly Attendance</CardTitle>
              <CardDescription>Average attendance rates by program</CardDescription>
            </div>
            <Select defaultValue="3months">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <AttendanceChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Registration Requests</CardTitle>
            <CardDescription>New student and teacher registration requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrationRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={request.avatar} />
                      <AvatarFallback>{request.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{request.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.role} • {request.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/admin/registration-requests">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <Button className="justify-start" asChild>
                <Link href="/dashboard/admin/add-student">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Student
                </Link>
              </Button>
              <Button className="justify-start" asChild>
                <Link href="/dashboard/admin/add-teacher">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Add New Teacher
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link href="/dashboard/admin/programs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Programs
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link href="/dashboard/admin/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Reports
                </Link>
              </Button>
              <Button className="justify-start" variant="outline" asChild>
                <Link href="/dashboard/admin/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-md">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </div>
                    <div className="text-sm mt-1">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getActivityIconBg(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
  icon: React.ReactNode
}

function MetricCard({ title, value, change, trend, description, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          ) : trend === "down" ? (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          ) : null}
          <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}>{change}</span>
          <span className="ml-1">{description}</span>
        </p>
      </CardContent>
    </Card>
  )
}

function StudentGrowthChart() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <LineChart className="h-16 w-16 text-muted-foreground/50" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-transparent to-transparent">
        <div
          className="h-full w-full bg-gradient-to-t from-primary/10 to-transparent rounded-md"
          style={{
            clipPath:
              "polygon(0 100%, 10% 80%, 20% 90%, 30% 70%, 40% 60%, 50% 50%, 60% 55%, 70% 45%, 80% 40%, 90% 30%, 100% 40%, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-4 text-xs text-muted-foreground">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  )
}

function ProgramDistributionChart() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <PieChart className="h-16 w-16 text-muted-foreground/50 absolute" />
      <div className="w-[200px] h-[200px] rounded-full border-8 border-primary/20 relative">
        <div className="absolute inset-0 border-8 border-transparent border-t-secondary rounded-full transform rotate-[45deg]"></div>
        <div className="absolute inset-0 border-8 border-transparent border-r-green-500 rounded-full transform rotate-[145deg]"></div>
        <div className="absolute inset-0 border-8 border-transparent border-b-blue-500 rounded-full transform rotate-[245deg]"></div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-around text-xs text-muted-foreground">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-secondary rounded-full mr-1"></div>
          <span>Digital Literacy (45%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>Vocational (30%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span>Leadership (25%)</span>
        </div>
      </div>
    </div>
  )
}

function AttendanceChart() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[70%] flex items-end justify-around px-4 gap-2">
        <div className="w-full h-[85%] bg-primary/20 rounded-t-md"></div>
        <div className="w-full h-[75%] bg-primary/20 rounded-t-md"></div>
        <div className="w-full h-[90%] bg-primary/20 rounded-t-md"></div>
        <div className="w-full h-[80%] bg-secondary/60 rounded-t-md"></div>
        <div className="w-full h-[70%] bg-primary/20 rounded-t-md"></div>
        <div className="w-full h-[85%] bg-primary/20 rounded-t-md"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4 pb-4 text-xs text-muted-foreground">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  )
}

function getActivityIcon(type: string) {
  switch (type) {
    case "registration":
      return <UserCheck className="h-4 w-4 text-green-500" />
    case "completion":
      return <CheckCircle2 className="h-4 w-4 text-blue-500" />
    case "notification":
      return <Bell className="h-4 w-4 text-yellow-500" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

function getActivityIconBg(type: string) {
  switch (type) {
    case "registration":
      return "bg-green-500/10"
    case "completion":
      return "bg-blue-500/10"
    case "notification":
      return "bg-yellow-500/10"
    default:
      return "bg-muted"
  }
}

// Sample data
const registrationRequests = [
  {
    id: "1",
    name: "Rahul Mehta",
    role: "Student",
    date: "Today, 10:30 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RM",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Teacher",
    date: "Yesterday, 3:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
  },
  {
    id: "3",
    name: "Amit Kumar",
    role: "Student",
    date: "Yesterday, 11:20 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AK",
  },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Digital Literacy Workshop",
    date: "June 15, 2023",
    time: "10:00 AM - 12:00 PM",
    description: "Introductory workshop for new students in the Digital Literacy program.",
  },
  {
    id: "2",
    title: "Teacher Training Session",
    date: "June 18, 2023",
    time: "2:00 PM - 4:00 PM",
    description: "Professional development session for all teaching staff.",
  },
  {
    id: "3",
    title: "Community Outreach Program",
    date: "June 20, 2023",
    time: "9:00 AM - 1:00 PM",
    description: "Engaging with local communities to promote educational opportunities.",
  },
]

const recentActivities = [
  {
    id: "1",
    type: "registration",
    title: "New student Rahul Mehta registered",
    time: "10 minutes ago",
  },
  {
    id: "2",
    type: "completion",
    title: "Arjun Patel completed Digital Literacy Module 3",
    time: "30 minutes ago",
  },
  {
    id: "3",
    type: "notification",
    title: "New program 'Financial Literacy' launched",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "registration",
    title: "New teacher Priya Sharma registered",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "completion",
    title: "Meera Singh completed Vocational Training",
    time: "3 hours ago",
  },
]

