"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function AddTeacherPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("manual")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    qualification: "",
    specialization: "",
    experience: "",
    resume: null as File | null,
    photo: null as File | null,
    idProof: null as File | null,
    subjects: [] as string[],
    availability: [] as string[],
    sendCredentials: true,
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, subjects: [...prev.subjects, subject] }
      } else {
        return { ...prev, subjects: prev.subjects.filter((s) => s !== subject) }
      }
    })
  }

  const handleAvailabilityChange = (time: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, availability: [...prev.availability, time] }
      } else {
        return { ...prev, availability: prev.availability.filter((t) => t !== time) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("FirstName", formData.firstName);
    formDataToSend.append("LastName", formData.lastName);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Phone", formData.phone);
    formDataToSend.append("DateOfBirth", formData.dateOfBirth);
    // formDataToSend.append("Designation", formData.designation || "");
    // formDataToSend.append("ProgramID", selectedProgram);
    formDataToSend.append("IsRegistered", "1"); // Always set to "1"
    formDataToSend.append("Password", "1234"); // You might want to use actual user input
    formDataToSend.append("Status", "Active");
  
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
  
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }
  
    try {
      const response = await fetch("http://localhost:5000/auth/register/educator", {
        method: "POST",
        body: formDataToSend, // Browser handles Content-Type
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Educator registered successfully:", result);
        router.push("/dashboard/admin"); // Redirect to admin dashboard
      } else {
        console.error("Registration failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const handleDocumentUpload = (file: File | null) => {
    if (file) {
      // Simulate document processing and data extraction
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        // Populate form with "extracted" data
        setFormData({
          ...formData,
          firstName: "Priya",
          lastName: "Sharma",
          email: "priya.s@example.com",
          phone: "+91 9876543211",
          dateOfBirth: "1985-08-22",
          gender: "female",
          address: "456 Park Avenue, Delhi, Delhi",
          qualification: "masters",
          specialization: "Computer Science",
          experience: "5-10",
          idProof: file,
        })
        toast({
          title: "Document processed",
          description: "Teacher information has been extracted from the document.",
        })
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add New Teacher</h2>
            <p className="text-muted-foreground">Add a new teacher to the Ishanya Connect platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Information</CardTitle>
          <CardDescription>Enter teacher details or upload documents for automatic extraction</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="document">Document Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload Identification Document</Label>
                  <FileUploader
                    onFileChange={handleDocumentUpload}
                    accept=".jpg,.jpeg,.png,.pdf"
                    maxSize={5}
                    className="h-64"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload Aadhar Card, PAN Card, or Professional ID to automatically extract teacher information.
                    Supported formats: JPG, PNG, PDF (Max size: 5MB)
                  </p>
                </div>

                <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                  <p className="font-medium mb-2">Document Processing:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>We'll extract basic information like name, date of birth, and address</li>
                    <li>You can review and edit the extracted information before saving</li>
                    <li>All documents are securely stored and encrypted</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("manual")} disabled={isSubmitting}>
                    Continue to Form
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manual">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender*</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address*</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Professional Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Highest Qualification*</Label>
                      <Select
                        value={formData.qualification}
                        onValueChange={(value) => handleSelectChange("qualification", value)}
                      >
                        <SelectTrigger id="qualification">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience*</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleSelectChange("experience", value)}
                      >
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">More than 10 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization/Subject*</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Mathematics, Computer Science, Language Arts"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subjects Can Teach*</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        "Mathematics",
                        "Science",
                        "English",
                        "Computer Skills",
                        "Arts & Crafts",
                        "Social Studies",
                        "Physical Education",
                        "Vocational Skills",
                        "Financial Literacy",
                        "Life Skills",
                      ].map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={formData.subjects.includes(subject)}
                            onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-sm font-normal">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Availability*</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        "Weekday Mornings",
                        "Weekday Afternoons",
                        "Weekday Evenings",
                        "Weekend Mornings",
                        "Weekend Afternoons",
                        "Weekend Evenings",
                        "Full-time",
                        "Part-time",
                      ].map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <Checkbox
                            id={`availability-${time}`}
                            checked={formData.availability.includes(time)}
                            onCheckedChange={(checked) => handleAvailabilityChange(time, checked as boolean)}
                          />
                          <Label htmlFor={`availability-${time}`} className="text-sm font-normal">
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Documents & Photos</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Resume/CV*</Label>
                      <FileUploader
                        onFileChange={(file) => handleFileChange("resume", file)}
                        accept=".pdf,.doc,.docx"
                        maxSize={5}
                        value={formData.resume}
                      />
                      <p className="text-xs text-muted-foreground">Max size: 5MB. Formats: PDF, DOC, DOCX.</p>
                    </div>
                    <div className="space-y-2">
                      <Label>ID Proof (Aadhar/PAN)*</Label>
                      <FileUploader
                        onFileChange={(file) => handleFileChange("idProof", file)}
                        accept=".jpg,.jpeg,.png,.pdf"
                        maxSize={5}
                        value={formData.idProof}
                      />
                      <p className="text-xs text-muted-foreground">Max size: 5MB. Formats: JPG, PNG, PDF.</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Photo</Label>
                      <FileUploader
                        onFileChange={(file) => handleFileChange("photo", file)}
                        accept=".jpg,.jpeg,.png"
                        maxSize={2}
                        value={formData.photo}
                      />
                      <p className="text-xs text-muted-foreground">Max size: 2MB. Formats: JPG, PNG.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add any additional notes about the teacher..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendCredentials"
                      checked={formData.sendCredentials}
                      onCheckedChange={(checked) => handleCheckboxChange("sendCredentials", checked as boolean)}
                    />
                    <Label htmlFor="sendCredentials" className="text-sm font-normal">
                      Send login credentials to teacher via email
                    </Label>
                  </div>
                </div>

                <CardFooter className="px-0 pt-6 flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                        Adding Teacher...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Teacher
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

