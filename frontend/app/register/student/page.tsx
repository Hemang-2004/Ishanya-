"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/file-uploader";

export default function StudentRegistrationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    EmailID: "",
    Password: "",
    ContactNumber: "",
    Address: "",
    DateOfBirth: "",
    Gender: "",
    // education: "",
    // program: "",
    // guardianName: "",
    // guardianContact: "",
    FathersName: "",
    MothersName: "",
    BloodGroup: "",
    Allergies: "",
    PrimaryDiagnosis: "",
    Comorbidity: "",
    AltContactNumber: "",
    ParentsEmail: "",
    Strengths: "",
    Weaknesses: "",
    PreferredLanguage: "",
    AssistiveDevices: "",
    LearningStyle: "",
    PreferredCommunicationStyle: "",
    ParentAnnualIncome: "",
    idProof: null as File | null,
    Photo: null as File | null,
    // bio: "",
  });

  useEffect(() => {
    const first_name = searchParams.get("first_name");
    const last_name = searchParams.get("last_name");
    let date_of_birth = searchParams.get("date_of_birth");
    let gender = searchParams.get("gender");
    let address = searchParams.get("address");

    if (date_of_birth) {
      const parts = date_of_birth.split("-");
      if (parts.length === 3 && parts[1].length === 2 && parts[2].length === 2) {
        const [year, day, month] = parts; // Rearrange day and month
        date_of_birth = `${year}-${month}-${day}`;
      }
    }

    if (gender) {
      gender = gender.toLowerCase(); // Convert "Female" → "female"
    }

    if (address?.toLowerCase() === "null") {
      address = "";
    }

    setFormData((prev) => ({
      ...prev,
      FirstName: first_name || prev.FirstName,
      LastName: last_name || prev.LastName,
      DateOfBirth: date_of_birth || prev.DateOfBirth,
      Gender: gender || prev.Gender,
      Address: address || prev.Address,
    }));
  }, [searchParams]);

  console.log("DOB ", formData.DateOfBirth);
  console.log("gender ", formData.Gender)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // // Simulate registration process
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
        "http://localhost:5000/auth/register/student",
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
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

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
              <Link
                href="/register"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="inline-flex h-8 items-center justify-center rounded-full bg-secondary px-3 text-xs font-medium">
                Student Registration
              </div>
            </div>
            <CardTitle className="text-2xl">Join as a Student</CardTitle>
            <CardDescription>
              Complete the form below to register as a student at Ishanya
              Foundation
            </CardDescription>
          </CardHeader>
          {/* <form onSubmit={handleSubmit}> */}
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
                    <Input
                      id="LastName"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="EmailID">Email*</Label>
                  <Input
                    id="EmailID"
                    name="EmailID"
                    type="email"
                    value={formData.EmailID}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Password">Password*</Label>
                  <Input
                    id="Password"
                    name="Password"
                    type="password"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long with a mix of
                    letters, numbers, and symbols.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ContactNumber">Phone Number*</Label>
                  <Input
                    id="ContactNumber"
                    name="ContactNumber"
                    type="tel"
                    value={formData.ContactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Address">Address*</Label>
                  <Textarea
                    id="Address"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    required
                  />
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
                  <div className="space-y-2">
                    <Label htmlFor="Gender">Gender*</Label>
                    <Select
                      defaultValue={formData.Gender}
                      onValueChange={(value) =>
                        handleSelectChange("Gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="FathersName">Father's Name</Label>
                    <Input
                      id="FathersName"
                      name="FathersName"
                      value={formData.FathersName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="MothersName">Mother's Name</Label>
                    <Input
                      id="MothersName"
                      name="MothersName"
                      value={formData.MothersName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="BloodGroup">Blood Group</Label>
                    <Select
                      defaultValue={formData.BloodGroup}
                      onValueChange={(value) =>
                        handleSelectChange("BloodGroup", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="AltContactNumber">
                      Alternative Contact Number
                    </Label>
                    <Input
                      id="AltContactNumber"
                      name="AltContactNumber"
                      type="tel"
                      value={formData.AltContactNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ParentsEmail">Parent's Email</Label>
                  <Input
                    id="ParentsEmail"
                    name="ParentsEmail"
                    type="email"
                    value={formData.ParentsEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ParentAnnualIncome">
                    Parent's Annual Income
                  </Label>
                  <Input
                    id="ParentAnnualIncome"
                    name="ParentAnnualIncome"
                    value={formData.ParentAnnualIncome}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="Allergies">Allergies (if any)</Label>
                    <Textarea
                      id="Allergies"
                      name="Allergies"
                      value={formData.Allergies}
                      onChange={handleChange}
                      placeholder="List any allergies..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="PrimaryDiagnosis">
                      Primary Diagnosis (if applicable)
                    </Label>
                    <Textarea
                      id="PrimaryDiagnosis"
                      name="PrimaryDiagnosis"
                      value={formData.PrimaryDiagnosis}
                      onChange={handleChange}
                      placeholder="Primary diagnosis information..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Comorbidity">Comorbidity (if any)</Label>
                    <Textarea
                      id="Comorbidity"
                      name="Comorbidity"
                      value={formData.Comorbidity}
                      onChange={handleChange}
                      placeholder="Any comorbid conditions..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="PreferredLanguage">
                      Preferred Language
                    </Label>
                    <Input
                      id="PreferredLanguage"
                      name="PreferredLanguage"
                      value={formData.PreferredLanguage}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="AssistiveDevices">
                      Assistive Devices (if any)
                    </Label>
                    <Textarea
                      id="AssistiveDevices"
                      name="AssistiveDevices"
                      value={formData.AssistiveDevices}
                      onChange={handleChange}
                      placeholder="List any assistive devices used..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="LearningStyle">Learning Style</Label>
                      <Select
                        defaultValue={formData.LearningStyle}
                        onValueChange={(value) =>
                          handleSelectChange("LearningStyle", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select learning style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visual">Visual</SelectItem>
                          <SelectItem value="auditory">Auditory</SelectItem>
                          <SelectItem value="kinesthetic">
                            Kinesthetic
                          </SelectItem>
                          <SelectItem value="reading-writing">
                            Reading/Writing
                          </SelectItem>
                          <SelectItem value="multimodal">Multimodal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="PreferredCommunicationStyle">
                        Preferred Communication Style
                      </Label>
                      <Select
                        defaultValue={formData.PreferredCommunicationStyle}
                        onValueChange={(value) =>
                          handleSelectChange(
                            "PreferredCommunicationStyle",
                            value
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select communication style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="verbal">Verbal</SelectItem>
                          <SelectItem value="non-verbal">Non-verbal</SelectItem>
                          <SelectItem value="aac">AAC</SelectItem>
                          <SelectItem value="sign-language">
                            Sign Language
                          </SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="Strengths">Strengths</Label>
                      <Textarea
                        id="Strengths"
                        name="Strengths"
                        value={formData.Strengths}
                        onChange={handleChange}
                        placeholder="List your strengths..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="Weaknesses">Areas for Improvement</Label>
                      <Textarea
                        id="Weaknesses"
                        name="Weaknesses"
                        value={formData.Weaknesses}
                        onChange={handleChange}
                        placeholder="Areas you'd like to improve..."
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ID Proof (Aadhar/PAN/School ID)*</Label>
                  <FileUploader
                    onFileChange={(file) => handleFileChange("idProof", file)}
                    accept=".jpg,.jpeg,.png,.pdf"
                    maxSize={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a scanned copy or clear photo of your ID. Max size:
                    5MB. Formats: JPG, PNG, PDF.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Photo*</Label>
                  <FileUploader
                    onFileChange={(file) => handleFileChange("Photo", file)}
                    accept=".jpg,.jpeg,.png"
                    maxSize={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a recent passport-sized photo. Max size: 2MB.
                    Formats: JPG, PNG.
                  </p>
                </div>

                <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                  <p className="font-medium mb-2">Important Note:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      All registrations require admin approval before
                      activation.
                    </li>
                    <li>
                      You will receive an email notification once your
                      registration is approved.
                    </li>
                    <li>
                      Please ensure all information provided is accurate and
                      documents are clearly visible.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {/* <div className="w-full flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" className={`${step > 1 ? "ml-auto" : "w-full"}`} onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div> */}
            <div className="w-full flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button
                  type="button"
                  className={`${step > 1 ? "ml-auto" : "w-full"}`}
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Registration"}
                  </Button>
                </form>
              )}
            </div>
            <div className="w-full flex justify-between items-center pt-2">
              <div className="text-sm text-muted-foreground">
                Step {step} of 4
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 w-8 rounded-full ${s === step ? "bg-primary" : "bg-muted"
                      }`}
                  />
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
          {/* </form> */}
        </Card>
      </div>
    </div>
  );
}
