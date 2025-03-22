"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, PaperclipIcon } from "lucide-react"

export default function StudentMessagesPage() {
  const [activeChat, setActiveChat] = useState("teacher1")
  const [messageText, setMessageText] = useState("")

  const teachers = [
    {
      id: "teacher1",
      name: "Priya Sharma",
      role: "Digital Literacy Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PS",
      status: "online",
      lastSeen: "Online",
    },
    {
      id: "teacher2",
      name: "Rahul Verma",
      role: "Communication Skills Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RV",
      status: "offline",
      lastSeen: "Last seen 2h ago",
    },
    {
      id: "teacher3",
      name: "Anita Desai",
      role: "Life Skills Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AD",
      status: "offline",
      lastSeen: "Last seen yesterday",
    },
  ]

  const conversations = {
    teacher1: [
      {
        id: 1,
        sender: "teacher",
        text: "Hello Arjun! How are you progressing with your digital literacy assignment?",
        time: "10:30 AM",
      },
      {
        id: 2,
        sender: "student",
        text: "Hi Ms. Sharma! I've completed most of it, but I'm having trouble with the Excel formulas section.",
        time: "10:35 AM",
      },
      {
        id: 3,
        sender: "teacher",
        text: "That's a common challenge. Would you like me to schedule a quick one-on-one session to go through it?",
        time: "10:38 AM",
      },
      { id: 4, sender: "student", text: "That would be really helpful! When are you available?", time: "10:40 AM" },
      {
        id: 5,
        sender: "teacher",
        text: "Great job on your last assignment! I've added some feedback for you to review.",
        time: "2:15 PM",
      },
    ],
    teacher2: [
      {
        id: 1,
        sender: "teacher",
        text: "Don't forget to prepare for our group discussion in the next session.",
        time: "Yesterday",
      },
      { id: 2, sender: "student", text: "I've been practicing! What topic should I focus on?", time: "Yesterday" },
      {
        id: 3,
        sender: "teacher",
        text: "We'll be discussing effective communication in professional settings. Think about some examples from your experiences.",
        time: "Yesterday",
      },
    ],
    teacher3: [
      {
        id: 1,
        sender: "teacher",
        text: "Hi Arjun, how did you find today's session on conflict resolution?",
        time: "Monday",
      },
      {
        id: 2,
        sender: "student",
        text: "It was very insightful, Ms. Desai. I'm trying to apply those techniques in my daily interactions.",
        time: "Monday",
      },
      {
        id: 3,
        sender: "teacher",
        text: "That's excellent! Real-world application is the best way to reinforce these skills.",
        time: "Monday",
      },
    ],
  }

  const activeTeacher = teachers.find((t) => t.id === activeChat)
  const activeConversation = conversations[activeChat as keyof typeof conversations] || []

  const handleSendMessage = () => {
    if (messageText.trim() === "") return

    // In a real app, you would send this to an API
    console.log("Sending message:", messageText)

    // Clear the input
    setMessageText("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Chat with your teachers and get support for your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-220px)]">
        {/* Teacher List */}
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg">Teachers</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <div className="space-y-1">
              {teachers.map((teacher) => (
                <button
                  key={teacher.id}
                  className={`w-full flex items-center gap-3 p-3 text-left hover:bg-muted transition-colors ${
                    activeChat === teacher.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveChat(teacher.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback>{teacher.initials}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        teacher.status === "online" ? "bg-success" : "bg-muted"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{teacher.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{teacher.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-3 flex flex-col overflow-hidden">
          {activeTeacher && (
            <>
              <CardHeader className="px-6 py-3 border-b flex-none">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeTeacher.avatar} />
                    <AvatarFallback>{activeTeacher.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{activeTeacher.name}</CardTitle>
                    <CardDescription>{activeTeacher.lastSeen}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {activeConversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "student" ? "bg-secondary text-secondary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs mt-1 opacity-70 text-right">{message.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button className="shrink-0 bg-secondary hover:bg-secondary/90" onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

