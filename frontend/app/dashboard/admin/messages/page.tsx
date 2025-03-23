"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Search, Send, PlusCircle, Paperclip, MoreHorizontal, Phone, Video } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string>("1")
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")

  // Filter chats based on search term
  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Get the selected chat details
  const currentChat = chats.find((chat) => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with students, teachers, and staff</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="md:col-span-1">
          <CardHeader className="px-4">
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent messages and conversations</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0">
                <div className="divide-y">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedChat === chat.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedChat(chat.id)}
                      >
                        <Avatar>
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>{chat.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{chat.name}</div>
                            <div className="text-xs text-muted-foreground">{chat.lastMessageTime}</div>
                          </div>
                          <div className="text-sm truncate text-muted-foreground">{chat.lastMessage}</div>
                        </div>
                        {chat.unread > 0 && <Badge className="ml-auto">{chat.unread}</Badge>}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No conversations found</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <div className="divide-y">
                  {filteredChats.filter((chat) => chat.unread > 0).length > 0 ? (
                    filteredChats
                      .filter((chat) => chat.unread > 0)
                      .map((chat) => (
                        <div
                          key={chat.id}
                          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedChat === chat.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedChat(chat.id)}
                        >
                          <Avatar>
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback>{chat.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{chat.name}</div>
                              <div className="text-xs text-muted-foreground">{chat.lastMessageTime}</div>
                            </div>
                            <div className="text-sm truncate text-muted-foreground">{chat.lastMessage}</div>
                          </div>
                          <Badge className="ml-auto">{chat.unread}</Badge>
                        </div>
                      ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No unread messages</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="archived" className="m-0">
                <div className="p-4 text-center text-muted-foreground">No archived conversations</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2">
          {currentChat ? (
            <>
              <CardHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentChat.avatar} />
                    <AvatarFallback>{currentChat.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{currentChat.name}</CardTitle>
                    <CardDescription>{currentChat.role}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[500px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentChat.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                      {message.sender !== "me" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={currentChat.avatar} />
                          <AvatarFallback>{currentChat.initials}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs mt-1 opacity-70 text-right">{message.time}</div>
                      </div>
                      {message.sender === "me" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-[80px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

// Sample data
const chats = [
  {
    id: "1",
    name: "Arjun Patel",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
    lastMessage: "That would be really helpful! When are you available?",
    lastMessageTime: "10:30 AM",
    unread: 2,
    messages: [
      {
        sender: "other",
        content: "Hello! I'm having trouble with the digital literacy module. Can you help me?",
        time: "Yesterday, 4:30 PM",
      },
      {
        sender: "me",
        content: "Of course, Arjun. What specific part are you struggling with?",
        time: "Yesterday, 4:35 PM",
      },
      {
        sender: "other",
        content: "I'm not sure how to complete the Excel assignment. The formulas are confusing.",
        time: "Yesterday, 4:40 PM",
      },
      {
        sender: "me",
        content:
          "I understand. Excel formulas can be tricky at first. Would you like to schedule a quick one-on-one session to go through it together?",
        time: "Yesterday, 4:45 PM",
      },
      {
        sender: "other",
        content: "That would be really helpful! When are you available?",
        time: "Today, 10:30 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
    lastMessage: "The new digital literacy curriculum looks great!",
    lastMessageTime: "Yesterday",
    unread: 0,
    messages: [
      {
        sender: "other",
        content: "Hi there! I've reviewed the new digital literacy curriculum.",
        time: "Yesterday, 2:15 PM",
      },
      {
        sender: "other",
        content: "The new digital literacy curriculum looks great!",
        time: "Yesterday, 2:16 PM",
      },
    ],
  },
  {
    id: "3",
    name: "Meera Singh",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
    lastMessage: "I've been practicing! What topic should I focus on?",
    lastMessageTime: "2 days ago",
    unread: 1,
    messages: [
      {
        sender: "other",
        content: "Hello! I've completed all my assignments for this week.",
        time: "2 days ago, 11:20 AM",
      },
      {
        sender: "me",
        content: "That's excellent, Meera! How are you feeling about the material?",
        time: "2 days ago, 11:25 AM",
      },
      {
        sender: "other",
        content: "I've been practicing! What topic should I focus on?",
        time: "2 days ago, 11:30 AM",
      },
    ],
  },
  {
    id: "4",
    name: "Rahul Verma",
    role: "Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RV",
    lastMessage: "Can we discuss the vocational training schedule?",
    lastMessageTime: "3 days ago",
    unread: 0,
    messages: [
      {
        sender: "other",
        content: "Can we discuss the vocational training schedule?",
        time: "3 days ago, 9:45 AM",
      },
    ],
  },
  {
    id: "5",
    name: "Vikram Malhotra",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
    lastMessage: "Thank you for the feedback on my project!",
    lastMessageTime: "1 week ago",
    unread: 0,
    messages: [
      {
        sender: "other",
        content: "Thank you for the feedback on my project!",
        time: "1 week ago, 3:15 PM",
      },
    ],
  },
]

