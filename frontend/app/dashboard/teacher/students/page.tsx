"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { getUserData } from "@/utils/auth" // Import getUserData function
import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Search,
  Download,
  Mail,
  MessageSquare,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  UserCheck,
  UserX,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"

export default function TeacherStudentsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("all")
  const [students, setStudents] = useState<{ student_id: number; name: string; program_id: string; program_name: string; status:string; email:string}[]>([]);
  const [user, setUser] = useState<{ userId: string; userName: string; role: string } | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setUser(storedUser);
      console.log("User ID here:", storedUser.userId);
    } else {
      console.log("No user data found");
    }
  }, []);

  useEffect(() => {
    if (!user?.userId) return; // Prevent fetching if user is null

    setLoading(true);
    fetch(`http://127.0.0.1:5000/educators/students/${user.userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data.students || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
        setLoading(false);
      });
  }, [user?.userId]); // Runs when `user.userId` changes



  // Filter students based on search query and filters
  const filteredStudents = students.filter(
    (student) =>
      (searchQuery === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (courseFilter === "all" || student.program_name === courseFilter) &&
      (statusFilter === "all" || student.status === statusFilter),
  )

  // Get students for different tabs
  const activeStudents = students.filter((student) => student.status === "active")
  const atRiskStudents = students.filter((student) => student.status === "at-risk")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("My Students")}</h2>
          <p className="text-muted-foreground">Manage and track your students' progress</p>
        </div>
        <div className="flex gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Contact All
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setViewMode}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All Students
              <Badge className="ml-2 bg-primary text-primary-foreground">{students.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="active" className="relative">
              Active
              <Badge className="ml-2 bg-green-500 text-white">{activeStudents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="at-risk" className="relative">
              Discontinued
              <Badge className="ml-2 bg-red-500 text-white">{atRiskStudents.length}</Badge>
            </TabsTrigger>
            {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
          </TabsList>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select defaultValue={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Digital Literacy">Digital Literacy</SelectItem>
                <SelectItem value="Microsoft Office">Microsoft Office</SelectItem>
                <SelectItem value="Internet Safety">Internet Safety</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at-risk">Discontinued</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Students</CardTitle>
              <CardDescription>
                Showing {filteredStudents.length} of {students.length} students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredStudents.map((student) => (
                  <StudentRow key={student.student_id} student={student} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
              <CardDescription>Students who are actively engaged and making good progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeStudents
                  .filter(
                    (student) =>
                      (searchQuery === "" ||
                        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
                      (courseFilter === "all" || student.program_name === courseFilter),
                  )
                  .map((student) => (
                    <StudentRow key={student.student_id} student={student} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="at-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>At-Risk Students</CardTitle>
              <CardDescription>Students who need additional support or intervention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {atRiskStudents
                  .filter(
                    (student) =>
                      (searchQuery === "" ||
                        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
                      (courseFilter === "all" || student.program_name === courseFilter),
                  )
                  .map((student) => (
                    <StudentRow key={student.student_id} student={student} />
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intervention Strategies</CardTitle>
              <CardDescription>Recommended approaches for at-risk students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    Low Attendance
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reach out personally to students with attendance below 70%. Schedule one-on-one check-ins to
                    identify barriers to participation.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    Missing Assignments
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send reminder emails for pending assignments. Offer extended deadlines or modified assignments if
                    needed.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    Low Assessment Scores
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Provide additional learning resources and optional review sessions. Consider peer tutoring or
                    supplemental instruction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.length}</div>
                <p className="text-xs text-muted-foreground">Across all your courses</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>8% increase from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeStudents.length}</div>
                <p className="text-xs text-muted-foreground">Students with good progress</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>5% increase from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{atRiskStudents.length}</div>
                <p className="text-xs text-muted-foreground">Students needing intervention</p>
                <div className="mt-2 flex items-center text-xs text-red-500">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  <span>2% decrease from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground">Course completion rate</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>3% increase from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance by Course</CardTitle>
                <CardDescription>Average scores across different courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coursePerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="attendance" name="Attendance %" fill="#8884d8" />
                      <Bar dataKey="assignments" name="Assignments %" fill="#82ca9d" />
                      <Bar dataKey="assessments" name="Assessments %" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Distribution</CardTitle>
                <CardDescription>Students by course and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {studentDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} students`, name]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Progress Over Time</CardTitle>
              <CardDescription>Average completion percentage by week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="digitalLiteracy"
                      name="Digital Literacy"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="msOffice" name="Microsoft Office" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="internetSafety" name="Internet Safety" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Development</CardTitle>
                <CardDescription>Average skill improvement by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={skillDevelopmentData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Before Course" dataKey="before" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                      <Radar name="After Course" dataKey="after" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                      <Legend />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Weekly attendance patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Attendance"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="morningSession"
                        name="Morning Session"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="afternoonSession"
                        name="Afternoon Session"
                        stroke="#82ca9d"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// function StudentRow({ student }: { student: (typeof students)[0] }) {
  function StudentRow({ student }: { student: { student_id: number; name: string; program_id: string; program_name: string; status: string; email: string } }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>"AB"</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{student.name}</div>
          <div className="text-sm text-muted-foreground">{student.email}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div>
          <div className="text-sm font-medium">Course</div>
          <div className="text-sm text-muted-foreground">{student.program_name}</div>
        </div>

        {/* <div>
          <div className="text-sm font-medium">Progress</div>
          <div className="flex items-center gap-2">
            <Progress value={75} className="h-2 w-24" />
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
        </div> */}

        <div>
          <div className="text-sm font-medium">Last Active</div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            Today
          </div>
        </div>

        <div>
          <div className="text-sm font-medium">Status</div>
          <StatusBadge status={student.status} />
        </div>
      </div>

      <div className="flex gap-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/teacher/students/${student.student_id}`}>View Profile</Link>
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
        <Button size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Assignments
        </Button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "active") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        <CheckCircle className="mr-1 h-3 w-3" />
        Active
      </Badge>
    )
  } else if (status === "at-risk") {
    return (
      <Badge variant="destructive">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Discontinued
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline">
        <Clock className="mr-1 h-3 w-3" />
        Inactive
      </Badge>
    )
  }
}

