import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, MessageSquare, ClipboardList, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, Priya!</h2>
          <p className="text-muted-foreground">Manage your students and track their progress.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="24"
          description="+3 from last month"
          trend="up"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Upcoming Sessions"
          value="8"
          description="Next: Today at 10:00 AM"
          trend="none"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Pending Feedback"
          value="5"
          description="-2 from last week"
          trend="down"
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Unread Messages"
          value="3"
          description="+2 new today"
          trend="up"
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Student List */}
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Students</CardTitle>
              <CardDescription>Students assigned to your courses</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/teacher/students">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StudentRow
                name="Arjun Patel"
                course="Digital Literacy"
                progress={85}
                lastActive="Today"
                avatar="/placeholder.svg?height=40&width=40"
                initials="AP"
              />
              <StudentRow
                name="Meera Singh"
                course="Digital Literacy"
                progress={72}
                lastActive="Yesterday"
                avatar="/placeholder.svg?height=40&width=40"
                initials="MS"
              />
              <StudentRow
                name="Vikram Malhotra"
                course="Digital Literacy"
                progress={45}
                lastActive="3 days ago"
                avatar="/placeholder.svg?height=40&width=40"
                initials="VM"
              />
              <StudentRow
                name="Priya Sharma"
                course="Digital Literacy"
                progress={90}
                lastActive="Today"
                avatar="/placeholder.svg?height=40&width=40"
                initials="PS"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your upcoming sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Digital Literacy</div>
                <div className="text-sm text-muted-foreground">Group Session</div>
              </div>
              <div className="text-right">
                <div className="font-medium">10:00 AM</div>
                <div className="text-sm text-muted-foreground">90 min</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">One-on-One Session</div>
                <div className="text-sm text-muted-foreground">with Arjun Patel</div>
              </div>
              <div className="text-right">
                <div className="font-medium">2:00 PM</div>
                <div className="text-sm text-muted-foreground">45 min</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Digital Literacy</div>
                <div className="text-sm text-muted-foreground">Advanced Group</div>
              </div>
              <div className="text-right">
                <div className="font-medium">4:00 PM</div>
                <div className="text-sm text-muted-foreground">90 min</div>
              </div>
            </div>

            <Button className="w-full" variant="outline" asChild>
              <Link href="/dashboard/teacher/schedule">View Full Schedule</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>Tasks that require your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="feedback" className="space-y-4">
            <TabsList>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="feedback" className="space-y-4">
              <div className="rounded-md border">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Arjun Patel</div>
                        <div className="text-sm text-muted-foreground">Digital Literacy - Module 3 Assessment</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Provide Feedback
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Meera Singh</div>
                        <div className="text-sm text-muted-foreground">Digital Literacy - Excel Project</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Provide Feedback
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>VM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Vikram Malhotra</div>
                        <div className="text-sm text-muted-foreground">Digital Literacy - Module 2 Assessment</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Provide Feedback
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/teacher/feedback">View All Pending Feedback</Link>
              </Button>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <div className="rounded-md border p-4">
                <p className="text-center text-muted-foreground">No pending assignments to review.</p>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <div className="rounded-md border">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Arjun Patel</div>
                        <div className="text-sm text-muted-foreground">
                          That would be really helpful! When are you available?
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/teacher/messages">Reply</Link>
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Meera Singh</div>
                        <div className="text-sm text-muted-foreground">
                          I've been practicing! What topic should I focus on?
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/teacher/messages">Reply</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/teacher/messages">View All Messages</Link>
              </Button>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="rounded-md border">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Arjun Patel</div>
                        <div className="text-sm text-muted-foreground">Digital Literacy - Term 2 Assessment</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90" asChild>
                      <Link href="/dashboard/teacher/reports/view/1">View Report</Link>
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Meera Singh</div>
                        <div className="text-sm text-muted-foreground">Digital Literacy - Term 2 Assessment</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90" asChild>
                      <Link href="/dashboard/teacher/reports/create?studentId=2&studentName=Meera%20Singh">
                        Create Report
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>VM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Vikram Malhotra</div>
                        <div className="text-sm text-muted-foreground">Digital Literacy - Term 2 Assessment</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90" asChild>
                      <Link href="/dashboard/teacher/reports/create?studentId=3&studentName=Vikram%20Malhotra">
                        Create Report
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/teacher/feedback">Manage All Reports</Link>
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
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
  trend: "up" | "down" | "none"
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
          ) : trend === "down" ? (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          ) : null}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function StudentRow({
  name,
  course,
  progress,
  lastActive,
  avatar,
  initials,
}: {
  name: string
  course: string
  progress: number
  lastActive: string
  avatar: string
  initials: string
}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{name}</div>
          <div className="text-sm text-muted-foreground">{progress}%</div>
        </div>
        <Progress value={progress} className="h-2 mt-1" />
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-muted-foreground">{course}</div>
          <div className="text-xs text-muted-foreground">Last active: {lastActive}</div>
        </div>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/dashboard/teacher/students/${name.toLowerCase().replace(" ", "-")}`}>View</Link>
      </Button>
    </div>
  )
}

