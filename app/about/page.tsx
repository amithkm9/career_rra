"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
// Remove the AppHeader import
// import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 mb-4">
                Our Story
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-500">
                About ClassMent
              </h1>
              <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-xl/relaxed">
                We're on a mission to democratize career guidance and help everyone find their perfect path
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700">
                  Our Vision
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Be a personal career manager for every individual on this planet.
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  At ClassMent, we believe everyone deserves access to quality career guidance. Our platform combines
                  human expertise with innovative technology to help individuals discover their professional potential
                  and navigate their career journey with confidence.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4"></div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/about-hero.png"
                  alt="Career guidance and counseling"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700">Our Values</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What We Stand For</h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed">
                The principles that guide everything we do at ClassMent
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-purple-700"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalization</h3>
                <p className="text-gray-500">Tailored guidance for each individual's unique journey</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-purple-700"
                  >
                    <path d="M2 12h20" />
                    <path d="M12 2v20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-gray-500">Career guidance should be available to everyone</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-purple-700"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-500">Continuously improving our methods and technology</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                    className="text-purple-700"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Empowerment</h3>
                <p className="text-gray-500">Giving you the tools to take control of your career</p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700">
                Our Founders
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Meet the Team</h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed">
                The passionate minds behind ClassMent's vision
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Unnathi Pai */}
              <div className="group">
                <div className="relative h-[400px] overflow-hidden rounded-xl mb-6 shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <Image
                    src="/unnathi-pai.png"
                    alt="Unnathi Pai"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-center gap-4">
                        <Link
                          href="https://www.linkedin.com/in/unnathi-pai/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white p-2 rounded-full hover:bg-purple-100 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 text-purple-700" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Unnathi Pai</h3>
                <p className="text-purple-700 font-medium mb-4">Founder & CEO</p>
                <p className="text-gray-600 text-left">
                  Unnathi has worked in 11+ roles across industries, with her last stint being with Amazon, Luxembourg.
                  She has worked on the merger of Fiat with PSA group, the launch of Ford aspire engines and held
                  strategic roles in multiple startups. She is the founder of ClassMent and is on a mission to
                  democratize exposure to build better workplaces and a better world!
                </p>
                <p className="text-gray-600 text-left mt-2">
                  She has a master's in management from France and a bachelor of mechanical engineering. Having spent 4+
                  years in different parts of Europe and solo-travelled 17 countries, she brings a perspective of global
                  careers.
                </p>
              </div>

              {/* Vaibhavi Pai */}
              <div className="group">
                <div className="relative h-[400px] overflow-hidden rounded-xl mb-6 shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <Image
                    src="/vaibhavi-pai.png"
                    alt="Vaibhavi Pai"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-center gap-4">
                        <Link
                          href="https://www.linkedin.com/in/vaibhavi-pai/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white p-2 rounded-full hover:bg-purple-100 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 text-purple-700" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Vaibhavi Pai</h3>
                <p className="text-purple-700 font-medium mb-4">Co-Founder & CTO</p>
                <p className="text-gray-600 text-left">
                  An ex-SDE at Microsoft and Samsung R&D, Vaibhavi loves to don multiple hats and works passionately on
                  any problem thrown at her. She has previously mentored 100+ students, several of them being
                  underprivileged women and has helped them land well-paying jobs.
                </p>
                <p className="text-gray-600 text-left mt-2">
                  As part of her stint at Samsung R&D, she has also guided university students and driven them to write
                  and present research papers on various topics. Creating impact at scale is Vaibhavi's life mission,
                  and as a Co-Founder at ClassMent, Vaibhavi aims to move the needle to achieve this very feat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-purple-700">2023</h3>
                <p className="text-gray-500">Founded</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-purple-700">1000+</h3>
                <p className="text-gray-500">Students Guided</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-purple-700">94%</h3>
                <p className="text-gray-500">Satisfaction Rate</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-purple-700">17+</h3>
                <p className="text-gray-500">Countries Reached</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Find Your Path?</h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed">
                Join thousands of professionals who have found career clarity and success with ClassMent's personalized
                guidance.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/" scroll={true} onClick={() => window.scrollTo(0, 0)}>
                  <Button className="bg-white text-purple-700 hover:bg-gray-100">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
