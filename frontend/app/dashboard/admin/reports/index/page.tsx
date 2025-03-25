"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search, Download, Eye, Edit, Calendar, BarChart3, PieChart } from "lucide-react"
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

// Sample data for reports
const reports = [
  {
    id: "1",
    studentName: "Arjun Patel",
    studentId: "ST001",
    term: "Term 2",
    date: "Dec 15, 2024",
    status: "completed",
    educator: "Priya Sharma",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "2",
    studentName: "Meera Singh",
    studentId: "ST002",
    term: "Term 2",
    date: "Dec 14, 2024",
    status: "draft",
    educator: "Priya Sharma",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: "3",
    studentName: "Vikram Malhotra",
    studentId: "ST003",
    term: "Term 2",
    date: "Dec 12, 2024",
    status: "completed",
    educator: "Priya Sharma",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
  {
    id: "4",
    studentName: "Rahul Verma",
    studentId: "ST004",
    term: "Term 1",
    date: "Aug 20, 2024",
    status: "completed",
    educator: "Priya Sharma",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RV",
  },
  {
    id: "5",
    studentName: "Neha Gupta",
    studentId: "ST005",
    term: "Term 1",
    date: "Aug 18, 2024",
    status: "completed",
    educator: "Priya Sharma",
    program: "Digital Literacy",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NG",
  },
  {
    id: "6",
    studentName: "Ananya Sharma",
    studentId: "ST006",
    term: "Term 1",
    date: "Aug 15, 2024",
    status: "completed",
    educator: "Rahul Verma",
    program: "Communication Skills",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AS",
  },
  {
    id: "7",
    studentName: "Karan Patel",
    studentId: "ST007",
    term: "Term 1",
    date: "Aug 10, 2024",
    status: "completed",
    educator: "Anita Desai",
    program: "Life Skills",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "KP",
  },
]

// Sample data for charts
const programDistributionData = [
  { name: "Digital Literacy", value: 5 },
  { name: "Communication Skills", value: 1 },
  { name: "Life Skills", value: 1 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

const termComparisonData = [
  { name: "Term 1", reports: 4 },
  { name: "Term 2", reports: 3 },
]

export default function AdminReportsIndexPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [termFilter, setTermFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.educator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesTerm = termFilter === "all" || report.term === termFilter
    const matchesProgram = programFilter === "all" || report.program === programFilter

    return matchesSearch && matchesStatus && matchesTerm && matchesProgram
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Assessment Reports</h2>
          <p className="text-muted-foreground">Manage and view all student assessment reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button asChild>
            <Link href="/dashboard/admin/reports/create">
              <Plus className="mr-2 h-4 w-4" />
              Create New Report
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports by Program</CardTitle>
            <CardDescription>Distribution of reports across different programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={programDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {programDistributionData.map((entry, index) => (
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
            <div className="h-[300px]">
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

      <Card>
        <CardHeader>
          <CardTitle>All Assessment Reports</CardTitle>
          <CardDescription>View and manage student assessment reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="w-full bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="Digital Literacy">Digital Literacy</SelectItem>
                  <SelectItem value="Communication Skills">Communication Skills</SelectItem>
                  <SelectItem value="Life Skills">Life Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Educator</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={report.avatar} />
                                <AvatarFallback>{report.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{report.studentName}</div>
                                <div className="text-sm text-muted-foreground">{report.studentId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{report.program}</TableCell>
                          <TableCell>{report.term}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                              {report.status === "completed" ? "Completed" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.educator}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/admin/reports/student/${report.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/admin/reports/edit/${report.id}`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No reports found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={report.avatar} />
                              <AvatarFallback>{report.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{report.studentName}</CardTitle>
                              <CardDescription>{report.studentId}</CardDescription>
                            </div>
                          </div>
                          <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                            {report.status === "completed" ? "Completed" : "Draft"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Program:</span>
                            <span className="font-medium">{report.program}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Term:</span>
                            <span className="font-medium">{report.term}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{report.date}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Educator:</span>
                            <span className="font-medium">{report.educator}</span>
                          </div>
                        </div>
                      </CardContent>
                      <div className="p-4 pt-0 flex justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/admin/reports/student/${report.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/admin/reports/edit/${report.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center p-8 border rounded-lg">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No reports found</h3>
                      <p className="text-muted-foreground mb-4">No reports match your current filters.</p>
                      <Button
                        onClick={() => {
                          setSearchTerm("")
                          setStatusFilter("all")
                          setTermFilter("all")
                          setProgramFilter("all")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports Calendar</CardTitle>
            <CardDescription>Upcoming and recent assessment reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Term 3 Assessments Due</div>
                  <div className="text-sm text-muted-foreground">All programs</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">June 15, 2025</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Final Assessments Due</div>
                  <div className="text-sm text-muted-foreground">Digital Literacy Program</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">July 30, 2025</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Analytics</CardTitle>
            <CardDescription>Key metrics and insights from assessment reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">Total Reports</span>
                </div>
                <div className="text-3xl font-bold">7</div>
              </div>

              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Completion Rate</span>
                </div>
                <div className="text-3xl font-bold">85.7%</div>
              </div>

              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Average Score</span>
                </div>
                <div className="text-3xl font-bold">78%</div>
              </div>

              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Pending Reports</span>
                </div>
                <div className="text-3xl font-bold">1</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

