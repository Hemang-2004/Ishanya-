"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserData } from "@/utils/auth" // Import getUserData function
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, Clock, FileText, MessageSquare, Star, Trophy, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"


// Sample progress data for charts
const progressData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 75 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
]

const skillsData = [
  { subject: "Computer Basics", A: 85, fullMark: 100 },
  { subject: "Internet", A: 90, fullMark: 100 },
  { subject: "MS Office", A: 75, fullMark: 100 },
  { subject: "Email", A: 80, fullMark: 100 },
  { subject: "Online Safety", A: 70, fullMark: 100 },
]

export default function StudentDashboardPage() {
  const [user, setUser] = useState<{ userId: string; userName: string; role: string } | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userID", user?.userId || ""); // Store user ID in localStorage
    }
  }, [user?.userId]);
  useEffect(() => {
    const storedUser = getUserData()
    if (storedUser) {
      setUser(storedUser)
      console.log("User ID here:", storedUser.userId) // Safely print userId
    } else {
      console.log("No user data found")
    }
  }, [])
  


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, {user ? user.userName : "Student"}!</h2>
          <p className="text-muted-foreground">Track your progress and stay connected with your teachers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Teacher
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">You're doing great! Keep up the good work.</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="bg-secondary/10">
                Digital Literacy
              </Badge>
              <Badge variant="outline" className="bg-secondary/10">
                Communication
              </Badge>
              <Badge variant="outline" className="bg-secondary/10">
                Life Skills
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="space-y-1 mt-2">
              <p className="text-xs">Excel Formulas (Due: Tomorrow)</p>
              <p className="text-xs">PowerPoint Presentation (Due: Friday)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <div className="mt-2">
              <p className="text-xs font-medium">Digital Literacy</p>
              <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Your learning progress over the past months</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedTimeframe === "3months" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe("3months")}
                >
                  3M
                </Button>
                <Button
                  variant={selectedTimeframe === "6months" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe("6months")}
                >
                  6M
                </Button>
                <Button
                  variant={selectedTimeframe === "1year" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe("1year")}
                >
                  1Y
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Progress Score"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Skills Breakdown</CardTitle>
            <CardDescription>Your proficiency in different skill areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Progress</CardTitle>
          <CardDescription>Your progress in key skill areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                  <span className="font-medium">Computer Basics</span>
                </div>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">Excellent understanding of hardware and software concepts</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-secondary"></div>
                  <span className="font-medium">Internet Skills</span>
                </div>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-xs text-muted-foreground">Strong ability to navigate and use online resources</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Microsoft Office</span>
                </div>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Good progress with Word and PowerPoint, needs work on Excel
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span className="font-medium">Email & Communication</span>
                </div>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">Effective at composing and managing emails</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Online Safety</span>
                </div>
                <span>70%</span>
              </div>
              <Progress value={70} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Understanding of basic security practices, needs more practice
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="reports">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Assessment Reports</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Assessment Reports</CardTitle>
              <CardDescription>View your progress assessment reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Term 2 Assessment Report</div>
                      <div className="text-sm text-muted-foreground">December 15, 2024 • By Priya Sharma</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/student/reports/view/1">View Report</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Term 1 Assessment Report</div>
                      <div className="text-sm text-muted-foreground">August 20, 2024 • By Priya Sharma</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/student/reports/view/4">View Report</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/student/reports">
                    View All Reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Your enrolled courses and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <CourseCard
                title="Digital Literacy"
                progress={85}
                teacher="Priya Sharma"
                nextSession="Tomorrow, 10:00 AM"
                image="/placeholder.svg?height=40&width=40"
              />
              <CourseCard
                title="Communication Skills"
                progress={65}
                teacher="Rahul Verma"
                nextSession="Wednesday, 2:00 PM"
                image="/placeholder.svg?height=40&width=40"
              />
              <CourseCard
                title="Life Skills"
                progress={40}
                teacher="Anita Desai"
                nextSession="Friday, 11:00 AM"
                image="/placeholder.svg?height=40&width=40"
              />

              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/student/courses">
                  View All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages from Teachers</CardTitle>
              <CardDescription>Recent communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">Priya Sharma</p>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm">
                    Great job on your last assignment! I've added some feedback for you to review.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <Link href="/dashboard/student/messages">Reply</Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>RV</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">Rahul Verma</p>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm">Don't forget to prepare for our group discussion in the next session.</p>
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <Link href="/dashboard/student/messages/">Reply</Link>
                    
                  </Button>
                </div>
              </div>

              <Button className="w-full mt-2" variant="outline" asChild>
                <Link href="/dashboard/student/messages">
                  View All Messages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upcoming Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>Your sessions for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Digital Literacy Session</div>
                <div className="text-sm text-muted-foreground">With Priya Sharma</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Tomorrow</div>
                <div className="text-sm text-muted-foreground">10:00 - 11:30 AM</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Communication Skills Workshop</div>
                <div className="text-sm text-muted-foreground">With Rahul Verma</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Wednesday</div>
                <div className="text-sm text-muted-foreground">2:00 - 4:00 PM</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Life Skills Training</div>
                <div className="text-sm text-muted-foreground">With Anita Desai</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Friday</div>
                <div className="text-sm text-muted-foreground">11:00 AM - 12:30 PM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CourseCard({
  title,
  progress,
  teacher,
  nextSession,
  image,
}: {
  title: string
  progress: number
  teacher: string
  nextSession: string
  image: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
        <BookOpen className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm">{progress}%</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={image} />
              <AvatarFallback>
                {teacher
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{teacher}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{nextSession}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

