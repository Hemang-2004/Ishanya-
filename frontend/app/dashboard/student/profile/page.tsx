"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileUploader } from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Edit, Save, FileText, Award, Download, Upload } from "lucide-react"

export default function StudentProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Arjun",
    lastName: "Patel",
    email: "arjun.p@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra",
    dateOfBirth: "2005-05-15",
    guardianName: "Rajesh Patel",
    guardianContact: "+91 9876543211",
    bio: "I'm a student at Ishanya Connect, learning digital skills to improve my career prospects. I'm particularly interested in computer programming and design.",
    photo: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, photo: file }))
  }

  const handleSave = () => {
    // In a real app, you would send this to an API
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">View and manage your personal information</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="space-y-2">
                      <Label>Profile Photo</Label>
                      <FileUploader onFileChange={handleFileChange} accept=".jpg,.jpeg,.png" maxSize={2} />
                      <p className="text-xs text-muted-foreground">Max size: 2MB. Formats: JPG, PNG.</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">About Me</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="min-h-[100px]"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-xl font-bold">
                          {formData.firstName} {formData.lastName}
                        </h3>
                        <p className="text-muted-foreground">Student at Ishanya Connect</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                        <p>{formData.address}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                          <p>{new Date(formData.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">About Me</p>
                        <p className="mt-1">{formData.bio}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guardian Information</CardTitle>
              <CardDescription>Information about your parent or guardian</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianName">Guardian/Parent Name</Label>
                    <Input
                      id="guardianName"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianContact">Guardian/Parent Contact</Label>
                    <Input
                      id="guardianContact"
                      name="guardianContact"
                      value={formData.guardianContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Guardian/Parent Name</p>
                    <p>{formData.guardianName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Guardian/Parent Contact</p>
                    <p>{formData.guardianContact}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
              <CardDescription>Details about your current program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Program</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">Digital Literacy</Badge>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Assigned Teacher</p>
                      <p>Priya Sharma</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Enrollment Date</p>
                      <p>January 15, 2023</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Overall Progress</p>
                      <p className="text-sm">85%</p>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Introduction to Computers</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Internet Basics</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Microsoft Office</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-1.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Email and Communication</span>
                        <span>80%</span>
                      </div>
                      <Progress value={80} className="h-1.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Online Safety</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Certificates and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Introduction to Computers</p>
                      <p className="text-sm text-muted-foreground">Completed on February 10, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Certificate
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Internet Basics</p>
                      <p className="text-sm text-muted-foreground">Completed on March 5, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Your academic performance and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Word Document Formatting</div>
                    <Badge>Grade: A</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Excellent work on formatting. Your document was well-structured and followed all requirements. Keep
                    up the good work!
                  </p>
                  <p className="text-xs text-muted-foreground">Feedback by: Priya Sharma - March 10, 2023</p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Module 1 Assessment</div>
                    <Badge>Grade: B+</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Good understanding of basic computer concepts. You've made great progress in a short time.
                  </p>
                  <p className="text-xs text-muted-foreground">Feedback by: Priya Sharma - February 25, 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Documents</CardTitle>
              <CardDescription>Access and manage your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">ID Proof (Aadhar Card)</p>
                      <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">School Certificate</p>
                      <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Registration Form</p>
                      <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

