import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Plus } from "lucide-react"

export default function TeacherSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">Manage your teaching schedule and sessions</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Today's Sessions</CardTitle>
            <CardDescription>Your teaching sessions for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Digital Literacy</div>
                  <div className="text-sm text-muted-foreground">Group Session</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">10:00 AM</div>
                  <div className="text-sm text-muted-foreground">90 min</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">One-on-One Session</div>
                  <div className="text-sm text-muted-foreground">with Arjun Patel</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">2:00 PM</div>
                  <div className="text-sm text-muted-foreground">45 min</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Digital Literacy</div>
                  <div className="text-sm text-muted-foreground">Advanced Group</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">4:00 PM</div>
                  <div className="text-sm text-muted-foreground">90 min</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your teaching sessions for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Digital Literacy</div>
                  <div className="text-sm text-muted-foreground">Group Session</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Tomorrow</div>
                  <div className="text-sm text-muted-foreground">10:00 AM</div>
                </div>
                <div className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">One-on-One Session</div>
                  <div className="text-sm text-muted-foreground">with Meera Singh</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Wednesday</div>
                  <div className="text-sm text-muted-foreground">1:00 PM</div>
                </div>
                <div className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Digital Literacy</div>
                  <div className="text-sm text-muted-foreground">Advanced Group</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Friday</div>
                  <div className="text-sm text-muted-foreground">4:00 PM</div>
                </div>
                <div className="text-right">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

