"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, Eye, PlusCircle, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function TeacherReportsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("pending")

  // Filter function for feedback items
  const filteredItems = feedbackItems.filter((item) => {
    // Filter by search term
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignment.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by type
    const matchesType =
      selectedType === "all" ||
      (selectedType === "pending" && !item.hasReport) ||
      (selectedType === "completed" && item.hasReport)

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Feedback</h2>
          <p className="text-muted-foreground">Provide feedback on student assignments and assessments</p>
        </div>
        <Button
          className="bg-secondary hover:bg-secondary/90"
          onClick={() => router.push("/dashboard/teacher/reports")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Manage Assessment Reports
        </Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Student Assessment Reports</h2>
        <p className="text-muted-foreground">Create and manage assessment reports for your students</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Reports</CardTitle>
          <CardDescription>Create new reports or view existing ones for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="space-y-4" onValueChange={setSelectedType}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Needs Report</TabsTrigger>
                <TabsTrigger value="completed">Has Report</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
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

            <div className="rounded-md border">
              <div className="p-4 border-b bg-muted/50 flex items-center">
                <div className="w-1/3 font-medium">Student</div>
                <div className="w-1/3 font-medium">Program</div>
                <div className="w-1/6 font-medium">Status</div>
                <div className="w-1/6 font-medium text-right">Action</div>
              </div>

              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id} className="p-4 border-b flex items-center">
                    <div className="w-1/3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback>{item.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.studentName}</div>
                          <div className="text-sm text-muted-foreground">{item.course}</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="font-medium">{item.assignment}</div>
                      <div className="text-sm text-muted-foreground">{item.type}</div>
                    </div>
                    <div className="w-1/6">
                      <div>
                        <Badge variant={item.hasReport ? "secondary" : "outline"}>
                          {item.hasReport ? "Has Report" : "Needs Report"}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-1/6 text-right">
                      {item.hasReport ? (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/dashboard/teacher/reports/view/${item.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-secondary hover:bg-secondary/90"
                          onClick={() =>
                            router.push(
                              `/dashboard/teacher/reports/create?studentId=${item.id}&studentName=${encodeURIComponent(item.studentName)}`,
                            )
                          }
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Create Report
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">No students found matching your filters.</div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently created or updated assessment reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {report.studentName} - {report.term}
                    </div>
                    <div className="text-sm text-muted-foreground">Created on {report.date}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/teacher/reports/view/${report.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/teacher/reports">View All Reports</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const feedbackItems = [
  {
    id: "1",
    studentName: "Arjun Patel",
    course: "Digital Literacy",
    assignment: "Digital Literacy Program",
    type: "Term 2",
    submittedDate: "Mar 20, 2023",
    hasReport: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "2",
    studentName: "Meera Singh",
    course: "Digital Literacy",
    assignment: "Digital Literacy Program",
    type: "Term 2",
    submittedDate: "Mar 19, 2023",
    hasReport: false,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: "3",
    studentName: "Vikram Malhotra",
    course: "Digital Literacy",
    assignment: "Digital Literacy Program",
    type: "Term 2",
    submittedDate: "Mar 15, 2023",
    hasReport: false,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
  {
    id: "4",
    studentName: "Rahul Verma",
    course: "Digital Literacy",
    assignment: "Digital Literacy Program",
    type: "Term 1",
    submittedDate: "Mar 10, 2023",
    hasReport: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RV",
  },
  {
    id: "5",
    studentName: "Neha Gupta",
    course: "Digital Literacy",
    assignment: "Digital Literacy Program",
    type: "Term 1",
    submittedDate: "Mar 5, 2023",
    hasReport: true,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NG",
  },
]

// Sample data for recent reports
const recentReports = [
  {
    id: "1",
    studentName: "Arjun Patel",
    term: "Term 2",
    date: "Dec 15, 2024",
  },
  {
    id: "4",
    studentName: "Rahul Verma",
    term: "Term 1",
    date: "Aug 20, 2024",
  },
  {
    id: "5",
    studentName: "Neha Gupta",
    term: "Term 1",
    date: "Aug 18, 2024",
  },
]

