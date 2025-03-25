import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  LineChart,
  Sparkles,
  Star,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react"

export default function StudentProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Progress Tracker</h2>
          <p className="text-muted-foreground">Track your learning journey and achievements</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Target className="mr-2 h-4 w-4" />
            Set New Goals
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Overall Progress</p>
                <p className="text-3xl font-bold">68%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <Progress value={68} className="h-2 mt-4 bg-blue-200 dark:bg-blue-900" />
            <p className="text-xs text-muted-foreground mt-2">You're making steady progress! Keep going.</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Modules Completed</p>
                <p className="text-3xl font-bold">12/20</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <Progress value={60} className="h-2 mt-4 bg-green-200 dark:bg-green-900" />
            <p className="text-xs text-muted-foreground mt-2">8 more modules to complete your current track.</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Achievements</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex gap-1 mt-4">
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
              >
                <Star className="h-3 w-3 mr-1" /> Fast Learner
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
              >
                <Sparkles className="h-3 w-3 mr-1" /> +4 more
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Earned 2 new badges in the last month!</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills Development</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your progress across all enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <span className="font-medium">Digital Literacy</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Last activity: 2 days ago
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>17/20 lessons completed</span>
                    <span>3 lessons remaining</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <span className="font-medium">Communication Skills</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Last activity: Yesterday
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>13/20 lessons completed</span>
                    <span>7 lessons remaining</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <span className="font-medium">Life Skills</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Last activity: 5 days ago
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>8/20 lessons completed</span>
                    <span>12 lessons remaining</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <span className="font-medium">Financial Literacy</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Last activity: 1 week ago
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5/20 lessons completed</span>
                    <span>15 lessons remaining</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Modules</CardTitle>
                <CardDescription>Modules you have successfully completed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-medium">Introduction to Computers</span>
                      <div className="text-xs text-muted-foreground">Completed on: Jan 15, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      100%
                    </Badge>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-medium">Internet Basics</span>
                      <div className="text-xs text-muted-foreground">Completed on: Feb 3, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      95%
                    </Badge>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-medium">Basic Communication</span>
                      <div className="text-xs text-muted-foreground">Completed on: Feb 28, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      90%
                    </Badge>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-medium">Microsoft Office Basics</span>
                      <div className="text-xs text-muted-foreground">Completed on: Mar 15, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      88%
                    </Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Modules</CardTitle>
                <CardDescription>Modules you need to complete next</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <span className="font-medium">Microsoft Office Advanced</span>
                      <div className="text-xs text-muted-foreground">Due date: Apr 30, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto bg-blue-50 dark:bg-blue-900/30">
                      In Progress
                    </Badge>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <span className="font-medium">Email and Communication</span>
                      <div className="text-xs text-muted-foreground">Due date: May 15, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto bg-blue-50 dark:bg-blue-900/30">
                      In Progress
                    </Badge>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    <div>
                      <span className="font-medium">Online Safety</span>
                      <div className="text-xs text-muted-foreground">Starts on: May 20, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto bg-amber-50 dark:bg-amber-900/30">
                      Upcoming
                    </Badge>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    <div>
                      <span className="font-medium">Digital Citizenship</span>
                      <div className="text-xs text-muted-foreground">Starts on: Jun 5, 2023</div>
                    </div>
                    <Badge variant="outline" className="ml-auto bg-amber-50 dark:bg-amber-900/30">
                      Upcoming
                    </Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Track your progress in key skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Computer Proficiency</span>
                    <span>Advanced (Level 4/5)</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You've demonstrated strong skills in computer usage and troubleshooting.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Digital Communication</span>
                    <span>Intermediate (Level 3/5)</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You're comfortable with email and basic online communication tools.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Information Literacy</span>
                    <span>Intermediate (Level 3/5)</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can find and evaluate information from digital sources effectively.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Problem Solving</span>
                    <span>Developing (Level 2/5)</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You're building skills in analyzing and solving technical problems.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Digital Creation</span>
                    <span>Beginner (Level 1/5)</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 rounded-full bg-primary flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                    <div className="h-2 rounded-full bg-muted flex-1"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You're just starting to learn how to create digital content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Skill Development</CardTitle>
              <CardDescription>Based on your progress and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Data Analysis Fundamentals</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn to analyze and interpret data using spreadsheets
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Explore
                  </Button>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Advanced Communication</h4>
                    <p className="text-sm text-muted-foreground">
                      Develop professional communication skills for the workplace
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Explore
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-bold text-lg">Fast Learner</h3>
                <p className="text-sm text-muted-foreground mt-2">Completed 5 modules in your first month</p>
                <Badge className="mt-4 bg-amber-200 text-amber-700 dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-300">
                  Earned on Jan 30, 2023
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg">Digital Explorer</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Completed all Internet Basics modules with 90%+ score
                </p>
                <Badge className="mt-4 bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-300">
                  Earned on Feb 15, 2023
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-lg">Perfect Attendance</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Attended all scheduled sessions for 3 consecutive months
                </p>
                <Badge className="mt-4 bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-300">
                  Earned on Mar 1, 2023
                </Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
              <CardDescription>Badges and achievements you're working towards</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center opacity-50">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Digital Master</h4>
                    <p className="text-sm text-muted-foreground">Complete all Digital Literacy modules</p>
                    <Progress value={85} className="h-2 mt-2" />
                  </div>
                  <Badge variant="outline">85%</Badge>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center opacity-50">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Communication Pro</h4>
                    <p className="text-sm text-muted-foreground">Score 90%+ on all Communication Skills assessments</p>
                    <Progress value={65} className="h-2 mt-2" />
                  </div>
                  <Badge variant="outline">65%</Badge>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center opacity-50">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Life Skills Champion</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete all Life Skills modules and practical assignments
                    </p>
                    <Progress value={40} className="h-2 mt-2" />
                  </div>
                  <Badge variant="outline">40%</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Learning Timeline</CardTitle>
          <CardDescription>Your learning journey over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-muted"></div>
            <ul className="space-y-6 relative">
              <li className="ml-6">
                <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <Badge variant="outline" className="w-fit">
                    April 2023
                  </Badge>
                  <h4 className="font-medium">Started Microsoft Office Advanced</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Began learning advanced features of Microsoft Office suite
                </p>
              </li>
              <li className="ml-6">
                <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <Badge variant="outline" className="w-fit">
                    March 2023
                  </Badge>
                  <h4 className="font-medium">Completed Microsoft Office Basics</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Mastered the fundamentals of Word, Excel, and PowerPoint
                </p>
              </li>
              <li className="ml-6">
                <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <Badge variant="outline" className="w-fit">
                    February 2023
                  </Badge>
                  <h4 className="font-medium">Completed Internet Basics & Basic Communication</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Learned web browsing, search techniques, and online communication
                </p>
              </li>
              <li className="ml-6">
                <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <Badge variant="outline" className="w-fit">
                    January 2023
                  </Badge>
                  <h4 className="font-medium">Started Digital Literacy Program</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Began learning journey with Introduction to Computers
                </p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

