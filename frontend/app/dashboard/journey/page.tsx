import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Calendar, ChevronRight, Clock, Filter, Search, Star, TrendingUp, Users } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function JourneyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Journey Tracker</h2>
          <p className="text-muted-foreground">Track progress and milestones for all stakeholders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Award className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Journeys</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestones Achieved</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2 mo</div>
            <p className="text-xs text-muted-foreground">-1.5 months from last year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journey Progress</CardTitle>
          <CardDescription>Track individual and program progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="individuals" className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="individuals">Individuals</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="pl-8 w-[200px] lg:w-[300px]" />
                </div>
              </div>
            </div>

            <TabsContent value="individuals">
              <div className="space-y-4">
                {journeyData.map((journey) => (
                  <JourneyCard key={journey.id} journey={journey} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="programs">
              <div className="space-y-4">
                {programData.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="milestones">
              <div className="space-y-4">
                {milestoneData.map((milestone) => (
                  <MilestoneCard key={milestone.id} milestone={milestone} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function JourneyCard({ journey }: { journey: any }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={journey.avatar} />
              <AvatarFallback>{journey.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{journey.name}</div>
              <div className="text-sm text-muted-foreground">{journey.program}</div>
            </div>
          </div>
          <Badge variant={getStatusBadge(journey.status)}>{journey.status}</Badge>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm font-medium">Overall Progress</div>
              <div className="text-sm text-muted-foreground">{journey.progress}%</div>
            </div>
            <Progress value={journey.progress} className="h-2" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>Started: {journey.startDate}</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProgramCard({ program }: { program: any }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium">{program.name}</div>
            <div className="text-sm text-muted-foreground">{program.participants} participants</div>
          </div>
          <Badge variant="outline">{program.category}</Badge>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm font-medium">Program Completion</div>
              <div className="text-sm text-muted-foreground">{program.completion}%</div>
            </div>
            <Progress value={program.completion} className="h-2" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{program.duration}</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View Program
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MilestoneCard({ milestone }: { milestone: any }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium">{milestone.name}</div>
            <div className="text-sm text-muted-foreground">{milestone.program}</div>
          </div>
          <Badge variant={milestone.achieved ? "success" : "secondary"}>
            {milestone.achieved ? "Achieved" : "In Progress"}
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="text-sm">
            <p>{milestone.description}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Award className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{milestone.achievedCount} achieved</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function for status badge
function getStatusBadge(status: string) {
  switch (status) {
    case "On Track":
      return "success"
    case "At Risk":
      return "warning"
    case "Behind":
      return "destructive"
    case "Completed":
      return "default"
    default:
      return "secondary"
  }
}

// Sample data
const journeyData = [
  {
    id: "1",
    name: "Ananya Desai",
    initials: "AD",
    avatar: "/placeholder.svg?height=40&width=40",
    program: "Digital Literacy Program",
    status: "On Track",
    progress: 65,
    startDate: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Rajesh Verma",
    initials: "RV",
    avatar: "/placeholder.svg?height=40&width=40",
    program: "Vocational Training",
    status: "At Risk",
    progress: 32,
    startDate: "Mar 10, 2023",
  },
  {
    id: "3",
    name: "Meera Joshi",
    initials: "MJ",
    avatar: "/placeholder.svg?height=40&width=40",
    program: "Community Leadership",
    status: "Completed",
    progress: 100,
    startDate: "Nov 5, 2022",
  },
]

const programData = [
  {
    id: "1",
    name: "Digital Literacy Program",
    category: "Education",
    participants: 124,
    completion: 68,
    duration: "Jan - Dec 2023",
  },
  {
    id: "2",
    name: "Vocational Training",
    category: "Skills",
    participants: 86,
    completion: 45,
    duration: "Mar 2023 - Feb 2024",
  },
  {
    id: "3",
    name: "Community Leadership",
    category: "Leadership",
    participants: 38,
    completion: 92,
    duration: "Apr - Oct 2023",
  },
]

const milestoneData = [
  {
    id: "1",
    name: "Basic Computer Skills",
    program: "Digital Literacy Program",
    achieved: true,
    achievedCount: 98,
    description: "Ability to operate a computer, use basic software, and navigate the internet safely.",
  },
  {
    id: "2",
    name: "Job Readiness",
    program: "Vocational Training",
    achieved: false,
    achievedCount: 42,
    description: "Preparation for job interviews, resume building, and workplace etiquette.",
  },
  {
    id: "3",
    name: "Community Project",
    program: "Community Leadership",
    achieved: true,
    achievedCount: 35,
    description: "Planning and executing a community improvement project with measurable impact.",
  },
]

