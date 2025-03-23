"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, FileText, Filter, PieChart, Share2, TrendingUp, ArrowUpRight } from "lucide-react"
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
} from "recharts"

export default function ReportsPage() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("year")
  const [programFilter, setProgramFilter] = useState("all")
  const [reportType, setReportType] = useState("overview")

  // Filter data based on selected filters
  const filteredData = {
    studentGrowth: studentGrowthData.filter(
      (item) =>
        timeRange === "all" || item.period.includes(timeRange === "year" ? "2023" : timeRange === "quarter" ? "Q" : ""),
    ),
    programDistribution:
      programFilter === "all"
        ? programDistributionData
        : programDistributionData.filter((item) => item.name.toLowerCase().includes(programFilter.toLowerCase())),
    completionRates: completionRatesData.filter(
      (item) => programFilter === "all" || item.name.toLowerCase().includes(programFilter.toLowerCase()),
    ),
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("reports")}</h2>
          <p className="text-muted-foreground">Generate insights and visualize your impact</p>
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
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
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
                <SelectItem value="financial">Financial Literacy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Impact</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,856</div>
                  <p className="text-xs text-muted-foreground">Lives impacted across all programs</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>12% increase</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Program Success Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">Average completion rate</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>5% increase</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                  <div className="mt-2 flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>18% increase</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Impact by Program</CardTitle>
                  <CardDescription>Distribution of impact across different programs</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={filteredData.programDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {filteredData.programDistribution.map((entry, index) => (
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
                  <CardTitle>Monthly Progress</CardTitle>
                  <CardDescription>Program completion trends over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData.studentGrowth}>
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
                        <Line type="monotone" dataKey="completion" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Access your recently generated reports</CardDescription>
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
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">Generated on {report.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Growth Trends</CardTitle>
                <CardDescription>Enrollment and retention metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
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
                      <Area type="monotone" dataKey="students" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="graduates" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="dropouts" stackId="3" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Student Demographics</CardTitle>
                  <CardDescription>Distribution by age, gender, and location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={demographicsData}>
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
                        <Bar dataKey="male" fill="#8884d8" />
                        <Bar dataKey="female" fill="#82ca9d" />
                        <Bar dataKey="other" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>Average scores across different programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" />
                        <Bar dataKey="average" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Program Effectiveness</CardTitle>
                <CardDescription>Impact and outcomes of different programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={programEffectivenessData}>
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
                      <Bar dataKey="completion" fill="#8884d8" />
                      <Bar dataKey="employment" fill="#82ca9d" />
                      <Bar dataKey="satisfaction" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Allocation</CardTitle>
                  <CardDescription>How resources are distributed across programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={resourceAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {resourceAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
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

              <Card>
                <CardHeader>
                  <CardTitle>Program Growth</CardTitle>
                  <CardDescription>Enrollment trends by program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={programGrowthData}>
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
                        <Line type="monotone" dataKey="digital" stroke="#8884d8" />
                        <Line type="monotone" dataKey="vocational" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="community" stroke="#ffc658" />
                        <Line type="monotone" dataKey="health" stroke="#ff8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Create customized reports for your specific needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <PieChart className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Create a Custom Report</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                      Select metrics, filters, and visualization types to generate a custom report tailored to your
                      needs.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Select Metrics
                      </Button>
                      <Button>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Build Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saved Custom Reports</CardTitle>
                <CardDescription>Your previously created custom reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedCustomReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-muted p-2">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">Created on {report.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
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

