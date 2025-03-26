"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, Eye, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserData } from "@/utils/auth"

export default function TeacherReportsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("pending")
  const [user, setUser] = useState<{ userId: string; userName: string; role: string } | null>(null)
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user data
  useEffect(() => {
    const storedUser = getUserData()
    if (storedUser) {
      setUser(storedUser)
      console.log("User ID:", storedUser.userId)
    } else {
      console.log("No user data found")
    }
  }, [])

  // Fetch reports from API
  useEffect(() => {
    if (!user) return

    const fetchReports = async () => {
      try {
        setLoading(true)
        console.log("Fetching reports for User ID:", user.userId)
        const response = await fetch(`http://127.0.0.1:5000/educators/get_student_report_status?EducatorID=${user.userId}`)
        const data = await response.json()
        console.log("API Response:", data) // Log API response
        setReports(data)
      } catch (err) {
        setError("Failed to fetch reports")
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [user])

  useEffect(() => {
    console.log("Updated Reports:", reports)
  }, [reports])

  // **Filter reports based on search and selectedType**
  const filteredItems = reports.filter((item) => {
    console.log("Filtering Item:", item)

    // Ensure properties exist, avoiding undefined errors
    const studentName = item.StudentName || ""
    const assignment = item.assignment || ""
    const status = item.Status ? item.Status.toLowerCase() : ""

    // Match search term
    const matchesSearch =
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.toLowerCase().includes(searchTerm.toLowerCase())

    // Match report type
    const matchesType =
      selectedType === "all" ||
      (selectedType === "pending" && status === "pending") ||
      (selectedType === "complete" && status === "complete")

    return matchesSearch && matchesType
  })

  console.log("Filtered Reports:", filteredItems) // Log final filtered list

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Feedback</h2>
          <p className="text-muted-foreground">Provide feedback on student assignments and assessments</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90" onClick={() => router.push("/dashboard/teacher/reports")}>
          <FileText className="mr-2 h-4 w-4" />
          Manage Assessment Reports
        </Button>
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
                <TabsTrigger value="complete">Has Report</TabsTrigger>
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
                <div className="w-1/3 font-medium">Term</div>
                <div className="w-1/6 font-medium">Status</div>
                <div className="w-1/6 font-medium text-right">Action</div>
              </div>

              {loading ? (
                <div className="p-8 text-center">Loading...</div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">{error}</div>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div key={index} className="p-4 border-b flex items-center">
                    <div className="w-1/3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={item.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{item.initials || "?"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.StudentName}</div>
                          {/* <div className="text-sm text-muted-foreground">Term {item.Term}</div> Added Term here */}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="font-medium">{item.assignment}</div>
                      <div className="text-sm text-muted-foreground">Term {item.Term}</div>
                    </div>
                    <div className="w-1/6">
                      <Badge variant={item.Status === "complete" ? "secondary" : "outline"}>
                        {item.Status === "complete" ? "Has Report" : "Needs Report"}
                      </Badge>
                    </div>
                    <div className="w-1/6 text-right">
                      {item.Status === "complete" ? (
                        <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/teacher/reports/view/${index}`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-secondary hover:bg-secondary/90"
                          onClick={() =>
                            router.push(`/dashboard/teacher/reports/create?studentId=${item.StudentID}&studentName=${encodeURIComponent(item.StudentName)}`)
                          }
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Create Report
                        </Button>
                      )}
                    </div>
                  </div>
                ))

                // filteredItems.map((item) => (
                //   <div key={item.StudentID} className="p-4 border-b flex items-center">
                //     <div className="w-1/3">
                //       <div className="flex items-center gap-3">
                //         <Avatar>
                //           <AvatarImage src={item.avatar || "/placeholder.svg"} />
                //           <AvatarFallback>{item.initials || "?"}</AvatarFallback>
                //         </Avatar>
                //         <div>
                //           <div className="font-medium">{item.StudentName}</div>
                //           <div className="text-sm text-muted-foreground">{item.course}</div>
                //         </div>
                //       </div>
                //     </div>
                //     <div className="w-1/3">
                //       <div className="font-medium">{item.assignment}</div>
                //       <div className="text-sm text-muted-foreground">{item.type}</div>
                //     </div>
                //     <div className="w-1/6">
                //       <Badge variant={item.Status === "completed" ? "secondary" : "outline"}>
                //         {item.Status === "completed" ? "Has Report" : "Needs Report"}
                //       </Badge>
                //     </div>
                //     <div className="w-1/6 text-right">
                //       {item.Status === "completed" ? (
                //         <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/teacher/reports/view/${item.StudentID}`)}>
                //           <Eye className="h-4 w-4 mr-1" />
                //           View
                //         </Button>
                //       ) : (
                //         <Button
                //           size="sm"
                //           className="bg-secondary hover:bg-secondary/90"
                //           onClick={() =>
                //             router.push(`/dashboard/teacher/reports/create?studentId=${item.StudentID}&studentName=${encodeURIComponent(item.StudentName)}`)
                //           }
                //         >
                //           <PlusCircle className="h-4 w-4 mr-1" />
                //           Create Report
                //         </Button>
                //       )}
                //     </div>
                //   </div>
                // ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">No students found matching your filters.</div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
