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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function VolunteerRegistrationPage() {
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
    occupation: "",
    skills: [] as string[],
    availability: [] as string[],
    volunteerType: "",
    hoursPerWeek: "",
    motivation: "",
    photo: null as File | null,
    idProof: null as File | null,
    emergencyContact: "",
    emergencyRelation: "",
    previousExperience: "",
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
        return { ...prev, [name]: [...(prev[name as keyof typeof prev] as string[]), value] }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Registration submitted",
        description: "Your volunteer registration has been submitted for approval. You'll be notified once approved.",
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
                Volunteer Registration
              </div>
            </div>
            <CardTitle className="text-2xl">Join as a Volunteer</CardTitle>
            <CardDescription>Complete the form below to register as a volunteer at Ishanya Foundation</CardDescription>
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
                    <Label htmlFor="occupation">Current Occupation*</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Student, Professional, Retired"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Skills & Expertise*</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Teaching",
                        "Mentoring",
                        "Event Planning",
                        "Administration",
                        "IT/Technical",
                        "Art & Design",
                        "Photography",
                        "Writing/Content",
                        "Social Media",
                        "Fundraising",
                        "Healthcare",
                        "Counseling",
                      ].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={formData.skills.includes(skill)}
                            onCheckedChange={(checked) => handleCheckboxChange("skills", skill, checked as boolean)}
                          />
                          <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
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
                    <Label>Type of Volunteering*</Label>
                    <RadioGroup
                      defaultValue={formData.volunteerType}
                      onValueChange={(value) => handleSelectChange("volunteerType", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular">Regular (Weekly/Monthly commitment)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="event-based" id="event-based" />
                        <Label htmlFor="event-based">Event-based (Specific events only)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="project-based" id="project-based" />
                        <Label htmlFor="project-based">Project-based (For specific initiatives)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek">Hours Available Per Week*</Label>
                    <Select
                      defaultValue={formData.hoursPerWeek}
                      onValueChange={(value) => handleSelectChange("hoursPerWeek", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 hours</SelectItem>
                        <SelectItem value="4-6">4-6 hours</SelectItem>
                        <SelectItem value="7-10">7-10 hours</SelectItem>
                        <SelectItem value="10+">More than 10 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to volunteer with us?*</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      placeholder="Share your motivation for volunteering with Ishanya Foundation..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousExperience">Previous Volunteer Experience (if any)</Label>
                    <Textarea
                      id="previousExperience"
                      name="previousExperience"
                      value={formData.previousExperience}
                      onChange={handleChange}
                      placeholder="Please describe any previous volunteer experience you have..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Photo*</Label>
                    <FileUploader
                      onFileChange={(file) => handleFileChange("photo", file)}
                      accept=".jpg,.jpeg,.png"
                      maxSize={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a recent photo. Max size: 2MB. Formats: JPG, PNG.
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact Number*</Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">Relationship to Emergency Contact*</Label>
                      <Input
                        id="emergencyRelation"
                        name="emergencyRelation"
                        value={formData.emergencyRelation}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Parent, Spouse, Friend"
                      />
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                    <p className="font-medium mb-2">Important Note:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>All volunteer registrations require admin approval before activation.</li>
                      <li>You will receive an email notification once your registration is approved.</li>
                      <li>Please ensure all information provided is accurate.</li>
                      <li>Volunteers may be required to attend an orientation session.</li>
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

