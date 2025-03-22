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

export default function StudentRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    education: "",
    program: "",
    guardianName: "",
    guardianContact: "",
    idProof: null as File | null,
    photo: null as File | null,
    bio: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Registration submitted",
        description: "Your registration has been submitted for approval. You'll be notified once approved.",
      })

      router.push("/registration-success")
    }, 1500)
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
                Student Registration
              </div>
            </div>
            <CardTitle className="text-2xl">Join as a Student</CardTitle>
            <CardDescription>Complete the form below to register as a student at Ishanya Foundation</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {step === 1 && (
                <div className="space-y-4">
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
                    <Label htmlFor="password">Password*</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long with a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address*</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
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
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level*</Label>
                    <Select
                      defaultValue={formData.education}
                      onValueChange={(value) => handleSelectChange("education", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary School</SelectItem>
                        <SelectItem value="secondary">Secondary School</SelectItem>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Interested Program*</Label>
                    <Select
                      defaultValue={formData.program}
                      onValueChange={(value) => handleSelectChange("program", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-literacy">Digital Literacy</SelectItem>
                        <SelectItem value="vocational-training">Vocational Training</SelectItem>
                        <SelectItem value="community-leadership">Community Leadership</SelectItem>
                        <SelectItem value="health-wellness">Health & Wellness</SelectItem>
                        <SelectItem value="financial-literacy">Financial Literacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Guardian/Parent Name*</Label>
                      <Input
                        id="guardianName"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianContact">Guardian/Parent Contact*</Label>
                      <Input
                        id="guardianContact"
                        name="guardianContact"
                        value={formData.guardianContact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>ID Proof (Aadhar/PAN/School ID)*</Label>
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
                    <Label htmlFor="bio">Tell us about yourself</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Share a bit about yourself, your interests, and why you want to join this program..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                    <p className="font-medium mb-2">Important Note:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>All registrations require admin approval before activation.</li>
                      <li>You will receive an email notification once your registration is approved.</li>
                      <li>Please ensure all information provided is accurate and documents are clearly visible.</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" className={`${step > 1 ? "ml-auto" : "w-full"}`} onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
              <div className="w-full flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">Step {step} of 3</div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((s) => (
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
          </form>
        </Card>
      </div>
    </div>
  )
}

