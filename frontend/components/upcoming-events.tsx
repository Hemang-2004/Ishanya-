import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

const events = [
  {
    id: "1",
    title: "Digital Literacy Workshop",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    location: "Community Center, Mumbai",
    attendees: 24,
  },
  {
    id: "2",
    title: "Volunteer Orientation",
    date: "Friday",
    time: "2:00 PM - 4:00 PM",
    location: "Ishanya Foundation Office, Delhi",
    attendees: 12,
  },
  {
    id: "3",
    title: "Career Counseling Session",
    date: "Next Monday",
    time: "11:00 AM - 1:00 PM",
    location: "Virtual Meeting",
    attendees: 30,
  },
  {
    id: "4",
    title: "Stakeholder Meeting",
    date: "Next Wednesday",
    time: "3:00 PM - 5:00 PM",
    location: "Conference Hall, Bangalore",
    attendees: 18,
  },
]

export function UpcomingEvents() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex flex-col space-y-2 pb-4 last:pb-0 last:border-0 border-b">
          <h4 className="font-medium">{event.title}</h4>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {event.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              {event.attendees} attendees
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="sm">
              Details
            </Button>
            <Button size="sm">RSVP</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

