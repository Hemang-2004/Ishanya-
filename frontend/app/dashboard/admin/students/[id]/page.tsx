"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, MessageSquare, Phone, Mail, MapPin, Download, Upload, ArrowLeft, Edit, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"

// Mock student data
const studentsData = {
  "1": {
    id: "1",
    name: "Arjun Patel",
    email: "arjun.p@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "AP",
    dateOfBirth: "2005-05-15",
    gender: "Male",
    guardianName: "Rajesh Patel",
    guardianContact: "+91 9876543211",
    program: "Digital Literacy",
    status: "Active",
    progress: 85,
    joined: "Jan 15, 2023",
    teacher: "Priya Sharma",
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
    feedback: [
      {
        id: 1,
        date: "Mar 10, 2023",
        teacher: "Priya Sharma",
        assignment: "Word Document Formatting",
        content:
          "Excellent work on formatting. Your document was well-structured and followed all requirements. Keep up the good work!",
      },
      {
        id: 2,
        date: "Feb 25, 2023",
        teacher: "Priya Sharma",
        assignment: "Module 1 Assessment",
        content: "Good understanding of basic computer concepts. You've made great progress in a short time.",
      },
    ],
  },
  // More students would be defined here
}

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const studentId = params.id as string
  const student = studentsData[studentId]

  const [isEditing, setIsEditing] = useState(false)
  const [editedStudent, setEditedStudent] = useState(student)
  const [feedbackText, setFeedbackText] = useState("")
  const [noteText, setNoteText] = useState("")

  if (!student) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Student Not Found</h2>
          <p className="text-muted-foreground mt-2">The student you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.push("/dashboard/admin/students")}>
            Back to Students
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedStudent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    // In a real app, you would send this to an API
    toast({
      title: "Changes saved",
      description: "Student information has been updated successfully.",
    })
    setIsEditing(false)
  }

  const handleAddFeedback = () => {
    if (feedbackText.trim() === "") return

    // In a real app, you would send this to an API
    toast({
      title: "Feedback added",
      description: "Your feedback has been added to the student's record.",
    })
    setFeedbackText("")
  }

  const handleAddNote = () => {
    if (noteText.trim() === "") return

    // In a real app, you would send this to an API
    toast({
      title: "Note added",
      description: "Your note has been added to the student's record.",
    })
    setNoteText("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Student Profile</h2>
            <p className="text-muted-foreground">View and manage student information</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={student.avatar} />
          <AvatarFallback>{student.initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant={getStatusBadgeVariant(student.status)}>{student.status}</Badge>
            <Badge variant="outline">{student.program}</Badge>
          </div>
          <p className="text-muted-foreground">Student ID: {student.id}</p>
          <p className="text-muted-foreground">Joined: {student.joined}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Info */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            {!isEditing && <CardDescription>Basic details about the student</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={editedStudent.name.split(" ")[0]}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={editedStudent.name.split(" ")[1] || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedStudent.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={editedStudent.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={editedStudent.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={editedStudent.gender.toLowerCase()}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" value={editedStudent.address} onChange={handleInputChange} />
                </div>
              </div>
            ) : (
              <>
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
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span>{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Gender:</span>
                  <span>{student.gender}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Guardian:</span>
                  <span>{student.guardianName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Guardian Contact:</span>
                  <span>{student.guardianContact}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Program Info */}
        <Card>
          <CardHeader>
            <CardTitle>Program Information</CardTitle>
            {!isEditing && <CardDescription>Current program and progress</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Select
                    value={editedStudent.program.toLowerCase().replace(/\s+/g, "-")}
                    onValueChange={(value) => handleSelectChange("program", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-literacy">Digital Literacy</SelectItem>
                      <SelectItem value="vocational-training">Vocational Training</SelectItem>
                      <SelectItem value="community-leadership">Community Leadership</SelectItem>
                      <SelectItem value="health-wellness">Health & Wellness</SelectItem>
                      <SelectItem value="financial-literacy">Financial Literacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedStudent.status.toLowerCase()}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher">Assigned Teacher</Label>
                  <Select
                    value={editedStudent.teacher.toLowerCase().replace(/\s+/g, "-")}
                    onValueChange={(value) => handleSelectChange("teacher", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priya-sharma">Priya Sharma</SelectItem>
                      <SelectItem value="rahul-verma">Rahul Verma</SelectItem>
                      <SelectItem value="anita-desai">Anita Desai</SelectItem>
                      <SelectItem value="vikram-malhotra">Vikram Malhotra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Program:</span>
                    <span>{student.program}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-muted-foreground">Teacher:</span>
                    <span>{student.teacher}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={getStatusBadgeVariant(student.status)}>{student.status}</Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Module Progress</h4>
                  <div className="space-y-3">
                    {student.courses[0].modules.map((module, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">{module.name}</div>
                          <div className="text-sm text-muted-foreground">{module.progress}%</div>
                        </div>
                        <Progress value={module.progress} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Notes & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Notes & Actions</CardTitle>
            <CardDescription>Add notes or take actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Add Note</Label>
              <Textarea
                id="notes"
                placeholder="Add a note about this student..."
                className="min-h-[100px]"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <Button className="w-full mt-2" onClick={handleAddNote} disabled={!noteText.trim()}>
                Add Note
              </Button>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Current Notes</h4>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">{student.notes}</p>
                <p className="text-xs text-muted-foreground mt-1">Added by Admin</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Progress Report
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Student
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Student Records
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Track student assignments and submissions</CardDescription>
            </CardHeader>
            <CardContent>
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

              <div className="flex justify-end mt-4">
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Assign New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Track student attendance records</CardDescription>
            </CardHeader>
            <CardContent>
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

              <div className="flex justify-end mt-4">
                <Button className="bg-secondary hover:bg-secondary/90">Record Attendance</Button>
              </div>
            </CardContent>
          </Card>
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
                  onClick={handleAddFeedback}
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
              {student.feedback.map((item) => (
                <div key={item.id} className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{item.assignment}</div>
                    <div className="text-sm text-muted-foreground">{item.date}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">By: {item.teacher}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Documents</CardTitle>
              <CardDescription>View and manage student documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">ID Proof (Aadhar Card)</div>
                        <div className="text-sm text-muted-foreground">Uploaded on Jan 15, 2023</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">School Certificate</div>
                        <div className="text-sm text-muted-foreground">Uploaded on Jan 15, 2023</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Registration Form</div>
                        <div className="text-sm text-muted-foreground">Uploaded on Jan 15, 2023</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function for status badge variant
function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "success"
    case "Inactive":
      return "destructive"
    case "Graduated":
      return "secondary"
    default:
      return "outline"
  }
}

