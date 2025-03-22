"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, MessageSquare, Phone, Mail, MapPin, Send, Download, Upload } from "lucide-react"
import Link from "next/link"

// Mock student data
const studentsData = {
  "arjun-patel": {
    id: "arjun-patel",
    name: "Arjun Patel",
    email: "arjun.p@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "AP",
    courses: [
      {
        name: "Digital Literacy",
        progress: 85,
        modules: [
          { name: "Introduction to Computers", progress: 100, status: "completed" },
          { name: "Internet Basics", progress: 100, status: "completed" },
          { name: "Microsoft Office", progress: 90, status: "in-progress" },
          { name: "Email and Communication", progress: 80, status: "in-progress" },
          { name: "Online Safety", progress: 60, status: "in-progress" },
        ],
      },
    ],
    assignments: [
      { id: 1, title: "Excel Formulas Practice", dueDate: "Mar 25, 2023", status: "submitted", grade: "Pending" },
      { id: 2, title: "PowerPoint Presentation", dueDate: "Apr 5, 2023", status: "pending", grade: "N/A" },
      { id: 3, title: "Word Document Formatting", dueDate: "Mar 10, 2023", status: "completed", grade: "A" },
    ],
    attendance: [
      { date: "Mar 20, 2023", status: "present" },
      { date: "Mar 18, 2023", status: "present" },
      { date: "Mar 15, 2023", status: "absent" },
      { date: "Mar 13, 2023", status: "present" },
      { date: "Mar 10, 2023", status: "present" },
    ],
    notes:
      "Arjun is a dedicated student who shows great interest in learning digital skills. He needs some extra help with Excel formulas.",
  },
  // More students would be defined here
}

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params.id as string
  const student = studentsData[studentId]

  const [feedbackText, setFeedbackText] = useState("")
  const [messageText, setMessageText] = useState("")

  if (!student) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Student Not Found</h2>
          <p className="text-muted-foreground mt-2">The student you're looking for doesn't exist.</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/teacher/students">Back to Students</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleSendFeedback = () => {
    if (feedbackText.trim() === "") return
    // In a real app, you would send this to an API
    console.log("Sending feedback:", feedbackText)
    setFeedbackText("")
  }

  const handleSendMessage = () => {
    if (messageText.trim() === "") return
    // In a real app, you would send this to an API
    console.log("Sending message:", messageText)
    setMessageText("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.avatar} />
            <AvatarFallback>{student.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{student.name}</h2>
            <p className="text-muted-foreground">Digital Literacy Student</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90">
            <FileText className="h-4 w-4" />
            Add Feedback
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Info */}
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{student.address}</span>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Teacher Notes</h4>
              <p className="text-sm text-muted-foreground">{student.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Digital Literacy - Overall Progress: 85%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={85} className="h-2" />

            <div className="space-y-3">
              {student.courses[0].modules.map((module, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{module.name}</div>
                    <div className="text-sm text-muted-foreground">{module.progress}%</div>
                  </div>
                  <Progress value={module.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
              <div className="font-medium">Assignment</div>
              <div className="flex gap-4">
                <div className="font-medium text-sm">Due Date</div>
                <div className="font-medium text-sm">Status</div>
                <div className="font-medium text-sm">Grade</div>
                <div className="w-24 text-right font-medium text-sm">Action</div>
              </div>
            </div>

            {student.assignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>{assignment.title}</div>
                </div>
                <div className="flex gap-4">
                  <div className="text-sm w-24">{assignment.dueDate}</div>
                  <div className="text-sm w-24">
                    <Badge
                      variant={
                        assignment.status === "completed"
                          ? "success"
                          : assignment.status === "submitted"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="text-sm w-24">{assignment.grade}</div>
                  <div className="w-24 text-right">
                    <Button size="sm" variant="outline" className="h-8">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button className="bg-secondary hover:bg-secondary/90">
              <Upload className="h-4 w-4 mr-2" />
              Assign New Task
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
              <div className="font-medium">Date</div>
              <div className="font-medium">Status</div>
            </div>

            {student.attendance.map((record, index) => (
              <div key={index} className="p-4 border-b flex items-center justify-between">
                <div>{record.date}</div>
                <div>
                  <Badge variant={record.status === "present" ? "success" : "destructive"}>
                    {record.status === "present" ? "Present" : "Absent"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button className="bg-secondary hover:bg-secondary/90">Record Attendance</Button>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provide Feedback</CardTitle>
              <CardDescription>
                Add feedback for {student.name} that will be visible to them and other teachers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Enter your feedback here..."
                  className="min-h-[120px]"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={handleSendFeedback}
                  disabled={!feedbackText.trim()}
                >
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Digital Literacy - Module 2 Assessment</div>
                  <div className="text-sm text-muted-foreground">Mar 10, 2023</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Arjun has shown excellent progress in understanding the basics of Microsoft Word. His document
                  formatting assignment was well-structured and followed all the requirements. He demonstrates good
                  attention to detail and is quick to apply new concepts.
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Digital Literacy - Module 1 Assessment</div>
                  <div className="text-sm text-muted-foreground">Feb 25, 2023</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Arjun completed the Introduction to Computers module with a strong understanding of hardware and
                  software concepts. He actively participated in class discussions and helped other students. Areas for
                  improvement include time management during practical exercises.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
              <CardDescription>Send a direct message to {student.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-[120px]"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex max-w-[80%] rounded-lg p-3 bg-muted">
                <div>
                  <div className="text-sm">
                    Hello Arjun! How are you progressing with your digital literacy assignment?
                  </div>
                  <div className="text-xs mt-1 opacity-70 text-right">10:30 AM</div>
                </div>
              </div>

              <div className="flex max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground ml-auto">
                <div>
                  <div className="text-sm">
                    Hi Ms. Sharma! I've completed most of it, but I'm having trouble with the Excel formulas section.
                  </div>
                  <div className="text-xs mt-1 opacity-70 text-right">10:35 AM</div>
                </div>
              </div>

              <div className="flex max-w-[80%] rounded-lg p-3 bg-muted">
                <div>
                  <div className="text-sm">
                    That's a common challenge. Would you like me to schedule a quick one-on-one session to go through
                    it?
                  </div>
                  <div className="text-xs mt-1 opacity-70 text-right">10:38 AM</div>
                </div>
              </div>

              <div className="flex max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground ml-auto">
                <div>
                  <div className="text-sm">That would be really helpful! When are you available?</div>
                  <div className="text-xs mt-1 opacity-70 text-right">10:40 AM</div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Full Conversation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

