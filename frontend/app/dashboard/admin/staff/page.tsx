"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";

export default function StaffPage() {

  interface Educator  {
    id: number;
    name: string;
    email: string;
    specialization: string;  // This is the Program Name
    status: string;
    joined: string;
    students: number;
  };
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [staffData, setStaffData] =useState<Educator[]>([]); 
  const [programs, setPrograms] = useState<{ ProgramID: string; ProgramName: string }[]>([]);
  const [selectedProgram, setSelectedProgram] = useState("all")
  

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await fetch("http://localhost:5000/educators");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data: Educator[] = await response.json();
        setStaffData(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchEducators();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admins/get-all-programs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }
        const programs = await response.json();
        setPrograms(programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  console.log(staffData);
  // Filter function for staff
  const filteredStaff = staffData.filter((staff) => {
    // Filter by search term
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.specialization.toLowerCase().includes(searchTerm.toLowerCase());


    // Filter by status
    const matchesStatus =
      selectedStatus === "all" ||
      staff.status.toLowerCase() === selectedStatus.toLowerCase();

    // Filter by role
    // const matchesRole =
    //   selectedRole === "all" ||
    //   staff.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesProgram =
    selectedProgram === "all" ||
    staff.specialization?.toLowerCase() === String(selectedProgram).toLowerCase();
  

    return matchesSearch && matchesStatus && matchesProgram
  });


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Educator Management
          </h2>
          <p className="text-muted-foreground">Manage teachers</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => router.push("/dashboard/admin/add-teacher")}>
            <GraduationCap className="mr-2 h-4 w-4" />
            Add Educator
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Educator Directory</CardTitle>
          <CardDescription>View and manage all educators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            className="space-y-4"
            onValueChange={setSelectedStatus}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="on leave">On Leave</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search staff..."
                    className="pl-8 w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSelectedRole("all")}
                      className={selectedRole === "all" ? "bg-secondary/50" : ""}
                    >
                      All Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedRole("teacher")}
                      className={selectedRole === "teacher" ? "bg-secondary/50" : ""}
                    >
                      Teachers
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedRole("admin")}
                      className={selectedRole === "admin" ? "bg-secondary/50" : ""}
                    >
                      Administrators
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedRole("coordinator")}
                      className={selectedRole === "coordinator" ? "bg-secondary/50" : ""}
                    >
                      Program Coordinators
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
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
                      className={
                        selectedProgram === "all" ? "bg-secondary/50" : ""
                      }
                    >
                      All Programs
                    </DropdownMenuItem>
                    {programs.map((program) => (
                      <DropdownMenuItem
                        key={program.ProgramID}
                        onClick={() => setSelectedProgram(program.ProgramName)}
                        className={
                          selectedProgram === program.ProgramName
                            ? "bg-secondary/50"
                            : ""
                        }
                      >
                        {program.ProgramName}
                      </DropdownMenuItem>
                    ))}
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
                      {/* <TableHead>Role</TableHead> */}
                      <TableHead>Program</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.length > 0 ? (
                      filteredStaff.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                                <AvatarImage src={staff.avatar} />
                                <AvatarFallback>
                                  {staff.initials}
                                </AvatarFallback>
                              </Avatar> */}
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {staff.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <Badge variant="outline">{staff.role}</Badge>
                          </TableCell> */}
                          <TableCell>{staff.specialization}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(staff.status)}
                            >
                              {staff.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{staff.joined}</TableCell>
                          <TableCell>{staff.students}</TableCell>
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
                                  <Link
                                    href={`/dashboard/admin/staff/${staff.id}`}
                                  >
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
                        <TableCell
                          colSpan={7}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No staff found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium">{filteredStaff.length}</span> of{" "}
                  <span className="font-medium">{staffData.length}</span>{" "}
                  educators
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
                      <TableHead>Role</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff
                      .filter((staff) => staff.status === "Active")
                      .map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                                <AvatarImage src={staff.avatar} />
                                <AvatarFallback>
                                  {staff.initials}
                                </AvatarFallback>
                              </Avatar> */}
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {staff.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{staff.specialization}</Badge>
                          </TableCell>
                          <TableCell>{staff.specialization}</TableCell>
                          <TableCell>{staff.joined}</TableCell>
                          <TableCell>{staff.students}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/admin/staff/${staff.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="on leave">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Leave Period</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff
                      .filter((staff) => staff.status === "On Leave")
                      .map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                                <AvatarImage src={staff.avatar} />
                                <AvatarFallback>
                                  {staff.initials}
                                </AvatarFallback>
                              </Avatar> */}
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {staff.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{staff.specialization}</Badge>
                          </TableCell>
                          <TableCell>{staff.specialization}</TableCell>
                          {/* <TableCell>{staff.leavePeriod || "N/A"}</TableCell>
                          <TableCell>{staff.returnDate || "N/A"}</TableCell> */}
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/admin/staff/${staff.id}`}>
                                View Profile
                              </Link>
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
                      <TableHead>Role</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff
                      .filter((staff) => staff.status === "Inactive")
                      .map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                                <AvatarImage src={staff.avatar} />
                                <AvatarFallback>
                                  {staff.initials}
                                </AvatarFallback>
                              </Avatar> */}
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {staff.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{staff.specialization}</Badge>
                          </TableCell>
                          <TableCell>{staff.specialization}</TableCell>
                          {/* <TableCell>{staff.lastActive || "N/A"}</TableCell>
                          <TableCell>{staff.inactiveReason || "N/A"}</TableCell> */}
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/admin/staff/${staff.id}`}>
                                View Profile
                              </Link>
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
  );
}