// Sample data
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

// const students = [
//   {
//     id: "1",
//     name: "Arjun Patel",
//     email: "arjun.p@example.com",
//     course: "Digital Literacy",
//     progress: 85,
//     lastActive: "Today",
//     status: "active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "AP",
//   },
//   {
//     id: "2",
//     name: "Meera Singh",
//     email: "meera.s@example.com",
//     course: "Digital Literacy",
//     progress: 72,
//     lastActive: "Yesterday",
//     status: "active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "MS",
//   },
//   {
//     id: "3",
//     name: "Vikram Malhotra",
//     email: "vikram.m@example.com",
//     course: "Digital Literacy",
//     progress: 45,
//     lastActive: "3 days ago",
//     status: "at-risk",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "VM",
//   },
//   {
//     id: "4",
//     name: "Priya Sharma",
//     email: "priya.s@example.com",
//     course: "Microsoft Office",
//     progress: 90,
//     lastActive: "Today",
//     status: "active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "PS",
//   },
//   {
//     id: "5",
//     name: "Rahul Kumar",
//     email: "rahul.k@example.com",
//     course: "Microsoft Office",
//     progress: 60,
//     lastActive: "2 days ago",
//     status: "active",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "RK",
//   },
//   {
//     id: "6",
//     name: "Neha Gupta",
//     email: "neha.g@example.com",
//     course: "Internet Safety",
//     progress: 35,
//     lastActive: "5 days ago",
//     status: "at-risk",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "NG",
//   },
//   {
//     id: "7",
//     name: "Amit Verma",
//     email: "amit.v@example.com",
//     course: "Internet Safety",
//     progress: 20,
//     lastActive: "1 week ago",
//     status: "at-risk",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "AV",
//   },
//   {
//     id: "8",
//     name: "Sanjay Patel",
//     email: "sanjay.p@example.com",
//     course: "Digital Literacy",
//     progress: 10,
//     lastActive: "2 weeks ago",
//     status: "inactive",
//     avatar: "/placeholder.svg?height=40&width=40",
//     initials: "SP",
//   },
// ]

const coursePerformanceData = [
  { name: "Digital Literacy", attendance: 85, assignments: 78, assessments: 82 },
  { name: "Microsoft Office", attendance: 80, assignments: 75, assessments: 78 },
  { name: "Internet Safety", attendance: 75, assignments: 70, assessments: 72 },
]

const studentDistributionData = [
  { name: "Digital Literacy", value: 45 },
  { name: "Microsoft Office", value: 30 },
  { name: "Internet Safety", value: 25 },
]

const progressOverTimeData = [
  { week: "Week 1", digitalLiteracy: 15, msOffice: 20, internetSafety: 10 },
  { week: "Week 2", digitalLiteracy: 30, msOffice: 35, internetSafety: 25 },
  { week: "Week 3", digitalLiteracy: 45, msOffice: 50, internetSafety: 40 },
  { week: "Week 4", digitalLiteracy: 60, msOffice: 65, internetSafety: 55 },
  { week: "Week 5", digitalLiteracy: 75, msOffice: 80, internetSafety: 70 },
  { week: "Week 6", digitalLiteracy: 85, msOffice: 90, internetSafety: 80 },
]

const skillDevelopmentData = [
  { subject: "Computer Basics", before: 30, after: 85 },
  { subject: "Internet Usage", before: 45, after: 90 },
  { subject: "Office Software", before: 20, after: 75 },
  { subject: "Email", before: 40, after: 95 },
  { subject: "Online Safety", before: 25, after: 80 },
  { subject: "Digital Communication", before: 35, after: 85 },
]

const attendanceTrendsData = [
  { week: "Week 1", morningSession: 85, afternoonSession: 80 },
  { week: "Week 2", morningSession: 82, afternoonSession: 78 },
  { week: "Week 3", morningSession: 88, afternoonSession: 82 },
  { week: "Week 4", morningSession: 85, afternoonSession: 80 },
  { week: "Week 5", morningSession: 90, afternoonSession: 85 },
  { week: "Week 6", morningSession: 92, afternoonSession: 88 },
]

