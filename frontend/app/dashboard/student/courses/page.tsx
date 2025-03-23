export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Courses</h2>
        <p className="text-muted-foreground">View and manage your enrolled courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course cards will be displayed here */}
        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-xl font-medium mb-2">Digital Literacy</h3>
          <p className="text-muted-foreground mb-4">Learn essential computer skills for the modern world</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress: 85%</span>
            <button className="text-primary text-sm font-medium">Continue</button>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-xl font-medium mb-2">Communication Skills</h3>
          <p className="text-muted-foreground mb-4">Develop effective verbal and written communication</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress: 65%</span>
            <button className="text-primary text-sm font-medium">Continue</button>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-xl font-medium mb-2">Life Skills</h3>
          <p className="text-muted-foreground mb-4">Essential skills for personal and professional growth</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress: 40%</span>
            <button className="text-primary text-sm font-medium">Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

