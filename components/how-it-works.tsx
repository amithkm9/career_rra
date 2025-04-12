"use client"

import { useState } from "react"
import { SearchCheck, Bot, Map, Compass, ArrowRight } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CareerQuestionnaire } from "./career-questionnaire"

export function HowItWorks() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false)

  return (
    <section id="how it works" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our 4-Step Framework</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We help you completely transition to your dream career, guiding you step-by-step throughout your entire
              journey.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <Card className="animate-fade-in animate-delay-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardHeader className="pb-4 flex flex-col items-center">
              <SearchCheck className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="mb-3">Career Discovery</CardTitle>
              <CardDescription>
                Understand what drives you. We ask a few questions about your interests, skills, values, and background
                to uncover the roles that fit you — not just the market.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in animate-delay-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardHeader className="pb-4 flex flex-col items-center">
              <Bot className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="mb-3">
                AI Role
                <br />
                Matching
              </CardTitle>
              <CardDescription>
                Get personalized recommendations. Our AI analyzes your inputs and recommends career roles that align
                with your strengths and preferences
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in animate-delay-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardHeader className="pb-4 flex flex-col items-center">
              <Map className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="mb-3">Roadmap Creation</CardTitle>
              <CardDescription>
                Know exactly how to get there.We generate a step-by-step roadmap to help you grow into your selected
                role — with actions, projects, and courses to take.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in animate-delay-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
            <CardHeader className="pb-4 flex flex-col items-center">
              <Compass className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="mb-3">Accountability Partner</CardTitle>
              <CardDescription>
                You won't walk alone. Get personalized tips and progress nudges for every step of your journey, from
                skill-building to landing the job.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12 animate-fade-in animate-delay-500">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            onClick={() => setIsQuestionnaireOpen(true)}
          >
            Land my dream job
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Career Questionnaire Modal */}
        <CareerQuestionnaire isOpen={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
      </div>
    </section>
  )
}
