"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Search, Plus, FileText, Download, Eye, Filter } from "lucide-react"
import Link from "next/link"

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Filter assignments based on search term and status
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || assignment.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Assignments</h2>
          <p className="text-muted-foreground">Create, manage, and grade student assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Management</CardTitle>
          <CardDescription>View and manage all assignments across your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedStatus}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assignments..."
                    className="pl-8 w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.length > 0 ? (
                      filteredAssignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">{assignment.description}</div>
                          </TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(assignment.status)}>{assignment.status}</Badge>
                          </TableCell>
                          <TableCell>{assignment.submissions}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No assignments found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments
                      .filter((assignment) => assignment.status === "Pending")
                      .map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">{assignment.description}</div>
                          </TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{assignment.submissions}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="graded">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead>Avg. Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments
                      .filter((assignment) => assignment.status === "Graded")
                      .map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">{assignment.description}</div>
                          </TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{assignment.submissions}</TableCell>
                          <TableCell>{assignment.avgGrade || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="overdue">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead>Missing</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments
                      .filter((assignment) => assignment.status === "Overdue")
                      .map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">{assignment.description}</div>
                          </TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{assignment.submissions}</TableCell>
                          <TableCell>{assignment.missing || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/teacher/assignments/${assignment.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Latest assignment submissions from students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src={submission.avatar} />
                  <AvatarFallback>{submission.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{submission.studentName}</div>
                    <div className="text-sm text-muted-foreground">{submission.submittedAt}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Submitted: <span className="font-medium">{submission.assignmentTitle}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{submission.fileName}</span>
                  </div>
                </div>
                <Button size="sm">Grade</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for status badge variant
function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Pending":
      return "warning"
    case "Graded":
      return "success"
    case "Overdue":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const assignments = [
  {
    id: "1",
    title: "Digital Literacy Module 3 Assessment",
    description: "Complete the practical assessment for Module 3",
    course: "Digital Literacy Fundamentals",
    dueDate: "Jun 20, 2023",
    status: "Pending",
    submissions: "8/12",
  },
  {
    id: "2",
    title: "Excel Formulas Project",
    description: "Create a budget spreadsheet using Excel formulas",
    course: "Microsoft Office Essentials",
    dueDate: "Jun 15, 2023",
    status: "Graded",
    submissions: "8/8",
    avgGrade: "85%",
  },
  {
    id: "3",
    title: "Internet Safety Research Paper",
    description: "Write a 2-page paper on internet safety best practices",
    course: "Internet Safety & Security",
    dueDate: "Jun 10, 2023",
    status: "Overdue",
    submissions: "3/4",
    missing: "1",
  },
  {
    id: "4",
    title: "Digital Literacy Module 2 Assessment",
    description: "Complete the practical assessment for Module 2",
    course: "Digital Literacy Fundamentals",
    dueDate: "May 30, 2023",
    status: "Graded",
    submissions: "12/12",
    avgGrade: "92%",
  },
  {
    id: "5",
    title: "PowerPoint Presentation",
    description: "Create a presentation about a topic of your choice",
    course: "Microsoft Office Essentials",
    dueDate: "Jun 25, 2023",
    status: "Pending",
    submissions: "2/8",
  },
]

const submissions = [
  {
    id: "1",
    studentName: "Arjun Patel",
    assignmentTitle: "Digital Literacy Module 3 Assessment",
    submittedAt: "Today, 10:30 AM",
    fileName: "module3_assessment.pdf",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "2",
    studentName: "Meera Singh",
    assignmentTitle: "Excel Formulas Project",
    submittedAt: "Yesterday, 3:45 PM",
    fileName: "budget_spreadsheet.xlsx",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: "3",
    studentName: "Vikram Malhotra",
    assignmentTitle: "PowerPoint Presentation",
    submittedAt: "Today, 9:15 AM",
    fileName: "final_presentation.pptx",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
]

