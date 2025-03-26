import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Users, BarChart3, Award, HandHeart, GraduationCap } from "lucide-react"
import { IshanyaLogo } from "@/components/ishanya-logo"

export default function Home() {
  return (
    <div className="min-h-screen geometric-pattern">
      {/* Top header bar */}
      <div className="ishanya-top-header flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 73496 76668</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>info@ishanyaindia.org</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <IshanyaLogo className="h-12 w-12" /> */}
          <IshanyaLogo className="h-8 w-8" showTagline={false} />
          <h1 className="text-2xl font-bold text-primary">Ishanya Connect</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">
            <HandHeart className="mr-2 h-4 w-4" />
            Empowering Communities Through Education
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Smart Stakeholder Management for <span className="text-primary">Social Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A centralized platform that simplifies stakeholder data management, tracks individual journeys, and
            generates actionable insights for maximum community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/login">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Stakeholder Data Hub"
            description="Securely store and manage all stakeholder information in one place."
          />
          <FeatureCard
            icon={<Award className="h-10 w-10 text-primary" />}
            title="Journey Tracker"
            description="Visualize progress and engagement for each stakeholder."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title="Impact Analytics"
            description="Generate real-time reports and performance insights."
          />
          <FeatureCard
            icon={<GraduationCap className="h-10 w-10 text-primary" />}
            title="Inclusive Learning"
            description="Accessible education with multi-language support."
          />
        </section>

        <section className="mb-16">
          <div className="rounded-2xl overflow-hidden bg-primary text-primary-foreground">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Mission</h3>
                <p className="mb-6 text-primary-foreground/90">
                  Ishanya India Foundation is dedicated to empowering communities through education, skill development,
                  and sustainable initiatives. Join us as a student, volunteer, or staff member.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="secondary" asChild>
                    <Link href="/register/student">Register as Student</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <Link href="/register/volunteer">Become a Volunteer</Link>
                  </Button>
                </div>
              </div>
              {/*  */}
              <div className="bg-[url('/images/ishanya-logo.png')] bg-contain bg-no-repeat bg-center min-h-[200px]"></div>
              </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-secondary/50">
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <p className="text-muted-foreground">Students Educated</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary/50">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <p className="text-muted-foreground">Program Completion Rate</p>
            </div>
            <div className="p-6 rounded-lg bg-secondary/50">
              <div className="text-4xl font-bold text-primary mb-2">45+</div>
              <p className="text-muted-foreground">Community Partners</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#333] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <IshanyaLogo className="h-8 w-8" showTagline={false} />
                <h3 className="text-lg font-bold text-primary">Ishanya Connect</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering communities through education and sustainable development.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="text-gray-300 hover:text-primary">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-gray-300 hover:text-primary">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-primary">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-300 hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-300 hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-300 hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
              <p className="text-gray-300">
                Email: info@ishanya.org
                <br />
                Phone: +91 123 456 7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Ishanya India Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="transition-all hover:shadow-md card-hover-effect border-none shadow-sm">
      <CardContent className="pt-6 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

