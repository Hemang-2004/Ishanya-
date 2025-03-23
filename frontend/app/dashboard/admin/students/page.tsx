"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, MoreHorizontal, Edit, Trash, Eye, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import Link from "next/link"

export default function StudentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState("all")

  // Filter function for students
  const filteredStudents = students.filter((student) => {
    // Filter by search term
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus = selectedStatus === "all" || student.status.toLowerCase() === selectedStatus.toLowerCase()

    // Filter by program
    const matchesProgram = selectedProgram === "all" || student.program.toLowerCase() === selectedProgram.toLowerCase()

    return matchesSearch && matchesStatus && matchesProgram
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage students and track their progress</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => router.push("/dashboard/admin/add-student")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>View and manage all students across your programs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedStatus}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="graduated">Graduated</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8 w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by Program</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSelectedProgram("all")}
                      className={selectedProgram === "all" ? "bg-secondary/50" : ""}
                    >
                      All Programs
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedProgram("digital literacy")}
                      className={selectedProgram === "digital literacy" ? "bg-secondary/50" : ""}
                    >
                      Digital Literacy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedProgram("vocational training")}
                      className={selectedProgram === "vocational training" ? "bg-secondary/50" : ""}
                    >
                      Vocational Training
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedProgram("community leadership")}
                      className={selectedProgram === "community leadership" ? "bg-secondary/50" : ""}
                    >
                      Community Leadership
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.program}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={student.progress} className="h-2 w-[60px]" />
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(student.status)}>{student.status}</Badge>
                          </TableCell>
                          <TableCell>{student.joined}</TableCell>
                          <TableCell>{student.teacher}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/admin/students/${student.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No students found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredStudents.length}</span> of{" "}
                  <span className="font-medium">{students.length}</span> students
                </div>
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents
                      .filter((student) => student.status === "Active")
                      .map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.program}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={student.progress} className="h-2 w-[60px]" />
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.joined}</TableCell>
                          <TableCell>{student.teacher}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/admin/students/${student.id}`}>View Profile</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="inactive">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents
                      .filter((student) => student.status === "Inactive")
                      .map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.program}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={student.progress} className="h-2 w-[60px]" />
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.lastActive || "N/A"}</TableCell>
                          <TableCell>{student.teacher}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/admin/students/${student.id}`}>View Profile</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="graduated">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Final Grade</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents
                      .filter((student) => student.status === "Graduated")
                      .map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.program}</Badge>
                          </TableCell>
                          <TableCell>{student.completionDate || "N/A"}</TableCell>
                          <TableCell>{student.finalGrade || "N/A"}</TableCell>
                          <TableCell>{student.teacher}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/admin/students/${student.id}`}>View Profile</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for status badge variant
function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "success"
    case "Inactive":
      return "destructive"
    case "Graduated":
      return "secondary"
    default:
      return "outline"
  }
}

// Sample data
const students = [
  {
    id: "1",
    name: "Arjun Patel",
    email: "arjun.p@example.com",
    program: "Digital Literacy",
    status: "Active",
    progress: 85,
    joined: "Jan 15, 2023",
    teacher: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: "2",
    name: "Meera Singh",
    email: "meera.s@example.com",
    program: "Digital Literacy",
    status: "Active",
    progress: 72,
    joined: "Feb 10, 2023",
    teacher: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
  },
  {
    id: "3",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    program: "Vocational Training",
    status: "Active",
    progress: 45,
    joined: "Mar 5, 2023",
    teacher: "Rahul Verma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
  {
    id: "4",
    name: "Priya Sharma",
    email: "priya.s@example.com",
    program: "Community Leadership",
    status: "Graduated",
    progress: 100,
    joined: "Jan 5, 2022",
    completionDate: "Dec 15, 2022",
    finalGrade: "A",
    teacher: "Anita Desai",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    email: "rajesh.k@example.com",
    program: "Digital Literacy",
    status: "Inactive",
    progress: 35,
    joined: "Apr 10, 2023",
    lastActive: "Jun 15, 2023",
    teacher: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RK",
  },
  {
    id: "6",
    name: "Anita Desai",
    email: "anita.d@example.com",
    program: "Vocational Training",
    status: "Active",
    progress: 68,
    joined: "Feb 20, 2023",
    teacher: "Rahul Verma",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AD",
  },
  {
    id: "7",
    name: "Sunil Sharma",
    email: "sunil.s@example.com",
    program: "Community Leadership",
    status: "Graduated",
    progress: 100,
    joined: "Mar 15, 2022",
    completionDate: "Feb 28, 2023",
    finalGrade: "B+",
    teacher: "Anita Desai",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SS",
  },
]

