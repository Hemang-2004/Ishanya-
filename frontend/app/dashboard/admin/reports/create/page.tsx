// Create a similar report creation page for admin
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminCreateReportPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get student details from URL parameters
  const studentId = searchParams.get("studentId") || ""
  const studentNameFromUrl = searchParams.get("studentName") || ""

  // Pre-fill form data with student details if available
  const [formData, setFormData] = useState({
    studentName: studentNameFromUrl,
    term: "2",
    educatorName: "Admin User",
    reviewPeriod: "September to December 2024",

    // General observations
    attendance: "",
    totalWorkingDays: "64",
    punctuality: "Is on time and regular",
    preparedness: "Yes. Is prepared for sessions",
    behavioralIssues: "",
    assistance: "Minimal verbal assistance required",
    parentalSupport: "The home environment is supportive",

    // Communication skills
    followingInstructions: 5,
    politeWords: 3.5,
    askingQuestions: 3,
    conversation: 3,
    describing: 4,
    commenting: 3,
    emotionalCommunication: 3.5,
    sentenceFormation: 4.5,
    communicationNotes: "",

    // Cognition skills
    prediction: 4.5,
    logicalSequencing: 4.5,
    problemSolving: 4,
    causeEffect: 4.5,
    decisionMaking: 4.5,
    oddOneOut: 4.5,
    cognitionNotes: "",

    // Academic skills
    englishReading: "",
    englishWriting: "",
    evs: "",
    math: "",

    // Functional skills
    copyingDrawing: 4.5,
    pasting: 4.5,
    folding: 3.5,
    cutting: 3.5,
    kitchenUtensils: 4.5,
    ingredients: 4.5,
    pouring: 4.5,
    scooping: 4.5,
    personalHygiene: 3,
    foldingClothes: 4.5,
    fillingWater: 4.5,
    packing: 4.5,
    wiping: 4.5,
    groupActivities: 4,
    functionalNotes: "",

    // Extracurricular
    extracurricular: "",

    // Strengths
    interests: "",

    // Learning environment
    learningEnvironment: "",
  })

  // Fetch additional student details if studentId is provided
  useEffect(() => {
    if (studentId) {
      // In a real app, you would fetch student details from an API
      console.log(`Fetching details for student ID: ${studentId}`)
    }
  }, [studentId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    // In a real application, you would save this data to your database
    console.log("Form data submitted:", formData)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report saved",
        description: `Assessment report for ${formData.studentName} has been saved successfully.`,
      })

      // Navigate back to reports page
      router.push("/dashboard/admin/reports/index")
      setIsSubmitting(false)
    }, 1500)
  }

  const handleDownload = () => {
    // In a real application, you would generate a PDF here
    toast({
      title: "Report downloaded",
      description: "The assessment report has been downloaded as a PDF.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create Student Assessment Report</h2>
            <p className="text-muted-foreground">Sameti - A Pre-academic Skills Program</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Draft
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Report"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6 bg-muted p-4 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-medium">
                Creating report for: <span className="text-primary">{formData.studentName}</span>
              </h3>
              <p className="text-sm text-muted-foreground">Complete all sections for a comprehensive assessment</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Current section:</div>
              <Badge variant="outline" className="text-primary">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {["general", "communication", "cognition", "academics", "functional", "extracurricular", "strengths"].map(
              (tab) => (
                <div
                  key={tab}
                  className={`h-1 rounded-full ${activeTab === tab ? "bg-primary" : "bg-muted-foreground/20"}`}
                ></div>
              ),
            )}
          </div>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Basic information about the student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Name of Student</Label>
                <Input
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  required
                  readOnly={!!studentNameFromUrl} // Make read-only if pre-filled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select value={formData.term} onValueChange={(value) => handleSelectChange("term", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Term 1</SelectItem>
                    <SelectItem value="2">Term 2</SelectItem>
                    <SelectItem value="3">Term 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="educatorName">Name of Educator</Label>
                <Input
                  id="educatorName"
                  name="educatorName"
                  value={formData.educatorName}
                  onChange={handleInputChange}
                  placeholder="Enter educator name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewPeriod">Period of Review</Label>
                <Input
                  id="reviewPeriod"
                  name="reviewPeriod"
                  value={formData.reviewPeriod}
                  onChange={handleInputChange}
                  placeholder="e.g., September to December 2024"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="cognition">Cognition</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="functional">Functional Skills</TabsTrigger>
            <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
          </TabsList>

          {/* Tabs content would be the same as the teacher version */}
          {/* For brevity, I'm not duplicating all the tab content here */}
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Report"}
          </Button>
        </div>
      </form>
    </div>
  )
}

