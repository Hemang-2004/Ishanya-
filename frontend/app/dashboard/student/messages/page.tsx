"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, PaperclipIcon, Image, Smile, Mic, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentMessagesPage() {
  const [activeChat, setActiveChat] = useState("teacher1")
  const [messageText, setMessageText] = useState("")
  const [conversations, setConversations] = useState<Record<string, any[]>>({
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
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const activeTeacher = teachers.find((t) => t.id === activeChat)
  const activeConversation = conversations[activeChat as keyof typeof conversations] || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat, conversations])

  const handleSendMessage = () => {
    if (messageText.trim() === "") return

    const newMessage = {
      id: Date.now(),
      sender: "student",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setConversations((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }))

    // Clear the input
    setMessageText("")

    // Simulate teacher response after a delay
    setTimeout(() => {
      const teacherResponse = {
        id: Date.now() + 1,
        sender: "teacher",
        text: "Thanks for your message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setConversations((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), teacherResponse],
      }))
    }, 2000)
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
          <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Teachers</CardTitle>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <div className="px-4 py-2">
            <Input placeholder="Search teachers..." className="w-full" />
          </div>
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
                        teacher.status === "online" ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{teacher.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{teacher.role}</div>
                  </div>
                  {teacher.id === "teacher1" && (
                    <Badge variant="secondary" className="ml-auto">
                      New
                    </Badge>
                  )}
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
                <div className="flex items-center justify-between">
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
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">More options</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Clear chat</DropdownMenuItem>
                        <DropdownMenuItem>Block teacher</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                      {message.sender === "teacher" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={activeTeacher.avatar} />
                          <AvatarFallback>{activeTeacher.initials}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "student" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs mt-1 opacity-70 text-right">{message.time}</div>
                      </div>
                      {message.sender === "student" && (
                        <Avatar className="h-8 w-8 ml-2 mt-1">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AP</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2 mb-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
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
                      className="flex-1"
                    />
                    <Button className="shrink-0 bg-primary hover:bg-primary/90" onClick={handleSendMessage}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

