"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, CheckCircle, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

export default function RegistrationRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("student")

  const [requests, setRequests] = useState<RegistrationRequest[]>([])
  const [programs, setPrograms] = useState<{ id: string; name: string }[]>([])
  const [selectedProgram, setSelectedProgram] = useState<string>("")
  const [selectedProgramEdu, setSelectedProgramEdu] = useState<string>("")
  const [educators, setEducators] = useState<{ EducatorID: number; Name: string; Email: string }[]>([])
  const [selectedEducator, setSelectedEducator] = useState<string>("")

  type RegistrationRequest = {
    id: number
    name: string
    email: string
    phone: string
    address: string
    role: "student" | "educator"
  }

  const handleApproveEducator = async (programId: string, educatorId: number) => {
    try {
      const response = await fetch("http://localhost:5000/admins/approve-and-assign-educator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          program_id: programId,
          educator_id: educatorId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert("Educator approved and assigned successfully.")
        setRequests((prev) => prev.filter((request) => request.id !== educatorId))
        window.location.reload(); 
      } else {
        alert(`Failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error approving educator:", error)
    }
  }

  const handleApproveStudent = async (studentId: number, programId: string, primaryEducatorId: string) => {
    try {
      const response = await fetch("http://localhost:5000/admins/approve-and-assign-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          program_id: programId,
          primary_educator_id: primaryEducatorId,
          // secondary_educator_id: secondaryEducatorId || null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert("Student approved and assigned successfully.")
        setRequests((prev) => prev.filter((request) => request.id !== studentId))
        window.location.reload()
      } else {
        alert(`Failed: ${data.message}`)
      }
    } catch (error) {
      console.error("Error approving student:", error)
    }
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:5000/admins/get-programs")
        const data = await response.json()
        if (data.success) {
          setPrograms(data.programs)
        } else {
          console.error("Failed to fetch programs:", data.message)
        }
      } catch (error) {
        console.error("Error fetching programs:", error)
      }
    }

    fetchPrograms()
  }, [])

  // console.log(programs);
  // console.log("selectedType", selectedType);

  useEffect(() => {
    if (!selectedProgram) return

    const fetchEducators = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admins/get-educators-of-program/${selectedProgram}`)
        const data = await response.json()
        if (data.success) {
          setEducators(data.educators)
        } else {
          console.error("Failed to fetch educators:", data.message)
        }
      } catch (error) {
        console.error("Error fetching educators:", error)
      }
    }

    fetchEducators()
  }, [selectedProgram])

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/admins/registration-requests")
      const data = await response.json()
      // console.log(data, "data ");
      if (data.success) {
        setRequests([...data.students, ...data.educators])
      } else {
        console.error("Failed to fetch requests:", data.message)
      }
    } catch (error) {
      console.error("Error fetching registration requests:", error)
    }
  }
  // const handleApprove = async (id, role) => {
  //   try {
  //     const response = await fetch("/api/admin/approve-registration", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id, role }),
  //     });

  //     if (response.ok) {
  //       setRequests((prev) => prev.filter((request) => request.id !== id));
  //     } else {
  //       console.error("Failed to approve registration");
  //     }
  //   } catch (error) {
  //     console.error("Error approving registration:", error);
  //   }
  // };

  const handleReject = async (id: number, role: string) => {
    try {
      const response = await fetch("http://localhost:5000/admins/reject-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id: id, role: role }),
      })

      const data = await response.json()

      if (data.success) {
        alert("User rejected successfully.")
        fetchRequests()
        window.location.reload()
      } else {
        alert("Failed to reject user.")
      }
    } catch (error) {
      console.error("Error rejecting user:", error)
    }
  }

  // console.log(requests);
  // Filter function for registration requests
  const filteredRequests = requests.filter((request) => {
    // Filter by search term
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by type
    const matchesType = selectedType === "all" || request.role.toLowerCase() === selectedType.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Registration Requests</h2>
          <p className="text-muted-foreground">Review and approve new student and educator registrations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>New registrations awaiting your approval</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="space-y-4" onValueChange={setSelectedType}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                {/* <TabsTrigger value="all">All</TabsTrigger> */}
                <TabsTrigger value="student">Students</TabsTrigger>
                <TabsTrigger value="educator">Educators</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search requests..."
                    className="pl-8 w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={request.avatar} />
                                <AvatarFallback>{request.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{request.name}</div>
                                <div className="text-sm text-muted-foreground">{request.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={request.type === "Student" ? "default" : "secondary"}>{request.type}</Badge>
                          </TableCell>
                          <TableCell>{request.dateApplied}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Registration Details</DialogTitle>
                                    <DialogDescription>
                                      Review the applicant's information before making a decision.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex items-center gap-4">
                                      <Avatar className="h-12 w-12">
                                        <AvatarImage src={request.avatar} />
                                        <AvatarFallback>{request.initials}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="font-medium">{request.name}</h3>
                                        <p className="text-sm text-muted-foreground">{request.email}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Registration Type</Label>
                                        <div className="mt-1">{request.type}</div>
                                      </div>
                                      <div>
                                        <Label>Date Applied</Label>
                                        <div className="mt-1">{request.dateApplied}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Phone Number</Label>
                                      <div className="mt-1">{request.phone}</div>
                                    </div>
                                    <div>
                                      <Label>Address</Label>
                                      <div className="mt-1">{request.address}</div>
                                    </div>
                                    {request.type === "Student" && (
                                      <>
                                        <div>
                                          <Label>Assign to Program</Label>
                                          <Select defaultValue="digital-literacy">
                                            <SelectTrigger className="mt-1">
                                              <SelectValue placeholder="Select program" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="digital-literacy">Digital Literacy</SelectItem>
                                              <SelectItem value="vocational-training">Vocational Training</SelectItem>
                                              <SelectItem value="community-leadership">Community Leadership</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label>Assign Teacher</Label>
                                          <Select defaultValue="">
                                            <SelectTrigger className="mt-1">
                                              <SelectValue placeholder="Select teacher" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="teacher1">Priya Sharma</SelectItem>
                                              <SelectItem value="teacher2">Rahul Verma</SelectItem>
                                              <SelectItem value="teacher3">Anita Desai</SelectItem>
                                              <SelectItem value="teacher4">Vikram Malhotra</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  <DialogFooter className="flex gap-2">
                                    <Button variant="outline" className="gap-1">
                                      <XCircle className="h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button className="gap-1 bg-secondary hover:bg-secondary/90">
                                      <CheckCircle className="h-4 w-4" />
                                      Approve
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="default" size="sm" className="gap-1 bg-secondary hover:bg-secondary/90">
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <XCircle className="h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No registration requests found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredRequests.length}</span> of{" "}
                  <span className="font-medium">{registrationRequests.length}</span> requests
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent> */}

            <TabsContent value="student">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      {/* <TableHead>Date Applied</TableHead> */}
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((request) => request.role === "student")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                                <AvatarImage src={request.avatar} />
                                <AvatarFallback>{request.initials}</AvatarFallback>
                              </Avatar> */}
                              <div>
                                <div className="font-medium">{request.name}</div>
                                <div className="text-sm text-muted-foreground">{request.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell>{request.dateApplied}</TableCell> */}
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 bg-secondary hover:bg-secondary/90"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Student Registration Details</DialogTitle>
                                    <DialogDescription>
                                      Review the student's information and assign a teacher.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex items-center gap-4">
                                      {/* <Avatar className="h-12 w-12">
                                        <AvatarImage src={request.avatar} />
                                        <AvatarFallback>{request.initials}</AvatarFallback>
                                      </Avatar> */}
                                      <div>
                                        <h3 className="font-medium">{request.name}</h3>
                                        <p className="text-sm text-muted-foreground">{request.email}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Phone Number</Label>
                                      <div className="mt-1">{request.phone}</div>
                                    </div>
                                    <div>
                                      <Label>Address</Label>
                                      <div className="mt-1">{request.address}</div>
                                    </div>
                                    <div>
                                      <Label>Assign to Program</Label>
                                      <Select onValueChange={(value) => setSelectedProgram(value)} defaultValue="">
                                        <SelectTrigger className="mt-1">
                                          <SelectValue placeholder="Select program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {programs.map((program) => (
                                            <SelectItem key={program.id} value={program.id}>
                                              {program.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label>Assign Teacher</Label>
                                      <Select onValueChange={(value) => setSelectedEducator(value)} defaultValue="">
                                        <SelectTrigger className="mt-1">
                                          <SelectValue placeholder="Select teacher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {educators.map((edu) => (
                                            <SelectItem key={edu.EducatorID} value={edu.EducatorID.toString()}>
                                              {edu.Name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      className="gap-1"
                                      onClick={() => handleReject(request.id, "student")}
                                    >
                                      <XCircle className="h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button
                                      className="gap-1 bg-secondary hover:bg-secondary/90"
                                      onClick={() =>
                                        handleApproveStudent(request.id, selectedProgram, selectedEducator)
                                      }
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      Approve
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              {/* <Button
                                variant="default"
                                size="sm"
                                className="gap-1 bg-secondary hover:bg-secondary/90"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </Button> */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleReject(request.id, "student")}
                              >
                                <XCircle className="h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="educator">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      {/* <TableHead>Date Applied</TableHead> */}
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests
                      .filter((request) => request.role === "educator")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                                <AvatarImage src={request.avatar} />
                                <AvatarFallback>{request.initials}</AvatarFallback>
                              </Avatar> */}
                              <div>
                                <div className="font-medium">{request.name}</div>
                                <div className="text-sm text-muted-foreground">{request.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell>{request.dateApplied}</TableCell> */}
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {/* <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button> */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 bg-secondary hover:bg-secondary/90"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Registration Details</DialogTitle>
                                    <DialogDescription>
                                      Review the applicant's information before making a decision.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex items-center gap-4">
                                      {/* <Avatar className="h-12 w-12">
                                        <AvatarImage src={request.avatar} />
                                        <AvatarFallback>{request.initials}</AvatarFallback>
                                      </Avatar> */}
                                      <div>
                                        <h3 className="font-medium">{request.name}</h3>
                                        <p className="text-sm text-muted-foreground">{request.email}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Registration Type</Label>
                                        <div className="mt-1">{request.role}</div>
                                      </div>
                                      {/* <div>
                                        <Label>Date Applied</Label>
                                        <div className="mt-1">{request.dateApplied}</div>
                                      </div> */}
                                    </div>
                                    <div>
                                      <Label>Phone Number</Label>
                                      <div className="mt-1">{request.phone}</div>
                                    </div>
                                    <div>
                                      <Label>Address</Label>
                                      <div className="mt-1">{request.address}</div>
                                    </div>
                                    <div>
                                      <Label>Assign to Program</Label>
                                      <Select onValueChange={(value) => setSelectedProgramEdu(value)} defaultValue="">
                                        <SelectTrigger className="mt-1">
                                          <SelectValue placeholder="Select program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {programs.map((program) => (
                                            <SelectItem key={program.id} value={program.id}>
                                              {program.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      className="gap-1"
                                      onClick={() => handleReject(request.id, "educator")}
                                    >
                                      <XCircle className="h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button
                                      className="gap-1 bg-secondary hover:bg-secondary/90"
                                      onClick={() => handleApproveEducator(selectedProgramEdu, request.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      Approve
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              {/* <Button
                                variant="default"
                                size="sm"
                                className="gap-1 bg-secondary hover:bg-secondary/90"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </Button> */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleReject(request.id, "educator")}
                              >
                                <XCircle className="h-4 w-4" />
                                Reject
                              </Button>
                            </div>
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

// Sample data
const registrationRequests = [
  {
    id: "1",
    name: "Arjun Patel",
    email: "arjun.p@example.com",
    type: "Student",
    dateApplied: "Mar 15, 2023",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra",
  },
  {
    id: "2",
    name: "Meera Singh",
    email: "meera.s@example.com",
    type: "Student",
    dateApplied: "Mar 16, 2023",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MS",
    phone: "+91 9876543211",
    address: "456 Park Avenue, Delhi, Delhi",
  },
  {
    id: "3",
    name: "Rahul Verma",
    email: "rahul.v@example.com",
    type: "educator",
    dateApplied: "Mar 17, 2023",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RV",
    phone: "+91 9876543212",
    address: "789 Lake View, Bangalore, Karnataka",
  },
  {
    id: "4",
    name: "Priya Sharma",
    email: "priya.s@example.com",
    type: "Student",
    dateApplied: "Mar 18, 2023",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
    phone: "+91 9876543213",
    address: "101 Hill Road, Chennai, Tamil Nadu",
  },
  {
    id: "5",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    type: "educator",
    dateApplied: "Mar 19, 2023",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
    phone: "+91 9876543214",
    address: "202 River Side, Hyderabad, Telangana",
  },
]

