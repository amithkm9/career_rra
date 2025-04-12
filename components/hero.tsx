"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CareerQuestionnaire } from "./career-questionnaire"

export function Hero() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false)

  return (
    <section id="home" className="relative min-h-screen py-20 md:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#f3ebff]">
        {/* Using a solid light purple background color that matches the image */}
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-800">
                You're Not Lost. Just Misdirected.
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Find the career that was meant for you — and the exact steps to get there.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-primary/90 hover:bg-primary" onClick={() => setIsQuestionnaireOpen(true)}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center animate-scale-in animate-delay-300">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image src="/hero-image.png" alt="Person at career crossroads" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Career Questionnaire Modal */}
      <CareerQuestionnaire isOpen={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
    </section>
  )
}