// Helper function for status badge variant
function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Active":
      return "success";
    case "On Leave":
      return "warning";
    case "Inactive":
      return "destructive";
    default:
      return "outline";
  }
}

// Sample data
const staffData = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.s@ishanya.org",
    role: "Teacher",
    specialization: "Digital Literacy",
    status: "Active",
    joined: "Jan 15, 2022",
    students: 24,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
  },
  {
    id: "2",
    name: "Rahul Verma",
    email: "rahul.v@ishanya.org",
    role: "Teacher",
    specialization: "Vocational Training",
    status: "Active",
    joined: "Mar 10, 2022",
    students: 18,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RV",
  },
  {
    id: "3",
    name: "Anita Desai",
    email: "anita.d@ishanya.org",
    role: "Teacher",
    specialization: "Community Leadership",
    status: "On Leave",
    joined: "Feb 5, 2022",
    students: 15,
    leavePeriod: "Jun 10 - Jul 10, 2023",
    returnDate: "Jul 11, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AD",
  },
  {
    id: "4",
    name: "Vikram Malhotra",
    email: "vikram.m@ishanya.org",
    role: "Admin",
    specialization: "Program Management",
    status: "Active",
    joined: "Jan 5, 2021",
    students: "N/A",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VM",
  },
  {
    id: "5",
    name: "Neha Gupta",
    email: "neha.g@ishanya.org",
    role: "Coordinator",
    specialization: "Student Affairs",
    status: "Active",
    joined: "Apr 15, 2022",
    students: 45,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NG",
  },
  {
    id: "6",
    name: "Rajesh Kumar",
    email: "rajesh.k@ishanya.org",
    role: "Teacher",
    specialization: "Financial Literacy",
    status: "Inactive",
    joined: "May 20, 2022",
    lastActive: "Jan 15, 2023",
    inactiveReason: "Resigned",
    students: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RK",
  },
  {
    id: "7",
    name: "Sunita Patel",
    email: "sunita.p@ishanya.org",
    role: "Teacher",
    specialization: "Health & Wellness",
    status: "Active",
    joined: "Jun 10, 2022",
    students: 12,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SP",
  },
];
