"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Briefcase, ArrowRight } from "lucide-react"
import { PricingCard } from "@/components/summer-bootcamp/pricing-card"
import { TestimonialsSection } from "@/components/summer-bootcamp/testimonials-section"
import { FAQSection } from "@/components/summer-bootcamp/faq-section"

export default function SummerBootcampPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Redesigned to be more professional */}
        <section className="py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-sm py-1.5">
                  Career Discovery Summer Bootcamp
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Don't wait till your child is 21 to figure out their career.
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Give your child the clarity, confidence, and career direction they need — all from the comfort of
                  home.
                </p>
                <p className="text-lg text-gray-500">
                  Our online Career Discovery Summer Bootcamp helps students discover their strengths, explore career
                  paths, and make informed decisions about their future through interactive virtual sessions and
                  AI-powered assessments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium rounded-lg"
                    onClick={() => {
                      document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Register Now
                  </Button>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white">
                      S
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white">
                      A
                    </div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white">
                      R
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20+ people already joined</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-a4cVV1VjGPPT3kXcnrzYHyXCjLRhBD.png"
                  alt="Parent and child discussing career options"
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI Assessment Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI Powered <span className="text-primary">Career Assessment</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our scientifically-backed psychometric assessments—created by a dedicated team of 25 top PhD
                psychologists—decode your child's unique strengths, interests, and aptitudes. We match your child's
                innate talents with rewarding career paths, providing crystal-clear clarity about their future.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AtodI03UUmZjkfB9eniGnbTkWyDUEa.png"
                  alt="Career Discovery Framework"
                  width={600}
                  height={500}
                  className="object-contain"
                />
              </div>

              <div className="space-y-8">
                <div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 mb-4">FEATURES</Badge>
                  <h3 className="text-3xl font-bold mb-4">
                    Understand Your Child's <span className="text-primary">Unique Personality</span>
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    Is your child confused about their passion or unsure about career paths?
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">Comprehensive, 5-Dimensional Assessment</h4>
                      <p className="text-gray-600">
                        Receive a customized, 34-page career assessment report outlining your child's personality type,
                        interests, strengths, emotional intelligence, and aptitude.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">India's Most Trusted Career Assessment</h4>
                      <p className="text-gray-600">
                        Our scientifically validated assessment has empowered over 2.5 million students nationwide with
                        clarity in choosing the perfect-fit careers aligned to their skills and passions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Exploration Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">FEATURES</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Unlock Your Child's Future with the <span className="text-primary">Career Exploration Playbook</span>
                </h2>
                <p className="text-lg text-gray-600">
                  No one should spend their 20's and 30's hating Mondays or making endless career shifts.
                </p>
                <p className="text-lg text-gray-600">
                  Don't let your child be one of them! Our{" "}
                  <span className="text-primary font-medium">Personalized Career Exploration Playbook</span> is packed
                  with handpicked resources tailored specifically for your child to explore and discover career paths of
                  their interest.
                </p>
              </div>

              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3xxt4KdfpD5WJkbyn72uMId37RJtSB.png"
                  alt="Ikigai Career Framework"
                  width={600}
                  height={500}
                  className="object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Professional Edge Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z45fSBNNE80yLTgZJnF8V6PYgPhNCT.png"
                  alt="Online mentorship and counseling"
                  width={600}
                  height={500}
                  className="object-contain"
                />
              </div>

              <div className="space-y-6 order-1 md:order-2">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">FEATURES</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Give Your Child the <span className="text-primary">Professional Edge</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Did you know <span className="text-primary font-medium">85% of successful professionals</span> had
                  early mentorship and career guidance?
                </p>
                <p className="text-lg text-gray-600">
                  We connect your child directly to industry experts and professional career counselors to give them
                  clarity, confidence, and direction about their career path—ensuring they're always a step ahead of
                  others!
                </p>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">1:1 Career Counseling</h4>
                      <p className="text-gray-600">
                        Personalized, one-to-one sessions with certified professional career counselors who help your
                        child understand their career strengths, clarify doubts, and prepare actionable roadmaps for
                        future success.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">Mentorship</h4>
                      <p className="text-gray-600">
                        Exclusive mentorship and observation sessions with top industry professionals—your child will
                        gain real-world exposure, invaluable insights, and powerful professional connections that set
                        them apart.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hands-on Externships Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">FEATURES</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Real-World Insights through <span className="text-primary">Hands-On Externships</span>
                </h2>
                <p className="text-lg text-gray-600">Move beyond theory—give your child practical career insights!</p>
                <p className="text-lg text-gray-600">
                  Our <span className="text-primary font-medium">Hands On Externships</span> provide students with real,
                  in-person experiences at actual workplaces where they can shadow professionals, participate in
                  projects, and gain authentic industry exposure that goes beyond classroom learning.
                </p>
              </div>

              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%2012%2C%202025%2C%2012_37_56%20PM-ADq5QjNFyq2JZTWAqiJTtSdPBzMsKl.png"
                  alt="Virtual career exploration"
                  width={600}
                  height={500}
                  className="object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Program Benefits */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Benefits</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive summer bootcamp provides everything your child needs to discover their ideal career
                path and start building toward it with confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-4 rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interactive Online Sessions</h3>
                  <p className="text-gray-600">
                    Engage in live virtual workshops and interactive exercises designed to make career discovery fun and
                    insightful, all from the comfort of home.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
                  <p className="text-gray-600">
                    Connect with industry professionals who provide real-world insights and guidance tailored to your
                    child's interests and strengths.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-4 rounded-full mb-4">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Hands-on Experience</h3>
                  <p className="text-gray-600">
                    Gain practical experience through externships in fields of interest, building confidence and
                    real-world skills that set your child apart.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Don't Let Time Slip By <br />
                <span className="text-primary">Invest in Their Future Today</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                Empower your child's potential with our expert-led career discovery bootcamp. Designed for young minds,
                our program connects them with industry leaders and personalized resources for identifying their dream
                careers.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                <span className="font-medium">82% of parents</span> have seen increased motivation in their child
                towards school due to greater clarity about the future. Act now to set them up for a successful path.
              </p>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg"
              >
                Secure Your Child's Spot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing-section">
          <PricingCard />
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
