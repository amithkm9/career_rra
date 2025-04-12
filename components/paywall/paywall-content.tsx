"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/openreplay"

export function PaywallContent() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleBackToRoadmap = () => {
    router.push("/roadmap")
  }

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // Track the premium roadmap payment attempt
      trackEvent("plan_selected", {
        plan_selected: "Premium Roadmap",
        price: "2499",
        currency: "INR",
        subscription_period: "6 months",
      })

      // In a real implementation, this would redirect to a payment processor
      toast({
        title: "Payment Processing",
        description: "This would redirect to a payment gateway in a production environment.",
      })

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, just show a success message
      toast({
        title: "Payment Demo",
        description: "In a real app, you would be redirected to a payment processor.",
      })
    } catch (error) {
      console.error("Error processing payment:", error)
      toast({
        title: "Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Unlock Your Complete Career Roadmap</h1>
        <p className="text-xl text-gray-600">
          Take the next step in your career journey with our comprehensive roadmap program
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Personalized Career Roadmap</h3>
                <p className="text-gray-600">
                  A step-by-step guide tailored specifically to your skills, experience, and career goals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Skill Development Resources</h3>
                <p className="text-gray-600">Access to premium courses, workshops, and learning materials</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Industry Networking</h3>
                <p className="text-gray-600">Connect with professionals and hiring managers in your target industry</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Resume & Portfolio Review</h3>
                <p className="text-gray-600">Expert feedback and optimization of your professional materials</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Job Interview Preparation</h3>
                <p className="text-gray-600">
                  Mock interviews and personalized feedback to help you land your dream job
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="border-2 border-primary shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">Premium Roadmap</h2>
                <p className="text-gray-600 mb-4">6-Month Career Acceleration Program</p>
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-bold">₹2,499</span>
                  <span className="text-gray-500 ml-2">/6 months</span>
                  <span className="ml-2 text-lg text-gray-400 line-through">₹10,000</span>
                </div>
                <p className="text-sm text-green-600 font-medium mt-1">75% off - Limited time offer</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Full personalized career roadmap</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Unlimited access to learning resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Industry networking opportunities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Resume & portfolio optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>Interview preparation sessions</span>
                </li>
              </ul>

              <Button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-medium rounded-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Secure payment processing. 7-day money-back guarantee.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">100% Satisfaction Guarantee</h3>
            <p className="text-sm text-gray-600">
              If you're not completely satisfied with our program within the first 7 days, we'll refund your payment in
              full. No questions asked.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" onClick={handleBackToRoadmap} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back To Roadmap
        </Button>
      </div>
    </div>
  )
}
