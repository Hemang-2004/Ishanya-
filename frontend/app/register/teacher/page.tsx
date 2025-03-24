"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { Checkbox } from "@/components/ui/checkbox"

export default function TeacherRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Phone: "",
    WorkLocation: "",
    DateOfBirth: "",
    BloodGroup: "",

    // gender: "",
    HighEducationQualification: "",
    // Designation: "",
    // specialization: "",
    // experience: "",
    resume: null as File | null,
    photo: null as File | null,
    // idProof: null as File | null,
    // bio: "",
    // subjects: [] as string[],
    // availability: [] as string[],
    // references: "",
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

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, [name]: [...(prev[name as keyof typeof prev] as unknown as string[]), value] }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as unknown as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    
    // Simulate registration process
    // setTimeout(() => {
    //   setIsLoading(false)

    //   toast({
    //     title: "Registration submitted",
    //     description: "Your registration has been submitted for approval. You'll be notified once approved.",
    //   })

    //   router.push("/registration-success")
    // }, 1500)

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && value instanceof File) {
          formDataToSend.append(key, value); // Append files
        } else if (value) {
          formDataToSend.append(key, String(value)); // Append non-file values
        }
      });
      console.log(formDataToSend);
      const response = await fetch(
        "http://localhost:5000/auth/register/educator",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Registration successful",
          description: "Your registration has been submitted successfully.",
        });
        router.push("/registration-success");
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  return (
    <div className="min-h-screen ngo-pattern-bg py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Ishanya Connect</h1>
          </Link>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Link href="/register" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="inline-flex h-8 items-center justify-center rounded-full bg-secondary px-3 text-xs font-medium">
                Educator/Staff Registration
              </div>
            </div>
            <CardTitle className="text-2xl">Join as an Educator/Staff</CardTitle>
            <CardDescription>
              Complete the form below to register as an Educator or a staff member at Ishanya Foundation
            </CardDescription>
          </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="FirstName">First Name*</Label>
                      <Input
                        id="FirstName"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="LastName">Last Name*</Label>
                      <Input id="LastName" name="LastName" value={formData.LastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Email">Email*</Label>
                    <Input
                      id="Email"
                      name="Email"
                      type="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Password">Password*</Label>
                    <Input
                      id="Password"
                      name="Password"
                      type="Password"
                      value={formData.Password}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long with a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Phone">Phone Number</Label>
                    <Input id="Phone" name="Phone" type="tel" value={formData.Phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="WorkLocation">Work Location</Label>
                    <Textarea id="WorkLocation" name="WorkLocation" value={formData.WorkLocation} onChange={handleChange} required />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="DateOfBirth">Date of Birth*</Label>
                      <Input
                        id="DateOfBirth"
                        name="DateOfBirth"
                        type="date"
                        value={formData.DateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="gender">Gender*</Label>
                      <Select
                        defaultValue={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="HighEducationQualification">Highest Qualification*</Label>
                    <Select
                      defaultValue={formData.HighEducationQualification}
                      onValueChange={(value) => handleSelectChange("HighEducationQualification", value)}
                    >
                      <SelectTrigger>
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
                  {/* <div className="space-y-2">
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
                    <Label htmlFor="experience">Years of Experience*</Label>
                    <Select
                      defaultValue={formData.experience}
                      onValueChange={(value) => handleSelectChange("experience", value)}
                    >
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <Label>Subjects You Can Teach*</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
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
                            onCheckedChange={(checked) => handleCheckboxChange("subjects", subject, checked as boolean)}
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-sm font-normal">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div> */}
                   <div className="space-y-2">
                    <Label>Resume/CV*</Label>
                    <FileUploader
                      onFileChange={(file) => handleFileChange("resume", file)}
                      accept=".pdf,.doc,.docx"
                      maxSize={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload your resume or CV. Max size: 5MB. Formats: PDF, DOC, DOCX.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Photo*</Label>
                    <FileUploader
                      onFileChange={(file) => handleFileChange("photo", file)}
                      accept=".jpg,.jpeg,.png"
                      maxSize={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a recent passport-sized photo. Max size: 2MB. Formats: JPG, PNG.
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                    <p className="font-medium mb-2">Important Note:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>All registrations require admin approval before activation.</li>
                      <li>You will receive an Email notification once your registration is approved.</li>
                      <li>Please ensure all information provided is accurate and documents are clearly visible.</li>
                      <li>Background verification may be conducted for all teaching positions.</li>
                    </ul>
                  </div>
                </div>
              )}
{/* 
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Resume/CV*</Label>
                    <FileUploader
                      onFileChange={(file) => handleFileChange("resume", file)}
                      accept=".pdf,.doc,.docx"
                      maxSize={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload your resume or CV. Max size: 5MB. Formats: PDF, DOC, DOCX.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Photo*</Label>
                    <FileUploader
                      onFileChange={(file) => handleFileChange("photo", file)}
                      accept=".jpg,.jpeg,.png"
                      maxSize={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a recent passport-sized photo. Max size: 2MB. Formats: JPG, PNG.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>ID Proof (Aadhar/PAN)*</Label>
                    <FileUploader
                      onFileChange={(file) => handleFileChange("idProof", file)}
                      accept=".jpg,.jpeg,.png,.pdf"
                      maxSize={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a scanned copy or clear photo of your ID. Max size: 5MB. Formats: JPG, PNG, PDF.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Availability*</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
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
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("availability", time, checked as boolean)
                            }
                          />
                          <Label htmlFor={`availability-${time}`} className="text-sm font-normal">
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Tell us about yourself and your teaching philosophy*</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Share your teaching approach, experience, and why you want to join Ishanya Foundation..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="references">References (Optional)</Label>
                    <Textarea
                      id="references"
                      name="references"
                      value={formData.references}
                      onChange={handleChange}
                      placeholder="Please provide names and contact information for professional references..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                    <p className="font-medium mb-2">Important Note:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>All registrations require admin approval before activation.</li>
                      <li>You will receive an Email notification once your registration is approved.</li>
                      <li>Please ensure all information provided is accurate and documents are clearly visible.</li>
                      <li>Background verification may be conducted for all teaching positions.</li>
                    </ul>
                  </div>
                </div>
              )} */}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 2 ? (
                  <Button type="button" className={`${step > 1 ? "ml-auto" : "w-full"}`} onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit}>
                  <Button type="submit" className="ml-auto" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Registration"}
                  </Button>
                  </form>


                )}
              </div>
              <div className="w-full flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">Step {step} of 2</div>
                <div className="flex gap-1">
                  {[1, 2].map((s) => (
                    <div key={s} className={`h-2 w-8 rounded-full ${s === step ? "bg-primary" : "bg-muted"}`} />
                  ))}
                </div>
              </div>
              <div className="text-center text-sm pt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </div>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}

