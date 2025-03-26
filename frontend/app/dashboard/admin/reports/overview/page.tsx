"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Filter, TrendingUp, ArrowUpRight } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import {
  ResponsiveContainer,
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
} from "recharts"

export default function AdminReportsOverviewPage() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("term")
  const [programFilter, setProgramFilter] = useState("all")
  const [reportType, setReportType] = useState("overview")

  // Sample data for student assessment reports
  const studentAssessmentData = [
    { name: "Communication", average: 3.8, previousAverage: 3.5, improvement: 8.6 },
    { name: "Cognition", average: 4.2, previousAverage: 3.9, improvement: 7.7 },
    { name: "Academics", average: 3.9, previousAverage: 3.6, improvement: 8.3 },
    { name: "Functional Skills", average: 4.0, previousAverage: 3.7, improvement: 8.1 },
  ]

  const skillDistributionData = [
    { name: "Excellent (4.5-5.0)", value: 25 },
    { name: "Good (3.5-4.4)", value: 40 },
    { name: "Satisfactory (2.5-3.4)", value: 20 },
    { name: "Needs Improvement (1.5-2.4)", value: 10 },
    { name: "Concerning (1.0-1.4)", value: 5 },
  ]

  const studentProgressData = [
    { name: "Term 1", communication: 3.2, cognition: 3.5, functional: 3.3, academics: 3.1 },
    { name: "Term 2", communication: 3.8, cognition: 4.2, functional: 4.0, academics: 3.9 },
  ]

  const communicationSkillsData = [
    { subject: "Following Instructions", average: 4.2, fullMark: 5 },
    { subject: "Polite Words", average: 3.7, fullMark: 5 },
    { subject: "Asking Questions", average: 3.2, fullMark: 5 },
    { subject: "Conversation", average: 3.1, fullMark: 5 },
    { subject: "Describing", average: 3.9, fullMark: 5 },
    { subject: "Commenting", average: 3.3, fullMark: 5 },
    { subject: "Emotional Communication", average: 3.6, fullMark: 5 },
    { subject: "Sentence Formation", average: 4.1, fullMark: 5 },
  ]

  const recentReports = [
    {
      id: "1",
      studentName: "Arjun Patel",
      date: "Dec 15, 2024",
      educator: "Priya Sharma",
      term: "Term 2",
    },
    {
      id: "2",
      studentName: "Meera Singh",
      date: "Dec 14, 2024",
      educator: "Rahul Verma",
      term: "Term 2",
    },
    {
      id: "3",
      studentName: "Vikram Malhotra",
      date: "Dec 12, 2024",
      educator: "Anita Desai",
      term: "Term 2",
    },
    {
      id: "4",
      studentName: "Neha Gupta",
      date: "Dec 10, 2024",
      educator: "Priya Sharma",
      term: "Term 2",
    },
  ]

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("assessmentReports")}</h2>
          <p className="text-muted-foreground">Overview of student assessment reports and analytics</p>
        </div>
        <div className="flex gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            {t("filter")}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setReportType}>
          <div className="flex gap-2 w-full md:w-auto mt-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="term">Current Term</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
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
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {studentAssessmentData.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.name} Skills</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.average.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">Average score out of 5</p>
                    <div className="mt-2 flex items-center text-xs text-green-500">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      <span>{item.improvement}% increase from previous term</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Skill Distribution</CardTitle>
                  <CardDescription>Distribution of skill levels across all students</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={skillDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {skillDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value}%`, name]}
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
                  <CardTitle>Term Progress</CardTitle>
                  <CardDescription>Average skill scores by term</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={studentProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="communication" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="cognition" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="functional" stroke="#ffc658" />
                        <Line type="monotone" dataKey="academics" stroke="#ff8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Assessment Reports</CardTitle>
                <CardDescription>Recently submitted student assessment reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-muted p-2">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{report.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {report.term} • {report.date} • By {report.educator}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/dashboard/admin/reports/student/${report.id}`}>View</a>
                        </Button>
                        
\

