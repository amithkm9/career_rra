"use client"

import { useState } from "react"
import { Check, Rocket, DollarSign, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trackEvent } from "@/lib/openreplay"

export function ServicesContent() {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = (url: string, planName: string, planPrice: string) => {
    // Track the payment plan selection event with metadata
    trackEvent("plan_selected", {
      plan_selected: planName,
      price: planPrice,
      currency: "INR",
    })

    // Open payment URL in a new tab
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Career Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Invest in your future with our personalized career services designed to help you discover, plan, and achieve
          your professional goals.
        </p>
      </div>

      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Why Choose ClassMent?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Because you deserve more than generic advice. We provide personalized guidance backed by data and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Data-Driven Approach */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Data-Driven Approach</h3>
                <p className="text-gray-700">
                  Our recommendations aren't based on guesswork. We use psychometric assessments and industry data to
                  match you with careers that align with your unique personality, skills, and interests.
                </p>
              </div>
            </div>
          </div>

          {/* Proven Results */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M12 2v4"></path>
                  <path d="m6.8 14-3.5-2"></path>
                  <path d="m20.7 12-3.5 2"></path>
                  <path d="M6.8 10 3.3 12"></path>
                  <path d="m20.7 12-3.5-2"></path>
                  <path d="m9 22 3-8 3 8"></path>
                  <path d="M8 22h8"></path>
                  <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Proven Results</h3>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-700">
                    Our clients report <span className="font-semibold">94% satisfaction</span> with their career choices
                    and <span className="font-semibold">87% achieve</span> their career goals within 12 months of
                    following our roadmaps.
                  </p>
                  <div className="mt-2 flex gap-4">
                    <div className="bg-white rounded-lg p-3 border border-purple-100 text-center">
                      <span className="text-2xl font-bold text-primary">94%</span>
                      <p className="text-xs text-gray-600">Satisfaction Rate</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-100 text-center">
                      <span className="text-2xl font-bold text-primary">87%</span>
                      <p className="text-xs text-gray-600">Goal Achievement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Guidance */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Expert Guidance</h3>
                <p className="text-gray-700">
                  Get personalized advice from internationally certified career coaches who have helped thousands of
                  professionals navigate career transitions and achieve their goals.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      IC
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      CC
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      +5
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Certified Career Coaches</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive Support */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
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
                  className="text-primary h-6 w-6"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                  <path d="M16 16h5v5"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Comprehensive Support</h3>
                <p className="text-gray-700">
                  From personality assessment to job placement, we provide end-to-end support throughout your career
                  journey, ensuring you have the resources and guidance you need at every step.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Coaching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Roadmapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Placement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Process</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">1</span>
                Discover
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Take our comprehensive psychometric assessment to uncover your core personality traits, strengths, and
                natural inclinations. This scientific approach helps identify career paths where you're most likely to
                thrive.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">2</span>
                Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Work with our career coaches to develop a personalized roadmap based on your assessment results. Get
                clear action steps, skill development plans, and industry-specific guidance to reach your career goals.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">3</span>
                Achieve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Receive ongoing support as you implement your career plan. From resume optimization to interview
                preparation and job search strategies, we'll help you overcome obstacles and land opportunities that
                align with your goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8" id="pricing">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Plan</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <Card className="border shadow-md overflow-hidden rounded-xl">
            <CardHeader className="pb-2 relative">
              <div className="absolute top-4 right-4 bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">
                Basic
              </div>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold">₹1,499</span>
                <span className="text-gray-400 line-through mb-1">₹2,400</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                You can access psychometric test and know about your core personality which you can refer for a
                lifetime.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Psychometric Test developed by 25 PhDs</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>5 Career Fields that fits your personality</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>34 page detailed report about your personality</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Free 30 min career consultation call</span>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white"
                onClick={() => handlePayment("https://rzp.io/rzp/fKp1PsZD", "Basic", "1499")}
              >
                Pay with Razorpay
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-[#7c3aed] overflow-hidden rounded-xl scale-105 shadow-lg relative">
            <div className="absolute top-0 right-8 bg-[#7c3aed] text-white px-4 py-1 rounded-b-lg font-medium text-sm">
              Most Picked
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold">₹4,999</span>
                <span className="text-gray-400 line-through mb-1">₹10,500</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Basic plan + Career Manager to help you understand the report, work on your CV, LinkedIn and help you
                with companies
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>All things Basic Plan +</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>2 x Career Guidance Session with a Internationally Certified Counselor</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Access to our signature Career Exploration tool with job roles and earning potential</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Actionable roadmap with 3 month and 12 month plan</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Rocket className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Internationally Certified Career coach</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Award className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Future Proof career roadmap</span>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white"
                onClick={() => handlePayment("https://rzp.io/rzp/kQw7uW92", "Pro", "4999")}
              >
                Pay with Razorpay
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border shadow-md overflow-hidden rounded-xl">
            <CardHeader className="pb-2 relative">
              <div className="absolute top-4 right-4 bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">
                Recommended
              </div>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold">₹8,499</span>
                <span className="text-gray-400 line-through mb-1">₹15,800</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Our best plan, get benefits worth ₹15.8k+ with actionable insights on getting 30% hike in salary and job
                search support.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>All things Pro +</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Personal Career Manager for 3 months from career exploration to job support</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Actionable guidance and management of your career by an International Career Coach</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Whatsapp support</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <DollarSign className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>150+ Companies</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Award className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Guaranteed Work Opportunities</span>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white"
                onClick={() => handlePayment("https://rzp.io/rzp/6359V3S2", "Premium", "8499")}
              >
                Pay with Razorpay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Client Success Stories</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <blockquote className="italic border-l-4 border-primary pl-4 py-2">
              "ClassMent helped me transition from a stagnant IT role to a Product Management position that I love. The
              personalized roadmap and coaching sessions were invaluable in helping me develop the right skills and make
              connections in my target industry."
            </blockquote>
            <p className="font-medium">— Priya S., Product Manager</p>
          </div>

          <div className="space-y-4">
            <blockquote className="italic border-l-4 border-primary pl-4 py-2">
              "As a recent graduate, I was overwhelmed by career options. The psychometric assessment gave me clarity
              about my strengths, and the career guidance sessions helped me find a path that truly fits my personality.
              I'm now working in a role I genuinely enjoy."
            </blockquote>
            <p className="font-medium">— Rahul K., Data Analyst</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Career?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have found career clarity and success with ClassMent's personalized
          guidance.
        </p>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8"
          onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get Started Today
        </Button>
      </div>
    </div>
  )
}
