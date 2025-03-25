"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Download, ArrowUpRight, Eye, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for student reports
const studentReports = [
  {
    id: "1",
    term: "Term 2",
    date: "Dec 15, 2024",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
  },
  {
    id: "2",
    term: "Term 1",
    date: "Aug 20, 2024",
    educator: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
  },
]

// Mock data for progress tracking
const progressData = [
  { month: "Jan", communication: 3.0, cognition: 3.2, functional: 3.0, academics: 2.8 },
  { month: "Feb", communication: 3.2, cognition: 3.4, functional: 3.1, academics: 3.0 },
  { month: "Mar", communication: 3.4, cognition: 3.6, functional: 3.3, academics: 3.1 },
  { month: "Apr", communication: 3.5, cognition: 3.8, functional: 3.5, academics: 3.3 },
  { month: "May", communication: 3.7, cognition: 4.0, functional: 3.8, academics: 3.6 },
  { month: "Jun", communication: 3.8, cognition: 4.2, functional: 4.0, academics: 3.9 },
]

// Mock data for radar chart
const radarData = [
  { subject: "Following Instructions", A: 5, fullMark: 5 },
  { subject: "Polite Words", A: 3.5, fullMark: 5 },
  { subject: "Asking Questions", A: 3, fullMark: 5 },
  { subject: "Conversation", A: 3, fullMark: 5 },
  { subject: "Describing", A: 4, fullMark: 5 },
  { subject: "Commenting", A: 3, fullMark: 5 },
  { subject: "Emotional Communication", A: 3.5, fullMark: 5 },
  { subject: "Sentence Formation", A: 4.5, fullMark: 5 },
]

// Mock data for skill comparison
const skillComparisonData = [
  { name: "Term 1", computer: 65, internet: 70, office: 60, email: 55, safety: 50 },
  { name: "Term 2", computer: 85, internet: 90, office: 75, email: 80, safety: 70 },
]

export default function StudentReportsPage() {
  const [activeTab, setActiveTab] = useState("reports")
  const [timeRange, setTimeRange] = useState("6months")
  const [skillCategory, setSkillCategory] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Assessment Reports</h2>
          <p className="text-muted-foreground">View your progress and assessment reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="reports" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Reports</CardTitle>
              <CardDescription>View your assessment reports from your educators</CardDescription>
            </CardHeader>
            <CardContent>
              {studentReports.length > 0 ? (
                <div className="space-y-4">
                  {studentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-primary/10 p-3">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{report.term} Assessment Report</p>
                          <p className="text-sm text-muted-foreground">
                            {report.date} • By {report.educator}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/student/reports/view/${report.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No reports available</h3>
                  <p className="text-muted-foreground mt-1">You don't have any assessment reports yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Feedback</CardTitle>
              <CardDescription>Recent feedback from your educators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Priya Sharma</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Dec 15, 2024</span>
                  </div>
                  <p className="text-sm">
                    Arjun has shown excellent progress in his communication skills this term. His ability to follow
                    multi-step instructions has improved significantly, and he's now more comfortable initiating
                    conversations with peers. We'll continue working on asking questions and commenting on
                    events/objects in the next term.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Full Report <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Priya Sharma</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Aug 20, 2024</span>
                  </div>
                  <p className="text-sm">
                    Arjun has adapted well to the program. He shows great interest in cognitive activities and is
                    particularly strong in prediction and logical sequencing. His functional skills are developing
                    nicely, though we'll focus more on personal hygiene routines in the coming term.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Full Report <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>Track your progress across different skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="communication"
                      name="Communication"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="cognition" name="Cognition" stroke="#82ca9d" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="functional"
                      name="Functional Skills"
                      stroke="#ffc658"
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="academics" name="Academics" stroke="#ff8042" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-[#8884d8]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8</div>
                <Progress value={76} className="h-2 mt-2" />
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>18.8% increase from Term 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#82ca9d]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cognition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8</div>
                <Progress value={76} className="h-2 mt-2" />
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>18.8% increase from Term 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#82ca9d]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cognition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2</div>
                <Progress value={84} className="h-2 mt-2" />
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>20.0% increase from Term 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#ffc658]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Functional Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.0</div>
                <Progress value={80} className="h-2 mt-2" />
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>21.2% increase from Term 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#ff8042]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Academics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.9</div>
                <Progress value={78} className="h-2 mt-2" />
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>25.8% increase from Term 1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Term Comparison</CardTitle>
              <CardDescription>Compare your progress between terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Bar dataKey="computer" name="Computer Basics" fill="#8884d8" />
                    <Bar dataKey="internet" name="Internet Skills" fill="#82ca9d" />
                    <Bar dataKey="office" name="MS Office" fill="#ffc658" />
                    <Bar dataKey="email" name="Email & Communication" fill="#ff8042" />
                    <Bar dataKey="safety" name="Online Safety" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Communication Skills Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of your communication skills</CardDescription>
                </div>
                <Select value={skillCategory} onValueChange={setSkillCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select skill category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="cognition">Cognition</SelectItem>
                    <SelectItem value="functional">Functional Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar name="Term 2" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip content={<ChartTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Detailed scores for each skill area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Communication Skills</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Following 2/3-step instructions</span>
                        <span className="font-medium">5.0</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Using polite words in various situations</span>
                        <span className="font-medium">3.5</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Ask "WH" Questions to obtain information</span>
                        <span className="font-medium">3.0</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Initiation and maintenance of conversation</span>
                        <span className="font-medium">3.0</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Cognition Skills</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Prediction</span>
                        <span className="font-medium">4.5</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Logical sequencing</span>
                        <span className="font-medium">4.5</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Problem-Solving</span>
                        <span className="font-medium">4.0</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Digital Literacy Skills</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Computer Basics</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Internet Skills</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Microsoft Office</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Email & Communication</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Online Safety</span>
                        <span className="font-medium">70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assessments</CardTitle>
              <CardDescription>Your scheduled skill assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Digital Literacy - Term 3 Assessment</div>
                    <div className="text-sm text-muted-foreground">With Priya Sharma</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">June 15, 2025</div>
                    <div className="text-sm text-muted-foreground">10:00 AM</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Communication Skills - Final Assessment</div>
                    <div className="text-sm text-muted-foreground">With Rahul Verma</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">June 20, 2025</div>
                    <div className="text-sm text-muted-foreground">2:00 PM</div>
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

