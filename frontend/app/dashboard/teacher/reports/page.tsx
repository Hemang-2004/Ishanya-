"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Plus, Search, Calendar, Download, Eye, Edit } from "lucide-react"
import Link from "next/link"
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

// Mock data for reports
const mockReports = [
  {
    id: "1",
    studentName: "Arjun Patel",
    studentId: "1",
    term: "Term 2",
    date: "Dec 15, 2024",
    status: "completed",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
    program: "Digital Literacy",
  },
  {
    id: "2",
    studentName: "Meera Singh",
    studentId: "2",
    term: "Term 2",
    date: "Dec 14, 2024",
    status: "draft",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
    program: "Digital Literacy",
  },
  {
    id: "3",
    studentName: "Vikram Malhotra",
    studentId: "3",
    term: "Term 2",
    date: "Dec 12, 2024",
    status: "completed",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
    program: "Digital Literacy",
  },
  {
    id: "4",
    studentName: "Rahul Verma",
    studentId: "4",
    term: "Term 1",
    date: "Aug 20, 2024",
    status: "completed",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RV",
    program: "Digital Literacy",
  },
  {
    id: "5",
    studentName: "Neha Gupta",
    studentId: "5",
    term: "Term 1",
    date: "Aug 18, 2024",
    status: "completed",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NG",
    program: "Digital Literacy",
  },
]

// Mock data for students without reports
const studentsWithoutReports = [
  {
    id: "6",
    name: "Ananya Sharma",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AS",
  },
  {
    id: "7",
    name: "Karan Patel",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "KP",
  },
]

// Sample data for charts
const statusDistributionData = [
  { name: "Completed", value: 4 },
  { name: "Draft", value: 1 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

const termComparisonData = [
  { name: "Term 1", reports: 2 },
  { name: "Term 2", reports: 3 },
]

export default function TeacherReportsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [termFilter, setTermFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("reports")

  // Filter reports based on search query and filters
  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesTerm = termFilter === "all" || report.term.toLowerCase().includes(termFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesTerm
  })

  // Filter students without reports based on search query
  const filteredStudentsWithoutReports = studentsWithoutReports.filter((student) => {
    return student.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Assessment Reports</h2>
          <p className="text-muted-foreground">Manage and create student assessment reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button onClick={() => router.push("/dashboard/teacher/reports/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports by Status</CardTitle>
            <CardDescription>Distribution of report completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports by Term</CardTitle>
            <CardDescription>Comparison of reports across different terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={termComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="reports" name="Number of Reports" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="w-full bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={termFilter} onValueChange={setTermFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              <SelectItem value="term 1">Term 1</SelectItem>
              <SelectItem value="term 2">Term 2</SelectItem>
              <SelectItem value="term 3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="reports" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">Existing Reports</TabsTrigger>
          <TabsTrigger value="students">Students Without Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Reports</CardTitle>
              <CardDescription>View and manage student assessment reports</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredReports.length > 0 ? (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={report.avatar} />
                          <AvatarFallback>{report.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{report.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {report.term} • {report.date} • {report.program}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status === "completed" ? "Completed" : "Draft"}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/teacher/reports/view/${report.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/teacher/reports/edit/${report.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No reports found</h3>
                  <p className="text-muted-foreground mt-1">
                    No reports match your search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students Without Reports</CardTitle>
              <CardDescription>Create assessment reports for these students</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredStudentsWithoutReports.length > 0 ? (
                <div className="space-y-4">
                  {filteredStudentsWithoutReports.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.program}</p>
                        </div>
                      </div>
                      <Button size="sm" asChild>
                        <Link
                          href={`/dashboard/teacher/reports/create?studentId=${student.id}&studentName=${student.name}`}
                        >
                          Create Report
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">All students have reports</h3>
                  <p className="text-muted-foreground mt-1">All students currently have assessment reports created.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Report Deadlines</CardTitle>
          <CardDescription>Reports that need to be completed soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Term 3 Assessment Reports</div>
                <div className="text-sm text-muted-foreground">All students</div>
              </div>
              <div className="text-right">
                <div className="font-medium">June 15, 2025</div>
                <div className="text-sm text-muted-foreground">30 days remaining</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Final Assessment Reports</div>
                <div className="text-sm text-muted-foreground">Digital Literacy Program</div>
              </div>
              <div className="text-right">
                <div className="font-medium">July 30, 2025</div>
                <div className="text-sm text-muted-foreground">75 days remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

