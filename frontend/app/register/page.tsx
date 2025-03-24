"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Upload, User, UserPlus, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FileUploader } from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [documentType, setDocumentType] = useState<string | null>(null)
  const [document, setDocument] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleDocumentUpload = (file: File | null) => {
    setDocument(file)
  }

  // const handleContinue = () => {
  //   if (!document) {
  //     toast({
  //       title: "Document required",
  //       description: "Please upload a valid identification document to continue.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   setIsUploading(true)

  //   // Simulate document processing
  //   setTimeout(() => {
  //     setIsUploading(false)

  //     // Redirect based on selected role
  //     if (documentType === "student") {
  //       router.push("/register/student")
  //     } else if (documentType === "teacher") {
  //       router.push("/register/teacher")
  //     } else if (documentType === "volunteer") {
  //       router.push("/register/volunteer")
  //     }
  //   }, 1500)
  // }

  const handleContinue = async () => {
    if (!document) {
      toast({
        title: "Document required",
        description: "Please upload a valid identification document to continue.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", document)

    try {
      const response = await fetch("http://localhost:5000/auth/parse_aadhar", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process document")
      }

      const extractedData = await response.json()
      console.log("Extracted Data:", extractedData)

      let targetPath = "/register"
      if (documentType === "student") {
        targetPath = "/register/student"
      } else if (documentType === "teacher") {
        targetPath = "/register/teacher"
      } else if (documentType === "volunteer") {
        targetPath = "/register/volunteer"
      }

      const queryString = new URLSearchParams(extractedData).toString()
      console.log(`${targetPath}?${queryString}`);
      // Navigate with extracted data
      router.push(`${targetPath}?${queryString}`)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not process the document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen ngo-pattern-bg py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Ishanya Connect</h1>
          </Link>
          <LanguageSwitcher />
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Join Ishanya Connect</CardTitle>
            <CardDescription className="text-lg mt-2">Start by uploading your identification document</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-medium mb-2">Document Upload</h3>
                  <p className="text-muted-foreground">
                    Upload your ID proof (Aadhar, PAN, School ID) to auto-fill your registration details
                  </p>
                </div>

                <div className="space-y-4">
                  <FileUploader
                    onFileChange={handleDocumentUpload}
                    accept=".jpg,.jpeg,.png,.pdf"
                    maxSize={5}
                    // className="h-64"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Supported formats: JPG, PNG, PDF (Max size: 5MB)
                  </p>
                </div>

                <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                  <p className="font-medium mb-2">Why we need your document:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>To verify your identity</li>
                    <li>To auto-extract your information for faster registration</li>
                    <li>To ensure the security of our community</li>
                    <li>Your documents are securely stored and encrypted</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-medium mb-2">Choose Your Role</h3>
                  <p className="text-muted-foreground">Select how you want to join the Ishanya community</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <RoleCard
                    title="Join as a Student"
                    description="Access educational programs and skill development opportunities"
                    icon={<User className="h-8 w-8" />}
                    selected={documentType === "student"}
                    onClick={() => setDocumentType("student")}
                  />

                  <RoleCard
                    title="Join as a Teacher/Staff"
                    description="Contribute your expertise and help educate our community"
                    icon={<UserPlus className="h-8 w-8" />}
                    selected={documentType === "teacher"}
                    onClick={() => setDocumentType("teacher")}
                  />

                  <RoleCard
                    title="Join as a Volunteer"
                    description="Support our mission through your time and skills"
                    icon={<Users className="h-8 w-8" />}
                    selected={documentType === "volunteer"}
                    onClick={() => setDocumentType("volunteer")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button
              onClick={handleContinue}
              className="w-full md:w-auto md:px-8"
              disabled={!documentType || !document || isUploading}
            >
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Processing Document...
                </>
              ) : (
                "Continue to Registration"
              )}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Login here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

interface RoleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  selected: boolean
  onClick: () => void
}

function RoleCard({ title, description, icon, selected, onClick }: RoleCardProps) {
  return (
    <button
      className={`p-4 rounded-lg border text-left transition-all ${
        selected ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/50 hover:bg-muted"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${selected ? "bg-primary/20" : "bg-muted"}`}>{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </button>
  )
}

