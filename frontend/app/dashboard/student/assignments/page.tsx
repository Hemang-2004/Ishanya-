import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Assignments</h2>
        <p className="text-muted-foreground">View and manage your assignments</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Excel Formulas Practice</CardTitle>
                <CardDescription>Digital Literacy</CardDescription>
              </div>
              <Badge>Due: Mar 25, 2023</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a spreadsheet that demonstrates your understanding of basic Excel formulas including SUM, AVERAGE,
              COUNT, and IF statements.
            </p>
            <div className="flex justify-end">
              <Button>Submit Assignment</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>PowerPoint Presentation</CardTitle>
                <CardDescription>Digital Literacy</CardDescription>
              </div>
              <Badge>Due: Apr 5, 2023</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a 5-slide presentation about a topic of your choice, demonstrating your skills with PowerPoint.
            </p>
            <div className="flex justify-end">
              <Button>Submit Assignment</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Word Document Formatting</CardTitle>
                <CardDescription>Digital Literacy</CardDescription>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Format a document according to the provided guidelines, demonstrating your skills with Microsoft Word.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Grade: A</span>
              <Button variant="outline">View Feedback</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

