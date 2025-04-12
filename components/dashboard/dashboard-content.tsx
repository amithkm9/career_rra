"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { trackEvent } from "@/lib/openreplay"

export function DashboardContent() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Career Dashboard</h1>

      <p className="text-xl text-center text-muted-foreground mb-12">Continue your career journey with ClassMent</p>

      <div className="grid md:grid-cols-3 gap-6">
        <Card
          className="border-2 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
          onClick={() => router.push("/roles")}
        >
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              Roles
              <ArrowRight className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-base">
              Explore career roles that match your skills and interests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
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
                  className="text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-2 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
          onClick={() => router.push("/roadmap")}
        >
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              Roadmap
              <ArrowRight className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-base">
              View your personalized career roadmap and next steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
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
                  className="text-primary"
                >
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                  <path d="M12 13v8"></path>
                  <path d="M5 13v6a2 2 0 0 0 2 2h8"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-2 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
          onClick={() => {
            trackEvent("services_button_clicked")
            router.push("/services")
          }}
        >
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              Services
              <ArrowRight className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-base">Explore our career services and premium offerings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
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
                  className="text-primary"
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                  <path d="M7 7h.01"></path>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
