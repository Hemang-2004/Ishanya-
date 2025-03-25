"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { setUserData, getUserData, clearUserData } from "@/utils/auth"


export default function CreateReportPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<{ userId: string; userName: string; role: string } | null>(null)
  
  // Get student details from URL parameters
  const studentId = searchParams.get("studentId") || ""
  const studentNameFromUrl = searchParams.get("studentName") || ""
  
  // Pre-fill form data with student details if available
  
  useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setUser(storedUser);
      console.log("User ID here:", storedUser.userId);
    } else {
      console.log("No user data found");
    }
  }, []);
  const [formData, setFormData] = useState({
    studentName: studentNameFromUrl,
    term: "",
    educatorName: "",
    reviewPeriod: "",

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
      // For now, we'll just use the student name from the URL
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

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   setIsSubmitting(true)

  //   // In a real application, you would save this data to your database
  //   console.log("Form data submitted:", formData)

  //   // Simulate API call
  //   setTimeout(() => {
  //     toast({
  //       title: "Report saved",
  //       description: `Assessment report for ${formData.studentName} has been saved successfully.`,
  //     })

  //     // Navigate back to reports page
  //     router.push("/dashboard/teacher/feedback")
  //     setIsSubmitting(false)
  //   }, 1500)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Construct the request payload
    const payload = {
      StudentID: studentId, // Ensure this is provided
      EducatorID: user?.userId, // Replace with actual logged-in educator's ID
      Comments: formData.learningEnvironment, // Or any relevant field
      TPS: 5, // Example logic
      Attendance: parseInt(formData.attendance) || 0,
      Term: parseInt(formData.term) || 1,
      FeedbackMetrics: {
        Punctuality: formData.punctuality,
        Preparedness: formData.preparedness,
        BehavioralIssues: formData.behavioralIssues,
        Assistance: formData.assistance,
        ParentalSupport: formData.parentalSupport,
  
        CommunicationSkills: {
          FollowingInstructions: formData.followingInstructions,
          PoliteWords: formData.politeWords,
          AskingQuestions: formData.askingQuestions,
          Conversation: formData.conversation,
          Describing: formData.describing,
          Commenting: formData.commenting,
          EmotionalCommunication: formData.emotionalCommunication,
          SentenceFormation: formData.sentenceFormation,
          Notes: formData.communicationNotes,
        },
  
        CognitionSkills: {
          Prediction: formData.prediction,
          LogicalSequencing: formData.logicalSequencing,
          ProblemSolving: formData.problemSolving,
          CauseEffect: formData.causeEffect,
          DecisionMaking: formData.decisionMaking,
          OddOneOut: formData.oddOneOut,
          Notes: formData.cognitionNotes,
        },
  
        AcademicSkills: {
          EnglishReading: formData.englishReading,
          EnglishWriting: formData.englishWriting,
          EVS: formData.evs,
          Math: formData.math,
        },
  
        FunctionalSkills: {
          CopyingDrawing: formData.copyingDrawing,
          Pasting: formData.pasting,
          Folding: formData.folding,
          Cutting: formData.cutting,
          KitchenUtensils: formData.kitchenUtensils,
          Ingredients: formData.ingredients,
          Pouring: formData.pouring,
          Scooping: formData.scooping,
          PersonalHygiene: formData.personalHygiene,
          FoldingClothes: formData.foldingClothes,
          FillingWater: formData.fillingWater,
          Packing: formData.packing,
          Wiping: formData.wiping,
          GroupActivities: formData.groupActivities,
          Notes: formData.functionalNotes,
        },
  
        Extracurricular: formData.extracurricular,
        Strengths: formData.interests,
        LearningEnvironment: formData.learningEnvironment,
      }
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/educators/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save feedback");
      }
  
      const result = await response.json();
      console.log("API Response:", result);
  
      toast({
        title: "Report saved",
        description: `Assessment report for ${formData.studentName} has been saved successfully.`,
      });
  
      // Navigate back to feedback page
      router.push("/dashboard/teacher/feedback");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to save report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

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

          {/* General Observations Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Observations</CardTitle>
                <CardDescription>Record attendance, behavior, and general observations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="attendance">Attendance</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="attendance"
                        name="attendance"
                        value={formData.attendance}
                        onChange={handleInputChange}
                        placeholder="e.g., 55"
                        className="w-20"
                        required
                      />
                      <span>out of</span>
                      <Input
                        id="totalWorkingDays"
                        name="totalWorkingDays"
                        value={formData.totalWorkingDays}
                        onChange={handleInputChange}
                        placeholder="e.g., 64"
                        className="w-20"
                        required
                      />
                      <span>working days</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="punctuality">Punctuality and regularity</Label>
                    <Input
                      id="punctuality"
                      name="punctuality"
                      value={formData.punctuality}
                      onChange={handleInputChange}
                      placeholder="e.g., Is on time and regular"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preparedness">Preparedness for the sessions</Label>
                    <Input
                      id="preparedness"
                      name="preparedness"
                      value={formData.preparedness}
                      onChange={handleInputChange}
                      placeholder="e.g., Yes. Is prepared for sessions"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assistance">Assistance required</Label>
                    <Input
                      id="assistance"
                      name="assistance"
                      value={formData.assistance}
                      onChange={handleInputChange}
                      placeholder="e.g., Minimal verbal assistance required"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="behavioralIssues">Any behavioural issues and modifications done</Label>
                  <Textarea
                    id="behavioralIssues"
                    name="behavioralIssues"
                    value={formData.behavioralIssues}
                    onChange={handleInputChange}
                    placeholder="Describe any behavioral issues and modifications"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentalSupport">Parental support at home</Label>
                  <Input
                    id="parentalSupport"
                    name="parentalSupport"
                    value={formData.parentalSupport}
                    onChange={handleInputChange}
                    placeholder="e.g., The home environment is supportive"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Skills Tab */}
          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle>Communication Skills</CardTitle>
                <CardDescription>Assess the student's communication abilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="communicationNotes">Communication Notes</Label>
                  <Textarea
                    id="communicationNotes"
                    name="communicationNotes"
                    value={formData.communicationNotes}
                    onChange={handleInputChange}
                    placeholder="Provide detailed notes about the student's communication skills"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Following 2/3-step instructions</Label>
                        <span className="font-medium">{formData.followingInstructions}</span>
                      </div>
                      <Slider
                        value={[formData.followingInstructions]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("followingInstructions", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Using polite words in various situations</Label>
                        <span className="font-medium">{formData.politeWords}</span>
                      </div>
                      <Slider
                        value={[formData.politeWords]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("politeWords", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Ask "WH" Questions to obtain information</Label>
                        <span className="font-medium">{formData.askingQuestions}</span>
                      </div>
                      <Slider
                        value={[formData.askingQuestions]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("askingQuestions", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Initiation and maintenance of conversation</Label>
                        <span className="font-medium">{formData.conversation}</span>
                      </div>
                      <Slider
                        value={[formData.conversation]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("conversation", value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Describing and talking about an event, an object, or people</Label>
                        <span className="font-medium">{formData.describing}</span>
                      </div>
                      <Slider
                        value={[formData.describing]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("describing", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Commenting on objects or events</Label>
                        <span className="font-medium">{formData.commenting}</span>
                      </div>
                      <Slider
                        value={[formData.commenting]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("commenting", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Using appropriate words to communicate and reason their emotions</Label>
                        <span className="font-medium">{formData.emotionalCommunication}</span>
                      </div>
                      <Slider
                        value={[formData.emotionalCommunication]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("emotionalCommunication", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Making a simple sentence (subject + verb + object)</Label>
                        <span className="font-medium">{formData.sentenceFormation}</span>
                      </div>
                      <Slider
                        value={[formData.sentenceFormation]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("sentenceFormation", value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cognition Tab */}
          <TabsContent value="cognition">
            <Card>
              <CardHeader>
                <CardTitle>Cognition Skills</CardTitle>
                <CardDescription>Assess the student's cognitive abilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cognitionNotes">Cognition Notes</Label>
                  <Textarea
                    id="cognitionNotes"
                    name="cognitionNotes"
                    value={formData.cognitionNotes}
                    onChange={handleInputChange}
                    placeholder="Provide detailed notes about the student's cognitive skills"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Prediction</Label>
                        <span className="font-medium">{formData.prediction}</span>
                      </div>
                      <Slider
                        value={[formData.prediction]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("prediction", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Logical sequencing</Label>
                        <span className="font-medium">{formData.logicalSequencing}</span>
                      </div>
                      <Slider
                        value={[formData.logicalSequencing]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("logicalSequencing", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Problem-Solving</Label>
                        <span className="font-medium">{formData.problemSolving}</span>
                      </div>
                      <Slider
                        value={[formData.problemSolving]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("problemSolving", value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Cause & effect</Label>
                        <span className="font-medium">{formData.causeEffect}</span>
                      </div>
                      <Slider
                        value={[formData.causeEffect]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("causeEffect", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Decision making</Label>
                        <span className="font-medium">{formData.decisionMaking}</span>
                      </div>
                      <Slider
                        value={[formData.decisionMaking]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("decisionMaking", value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Odd One Out + Reasoning</Label>
                        <span className="font-medium">{formData.oddOneOut}</span>
                      </div>
                      <Slider
                        value={[formData.oddOneOut]}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => handleSliderChange("oddOneOut", value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academics Tab */}
          <TabsContent value="academics">
            <Card>
              <CardHeader>
                <CardTitle>Academic Skills - OBE Level A</CardTitle>
                <CardDescription>Assess the student's academic abilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="englishReading">English - Reading & Comprehension</Label>
                  <Textarea
                    id="englishReading"
                    name="englishReading"
                    value={formData.englishReading}
                    onChange={handleInputChange}
                    placeholder="Describe the student's reading and comprehension abilities"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="englishWriting">English - Writing & Grammar</Label>
                  <Textarea
                    id="englishWriting"
                    name="englishWriting"
                    value={formData.englishWriting}
                    onChange={handleInputChange}
                    placeholder="Describe the student's writing and grammar abilities"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evs">Environmental Studies (EVS)</Label>
                  <Textarea
                    id="evs"
                    name="evs"
                    value={formData.evs}
                    onChange={handleInputChange}
                    placeholder="Describe the student's understanding of EVS concepts"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="math">Numeracy/Mathematics</Label>
                  <Textarea
                    id="math"
                    name="math"
                    value={formData.math}
                    onChange={handleInputChange}
                    placeholder="Describe the student's mathematical abilities"
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Functional Skills Tab */}
          <TabsContent value="functional">
            <Card>
              <CardHeader>
                <CardTitle>Functional Skills</CardTitle>
                <CardDescription>Assess the student's practical life skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="functionalNotes">Functional Skills Notes</Label>
                  <Textarea
                    id="functionalNotes"
                    name="functionalNotes"
                    value={formData.functionalNotes}
                    onChange={handleInputChange}
                    placeholder="Provide detailed notes about the student's functional skills"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Art and Craft Skills</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Copying simple lines, drawings and shapes</Label>
                          <span className="font-medium">{formData.copyingDrawing}</span>
                        </div>
                        <Slider
                          value={[formData.copyingDrawing]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("copyingDrawing", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Pasting</Label>
                          <span className="font-medium">{formData.pasting}</span>
                        </div>
                        <Slider
                          value={[formData.pasting]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("pasting", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Folding (origami papers)</Label>
                          <span className="font-medium">{formData.folding}</span>
                        </div>
                        <Slider
                          value={[formData.folding]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("folding", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Cutting with scissors on the line</Label>
                          <span className="font-medium">{formData.cutting}</span>
                        </div>
                        <Slider
                          value={[formData.cutting]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("cutting", value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Cooking without fire Skills</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Knowing names of various utensils in the kitchen</Label>
                          <span className="font-medium">{formData.kitchenUtensils}</span>
                        </div>
                        <Slider
                          value={[formData.kitchenUtensils]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("kitchenUtensils", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Knowing names of various ingredients</Label>
                          <span className="font-medium">{formData.ingredients}</span>
                        </div>
                        <Slider
                          value={[formData.ingredients]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("ingredients", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Pouring</Label>
                          <span className="font-medium">{formData.pouring}</span>
                        </div>
                        <Slider
                          value={[formData.pouring]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("pouring", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Scooping</Label>
                          <span className="font-medium">{formData.scooping}</span>
                        </div>
                        <Slider
                          value={[formData.scooping]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("scooping", value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-4">Life Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Personal hygiene</Label>
                          <span className="font-medium">{formData.personalHygiene}</span>
                        </div>
                        <Slider
                          value={[formData.personalHygiene]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("personalHygiene", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Folding clothes</Label>
                          <span className="font-medium">{formData.foldingClothes}</span>
                        </div>
                        <Slider
                          value={[formData.foldingClothes]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("foldingClothes", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Filling water bottles</Label>
                          <span className="font-medium">{formData.fillingWater}</span>
                        </div>
                        <Slider
                          value={[formData.fillingWater]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("fillingWater", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Packing your bag</Label>
                          <span className="font-medium">{formData.packing}</span>
                        </div>
                        <Slider
                          value={[formData.packing]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("packing", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Wiping</Label>
                          <span className="font-medium">{formData.wiping}</span>
                        </div>
                        <Slider
                          value={[formData.wiping]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("wiping", value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Group activities (turn taking, collaborative play)</Label>
                          <span className="font-medium">{formData.groupActivities}</span>
                        </div>
                        <Slider
                          value={[formData.groupActivities]}
                          min={1}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => handleSliderChange("groupActivities", value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Extracurricular Tab */}
          <TabsContent value="extracurricular">
            <Card>
              <CardHeader>
                <CardTitle>Extracurricular Activities</CardTitle>
                <CardDescription>Record the student's participation in extracurricular activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="extracurricular">Extracurricular Activities</Label>
                  <Textarea
                    id="extracurricular"
                    name="extracurricular"
                    value={formData.extracurricular}
                    onChange={handleInputChange}
                    placeholder="Describe the student's participation in extracurricular activities"
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strengths Tab */}
          <TabsContent value="strengths">
            <Card>
              <CardHeader>
                <CardTitle>Strengths and Learning Environment</CardTitle>
                <CardDescription>Record the student's strengths and optimal learning environment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="interests">Strengths and Current Interests</Label>
                  <Textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="Describe the student's strengths and current interests observed in school"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningEnvironment">The Optimal Learning Environment</Label>
                  <Textarea
                    id="learningEnvironment"
                    name="learningEnvironment"
                    value={formData.learningEnvironment}
                    onChange={handleInputChange}
                    placeholder="Describe the optimal learning environment for the student"
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
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

