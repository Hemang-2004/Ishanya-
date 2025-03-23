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
import { Edit, Save, User, Shield, Key, Bell, LogOut } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function AdminProfilePage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Vikram",
    lastName: "Malhotra",
    email: "vikram.m@ishanya.org",
    phone: "+91 9876543210",
    role: "Administrator",
    department: "Program Management",
    bio: "Program administrator at Ishanya Connect with over 10 years of experience in education management and community development.",
    photo: null as File | null,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newRegistrations: true,
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
                    <AvatarFallback>VM</AvatarFallback>
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
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            name="department"
                            value={formData.department}
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
                          <Shield className="h-4 w-4 text-primary" />
                          <p className="text-muted-foreground">{formData.role}</p>
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
                          <p className="text-sm font-medium text-muted-foreground">Department</p>
                          <p>{formData.department}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                          <p>February 20, 2021</p>
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
              <CardTitle>Administrative Access</CardTitle>
              <CardDescription>Your administrative permissions and access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Access Level</p>
                    <p>Full Administrator</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Permission Group</p>
                    <p>System Administrators</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Permissions</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>User Management (Create, Edit, Delete)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Program Management (Create, Edit, Delete)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>System Configuration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Reports & Analytics Access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Financial Data Access</span>
                    </li>
                  </ul>
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
                    <Shield className="h-5 w-5 text-primary" />
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

          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Recent activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Login from new device</div>
                        <div className="text-sm text-muted-foreground">Windows • Chrome • Mumbai, India</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Today, 10:30 AM</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Key className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Password changed</div>
                        <div className="text-sm text-muted-foreground">Windows • Chrome • Mumbai, India</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">June 10, 2023, 2:15 PM</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Profile information updated</div>
                        <div className="text-sm text-muted-foreground">Windows • Chrome • Mumbai, India</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">June 5, 2023, 11:20 AM</div>
                  </div>
                </div>
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
                      <Label htmlFor="newRegistrations">New Registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about new student and teacher registrations
                      </p>
                    </div>
                    <Switch
                      id="newRegistrations"
                      checked={notificationSettings.newRegistrations}
                      onCheckedChange={(checked) => handleNotificationChange("newRegistrations", checked)}
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
                      <p className="text-sm text-muted-foreground">Weekly summary reports of platform activity</p>
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

