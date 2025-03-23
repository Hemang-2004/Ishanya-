"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { Search, Plus, BookOpen, Users, Calendar, Clock, BarChart, FileText, Edit, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TeacherCoursesPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter courses based on search term and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || course.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Courses</h2>
          <p className="text-muted-foreground">Manage your teaching courses and curriculum</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-3 bg-primary w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(course.status)}>{course.status}</Badge>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{course.schedule}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Course Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Upcoming Sessions</h4>
                  <div className="space-y-2">
                    {course.upcomingSessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{session.date}</span>
                        </div>
                        <span>{session.topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {course.status === "Active" && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex-1 flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{course.pendingAssignments} pending assignments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                      <span>Avg. Score: {course.averageScore}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/teacher/courses/${course.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/dashboard/teacher/courses/${course.id}/manage`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Manage
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center p-8 border rounded-lg">
            <div className="text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="text-muted-foreground mb-4">No courses match your current filters.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teaching Statistics</CardTitle>
          <CardDescription>Your teaching performance and impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Students Taught</h3>
              <div className="text-3xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">Total students across all courses</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Average Student Rating</h3>
              <div className="text-3xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">Based on 98 student reviews</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Completion Rate</h3>
              <div className="text-3xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Students who completed your courses</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Student Activity</CardTitle>
          <CardDescription>Latest activities from your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{activity.studentName}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">{activity.course}</span> - {activity.module}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-1">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Helper function for status badge variant
function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "success"
    case "Upcoming":
      return "warning"
    case "Archived":
      return "secondary"
    default:
      return "outline"
  }
}

// Sample data
const courses = [
  {
    id: "1",
    title: "Digital Literacy Fundamentals",
    description: "Introduction to basic computer skills and digital tools",
    status: "Active",
    students: 24,
    schedule: "Mon, Wed • 10:00 AM - 12:00 PM",
    progress: 65,
    pendingAssignments: 8,
    averageScore: 78,
    upcomingSessions: [
      { date: "Jun 20, 2023", topic: "Internet Safety" },
      { date: "Jun 22, 2023", topic: "Email Communication" },
    ],
  },
  {
    id: "2",
    title: "Microsoft Office Essentials",
    description: "Practical skills in Word, Excel, and PowerPoint",
    status: "Active",
    students: 18,
    schedule: "Tue, Thu • 2:00 PM - 4:00 PM",
    progress: 45,
    pendingAssignments: 12,
    averageScore: 82,
    upcomingSessions: [
      { date: "Jun 21, 2023", topic: "Excel Formulas" },
      { date: "Jun 23, 2023", topic: "PowerPoint Presentations" },
    ],
  },
  {
    id: "3",
    title: "Internet Safety & Security",
    description: "Best practices for staying safe online",
    status: "Upcoming",
    students: 15,
    schedule: "Fri • 10:00 AM - 1:00 PM",
    progress: 0,
    pendingAssignments: 0,
    averageScore: 0,
    upcomingSessions: [
      { date: "Jul 7, 2023", topic: "Introduction to Internet Safety" },
      { date: "Jul 14, 2023", topic: "Password Management" },
    ],
  },
  {
    id: "4",
    title: "Advanced Digital Skills",
    description: "Cloud computing, collaboration tools, and digital productivity",
    status: "Upcoming",
    students: 12,
    schedule: "Mon, Wed • 2:00 PM - 4:00 PM",
    progress: 0,
    pendingAssignments: 0,
    averageScore: 0,
    upcomingSessions: [
      { date: "Jul 10, 2023", topic: "Introduction to Cloud Computing" },
      { date: "Jul 12, 2023", topic: "Google Workspace" },
    ],
  },
  {
    id: "5",
    title: "Basic Computer Skills",
    description: "Fundamental computer operations and file management",
    status: "Archived",
    students: 20,
    schedule: "Completed on May 30, 2023",
    progress: 100,
    pendingAssignments: 0,
    averageScore: 88,
    upcomingSessions: [],
  },
  {
    id: "6",
    title: "Digital Communication",
    description: "Effective online communication and collaboration",
    status: "Archived",
    students: 22,
    schedule: "Completed on Apr 15, 2023",
    progress: 100,
    pendingAssignments: 0,
    averageScore: 92,
    upcomingSessions: [],
  },
]

const studentActivities = [
  {
    id: "1",
    studentName: "Arjun Patel",
    description: "Submitted assignment: Excel Formulas Project",
    course: "Microsoft Office Essentials",
    module: "Module 3",
    time: "Today, 10:30 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "2",
    studentName: "Meera Singh",
    description: "Completed quiz: Internet Safety Basics",
    course: "Digital Literacy Fundamentals",
    module: "Module 4",
    time: "Yesterday, 3:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: "3",
    studentName: "Vikram Malhotra",
    description: "Asked a question in discussion forum",
    course: "Digital Literacy Fundamentals",
    module: "Module 2",
    time: "Today, 9:15 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
]

