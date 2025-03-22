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
import { Plus, Search, Filter, Download, MoreHorizontal, Edit, Trash, Eye, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StakeholdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Stakeholders</h2>
          <p className="text-muted-foreground">Manage all your stakeholders in one place</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Stakeholder
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Management</CardTitle>
          <CardDescription>View and manage all stakeholders across your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search stakeholders..." className="pl-8 w-[200px] lg:w-[300px]" />
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
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stakeholders.map((stakeholder) => (
                      <TableRow key={stakeholder.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={stakeholder.avatar} />
                              <AvatarFallback>{stakeholder.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{stakeholder.name}</div>
                              <div className="text-sm text-muted-foreground">{stakeholder.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(stakeholder.role)}>{stakeholder.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(stakeholder.status)}>{stakeholder.status}</Badge>
                        </TableCell>
                        <TableCell>{stakeholder.location}</TableCell>
                        <TableCell>{stakeholder.joined}</TableCell>
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
                                View Profile
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
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">100</span> results
                </div>
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="staff">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <div className="flex flex-col items-center text-center p-4">
                  <UserPlus className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No staff members yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get started by adding your first staff member</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Staff Member
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="volunteers">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <div className="flex flex-col items-center text-center p-4">
                  <UserPlus className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No volunteers yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get started by adding your first volunteer</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Volunteer
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <div className="flex flex-col items-center text-center p-4">
                  <UserPlus className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No students yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get started by adding your first student</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const stakeholders = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    role: "Staff",
    status: "Active",
    location: "Mumbai",
    joined: "Jan 10, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RS",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    role: "Volunteer",
    status: "Active",
    location: "Delhi",
    joined: "Feb 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PP",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.k@example.com",
    role: "Student",
    status: "Inactive",
    location: "Bangalore",
    joined: "Mar 5, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AK",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.r@example.com",
    role: "Staff",
    status: "Active",
    location: "Hyderabad",
    joined: "Apr 20, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SR",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.s@example.com",
    role: "Volunteer",
    status: "Active",
    location: "Chennai",
    joined: "May 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VS",
  },
]

// Helper functions for badge variants
function getRoleBadgeVariant(role: string) {
  switch (role) {
    case "Staff":
      return "default"
    case "Volunteer":
      return "secondary"
    case "Student":
      return "outline"
    default:
      return "default"
  }
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "success"
    case "Inactive":
      return "destructive"
    default:
      return "default"
  }
}

