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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { Save, Bell, Shield, Key, Download } from "lucide-react"

export default function TeacherSettingsPage() {
  const { toast } = useToast()
  const { t, language, setLanguage } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    displayName: "Priya Sharma",
    email: "priya.s@ishanya.org",
    phone: "+91 9876543210",
    bio: "Passionate educator with 5+ years of experience teaching digital skills. Committed to helping students develop practical technology skills for the modern workplace.",
    language: language,
    timezone: "Asia/Kolkata",
  })

  const [teachingSettings, setTeachingSettings] = useState({
    defaultCourseVisibility: "draft",
    autoGradeQuizzes: true,
    allowStudentFeedback: true,
    showProgressToStudents: true,
    enableDiscussionBoard: true,
    autoSendReminders: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    studentSubmissions: true,
    studentQuestions: true,
    courseUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareProfileWithStudents: true,
    shareContactInfo: false,
    allowStudentMessages: true,
    showOnlineStatus: true,
    allowAnalytics: true,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
    if (name === "language") {
      setLanguage(value as any)
    }
  }

  const handleTeachingChange = (name: string, value: string | boolean) => {
    setTeachingSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePrivacyChange = (name: string, checked: boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [name]: checked }))
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

  const handleSaveTeaching = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Teaching settings saved",
        description: "Your teaching preferences have been updated.",
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
          <h2 className="text-2xl font-bold tracking-tight">{t("settings")}</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("general")}</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    value={generalSettings.displayName}
                    onChange={handleGeneralChange}
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={generalSettings.phone} onChange={handleGeneralChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
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
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={generalSettings.bio}
                  onChange={handleGeneralChange}
                  className="min-h-[100px]"
                />
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
              <CardTitle>Security</CardTitle>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Preferences</CardTitle>
              <CardDescription>Customize your teaching experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="defaultCourseVisibility">Default Course Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Set the default visibility for new courses you create
                    </p>
                  </div>
                  <Select
                    value={teachingSettings.defaultCourseVisibility}
                    onValueChange={(value) => handleTeachingChange("defaultCourseVisibility", value)}
                  >
                    <SelectTrigger id="defaultCourseVisibility" className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft (Hidden)</SelectItem>
                      <SelectItem value="private">Private (Invitation Only)</SelectItem>
                      <SelectItem value="public">Public (Visible to All)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoGradeQuizzes">Auto-Grade Quizzes</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically grade multiple-choice and true/false quizzes
                    </p>
                  </div>
                  <Switch
                    id="autoGradeQuizzes"
                    checked={teachingSettings.autoGradeQuizzes}
                    onCheckedChange={(checked) => handleTeachingChange("autoGradeQuizzes", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowStudentFeedback">Allow Student Feedback</Label>
                    <p className="text-sm text-muted-foreground">Enable students to provide feedback on your courses</p>
                  </div>
                  <Switch
                    id="allowStudentFeedback"
                    checked={teachingSettings.allowStudentFeedback}
                    onCheckedChange={(checked) => handleTeachingChange("allowStudentFeedback", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showProgressToStudents">Show Progress to Students</Label>
                    <p className="text-sm text-muted-foreground">Display course progress indicators to students</p>
                  </div>
                  <Switch
                    id="showProgressToStudents"
                    checked={teachingSettings.showProgressToStudents}
                    onCheckedChange={(checked) => handleTeachingChange("showProgressToStudents", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableDiscussionBoard">Enable Discussion Board</Label>
                    <p className="text-sm text-muted-foreground">Allow students to post questions and discussions</p>
                  </div>
                  <Switch
                    id="enableDiscussionBoard"
                    checked={teachingSettings.enableDiscussionBoard}
                    onCheckedChange={(checked) => handleTeachingChange("enableDiscussionBoard", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSendReminders">Auto-Send Reminders</Label>
                    <p className="text-sm text-muted-foreground">Automatically send reminders for upcoming deadlines</p>
                  </div>
                  <Switch
                    id="autoSendReminders"
                    checked={teachingSettings.autoSendReminders}
                    onCheckedChange={(checked) => handleTeachingChange("autoSendReminders", checked)}
                  />
                </div>
              </div>

              <Button onClick={handleSaveTeaching} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save Teaching Preferences"}
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
                      <Label htmlFor="studentQuestions">Student Questions</Label>
                      <p className="text-sm text-muted-foreground">Notifications when students ask questions</p>
                    </div>
                    <Switch
                      id="studentQuestions"
                      checked={notificationSettings.studentQuestions}
                      onCheckedChange={(checked) => handleNotificationChange("studentQuestions", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="courseUpdates">Course Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates about course changes and new content</p>
                    </div>
                    <Switch
                      id="courseUpdates"
                      checked={notificationSettings.courseUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("courseUpdates", checked)}
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
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shareProfileWithStudents">Share Profile with Students</Label>
                    <p className="text-sm text-muted-foreground">Allow students to view your professional profile</p>
                  </div>
                  <Switch
                    id="shareProfileWithStudents"
                    checked={privacySettings.shareProfileWithStudents}
                    onCheckedChange={(checked) => handlePrivacyChange("shareProfileWithStudents", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shareContactInfo">Share Contact Information</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your email and phone number visible to students
                    </p>
                  </div>
                  <Switch
                    id="shareContactInfo"
                    checked={privacySettings.shareContactInfo}
                    onCheckedChange={(checked) => handlePrivacyChange("shareContactInfo", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowStudentMessages">Allow Student Messages</Label>
                    <p className="text-sm text-muted-foreground">Let students send you direct messages</p>
                  </div>
                  <Switch
                    id="allowStudentMessages"
                    checked={privacySettings.allowStudentMessages}
                    onCheckedChange={(checked) => handlePrivacyChange("allowStudentMessages", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showOnlineStatus">Show Online Status</Label>
                    <p className="text-sm text-muted-foreground">Display when you're online to students</p>
                  </div>
                  <Switch
                    id="showOnlineStatus"
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={(checked) => handlePrivacyChange("showOnlineStatus", checked)}
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
                    checked={privacySettings.allowAnalytics}
                    onCheckedChange={(checked) => handlePrivacyChange("allowAnalytics", checked)}
                  />
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
              <CardDescription>Manage your personal data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Download Your Data</h3>
                <p className="text-sm text-muted-foreground">
                  Download a copy of all your personal data and teaching materials
                </p>
                <Button variant="outline" className="mt-2">
                  <Download className="mr-2 h-4 w-4" />
                  Request Data Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

