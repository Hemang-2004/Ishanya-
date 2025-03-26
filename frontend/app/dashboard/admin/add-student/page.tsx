"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/file-uploader";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AddStudentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const [programs, setPrograms] = useState<{ id: string; name: string }[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [educators, setEducators] = useState<
    { EducatorID: number; Name: string; Email: string }[]
  >([]);
  const [selectedEducator, setSelectedEducator] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    guardianName: "",
    guardianContact: "",
    education: "",
    program: "",
    photo: null as File | null,
    idProof: null as File | null,
    sendCredentials: true,
    notes: "",
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admins/get-programs"
        );
        const data = await response.json();
        if (data.success) {
          setPrograms(data.programs);
        } else {
          console.error("Failed to fetch programs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    if (!selectedProgram) return;

    const fetchEducators = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admins/get-educators-of-program/${selectedProgram}`
        );
        const data = await response.json();
        if (data.success) {
          setEducators(data.educators);
        } else {
          console.error("Failed to fetch educators:", data.message);
        }
      } catch (error) {
        console.error("Error fetching educators:", error);
      }
    };

    fetchEducators();
  }, [selectedProgram]);

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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsSubmitting(false)
  //     toast({
  //       title: "Student added successfully",
  //       description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
  //     })
  //     router.push("/dashboard/admin/students")
  //   }, 1500)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];  
    const formDataToSend = new FormData();
    formDataToSend.append("FirstName", formData.firstName);
    formDataToSend.append("LastName", formData.lastName);
    formDataToSend.append("EmailID", formData.email);
    formDataToSend.append("Phone", formData.phone);
    formDataToSend.append("DateOfBirth", formData.dateOfBirth);
    formDataToSend.append("Gender", formData.gender);
    formDataToSend.append("Address", formData.address);
    formDataToSend.append("FathersName", formData.guardianName);
    formDataToSend.append("AltContactNumber", formData.guardianContact);
    formDataToSend.append("ProgramID", selectedProgram);
    formDataToSend.append("IsRegistered", "1");
    formDataToSend.append("PrimaryEducatorID", selectedEducator);
    formDataToSend.append("Password", "1234");
    formDataToSend.append("Status", "Active");
    formDataToSend.append("DateOfJoining", today);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    if (formData.idProof) {
      formDataToSend.append("idProof", formData.idProof);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/auth/register/student",
        {
          method: "POST",
          body: formDataToSend, // No need to set Content-Type; browser will handle it
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Registration successful:", result);
        router.push("/dashboard/admin")
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
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // Populate form with "extracted" data
        setFormData({
          ...formData,
          firstName: "Arjun",
          lastName: "Patel",
          email: "arjun.p@example.com",
          phone: "+91 9876543210",
          dateOfBirth: "2005-05-15",
          gender: "male",
          address: "123 Main Street, Mumbai, Maharashtra",
          idProof: file,
        });
        toast({
          title: "Document processed",
          description:
            "Student information has been extracted from the document.",
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Add New Student
            </h2>
            <p className="text-muted-foreground">
              Add a new student to the Ishanya Connect platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>
            Enter student details or upload documents for automatic extraction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="manual"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
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
                    // className="h-64"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload Aadhar Card, PAN Card, or School ID to automatically
                    extract student information. Supported formats: JPG, PNG,
                    PDF (Max size: 5MB)
                  </p>
                </div>

                <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                  <p className="font-medium mb-2">Document Processing:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      We'll extract basic information like name, date of birth,
                      and address
                    </li>
                    <li>
                      You can review and edit the extracted information before
                      saving
                    </li>
                    <li>All documents are securely stored and encrypted</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setActiveTab("manual")}
                    disabled={isSubmitting}
                  >
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
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
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
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                      >
                        <SelectTrigger id="gender">
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

                  <div className="space-y-2">
                    <Label htmlFor="address">Address*</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Guardian Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">
                        Guardian/Parent Name*
                      </Label>
                      <Input
                        id="guardianName"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianContact">
                        Guardian/Parent Contact*
                      </Label>
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

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Educational Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <div className="space-y-2">
                      <Label htmlFor="education">Education Level*</Label>
                      <Select
                        value={formData.education}
                        onValueChange={(value) =>
                          handleSelectChange("education", value)
                        }
                      >
                        <SelectTrigger id="education">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">
                            Primary School
                          </SelectItem>
                          <SelectItem value="secondary">
                            Secondary School
                          </SelectItem>
                          <SelectItem value="high-school">
                            High School
                          </SelectItem>
                          <SelectItem value="undergraduate">
                            Undergraduate
                          </SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    <div className="space-y-2">
                      <Label>Assign to Program</Label>
                      <Select
                        onValueChange={(value) => setSelectedProgram(value)}
                        defaultValue=""
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program.id} value={program.id.toString()}>
                              {program.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Assign Educator</Label>
                      <Select
                        onValueChange={(value) => setSelectedEducator(value)}
                        defaultValue=""
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {educators.map((edu) => (
                            <SelectItem
                              key={edu.EducatorID}
                              value={edu.EducatorID.toString()}
                            >
                              {edu.Name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Documents & Photos</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ID Proof (Aadhar/PAN/School ID)*</Label>
                      <FileUploader
                        onFileChange={(file) =>
                          handleFileChange("idProof", file)
                        }
                        accept=".jpg,.jpeg,.png,.pdf"
                        maxSize={5}
                        // value={formData.idProof}
                      />
                      <p className="text-xs text-muted-foreground">
                        Max size: 5MB. Formats: JPG, PNG, PDF.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Photo</Label>
                      <FileUploader
                        onFileChange={(file) => handleFileChange("photo", file)}
                        accept=".jpg,.jpeg,.png"
                        maxSize={2}
                        // value={formData.photo}
                      />
                      <p className="text-xs text-muted-foreground">
                        Max size: 2MB. Formats: JPG, PNG.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* <h3 className="text-lg font-medium">
                    Additional Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add any additional notes about the student..."
                      className="min-h-[100px]"
                    />
                  </div> */}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendCredentials"
                      checked={formData.sendCredentials}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "sendCredentials",
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor="sendCredentials"
                      className="text-sm font-normal"
                    >
                      Send login credentials to student via email
                    </Label>
                  </div>
                </div>

                <CardFooter className="px-0 pt-6 flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                        Adding Student...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Student
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
  );
}
