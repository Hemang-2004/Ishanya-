import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
        <p className="text-muted-foreground">View your upcoming classes and events</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
            <CardDescription>Your schedule for the current week</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Next Week</CardTitle>
            <CardDescription>Your schedule for next week</CardDescription>
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
                  <div className="font-medium">Digital Literacy Session</div>
                  <div className="text-sm text-muted-foreground">With Priya Sharma</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Monday</div>
                  <div className="text-sm text-muted-foreground">10:00 - 11:30 AM</div>
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
                  <div className="font-medium">Communication Skills Workshop</div>
                  <div className="text-sm text-muted-foreground">With Rahul Verma</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Wednesday</div>
                  <div className="text-sm text-muted-foreground">2:00 - 4:00 PM</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

