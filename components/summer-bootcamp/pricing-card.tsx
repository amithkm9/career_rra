"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PricingCard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Invest in your child's future with our comprehensive career discovery program
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary overflow-hidden shadow-lg">
            <CardHeader className="bg-primary/5 pb-6 pt-8 px-8">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="bg-primary text-white mb-3">Best Value</Badge>
                  <CardTitle className="text-2xl font-bold">Summer Bootcamp Package</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">₹15,000</div>
                  <div className="text-gray-500 line-through text-sm">₹24,000</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-600 mb-6">
                Experience the ultimate support for your child's career journey. Gain insights valued over ₹24k, helping
                them explore career paths with confidence.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="bg-gray-50 text-gray-700 py-1.5 px-3">
                  25+ Industry Partners
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 py-1.5 px-3">
                  Virtual Externship Opportunities
                </Badge>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Comprehensive online psychometric assessment to understand your child's strengths and interests
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Virtual 1:1 career counseling sessions to understand their aspirations and explore suitable career
                    options
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Digital Career Discovery Playbook with personalized resources for career exploration
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Interactive virtual sessions with professionals from various career fields
                  </p>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
                onClick={() => window.open("https://rzp.io/rzp/U4U3KFLs", "_blank")}
              >
                Pay with Razorpay
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Secure payment processing. 7-day money-back guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
