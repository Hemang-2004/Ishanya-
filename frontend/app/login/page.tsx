"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"
import { Eye, EyeOff } from "lucide-react"
import { IshanyaLogo } from "@/components/ishanya-logo"
import { setUserData, getUserData, clearUserData } from "@/utils/auth"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<string>("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         role,
  //       }),
  //     })

  //     const result = await response.json()

  //     if (!response.ok) {
  //       // Show error toast if login failed
  //       toast({
  //         title: "Login failed",
  //         description: result.error || "Invalid email or password.",
  //         variant: "destructive",
  //         duration: 5000,
  //       })
  //       setIsLoading(false)
  //       return
  //     }

  //     // Show success toast
  //     toast({
  //       title: "Login successful",
  //       description: `Welcome back! You've been logged in as ${role}.`,
  //     })

  //     // Redirect based on role
  //     if (role === "admin") {
  //       router.push("/dashboard/admin")
  //     } else if (role === "teacher") {
  //       router.push("/dashboard/teacher")
  //     } else {
  //       router.push("/dashboard/student")
  //     }

  //   } catch (error) {
  //     toast({
  //       title: "Login error",
  //       description: "Something went wrong. Please try again.",
  //       variant: "destructive",
  //       duration: 5000,
  //     })
  //     console.error("Login error:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        toast({
          title: "Login failed",
          description: result.error || "Invalid email or password.",
          variant: "destructive",
          duration: 5000,
        })
        alert(result.error )
        setIsLoading(false)
        return
      }
  
      // Store user data in localStorage
      setUserData(result.id, result.name, role)
  
      toast({
        title: "Login successful",
        description: `Welcome back! You've been logged in as ${role}.`,
      })
      alert(`Welcome back! You've been logged in as ${role}.`)
  
      // Redirect based on role
      router.push(`/dashboard/${role}`)
  
    } catch (error) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
      alert("Something went wrong. Please try again.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex flex-col geometric-pattern">
      {/* Header */}
      <div className="ishanya-top-header py-2 px-4 flex justify-between items-center bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>+91 73496 76668</span>
          </div>
          <div className="flex items-center gap-2">
            <span>info@ishanyaindia.org</span>
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <IshanyaLogo className="mx-auto w-16 h-16" showTagline={false} />
            <h1 className="text-2xl font-bold mt-2">Ishanya Connect</h1>
            <p className="text-sm text-muted-foreground">Journey to Inclusion</p>
          </div>

          <Card className="border-none shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Login as</Label>
                  <Select defaultValue="student" onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Educator</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Register here
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-muted-foreground bg-white/80 backdrop-blur-sm">
        © {new Date().getFullYear()} Ishanya India Foundation. All rights reserved.
      </div>
    </div>
  )
}

