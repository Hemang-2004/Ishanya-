import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: "1",
    user: {
      name: "Ananya Desai",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AD",
    },
    action: "completed a milestone",
    target: "Basic Computer Skills",
    time: "2 hours ago",
    type: "milestone",
  },
  {
    id: "2",
    user: {
      name: "Rajesh Verma",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RV",
    },
    action: "joined program",
    target: "Vocational Training",
    time: "5 hours ago",
    type: "join",
  },
  {
    id: "3",
    user: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PP",
    },
    action: "volunteered for",
    target: "Community Outreach",
    time: "Yesterday",
    type: "volunteer",
  },
  {
    id: "4",
    user: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "VS",
    },
    action: "updated profile",
    target: "",
    time: "Yesterday",
    type: "update",
  },
  {
    id: "5",
    user: {
      name: "Meera Joshi",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    action: "completed program",
    target: "Digital Literacy",
    time: "2 days ago",
    type: "complete",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 pb-4 last:pb-0 last:border-0 border-b">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{activity.user.name}</span>
              <Badge variant={getActivityBadgeVariant(activity.type)} className="text-xs">
                {getActivityBadgeText(activity.type)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.action} {activity.target && <strong>{activity.target}</strong>}
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function getActivityBadgeVariant(type: string) {
  switch (type) {
    case "milestone":
      return "success"
    case "join":
      return "secondary"
    case "volunteer":
      return "default"
    case "update":
      return "outline"
    case "complete":
      return "success"
    default:
      return "secondary"
  }
}

function getActivityBadgeText(type: string) {
  switch (type) {
    case "milestone":
      return "Achievement"
    case "join":
      return "New"
    case "volunteer":
      return "Volunteer"
    case "update":
      return "Update"
    case "complete":
      return "Completed"
    default:
      return "Activity"
  }
}

