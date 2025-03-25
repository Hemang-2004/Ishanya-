// Add a student-specific view for reports
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Use the same mock report data as in the teacher view
const mockReportData = {
  id: "1",
  studentName: "Arjun Patel",
  term: "2",
  educatorName: "Priya Sharma",
  reviewPeriod: "September to December 2024",
  // ... other report data (same as in the teacher view)
}

export default function StudentViewReportPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [report, setReport] = useState(mockReportData)
  const [loading, setLoading] = useState(true)

  // In a real app, you would fetch the report data from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleDownload = () => {
    toast({
      title: "Report downloaded",
      description: "The assessment report has been downloaded as a PDF.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 print:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="print:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Assessment Report</h2>
            <p className="text-muted-foreground">Sameti - A Pre-academic Skills Program</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload} className="print:hidden">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="text-center mb-8 print:mb-6">
        <h1 className="text-2xl font-bold mb-2">Sameti - A Pre-academic Skills Program</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
          <div className="flex justify-between">
            <span className="font-medium">Name of Student:</span>
            <span>{report.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Term:</span>
            <span>{report.term}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Name of Educator:</span>
            <span>{report.educatorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Period of Review:</span>
            <span>{report.reviewPeriod}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 print:block">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full print:hidden">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Report Details</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="skills">My Skills</TabsTrigger>
        </TabsList>

        {/* Tab content would be similar to the teacher view but with student-focused language */}
        <TabsContent value="overview" className="print:block">
          <Card>
            <CardHeader>
              <CardTitle>Report Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="font-medium">Attendance</div>
                    <div>55 out of 64 working days</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">Punctuality and regularity</div>
                    <div>Is on time and regular</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Your Strengths</div>
                  <div className="whitespace-pre-line">
                    You like doing cognitive games like word search, odd one out, and liquid sorting as well as hands-on
                    activities like playing with blocks and puzzles. You engage in sensory activities like kinetic sand,
                    trampolines, and treadmills. You are totally independent and enjoy playing computer-based activities
                    including word games, picture puzzles, and quizzes. You always look forward to coding since you are
                    so enthusiastic about it.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

