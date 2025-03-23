"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  DollarSign,
  Download,
  Mail,
  Plus,
  Share2,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  FileText,
  Send,
} from "lucide-react"

export default function FundsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("year")
  const [fundType, setFundType] = useState("all")
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
    selectedDonors: [],
  })

  const handleEmailFormChange = (field: string, value: any) => {
    setEmailForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDonorSelection = (id: string, checked: boolean) => {
    if (checked) {
      setEmailForm((prev) => ({
        ...prev,
        selectedDonors: [...prev.selectedDonors, id],
      }))
    } else {
      setEmailForm((prev) => ({
        ...prev,
        selectedDonors: prev.selectedDonors.filter((donorId) => donorId !== id),
      }))
    }
  }

  const handleSendEmail = () => {
    toast({
      title: "Email sent successfully",
      description: `Email sent to ${emailForm.selectedDonors.length} donors.`,
    })
    setEmailDialogOpen(false)
    setEmailForm({
      subject: "",
      message: "",
      selectedDonors: [],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Funds Management</h2>
          <p className="text-muted-foreground">Track, manage, and analyze your organization's finances</p>
        </div>
        <div className="flex gap-2">
          <LanguageSwitcher />
          <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Contact Donors
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Contact Previous Donors</DialogTitle>
                <DialogDescription>
                  Send an email to previous donors requesting support for your programs.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={emailForm.subject}
                    onChange={(e) => handleEmailFormChange("subject", e.target.value)}
                    placeholder="Support Request for Ishanya Connect Programs"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={emailForm.message}
                    onChange={(e) => handleEmailFormChange("message", e.target.value)}
                    placeholder="Dear Donor, We are reaching out to request your continued support for our educational initiatives..."
                    className="min-h-[150px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Select Donors</Label>
                  <div className="border rounded-md p-3 max-h-[150px] overflow-y-auto">
                    {previousDonors.map((donor) => (
                      <div key={donor.id} className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id={`donor-${donor.id}`}
                          checked={emailForm.selectedDonors.includes(donor.id)}
                          onCheckedChange={(checked) => handleDonorSelection(donor.id, checked as boolean)}
                        />
                        <Label htmlFor={`donor-${donor.id}`} className="flex-1 cursor-pointer">
                          {donor.name} ({donor.email})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSendEmail}
                  disabled={!emailForm.subject || !emailForm.message || emailForm.selectedDonors.length === 0}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <div className="flex gap-4 items-center">
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

          <Select defaultValue={fundType} onValueChange={setFundType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by fund type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Funds</SelectItem>
              <SelectItem value="donations">Donations</SelectItem>
              <SelectItem value="grants">Grants</SelectItem>
              <SelectItem value="corporate">Corporate Sponsorships</SelectItem>
              <SelectItem value="events">Event Fundraising</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Funds Raised</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹24,56,789</div>
                <p className="text-xs text-muted-foreground">Financial Year 2023-24</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>18% increase from last year</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹18,75,432</div>
                <p className="text-xs text-muted-foreground">Financial Year 2023-24</p>
                <div className="mt-2 flex items-center text-xs text-yellow-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>12% increase from last year</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">Active donors this year</p>
                <div className="mt-2 flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>24 new donors this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fund Utilization</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76.4%</div>
                <p className="text-xs text-muted-foreground">Of total funds utilized</p>
                <div className="mt-2 flex items-center text-xs text-blue-500">
                  <span>Efficient resource allocation</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Funds Overview</CardTitle>
                <CardDescription>Monthly funds raised vs expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fundsOverviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="raised" name="Funds Raised" fill="#8884d8" />
                      <Bar dataKey="expenses" name="Expenses" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Funding Sources</CardTitle>
                <CardDescription>Distribution by source type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fundingSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {fundingSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Fundraising Events</CardTitle>
              <CardDescription>Schedule of planned fundraising activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fundraisingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{event.date}</div>
                      <div className="text-sm text-muted-foreground">Target: ₹{event.target.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest contributions to your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{donation.donor}</div>
                        <div className="text-sm text-muted-foreground">
                          {donation.date} • {donation.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{donation.amount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{donation.program}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={donationTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="individual" name="Individual Donations" stroke="#8884d8" />
                      <Line type="monotone" dataKey="corporate" name="Corporate Donations" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="grants" name="Grants" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Donors</CardTitle>
                <CardDescription>Highest contributors to your cause</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonors.map((donor, index) => (
                    <div key={donor.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <span className="font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{donor.name}</div>
                          <div className="text-sm text-muted-foreground">{donor.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{donor.totalDonated.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{donor.donationCount} donations</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>How funds are being utilized across programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>Expense trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyExpensesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="programExpenses" name="Program Expenses" fill="#8884d8" />
                      <Bar dataKey="adminExpenses" name="Administrative Expenses" fill="#82ca9d" />
                      <Bar dataKey="fundraisingExpenses" name="Fundraising Expenses" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Latest expenditures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{expense.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {expense.date} • {expense.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{expense.program}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Access and download financial statements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">Generated on {report.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Financial Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Program Expense Ratio</div>
                      <div className="text-sm text-muted-foreground">Percentage of expenses on programs</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">82.5%</div>
                      <div className="text-xs text-muted-foreground">Industry avg: 75%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Fundraising Efficiency</div>
                      <div className="text-sm text-muted-foreground">Cost to raise ₹1</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">₹0.12</div>
                      <div className="text-xs text-muted-foreground">Industry avg: ₹0.20</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Working Capital Ratio</div>
                      <div className="text-sm text-muted-foreground">Current assets to liabilities</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">3.2</div>
                      <div className="text-xs text-muted-foreground">Industry avg: 2.0</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Donor Retention Rate</div>
                      <div className="text-sm text-muted-foreground">Percentage of donors who give again</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">68%</div>
                      <div className="text-xs text-muted-foreground">Industry avg: 45%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
                <CardDescription>Comparison of planned vs actual expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetVsActualData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#8884d8" />
                      <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

const fundsOverviewData = [
  { name: "Jan", raised: 250000, expenses: 180000 },
  { name: "Feb", raised: 300000, expenses: 220000 },
  { name: "Mar", raised: 280000, expenses: 210000 },
  { name: "Apr", raised: 320000, expenses: 240000 },
  { name: "May", raised: 350000, expenses: 260000 },
  { name: "Jun", raised: 400000, expenses: 300000 },
  { name: "Jul", raised: 380000, expenses: 290000 },
  { name: "Aug", raised: 420000, expenses: 310000 },
  { name: "Sep", raised: 450000, expenses: 330000 },
  { name: "Oct", raised: 480000, expenses: 350000 },
  { name: "Nov", raised: 520000, expenses: 380000 },
  { name: "Dec", raised: 600000, expenses: 420000 },
]

const fundingSourcesData = [
  { name: "Individual Donations", value: 1250000 },
  { name: "Corporate Sponsorships", value: 850000 },
  { name: "Government Grants", value: 650000 },
  { name: "Fundraising Events", value: 450000 },
  { name: "Foundation Grants", value: 350000 },
]

const fundraisingEvents = [
  {
    id: "1",
    title: "Annual Charity Gala",
    description: "Formal dinner and auction to raise funds for educational programs",
    date: "August 15, 2023",
    target: 500000,
  },
  {
    id: "2",
    title: "Corporate Partnership Drive",
    description: "Outreach to local businesses for sponsorship opportunities",
    date: "September 5-20, 2023",
    target: 750000,
  },
  {
    id: "3",
    title: "Community Fun Run",
    description: "5K charity run with registration fees supporting our programs",
    date: "October 8, 2023",
    target: 300000,
  },
]

const recentDonations = [
  {
    id: "1",
    donor: "Tata Consultancy Services",
    amount: 250000,
    date: "July 12, 2023",
    type: "Corporate Donation",
    program: "Digital Literacy Program",
  },
  {
    id: "2",
    donor: "Rajesh Mehta",
    amount: 50000,
    date: "July 10, 2023",
    type: "Individual Donation",
    program: "Vocational Training",
  },
  {
    id: "3",
    donor: "Infosys Foundation",
    amount: 180000,
    date: "July 5, 2023",
    type: "Foundation Grant",
    program: "General Fund",
  },
  {
    id: "4",
    donor: "Reliance Industries",
    amount: 300000,
    date: "June 28, 2023",
    type: "Corporate Donation",
    program: "Community Leadership Initiative",
  },
  {
    id: "5",
    donor: "Aditya Birla Group",
    amount: 200000,
    date: "June 20, 2023",
    type: "Corporate Donation",
    program: "Health & Wellness Program",
  },
]

const donationTrendsData = [
  { name: "Jan", individual: 120000, corporate: 180000, grants: 90000 },
  { name: "Feb", individual: 140000, corporate: 200000, grants: 85000 },
  { name: "Mar", individual: 130000, corporate: 190000, grants: 100000 },
  { name: "Apr", individual: 150000, corporate: 210000, grants: 95000 },
  { name: "May", individual: 160000, corporate: 230000, grants: 110000 },
  { name: "Jun", individual: 180000, corporate: 250000, grants: 120000 },
]

const topDonors = [
  {
    id: "1",
    name: "Tata Consultancy Services",
    type: "Corporate",
    totalDonated: 1250000,
    donationCount: 5,
  },
  {
    id: "2",
    name: "Reliance Foundation",
    type: "Foundation",
    totalDonated: 950000,
    donationCount: 3,
  },
  {
    id: "3",
    name: "Infosys Limited",
    type: "Corporate",
    totalDonated: 850000,
    donationCount: 4,
  },
  {
    id: "4",
    name: "Rajesh Mehta",
    type: "Individual",
    totalDonated: 450000,
    donationCount: 8,
  },
  {
    id: "5",
    name: "Mahindra Group",
    type: "Corporate",
    totalDonated: 650000,
    donationCount: 3,
  },
]

const expenseBreakdownData = [
  { name: "Program Services", value: 1250000 },
  { name: "Administrative", value: 350000 },
  { name: "Fundraising", value: 250000 },
  { name: "Staff Salaries", value: 650000 },
  { name: "Infrastructure", value: 450000 },
  { name: "Technology", value: 200000 },
]

const monthlyExpensesData = [
  { name: "Jan", programExpenses: 140000, adminExpenses: 30000, fundraisingExpenses: 20000 },
  { name: "Feb", programExpenses: 160000, adminExpenses: 35000, fundraisingExpenses: 25000 },
  { name: "Mar", programExpenses: 150000, adminExpenses: 32000, fundraisingExpenses: 22000 },
  { name: "Apr", programExpenses: 170000, adminExpenses: 38000, fundraisingExpenses: 28000 },
  { name: "May", programExpenses: 180000, adminExpenses: 40000, fundraisingExpenses: 30000 },
  { name: "Jun", programExpenses: 200000, adminExpenses: 45000, fundraisingExpenses: 35000 },
]

const recentExpenses = [
  {
    id: "1",
    description: "Teacher Training Workshop",
    amount: 85000,
    date: "July 8, 2023",
    category: "Program Expense",
    program: "Digital Literacy Program",
  },
  {
    id: "2",
    description: "Office Rent - Q3",
    amount: 120000,
    date: "July 1, 2023",
    category: "Administrative",
    program: "General Operations",
  },
  {
    id: "3",
    description: "Computer Lab Equipment",
    amount: 180000,
    date: "June 25, 2023",
    category: "Infrastructure",
    program: "Digital Literacy Program",
  },
  {
    id: "4",
    description: "Staff Salaries - June",
    amount: 250000,
    date: "June 30, 2023",
    category: "Staff",
    program: "All Programs",
  },
  {
    id: "5",
    description: "Marketing Materials",
    amount: 45000,
    date: "June 20, 2023",
    category: "Fundraising",
    program: "Fundraising Campaign",
  },
]

const financialReports = [
  {
    id: "1",
    title: "Annual Financial Statement 2022-23",
    date: "April 15, 2023",
  },
  {
    id: "2",
    title: "Q1 2023 Financial Report",
    date: "April 30, 2023",
  },
  {
    id: "3",
    title: "Q2 2023 Financial Report",
    date: "July 15, 2023",
  },
  {
    id: "4",
    title: "Donor Impact Report 2023",
    date: "June 10, 2023",
  },
  {
    id: "5",
    title: "Program Expense Analysis",
    date: "May 22, 2023",
  },
]

const budgetVsActualData = [
  { name: "Q1", budget: 750000, actual: 720000 },
  { name: "Q2", budget: 850000, actual: 880000 },
  { name: "Q3", budget: 900000, actual: 850000 },
  { name: "Q4", budget: 950000, actual: 980000 },
]

const previousDonors = [
  {
    id: "1",
    name: "Rajesh Mehta",
    email: "rajesh.mehta@example.com",
    lastDonation: "₹50,000",
    lastDonationDate: "July 10, 2023",
  },
  {
    id: "2",
    name: "Tata Consultancy Services",
    email: "csr@tcs.example.com",
    lastDonation: "₹250,000",
    lastDonationDate: "July 12, 2023",
  },
  {
    id: "3",
    name: "Infosys Foundation",
    email: "foundation@infosys.example.com",
    lastDonation: "₹180,000",
    lastDonationDate: "July 5, 2023",
  },
  {
    id: "4",
    name: "Reliance Industries",
    email: "csr@reliance.example.com",
    lastDonation: "₹300,000",
    lastDonationDate: "June 28, 2023",
  },
  {
    id: "5",
    name: "Aditya Birla Group",
    email: "csr@adityabirla.example.com",
    lastDonation: "₹200,000",
    lastDonationDate: "June 20, 2023",
  },
  {
    id: "6",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    lastDonation: "₹25,000",
    lastDonationDate: "June 15, 2023",
  },
  {
    id: "7",
    name: "Mahindra Group",
    email: "csr@mahindra.example.com",
    lastDonation: "₹150,000",
    lastDonationDate: "May 28, 2023",
  },
]

