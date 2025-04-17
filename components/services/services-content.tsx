"use client"

import { useState } from "react"
import { Check, Rocket, DollarSign, Award, Users, Briefcase, Target } from "lucide-react"
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
        <h1 className="text-4xl font-bold mb-4">Career Accelerator Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with real industry professionals who provide personalized guidance to help you discover, prepare for,
          and excel in your dream career.
        </p>
      </div>

      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">The ClassMent Difference</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in the power of human connection. Our mentors aren't algorithms—they're experienced professionals
            who genuinely care about your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Human-Centered Approach */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Human-Centered Approach</h3>
                <p className="text-gray-700">
                  Our mentors take the time to understand your unique background, aspirations, and challenges. You'll
                  receive personalized guidance from professionals who've walked the path you're pursuing.
                </p>
              </div>
            </div>
          </div>

          {/* Industry Mentorship */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Briefcase className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Industry Mentorship</h3>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-700">
                    Learn directly from professionals working at top companies who share insider knowledge about
                    industry trends, hiring practices, and what it really takes to succeed in your chosen field.
                  </p>
                  <div className="mt-2 flex gap-4">
                    <div className="bg-white rounded-lg p-3 border border-purple-100 text-center">
                      <span className="text-2xl font-bold text-primary">150+</span>
                      <p className="text-xs text-gray-600">Industry Mentors</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-100 text-center">
                      <span className="text-2xl font-bold text-primary">12+</span>
                      <p className="text-xs text-gray-600">Industry Sectors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Preparation */}
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Interview Mastery</h3>
                <p className="text-gray-700">
                  Get comprehensive interview preparation with mock interviews, feedback sessions, and insider tips from
                  professionals who've been on both sides of the hiring table. Our mentors will help you confidently
                  tackle even the toughest interview questions.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      HR
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      TL
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      CTO
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Learn from hiring managers</span>
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
                <h3 className="text-xl font-semibold text-primary mb-2">End-to-End Support</h3>
                <p className="text-gray-700">
                  From personality assessment to job application assistance, our mentors provide continuous support
                  throughout your career journey, ensuring you have the guidance you need at every critical step.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Mentoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Roadmapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">Job Assistance</span>
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
                Discover Your Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Begin with our comprehensive psychometric assessment and a one-on-one session with a career mentor who
                will help you understand your strengths and identify career paths where you're most likely to thrive.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">2</span>
                Prepare & Develop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Work with industry mentors to develop the specific skills and knowledge needed for your target role. Get
                personalized feedback on your resume, portfolio, and interview techniques from professionals in your
                field.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-full">3</span>
                Launch & Succeed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Receive ongoing support as you apply for positions, including mock interviews with industry insiders,
                job application strategy sessions, and networking opportunities with our extensive industry connections.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8" id="pricing">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Accelerator Plan</h2>

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
                Discover your strengths and career direction with our assessment and initial mentoring session.
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
                  <span>5 Career Fields that match your personality</span>
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
                  <span>One 30-min session with a career mentor</span>
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
              Most Popular
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-bold">₹4,999</span>
                <span className="text-gray-400 line-through mb-1">₹10,500</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Personalized mentoring to help you understand your strengths, improve your CV, and prepare for
                interviews.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>All Basic Plan features +</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>2 Career Guidance Sessions with an Industry Mentor</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Resume & LinkedIn Profile Review by Industry Experts</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Personalized 12-month career roadmap</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Rocket className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>1 Mock Interview with Industry Feedback</span>
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
                Comprehensive mentoring with dedicated support to help you master interviews and secure your ideal role.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>All Pro Plan features +</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Dedicated Industry Mentor for 3 months</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>4 Advanced Interview Preparation Sessions</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>WhatsApp support from your mentor</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <DollarSign className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Job Application Assistance</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <Award className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <span>Networking with Industry Professionals</span>
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
        <h2 className="text-2xl font-bold mb-4">Success Stories from Our Mentees</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <blockquote className="italic border-l-4 border-primary pl-4 py-2">
              "The mentoring I received from ClassMent was transformative. My mentor, a senior product manager, helped
              me understand exactly what interviewers were looking for. After three mock interviews with detailed
              feedback, I felt confident and prepared. I'm now working at my dream company!"
            </blockquote>
            <p className="font-medium">— Priya S., Product Manager</p>
          </div>

          <div className="space-y-4">
            <blockquote className="italic border-l-4 border-primary pl-4 py-2">
              "As a recent graduate, I was overwhelmed by career options. My ClassMent mentor took the time to
              understand my strengths and helped me prepare specifically for data analytics interviews. The insider tips
              and practice sessions were invaluable—I received offers from two top companies."
            </blockquote>
            <p className="font-medium">— Rahul K., Data Analyst</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Connect with Your Mentor?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have accelerated their careers through personalized mentoring and expert
          interview preparation.
        </p>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8"
          onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
        >
          Begin your journey today
        </Button>
      </div>
    </div>
  )
}
