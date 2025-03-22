import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, Clock, FileText, MessageSquare, Star, Trophy } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, Arjun!</h2>
          <p className="text-muted-foreground">Track your progress and stay connected with your teachers.</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message Teacher
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">You're doing great! Keep up the good work.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">Digital Literacy, Communication Skills, Life Skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-2">Due in the next 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-2">Tomorrow at 10:00 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Current Courses */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your enrolled courses and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <CourseCard
              title="Digital Literacy"
              progress={85}
              teacher="Priya Sharma"
              nextSession="Tomorrow, 10:00 AM"
              image="/placeholder.svg?height=40&width=40"
            />
            <CourseCard
              title="Communication Skills"
              progress={65}
              teacher="Rahul Verma"
              nextSession="Wednesday, 2:00 PM"
              image="/placeholder.svg?height=40&width=40"
            />
            <CourseCard
              title="Life Skills"
              progress={40}
              teacher="Anita Desai"
              nextSession="Friday, 11:00 AM"
              image="/placeholder.svg?height=40&width=40"
            />
          </CardContent>
        </Card>

        {/* Teacher Messages */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Messages from Teachers</CardTitle>
            <CardDescription>Recent communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">Priya Sharma</p>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm">
                  Great job on your last assignment! I've added some feedback for you to review.
                </p>
                <Button variant="link" className="h-auto p-0 text-primary" asChild>
                  <Link href="/dashboard/student/messages">Reply</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>RV</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">Rahul Verma</p>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-sm">Don't forget to prepare for our group discussion in the next session.</p>
                <Button variant="link" className="h-auto p-0 text-primary" asChild>
                  <Link href="/dashboard/student/messages">Reply</Link>
                </Button>
              </div>
            </div>

            <Button className="w-full mt-2" variant="outline" asChild>
              <Link href="/dashboard/student/messages">View All Messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>Your sessions for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Digital Literacy Session</div>
                <div className="text-sm text-muted-foreground">With Priya Sharma</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Tomorrow</div>
                <div className="text-sm text-muted-foreground">10:00 - 11:30 AM</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Communication Skills Workshop</div>
                <div className="text-sm text-muted-foreground">With Rahul Verma</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Wednesday</div>
                <div className="text-sm text-muted-foreground">2:00 - 4:00 PM</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Life Skills Training</div>
                <div className="text-sm text-muted-foreground">With Anita Desai</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Friday</div>
                <div className="text-sm text-muted-foreground">11:00 AM - 12:30 PM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CourseCard({
  title,
  progress,
  teacher,
  nextSession,
  image,
}: {
  title: string
  progress: number
  teacher: string
  nextSession: string
  image: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
        <BookOpen className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm">{progress}%</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={image} />
              <AvatarFallback>
                {teacher
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{teacher}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{nextSession}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

