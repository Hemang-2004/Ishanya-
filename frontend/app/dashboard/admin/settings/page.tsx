"use client"

import { Badge } from "@/components/ui/badge"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Save, Bell, Shield, Database, FileText, Users } from "lucide-react"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    organizationName: "Ishanya Connect",
    tagline: "Journey to Inclusion",
    email: "info@ishanyaindia.org",
    phone: "+91 73496 76668",
    address: "123 Main Street, Mumbai, Maharashtra, India",
    website: "https://ishanyaindia.org",
    language: "en",
    timezone: "Asia/Kolkata",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newRegistrations: true,
    programUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: "1year",
    shareStudentData: false,
    shareTeacherData: false,
    allowAnalytics: true,
    allowMarketing: false,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePrivacyChange = (name: string, value: string | boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveGeneral = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      })
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Notification settings saved",
        description: "Your notification preferences have been updated.",
      })
    }, 1000)
  }

  const handleSavePrivacy = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Privacy settings saved",
        description: "Your privacy settings have been updated.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your organization settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Basic details about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={generalSettings.organizationName}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" name="tagline" value={generalSettings.tagline} onChange={handleGeneralChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={generalSettings.phone} onChange={handleGeneralChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" value={generalSettings.address} onChange={handleGeneralChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={generalSettings.website}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => handleSelectChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                      <SelectItem value="gu">Gujarati</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={generalSettings.timezone}
                  onValueChange={(value) => handleSelectChange("timezone", value)}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
                    <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveGeneral} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 w-full h-24 bg-background">
                      <div className="h-8 rounded-md bg-primary mb-2"></div>
                      <div className="h-4 rounded-md bg-muted"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="theme-light" name="theme" value="light" checked />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 w-full h-24 bg-zinc-950">
                      <div className="h-8 rounded-md bg-primary mb-2"></div>
                      <div className="h-4 rounded-md bg-zinc-800"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="theme-dark" name="theme" value="dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 w-full h-24 bg-background">
                      <div className="h-8 rounded-md bg-primary mb-2"></div>
                      <div className="h-4 rounded-md bg-muted"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="theme-system" name="theme" value="system" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600"></div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="color-blue" name="color" value="blue" checked />
                      <Label htmlFor="color-blue">Blue</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-600"></div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="color-green" name="color" value="green" />
                      <Label htmlFor="color-green">Green</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-600"></div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="color-purple" name="color" value="purple" />
                      <Label htmlFor="color-purple">Purple</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-orange-600"></div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="color-orange" name="color" value="orange" />
                      <Label htmlFor="color-orange">Orange</Label>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-red-600"></div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="color-red" name="color" value="red" />
                      <Label htmlFor="color-red">Red</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveGeneral} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
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

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
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

              <Button onClick={handleSaveNotifications} disabled={isSubmitting}>
                <Bell className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data Settings</CardTitle>
              <CardDescription>Manage data privacy and retention policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention Period</Label>
                  <Select
                    value={privacySettings.dataRetention}
                    onValueChange={(value) => handlePrivacyChange("dataRetention", value)}
                  >
                    <SelectTrigger id="dataRetention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    How long to retain inactive user data before automatic deletion
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Data Sharing</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shareStudentData">Share Student Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized student data with partner organizations
                      </p>
                    </div>
                    <Switch
                      id="shareStudentData"
                      checked={privacySettings.shareStudentData as boolean}
                      onCheckedChange={(checked) => handlePrivacyChange("shareStudentData", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shareTeacherData">Share Teacher Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized teacher data with partner organizations
                      </p>
                    </div>
                    <Switch
                      id="shareTeacherData"
                      checked={privacySettings.shareTeacherData as boolean}
                      onCheckedChange={(checked) => handlePrivacyChange("shareTeacherData", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowAnalytics">Allow Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Collect anonymous usage data to improve the platform
                      </p>
                    </div>
                    <Switch
                      id="allowAnalytics"
                      checked={privacySettings.allowAnalytics as boolean}
                      onCheckedChange={(checked) => handlePrivacyChange("allowAnalytics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowMarketing">Allow Marketing</Label>
                      <p className="text-sm text-muted-foreground">Send marketing communications about our programs</p>
                    </div>
                    <Switch
                      id="allowMarketing"
                      checked={privacySettings.allowMarketing as boolean}
                      onCheckedChange={(checked) => handlePrivacyChange("allowMarketing", checked)}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSavePrivacy} disabled={isSubmitting}>
                <Shield className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage and export organization data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Database className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">Database Backup</h3>
                      <p className="text-sm text-muted-foreground">
                        Create a backup of all your organization data. This includes student records, teacher profiles,
                        program information, and more.
                      </p>
                    </div>
                    <Button variant="outline">Create Backup</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">Export Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        Export comprehensive reports about your organization's activities, student progress, and
                        financial data.
                      </p>
                    </div>
                    <Button variant="outline">Export Reports</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 border-destructive/20">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-destructive">Delete All Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete all organization data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive">Delete All Data</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage administrator access and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "success" : "destructive"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button>
                <Users className="mr-2 h-4 w-4" />
                Add Administrator
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure access levels for different user roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">Super Administrator</h3>
                  <p className="text-sm text-muted-foreground mb-4">Full access to all system features and settings</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={true} disabled />
                      <Label>User Management</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={true} disabled />
                      <Label>Financial Data</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={true} disabled />
                      <Label>System Settings</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={true} disabled />
                      <Label>Program Management</Label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">Administrator</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access to most system features with some restrictions
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={true} />
                      <Label>User Management</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={false} />
                      <Label>Financial Data</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={false} />
                      <Label>System Settings</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={true} />
                      <Label>Program Management</Label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">Program Coordinator</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access to program-specific features and student data
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={false} />
                      <Label>User Management</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={false} />
                      <Label>Financial Data</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={false} />
                      <Label>System Settings</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={true} />
                      <Label>Program Management</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Permission Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const adminUsers = [
  {
    id: "1",
    name: "Vikram Malhotra",
    email: "vikram.m@ishanya.org",
    role: "Super Admin",
    status: "Active",
    lastActive: "Today, 10:30 AM",
  },
  {
    id: "2",
    name: "Neha Gupta",
    email: "neha.g@ishanya.org",
    role: "Admin",
    status: "Active",
    lastActive: "Yesterday, 3:45 PM",
  },
  {
    id: "3",
    name: "Rajesh Kumar",
    email: "rajesh.k@ishanya.org",
    role: "Program Coordinator",
    status: "Active",
    lastActive: "Today, 9:15 AM",
  },
  {
    id: "4",
    name: "Anita Desai",
    email: "anita.d@ishanya.org",
    role: "Admin",
    status: "Inactive",
    lastActive: "Jun 15, 2023",
  },
]

