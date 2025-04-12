"use client"

import { useState } from "react"
import { Target, Map, Users, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CareerQuestionnaire } from "./career-questionnaire"

export function WhyClassment() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false)

  return (
    <section id="why-classment" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Why ClassMent?</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us for Your Career Journey?</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Because you deserve more than generic advice.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center max-w-3xl mx-auto animate-fade-in">
          <p className="text-lg">
            Most platforms throw you a list of jobs or courses and wish you luck.
            <br />
            We don't do that.
          </p>
          <p className="text-lg mt-4">
            We give you <span className="font-bold">clarity</span>, <span className="font-bold">direction</span>, and a{" "}
            <span className="font-bold">plan</span> — built around <em>you</em>.
          </p>

          <div className="border-t border-b border-gray-200 my-8 py-2">
            <h3 className="text-xl font-semibold text-primary">Here's what makes us different</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-md animate-fade-in animate-delay-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hyper-Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                We don't guess. Our AI matches your unique interests, skills, and values to roles that{" "}
                <em>actually fit you</em> — not just what's trending.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md animate-fade-in animate-delay-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Roadmaps That Lead Somewhere</h3>
              <p className="text-muted-foreground">
                No vague advice. You'll get a clear, step-by-step path to grow into your dream role — with actions you
                can take <em>today</em>.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md animate-fade-in animate-delay-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Built for Real Humans, Not Just Resumes</h3>
              <p className="text-muted-foreground">
                Your story matters. Whether you're a confused student, a stuck professional, or just curious — we meet
                you where you are.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md animate-fade-in animate-delay-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast, Friendly, and Free to Start</h3>
              <p className="text-muted-foreground">
                You don't need to scroll job boards for hours. In just a few questions, you'll have a shortlist of roles
                and a roadmap in hand.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto animate-fade-in animate-delay-500">
          <h3 className="text-xl font-semibold mb-2">You are not alone.</h3>
          <p className="text-lg">
            We're here to help you find your calling — and <span className="font-bold">actually reach it</span>.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
              onClick={() => setIsQuestionnaireOpen(true)}
            >
              Find my calling
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Career Questionnaire Modal */}
      <CareerQuestionnaire isOpen={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
    </section>
  )
}
