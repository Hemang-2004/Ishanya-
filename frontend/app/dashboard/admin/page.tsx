import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserCheck,
  Award,
  TrendingUp,
  Calendar,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Download,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentActivities } from "@/components/recent-activities"
import { UpcomingEvents } from "@/components/upcoming-events"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's an overview of Ishanya Connect activities.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="1,856"
          description="+12% from last month"
          trend="up"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Active Teachers"
          value="42"
          description="+8% from last month"
          trend="up"
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Completed Programs"
          value="128"
          description="+24% from last month"
          trend="up"
          icon={<Award className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Dropout Rate"
          value="3.2%"
          description="-2% from last month"
          trend="down"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Registration Requests Alert */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <UserPlus className="h-8 w-8 text-destructive" />
              <div>
                <h3 className="font-medium">Pending Registration Requests</h3>
                <p className="text-sm text-muted-foreground">5 new student registrations require your approval</p>
              </div>
            </div>
            <Button asChild className="bg-secondary hover:bg-secondary/90">
              <Link href="/dashboard/admin/registration-requests">Review Requests</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
                <CardDescription>Monthly student acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates from your stakeholders</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Schedule for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Program Progress</CardTitle>
                <CardDescription>Current status of active programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <ProgramProgress
                  name="Digital Literacy"
                  progress={75}
                  startDate="Jan 15, 2023"
                  endDate="Dec 15, 2023"
                />
                <ProgramProgress
                  name="Vocational Training"
                  progress={45}
                  startDate="Mar 1, 2023"
                  endDate="Feb 28, 2024"
                />
                <ProgramProgress
                  name="Community Outreach"
                  progress={90}
                  startDate="Apr 10, 2023"
                  endDate="Oct 10, 2023"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
              <CardDescription>Detailed analytics will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Content</CardTitle>
              <CardDescription>Generated reports will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  trend,
  icon,
}: {
  title: string
  value: string
  description: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function ProgramProgress({
  name,
  progress,
  startDate,
  endDate,
}: {
  name: string
  progress: number
  startDate: string
  endDate: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{progress}%</div>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          {startDate}
        </div>
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          {endDate}
        </div>
      </div>
    </div>
  )
}

