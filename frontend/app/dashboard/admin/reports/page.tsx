"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, FileText, Filter, PieChart, Share2, TrendingUp, ArrowUpRight } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

// export default function ReportsPage() {
//   const { t } = useLanguage()
//   const [timeRange, setTimeRange] = useState("year")
//   const [programFilter, setProgramFilter] = useState("all")
//   const [reportType, setReportType] = useState("overview")


export default function ReportsPage() {
  console.log("ReportsPage rendering") // Debug: Check if the component renders
  
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("year")
  const [programFilter, setProgramFilter] = useState("all")
  const [reportType, setReportType] = useState("overview")
  const [programData, setProgramData] = useState([]) // Store API data
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/admins/dashboard");
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("API fetch error:", error);
    }
  };
      
  const programEffectivenessData = programData.map((program) => ({
    name: program.ProgramName,
    Active: program.Active, // Using "Active" for completion
    Graduated: program.Graduated, // Using "Graduated" for employment
    Discontinued: program.Discontinued, // Using "Discontinued" for satisfaction
  }))
  
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
  
  useEffect(() => {
    console.log("useEffect triggered") // Debug: Check if useEffect is running
    
    const fetchData = async () => {
      try {
        console.log("Fetching data...") // Debug: Check if the fetch function is called
        const response = await fetch("http://127.0.0.1:5000/admins/get-students-per-program")

        if (!response.ok) throw new Error("Failed to fetch data")
        
        const data = await response.json()
        setProgramData(data)
        console.log("Data fetched successfully:", data) // Debug: Check fetched data
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Runs only once when the component mounts

  if (typeof window === "undefined") {
    console.log("Component is rendering on the server") // Debug: SSR issue
  } else {
    console.log("Component is rendering on the client")
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("Reports")}</h2>
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
        <Tabs defaultValue="students" className="w-full" onValueChange={setReportType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-4 mt-4">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Improvement in TPS scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  {dashboardData?.student_performance && dashboardData.student_performance.length > 0 ? (
                    <BarChart data={dashboardData.student_performance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="term1" name="Term 1" fill="#8884d8" />
                      <Bar dataKey="term2" name="Term 2" fill="#82ca9d" />
                    </BarChart>
                  ) : (
                    <p>Loading chart data...</p>
                  )}
                </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
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
                      <Bar dataKey="Active" fill="#8884d8" />
                      <Bar dataKey="Graduated" fill="#82ca9d" />
                      <Bar dataKey="Discontinued" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div>
        <CardTitle>Program Distribution</CardTitle>
        <CardDescription>Students enrolled by program</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {dashboardData?.students_enrolled_programwise?.length > 0 ? (
            <RePieChart>
              <Pie
                data={dashboardData.students_enrolled_programwise}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {dashboardData.students_enrolled_programwise.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend />
            </RePieChart>
          ) : (
            <p>Loading chart data...</p>
          )}
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div>
        <CardTitle>Impact by Program</CardTitle>
        <CardDescription>Students graduated programwise</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] w-full">
        {dashboardData?.students_graduated_programwise?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dashboardData.students_graduated_programwise}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" fill="hsl(var(--primary))" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading chart data...</p>
        )}
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

// const programEffectivenessData = [
//   { name: "Digital Literacy", completion: 85, employment: 70, satisfaction: 90 },
//   { name: "Vocational Training", completion: 78, employment: 85, satisfaction: 82 },
//   { name: "Community Leadership", completion: 82, employment: 65, satisfaction: 88 },
//   { name: "Health & Wellness", completion: 88, employment: 60, satisfaction: 92 },
//   { name: "Financial Literacy", completion: 75, employment: 72, satisfaction: 80 },
// ]

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
