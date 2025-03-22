import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ngo-pattern-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Ishanya Connect</h1>
          </Link>
        </div>

        <Card className="border-none shadow-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Registration Submitted!</CardTitle>
            <CardDescription>Thank you for registering with Ishanya Connect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your registration has been successfully submitted and is now pending approval from our administrators.
            </p>
            <div className="rounded-lg bg-secondary/50 p-4 text-sm text-left">
              <p className="font-medium mb-2">What happens next?</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Our team will review your application within 2-3 business days.</li>
                <li>You will receive an email notification once your registration is approved.</li>
                <li>After approval, you can log in using the credentials you provided.</li>
                <li>If we need additional information, we'll contact you via email.</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/login">
                Go to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

