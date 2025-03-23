"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, FileText, Share2, TrendingUp, ArrowUpRight } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function TeacherReportsPage() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("month")
  const [courseFilter, setCourseFilter] = useState("all")
  const [reportType, setReportType] = useState("overview")

  // Filter data based on selected filters
  const filteredData = {
    studentProgress: studentProgressData.filter(
      (item) =>
        timeRange === "all" || item.period.includes(timeRange === "year" ? "2023" : timeRange === "quarter" ? "Q" : ""),
    ),
    courseDistribution:
      courseFilter === "all"
        ? courseDistributionData
        : courseDistributionData.filter((item) => item.name.toLowerCase().includes(courseFilter.toLowerCase())),
    completionRates: completionRatesData.filter(
      (item) => courseFilter === "all" || item.name.toLowerCase().includes(courseFilter.toLowerCase()),
    ),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("progressReports")}</h2>
          <p className="text-muted-foreground">Track student progress and generate insights</p>
        </div>
        <div className="flex gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            {t("share")}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setReportType}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="courses">Course Analytics</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full md:w-auto mt-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="digital">Digital Literacy</SelectItem>
                <SelectItem value="office">Microsoft Office</SelectItem>
                <SelectItem value="internet">Internet Safety</SelectItem>
                <SelectItem value="advanced">Advanced Digital Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">Students across all your courses</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>8% increase</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Completion Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82%</div>
                  <p className="text-xs text-muted-foreground">Course completion rate</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>4% increase</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">Across all assessments</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>3% increase</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Student Distribution by Course</CardTitle>
                  <CardDescription>Number of students enrolled in each course</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={filteredData.courseDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {filteredData.courseDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value} students`, name]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Student Progress Over Time</CardTitle>
                  <CardDescription>Average completion percentage by week</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData.studentProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="progress" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Course Completion Rates</CardTitle>
                <CardDescription>Percentage of students who completed each module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courseCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="digitalLiteracy" name="Digital Literacy" fill="#8884d8" />
                      <Bar dataKey="msOffice" name="MS Office" fill="#82ca9d" />
                      <Bar dataKey="internetSafety" name="Internet Safety" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Individual Student Progress</CardTitle>
                <CardDescription>Performance metrics for top students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentPerformanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="attendance" name="Attendance %" fill="#8884d8" />
                      <Bar dataKey="assignments" name="Assignments %" fill="#82ca9d" />
                      <Bar dataKey="quizzes" name="Quiz Scores %" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Development</CardTitle>
                  <CardDescription>Average skill improvement by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={skillDevelopmentData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Before Course"
                          dataKey="before"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.2}
                        />
                        <Radar name="After Course" dataKey="after" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                        <Legend />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Student participation and interaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="discussions"
                          name="Discussion Posts"
                          stackId="1"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                        <Area
                          type="monotone"
                          dataKey="questions"
                          name="Questions Asked"
                          stackId="2"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                        />
                        <Area
                          type="monotone"
                          dataKey="resources"
                          name="Resources Accessed"
                          stackId="3"
                          stroke="#ffc658"
                          fill="#ffc658"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Effectiveness</CardTitle>
                <CardDescription>Impact and outcomes of different courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courseEffectivenessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="completion" name="Completion Rate" fill="#8884d8" />
                      <Bar dataKey="satisfaction" name="Satisfaction" fill="#82ca9d" />
                      <Bar dataKey="skillGain" name="Skill Improvement" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Module Difficulty</CardTitle>
                  <CardDescription>Student-reported difficulty by module</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moduleDifficultyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip
                          formatter={(value) => [`${value}/5`, "Difficulty Rating"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="digitalLiteracy" name="Digital Literacy" stroke="#8884d8" />
                        <Line type="monotone" dataKey="msOffice" name="MS Office" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="internetSafety" name="Internet Safety" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Spent by Module</CardTitle>
                  <CardDescription>Average hours spent by students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeSpentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value} hours`, "Time Spent"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="expected" name="Expected Time" fill="#8884d8" />
                        <Bar dataKey="actual" name="Actual Time" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Average scores by assessment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assessmentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Average Score"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="quizzes" name="Quizzes" fill="#8884d8" />
                      <Bar dataKey="assignments" name="Assignments" fill="#82ca9d" />
                      <Bar dataKey="projects" name="Projects" fill="#ffc658" />
                      <Bar dataKey="finalExam" name="Final Exam" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Question Analysis</CardTitle>
                  <CardDescription>Performance on different question types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={questionAnalysisData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="type" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Average Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                        <Legend />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Average Score"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Over Time</CardTitle>
                  <CardDescription>Student score progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={improvementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="assessment" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Average Score"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="topPerformers" name="Top Performers" stroke="#8884d8" />
                        <Line type="monotone" dataKey="averagePerformers" name="Average Performers" stroke="#82ca9d" />
                        <Line
                          type="monotone"
                          dataKey="strugglingStudents"
                          name="Struggling Students"
                          stroke="#ffc658"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Sample data
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

const studentProgressData = [
  { name: "Week 1", progress: 15, target: 20, period: "Jan 2023" },
  { name: "Week 2", progress: 30, target: 40, period: "Jan 2023" },
  { name: "Week 3", progress: 45, target: 60, period: "Feb 2023" },
  { name: "Week 4", progress: 60, target: 70, period: "Feb 2023" },
  { name: "Week 5", progress: 75, target: 80, period: "Mar 2023" },
  { name: "Week 6", progress: 85, target: 90, period: "Mar 2023" },
  { name: "Week 7", progress: 95, target: 100, period: "Apr 2023" },
]

const courseDistributionData = [
  { name: "Digital Literacy", value: 45 },
  { name: "Microsoft Office", value: 30 },
  { name: "Internet Safety", value: 15 },
  { name: "Advanced Digital Skills", value: 10 },
]

const completionRatesData = [
  { name: "Digital Literacy", value: 85 },
  { name: "Microsoft Office", value: 78 },
  { name: "Internet Safety", value: 92 },
  { name: "Advanced Digital Skills", value: 65 },
]

const courseCompletionData = [
  { name: "Module 1", digitalLiteracy: 95, msOffice: 90, internetSafety: 98 },
  { name: "Module 2", digitalLiteracy: 88, msOffice: 85, internetSafety: 92 },
  { name: "Module 3", digitalLiteracy: 82, msOffice: 78, internetSafety: 88 },
  { name: "Module 4", digitalLiteracy: 75, msOffice: 70, internetSafety: 85 },
  { name: "Module 5", digitalLiteracy: 68, msOffice: 65, internetSafety: 80 },
]

const studentPerformanceData = [
  { name: "Arjun Patel", attendance: 95, assignments: 88, quizzes: 92 },
  { name: "Meera Singh", attendance: 98, assignments: 95, quizzes: 90 },
  { name: "Vikram Malhotra", attendance: 90, assignments: 85, quizzes: 88 },
  { name: "Neha Gupta", attendance: 92, assignments: 90, quizzes: 85 },
  { name: "Rajesh Kumar", attendance: 85, assignments: 80, quizzes: 78 },
]

const skillDevelopmentData = [
  { subject: "Computer Basics", before: 30, after: 85 },
  { subject: "Internet Usage", before: 45, after: 90 },
  { subject: "Office Software", before: 20, after: 75 },
  { subject: "Email", before: 40, after: 95 },
  { subject: "Online Safety", before: 25, after: 80 },
  { subject: "Digital Communication", before: 35, after: 85 },
]

const engagementData = [
  { name: "Week 1", discussions: 10, questions: 15, resources: 20 },
  { name: "Week 2", discussions: 15, questions: 12, resources: 25 },
  { name: "Week 3", discussions: 20, questions: 18, resources: 30 },
  { name: "Week 4", discussions: 25, questions: 15, resources: 35 },
  { name: "Week 5", discussions: 30, questions: 20, resources: 40 },
  { name: "Week 6", discussions: 35, questions: 25, resources: 45 },
]

const courseEffectivenessData = [
  { name: "Digital Literacy", completion: 85, satisfaction: 90, skillGain: 80 },
  { name: "MS Office", completion: 78, satisfaction: 85, skillGain: 75 },
  { name: "Internet Safety", completion: 92, satisfaction: 95, skillGain: 88 },
  { name: "Advanced Digital", completion: 65, satisfaction: 75, skillGain: 70 },
]

const moduleDifficultyData = [
  { name: "Module 1", digitalLiteracy: 2.1, msOffice: 2.3, internetSafety: 1.8 },
  { name: "Module 2", digitalLiteracy: 2.5, msOffice: 2.8, internetSafety: 2.2 },
  { name: "Module 3", digitalLiteracy: 3.2, msOffice: 3.5, internetSafety: 2.7 },
  { name: "Module 4", digitalLiteracy: 3.8, msOffice: 4.1, internetSafety: 3.2 },
  { name: "Module 5", digitalLiteracy: 3.5, msOffice: 3.8, internetSafety: 3.0 },
]

const timeSpentData = [
  { name: "Module 1", expected: 4, actual: 3.5 },
  { name: "Module 2", expected: 5, actual: 5.5 },
  { name: "Module 3", expected: 6, actual: 7.2 },
  { name: "Module 4", expected: 5, actual: 6.5 },
  { name: "Module 5", expected: 4, actual: 4.8 },
]

const assessmentPerformanceData = [
  { name: "Digital Literacy", quizzes: 82, assignments: 78, projects: 85, finalExam: 80 },
  { name: "MS Office", quizzes: 78, assignments: 75, projects: 80, finalExam: 76 },
  { name: "Internet Safety", quizzes: 88, assignments: 90, projects: 92, finalExam: 85 },
  { name: "Advanced Digital", quizzes: 72, assignments: 68, projects: 75, finalExam: 70 },
]

const questionAnalysisData = [
  { type: "Multiple Choice", score: 85 },
  { type: "True/False", score: 90 },
  { type: "Short Answer", score: 75 },
  { type: "Practical Task", score: 82 },
  { type: "Essay", score: 68 },
  { type: "Problem Solving", score: 72 },
]

const improvementData = [
  { assessment: "Quiz 1", topPerformers: 85, averagePerformers: 70, strugglingStudents: 55 },
  { assessment: "Quiz 2", topPerformers: 88, averagePerformers: 72, strugglingStudents: 58 },
  { assessment: "Midterm", topPerformers: 90, averagePerformers: 75, strugglingStudents: 62 },
  { assessment: "Quiz 3", topPerformers: 92, averagePerformers: 78, strugglingStudents: 65 },
  { assessment: "Quiz 4", topPerformers: 94, averagePerformers: 82, strugglingStudents: 70 },
  { assessment: "Final Exam", topPerformers: 96, averagePerformers: 85, strugglingStudents: 75 },
]

