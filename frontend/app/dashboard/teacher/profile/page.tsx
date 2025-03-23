"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileUploader } from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { Edit, Save, Calendar, GraduationCap, Key, Bell, LogOut, Award } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function TeacherProfilePage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.s@ishanya.org",
    phone: "+91 9876543210",
    role: "Teacher",
    specialization: "Digital Literacy",
    bio: "Passionate educator with 5+ years of experience teaching digital skills. Committed to helping students develop practical technology skills for the modern workplace.",
    photo: null as File | null,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    studentSubmissions: true,
    programUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
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

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleChangePassword = () => {
    toast({
      title: "Password reset email sent",
      description: "Please check your email for instructions to reset your password.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
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
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback>PS</AvatarFallback>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" name="role" value={formData.role} onChange={handleChange} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
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
                        <div className="flex items-center gap-2 mt-1">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <p className="text-muted-foreground">
                            {formData.role} - {formData.specialization}
                          </p>
                        </div>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                          <p>{formData.specialization}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                          <p>March 10, 2022</p>
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
        </TabsContent>

        <TabsContent value="teaching" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Information</CardTitle>
              <CardDescription>Your teaching details and qualifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Courses & Programs</h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Digital Literacy</div>
                        <div className="text-sm text-muted-foreground">Primary Instructor • 3 Active Batches</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Computer Basics</div>
                        <div className="text-sm text-muted-foreground">Co-Instructor • 1 Active Batch</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Internet Safety</div>
                        <div className="text-sm text-muted-foreground">Workshop Instructor • No Active Batches</div>
                      </div>
                      <Badge variant="outline">Inactive</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Qualifications & Certifications</h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Master's in Computer Applications</div>
                        <div className="text-sm text-muted-foreground">Delhi University • 2015-2017</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Certified Digital Literacy Instructor</div>
                        <div className="text-sm text-muted-foreground">Microsoft • 2018</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Advanced Teaching Methodology</div>
                        <div className="text-sm text-muted-foreground">National Institute of Education • 2019</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Teaching Schedule</h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Digital Literacy - Batch A</div>
                          <div className="text-sm text-muted-foreground">Monday, Wednesday • 10:00 AM - 12:00 PM</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Digital Literacy - Batch B</div>
                          <div className="text-sm text-muted-foreground">Tuesday, Thursday • 2:00 PM - 4:00 PM</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Computer Basics</div>
                          <div className="text-sm text-muted-foreground">Friday • 10:00 AM - 1:00 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teaching Statistics</CardTitle>
              <CardDescription>Your teaching performance and impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Students Taught</h3>
                  <div className="text-3xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">Total students across all courses</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Average Student Rating</h3>
                  <div className="text-3xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground">Based on 98 student reviews</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Completion Rate</h3>
                  <div className="text-3xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">Students who completed your courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                  For security reasons, you'll receive an email with instructions to reset your password.
                </p>
                <Button onClick={handleChangePassword} className="mt-2">
                  <Key className="mr-2 h-4 w-4" />
                  Reset Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    <span>Two-Factor Authentication</span>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your active login sessions across different devices.
                </p>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground">Windows • Chrome • Mumbai, India</div>
                    </div>
                    <div className="text-sm text-green-500">Active Now</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Mobile App</div>
                      <div className="text-sm text-muted-foreground">Android • Ishanya App • Mumbai, India</div>
                    </div>
                    <div className="text-sm text-muted-foreground">2 days ago</div>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Notification Types</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="studentSubmissions">Student Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about student assignment submissions
                      </p>
                    </div>
                    <Switch
                      id="studentSubmissions"
                      checked={notificationSettings.studentSubmissions}
                      onCheckedChange={(checked) => handleNotificationChange("studentSubmissions", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="programUpdates">Program Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates about program changes and new content</p>
                    </div>
                    <Switch
                      id="programUpdates"
                      checked={notificationSettings.programUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("programUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemAlerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Important system alerts and security notifications
                      </p>
                    </div>
                    <Switch
                      id="systemAlerts"
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("systemAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Weekly summary reports of student progress</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="mt-4">
                <Bell className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

