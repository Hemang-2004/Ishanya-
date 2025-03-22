"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, CheckCircle, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TeacherFeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("pending")
  const [feedbackText, setFeedbackText] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof feedbackItems)[0] | null>(null)

  // Filter function for feedback items
  const filteredItems = feedbackItems.filter((item) => {
    // Filter by search term
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignment.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by type
    const matchesType =
      selectedType === "all" ||
      (selectedType === "pending" && item.status === "pending") ||
      (selectedType === "completed" && item.status === "completed")

    return matchesSearch && matchesType
  })

  const handleOpenFeedback = (item: (typeof feedbackItems)[0]) => {
    setSelectedStudent(item)
    setFeedbackText("")
  }

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim() || !selectedStudent) return

    // In a real app, you would send this to an API
    console.log("Submitting feedback for:", selectedStudent.studentName)
    console.log("Feedback:", feedbackText)

    // Reset the form
    setFeedbackText("")
    setSelectedStudent(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Student Feedback</h2>
        <p className="text-muted-foreground">Provide feedback on student assignments and assessments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Queue</CardTitle>
          <CardDescription>Assignments and assessments that need your feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="space-y-4" onValueChange={setSelectedType}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students or assignments..."
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
                <div className="w-1/3 font-medium">Assignment</div>
                <div className="w-1/6 font-medium">Submitted</div>
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
                      <div>{item.submittedDate}</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant={item.status === "pending" ? "outline" : "secondary"}>
                          {item.status === "pending" ? "Pending" : "Completed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-1/6 text-right">
                      {item.status === "pending" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-secondary hover:bg-secondary/90"
                              onClick={() => handleOpenFeedback(item)}
                            >
                              Provide Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Provide Feedback</DialogTitle>
                              <DialogDescription>
                                Add feedback for {selectedStudent?.studentName}'s {selectedStudent?.assignment}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-md">
                                <Avatar>
                                  <AvatarImage src={selectedStudent?.avatar} />
                                  <AvatarFallback>{selectedStudent?.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{selectedStudent?.studentName}</div>
                                  <div className="text-sm text-muted-foreground">{selectedStudent?.assignment}</div>
                                </div>
                                <Button variant="outline" size="sm" className="ml-auto">
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Submission
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="grade">Grade</Label>
                                <Select defaultValue="a">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="a">A (Excellent)</SelectItem>
                                    <SelectItem value="b">B (Good)</SelectItem>
                                    <SelectItem value="c">C (Satisfactory)</SelectItem>
                                    <SelectItem value="d">D (Needs Improvement)</SelectItem>
                                    <SelectItem value="f">F (Unsatisfactory)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="feedback">Feedback</Label>
                                <Textarea
                                  id="feedback"
                                  placeholder="Provide detailed feedback on the student's work..."
                                  className="min-h-[150px]"
                                  value={feedbackText}
                                  onChange={(e) => setFeedbackText(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button
                                className="bg-secondary hover:bg-secondary/90"
                                onClick={handleSubmitFeedback}
                                disabled={!feedbackText.trim()}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Submit Feedback
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button variant="outline" size="sm">
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No feedback items found matching your filters.
                </div>
              )}
            </div>
          </Tabs>
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
    assignment: "Excel Formulas Practice",
    type: "Assignment",
    submittedDate: "Mar 20, 2023",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "2",
    studentName: "Meera Singh",
    course: "Digital Literacy",
    assignment: "Module 3 Assessment",
    type: "Quiz",
    submittedDate: "Mar 19, 2023",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: "3",
    studentName: "Vikram Malhotra",
    course: "Digital Literacy",
    assignment: "Module 2 Assessment",
    type: "Quiz",
    submittedDate: "Mar 15, 2023",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
  {
    id: "4",
    studentName: "Arjun Patel",
    course: "Digital Literacy",
    assignment: "Word Document Formatting",
    type: "Assignment",
    submittedDate: "Mar 10, 2023",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "5",
    studentName: "Meera Singh",
    course: "Digital Literacy",
    assignment: "Module 1 Assessment",
    type: "Quiz",
    submittedDate: "Mar 5, 2023",
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
]

