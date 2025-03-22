"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft, SchoolIcon as Student, Users, Handshake } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center ngo-pattern-bg p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Ishanya Connect</h1>
          </Link>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <CardTitle className="text-2xl text-center">Join Ishanya Connect</CardTitle>
            <CardDescription className="text-center">Choose how you'd like to be part of our community</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RegistrationCard
                title="Student"
                description="Register as a student to access courses, track your progress, and connect with teachers"
                icon={<Student className="h-10 w-10 text-primary" />}
                href="/register/student"
              />
              <RegistrationCard
                title="Teacher/Staff"
                description="Join as a teacher or staff member to manage courses, students, and upload resources"
                icon={<Users className="h-10 w-10 text-primary" />}
                href="/register/teacher"
              />
              <RegistrationCard
                title="Volunteer"
                description="Become a volunteer to contribute your skills and time to our community initiatives"
                icon={<Handshake className="h-10 w-10 text-primary" />}
                href="/register/volunteer"
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-center text-sm">
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

function RegistrationCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="card-hover-effect border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">{icon}</div>
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          <Button asChild className="w-full">
            <Link href={href}>Register as {title}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

