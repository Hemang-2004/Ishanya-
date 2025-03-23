"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"
import {
  Download,
  Share2,
  TrendingUp,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  ArrowUpRight,
  Lightbulb,
  AlertTriangle,
} from "lucide-react"

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("year")
  const [programFilter, setProgramFilter] = useState("all")
  const [viewMode, setViewMode] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("analytics")}</h2>
          <p className="text-muted-foreground">Comprehensive insights and data visualization</p>
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

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setViewMode}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full md:w-auto">
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

            <Select defaultValue={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="digital">Digital Literacy</SelectItem>
                <SelectItem value="vocational">Vocational Training</SelectItem>
                <SelectItem value="community">Community Leadership</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,856</div>
                <p className="text-xs text-muted-foreground">Active students across all programs</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>12% increase from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Teachers across all programs</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>8% increase from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Running educational programs</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>2 new programs this {timeRange}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">Average program completion</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>5% increase from last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
                <CardDescription>Monthly student acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={studentGrowthData}>
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
                        dataKey="newStudents"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="New Students"
                      />
                      <Area
                        type="monotone"
                        dataKey="returningStudents"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        name="Returning Students"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Program Distribution</CardTitle>
                <CardDescription>Students enrolled by program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={programDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {programDistributionData.map((entry, index) => (
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rates</CardTitle>
                <CardDescription>Program completion statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={completionRatesData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Completion Rate"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="value" name="Completion Rate" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>Average attendance rates by program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Attendance"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="digitalLiteracy"
                        name="Digital Literacy"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="vocationalTraining"
                        name="Vocational Training"
                        stroke="#82ca9d"
                      />
                      <Line
                        type="monotone"
                        dataKey="communityLeadership"
                        name="Community Leadership"
                        stroke="#ffc658"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Important trends and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Growing Demand</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Digital Literacy program has seen a 25% increase in enrollment over the past quarter, indicating
                    growing demand for digital skills training.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-medium">Retention Challenge</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Vocational Training program has a 15% drop-off rate after the first month. Consider implementing
                    mid-program engagement strategies.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Success Factor</h3>
                  </div>
                 <p className="text-sm text-muted-foreground">
  Students with regular attendance (&gt;85%) are three times more likely to complete their programs successfully. 
  Focus on improving attendance.
</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {genderDistributionData.map((entry, index) => (
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Age Distribution</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} students`, "Count"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Location Distribution</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={locationDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {locationDistributionData.map((entry, index) => (
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Education Level</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={educationLevelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {educationLevelData.map((entry, index) => (
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance Analysis</CardTitle>
              <CardDescription>Correlation between attendance and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid />
                    <XAxis
                      type="number"
                      dataKey="attendance"
                      name="Attendance"
                      unit="%"
                      domain={[50, 100]}
                      label={{ value: "Attendance (%)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="score"
                      name="Score"
                      unit="%"
                      domain={[50, 100]}
                      label={{ value: "Score (%)", angle: -90, position: "insideLeft" }}
                    />
                    <ZAxis type="number" range={[60, 400]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      formatter={(value) => [`${value}%`, ""]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Legend />
                    <Scatter
                      name="Digital Literacy"
                      data={studentPerformanceData.filter((d) => d.program === "Digital Literacy")}
                      fill="#8884d8"
                    />
                    <Scatter
                      name="Vocational Training"
                      data={studentPerformanceData.filter((d) => d.program === "Vocational Training")}
                      fill="#82ca9d"
                    />
                    <Scatter
                      name="Community Leadership"
                      data={studentPerformanceData.filter((d) => d.program === "Community Leadership")}
                      fill="#ffc658"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement</CardTitle>
                <CardDescription>Participation metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="classParticipation"
                        name="Class Participation"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="assignmentCompletion"
                        name="Assignment Completion"
                        stroke="#82ca9d"
                      />
                      <Line type="monotone" dataKey="forumActivity" name="Forum Activity" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
            </Card>
           </div>
        </TabsContent>
      </Tab>
    </div>
    )
}

// Sample data
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

const studentGrowthData = [
  { name: "Jan", completion: 65, target: 80, students: 120, graduates: 40, dropouts: 5, period: "Jan 2023" },
  { name: "Feb", completion: 70, target: 80, students: 145, graduates: 45, dropouts: 8, period: "Feb 2023" },
  { name: "Mar", completion: 75, target: 80, students: 190, graduates: 50, dropouts: 10, period: "Mar 2023" },
  { name: "Apr", completion: 72, target: 80, students: 210, graduates: 55, dropouts: 7, period: "Apr 2023" },
  { name: "May", completion: 78, target: 80, students: 250, graduates: 60, dropouts: 12, period: "May 2023" },
  { name: "Jun", completion: 82, target: 80, students: 280, graduates: 65, dropouts: 8, period: "Jun 2023" },
]

const programDistributionData = [
  { name: "Digital Literacy", value: 35 },
  { name: "Vocational Training", value: 25 },
  { name: "Community Leadership", value: 20 },
  { name: "Health & Wellness", value: 15 },
  { name: "Financial Literacy", value: 5 },
]

const completionRatesData = [
  { name: "Digital Literacy", value: 85 },
  { name: "Vocational Training", value: 72 },
  { name: "Community Leadership", value: 68 },
  { name: "Health & Wellness", value: 79 },
  { name: "Financial Literacy", value: 62 },
]

const demographicsData = [
  { name: "18-24", male: 120, female: 150, other: 10 },
  { name: "25-34", male: 100, female: 130, other: 5 },
  { name: "35-44", male: 80, female: 100, other: 3 },
  { name: "45-54", male: 40, female: 60, other: 2 },
  { name: "55+", male: 20, female: 30, other: 1 },
]

const performanceData = [
  { name: "Digital Literacy", score: 85, average: 75 },
  { name: "Vocational Training", score: 78, average: 70 },
  { name: "Community Leadership", score: 82, average: 72 },
  { name: "Health & Wellness", score: 88, average: 78 },
  { name: "Financial Literacy", score: 75, average: 68 },
]

const programEffectivenessData = [
  { name: "Digital Literacy", completion: 85, employment: 70, satisfaction: 90 },
  { name: "Vocational Training", completion: 78, employment: 85, satisfaction: 82 },
  { name: "Community Leadership", completion: 82, employment: 65, satisfaction: 88 },
  { name: "Health & Wellness", completion: 88, employment: 60, satisfaction: 92 },
  { name: "Financial Literacy", completion: 75, employment: 72, satisfaction: 80 },
]

const resourceAllocationData = [
  { name: "Digital Literacy", value: 1250000 },
  { name: "Vocational Training", value: 1575000 },
  { name: "Community Leadership", value: 825000 },
  { name: "Health & Wellness", value: 650000 },
  { name: "Financial Literacy", value: 575000 },
]

const programGrowthData = [
  { name: "Q1 2022", digital: 80, vocational: 60, community: 40, health: 30 },
  { name: "Q2 2022", digital: 100, vocational: 75, community: 50, health: 40 },
  { name: "Q3 2022", digital: 120, vocational: 90, community: 65, health: 50 },
  { name: "Q4 2022", digital: 150, vocational: 110, community: 80, health: 65 },
  { name: "Q1 2023", digital: 180, vocational: 130, community: 95, health: 80 },
  { name: "Q2 2023", digital: 210, vocational: 150, community: 110, health: 95 },
]

const recentReports = [
  {
    id: "1",
    title: "Q2 2023 Impact Summary",
    date: "Jul 15, 2023",
  },
  {
    id: "2",
    title: "Digital Literacy Program Outcomes",
    date: "Jun 30, 2023",
  },
  {
    id: "3",
    title: "Volunteer Engagement Report",
    date: "Jun 22, 2023",
  },
  {
    id: "4",
    title: "Annual Stakeholder Analysis",
    date: "May 10, 2023",
  },
]

const savedCustomReports = [
  {
    id: "1",
    title: "Student Demographics by Region",
    date: "Jun 12, 2023",
  },
  {
    id: "2",
    title: "Program ROI Analysis",
    date: "May 28, 2023",
  },
  {
    id: "3",
    title: "Teacher Performance Metrics",
    date: "Apr 15, 2023",
  },
]

