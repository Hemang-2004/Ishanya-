"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false)
  const [newProgramData, setNewProgramData] = useState({
    name: "",
    description: "",
    category: "education",
    startDate: "",
    endDate: "",
    status: "active",
    capacity: "10",
  })
  const [programs, setPrograms] = useState([])

  // Filter function for programs
  // const filteredPrograms = programs.filter((program) => {
  //   // Filter by search term
  //   const matchesSearch =
  //     program.ProgramName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     program.Category.toLowerCase().includes(searchTerm.toLowerCase())

  //   // Filter by status
  //   const matchesStatus = selectedStatus === "all" || program.Status.toLowerCase() === selectedStatus.toLowerCase()

  //   return matchesSearch && matchesStatus
  // })
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
  try {
    const response = await fetch("http://localhost:5000/admins/get_all_programs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();


    if (response.ok) {
      console.log("Programs fetched successfully:", result.programs);
      
      setPrograms(result.programs); // Assuming you have a state for programs
    } else {
      console.error("Error fetching programs:", result.error);
    }
  } catch (error) {
    console.error("Error fetching programs:", error);
  }
};

  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const programData = {
      ProgramName: newProgramData.name,
      Description: newProgramData.description,
      Category: newProgramData.category,
      StartDate: newProgramData.startDate,
      EndDate: newProgramData.endDate,
      Status: newProgramData.status,
      Capacity: newProgramData.capacity,
    };
  
    try {
      const response = await fetch("http://localhost:5000/admins/add_program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Program added successfully:", result);
        setIsAddProgramDialogOpen(false);
        fetchPrograms(); // Refresh the list after adding
      } else {
        console.error("Error adding program:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProgramData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewProgramData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Programs</h2>
          <p className="text-muted-foreground">Manage educational programs and courses</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddProgramDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Management</CardTitle>
          <CardDescription>View and manage all programs across your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedStatus}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search programs..."
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

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* console.log("Programs:", programs); */}
                    {programs.length > 0 ? (
                      programs.map((program) => (
                        <TableRow key={program.ProgramID}>
                          <TableCell>
                            <div className="font-medium">{program.ProgramName}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{program.Category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(program.Status)}>{program.Status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={program.progress} className="h-2 w-[60px]" />
                              <span className="text-sm">{program.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.StartDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.Capacity}</span>
                            </div>
                          </TableCell>
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
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Program
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
                          No programs found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{programs.length}</span> of{" "}
                  <span className="font-medium">{programs.length}</span> programs
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
                      <TableHead>Program Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs
                      .filter((program) => program.Status === "Active")
                      .map((program) => (
                        <TableRow key={program.id}>
                          <TableCell>
                            <div className="font-medium">{program.ProgramName}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{program.Category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={program.progress} className="h-2 w-[60px]" />
                              <span className="text-sm">{program.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.StartDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.Capacity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="upcoming">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs
                      .filter((program) => program.Status === "Upcoming")
                      .map((program) => (
                        <TableRow key={program.id}>
                          <TableCell>
                            <div className="font-medium">{program.ProgramName}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{program.Category}</Badge>
                          </TableCell>
                          <TableCell>{program.StartDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.StartDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.capacity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs
                      .filter((program) => program.Status === "Completed")
                      .map((program) => (
                        <TableRow key={program.id}>
                          <TableCell>
                            <div className="font-medium">{program.ProgramName}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{program.Category}</Badge>
                          </TableCell>
                          <TableCell>{program.endDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.StartDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{program.Capacity}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
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

      {/* Add Program Dialog */}
      <Dialog open={isAddProgramDialogOpen} onOpenChange={setIsAddProgramDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Program</DialogTitle>
            <DialogDescription>Create a new educational program or course for your organization.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProgram}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input id="name" name="name" value={newProgramData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProgramData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    defaultValue={newProgramData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="vocational">Vocational Training</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="financial">Financial Literacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={newProgramData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newProgramData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newProgramData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={newProgramData.capacity}
                  onChange={handleInputChange}
                  required
                  placeholder="Maximum number of participants"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsAddProgramDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Program</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper function for status badge variant
function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "success"
    case "Upcoming":
      return "secondary"
    case "Completed":
      return "default"
    default:
      return "outline"
  }
}

// Sample data
const programs = [
  {
    id: "1",
    name: "Digital Literacy Program",
    category: "Education",
    status: "Active",
    progress: 75,
    startDate: "Jan 15, 2023",
    endDate: "Dec 15, 2023",
    duration: "Jan - Dec 2023",
    participants: "124",
    capacity: "150",
  },
  {
    id: "2",
    name: "Vocational Training",
    category: "Vocational",
    status: "Active",
    progress: 45,
    startDate: "Mar 1, 2023",
    endDate: "Feb 28, 2024",
    duration: "Mar 2023 - Feb 2024",
    participants: "86",
    capacity: "100",
  },
  {
    id: "3",
    name: "Community Leadership",
    category: "Leadership",
    status: "Active",
    progress: 92,
    startDate: "Apr 10, 2023",
    endDate: "Oct 10, 2023",
    duration: "Apr - Oct 2023",
    participants: "38",
    capacity: "50",
  },
  {
    id: "4",
    name: "Health & Wellness Workshop",
    category: "Health",
    status: "Upcoming",
    progress: 0,
    startDate: "Jul 1, 2023",
    endDate: "Sep 30, 2023",
    duration: "Jul - Sep 2023",
    participants: "0",
    capacity: "75",
  },
  {
    id: "5",
    name: "Financial Literacy",
    category: "Financial",
    status: "Upcoming",
    progress: 0,
    startDate: "Aug 15, 2023",
    endDate: "Nov 15, 2023",
    duration: "Aug - Nov 2023",
    participants: "0",
    capacity: "60",
  },
  {
    id: "6",
    name: "Basic Computer Skills",
    category: "Education",
    status: "Completed",
    progress: 100,
    startDate: "Jan 5, 2022",
    endDate: "Jun 30, 2022",
    duration: "Jan - Jun 2022",
    participants: "112",
    capacity: "120",
  },
  {
    id: "7",
    name: "English Communication",
    category: "Education",
    status: "Completed",
    progress: 100,
    startDate: "Feb 10, 2022",
    endDate: "Aug 10, 2022",
    duration: "Feb - Aug 2022",
    participants: "95",
    capacity: "100",
  },
]

