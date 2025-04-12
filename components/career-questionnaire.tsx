"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { LoginModal } from "./login-modal"
import { supabase } from "@/lib/supabase"

interface QuestionnaireProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CareerQuestionnaire({ isOpen, onOpenChange }: QuestionnaireProps) {
  const [step, setStep] = useState(1)
  const [currentSituation, setCurrentSituation] = useState<string | null>(null)
  const [careerClarity, setCareerClarity] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const handleContinue = async () => {
    if (step === 1) {
      setStep(2)
    } else {
      // Check if user is logged in before proceeding
      if (!user) {
        // Store questionnaire data in localStorage for later use after login
        localStorage.setItem(
          "questionnaire_data",
          JSON.stringify({
            career_stage: currentSituation,
            roadmap_role: careerClarity,
          }),
        )

        // Show login modal if not logged in
        setIsLoginModalOpen(true)
        return
      }

      setIsLoading(true)

      try {
        // Save questionnaire data to Supabase profiles table
        const { error } = await supabase
          .from("profiles")
          .update({
            career_stage: currentSituation,
            roadmap_role: careerClarity,
          })
          .eq("id", user.id)

        if (error) throw error

        toast({
          title: "Information saved",
          description: "Your career preferences have been saved.",
        })

        // Close the questionnaire
        onOpenChange(false)
        setStep(1) // Reset for next time

        // Redirect to discovery page
        router.push("/discovery")
      } catch (error) {
        console.error("Error saving questionnaire data:", error)
        toast({
          title: "Error",
          description: "Failed to save your preferences. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Update the handleLoginComplete function to save data after login
  const handleLoginComplete = async () => {
    setIsLoginModalOpen(false)

    // If user is now logged in, save the questionnaire data and proceed
    if (user) {
      try {
        // Retrieve stored questionnaire data
        const storedData = localStorage.getItem("questionnaire_data")
        if (storedData) {
          const { career_stage, roadmap_role } = JSON.parse(storedData)

          // Save to Supabase
          const { error } = await supabase
            .from("profiles")
            .update({
              career_stage,
              roadmap_role,
            })
            .eq("id", user.id)

          if (error) throw error

          // Clear stored data
          localStorage.removeItem("questionnaire_data")
        }

        // Continue with the flow
        handleContinue()
      } catch (error) {
        console.error("Error saving questionnaire data after login:", error)
        toast({
          title: "Error",
          description: "Failed to save your preferences. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md p-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-primary font-medium">✨ Let&apos;s get to know you.</p>
                <h2 className="text-2xl font-bold">What is your current situation?</h2>
              </div>

              <RadioGroup value={currentSituation || ""} onValueChange={setCurrentSituation}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="employed" id="employed" />
                    <Label htmlFor="employed" className="flex-1 cursor-pointer">
                      Employed and seeking a career change
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="unemployed" id="unemployed" />
                    <Label htmlFor="unemployed" className="flex-1 cursor-pointer">
                      Unemployed and seeking direction
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex-1 cursor-pointer">
                      I&apos;m a student exploring career options
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="curious" id="curious" />
                    <Label htmlFor="curious" className="flex-1 cursor-pointer">
                      I&apos;m just curious
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <Button
                onClick={handleContinue}
                disabled={!currentSituation || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-primary font-medium">You&apos;ve come to the right place!</p>
                <h2 className="text-2xl font-bold">Do you have a specific career in mind?</h2>
              </div>

              <RadioGroup value={careerClarity || ""} onValueChange={setCareerClarity}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="need-inspiration" id="need-inspiration" />
                    <Label htmlFor="need-inspiration" className="flex-1 cursor-pointer">
                      No — I need inspiration
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="need-roadmap" id="need-roadmap" />
                    <Label htmlFor="need-roadmap" className="flex-1 cursor-pointer">
                      Yes — I need a roadmap
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <Button
                onClick={handleContinue}
                disabled={!careerClarity || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isLoading ? "Loading..." : "Confirm"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onOpenChange={(open) => {
          setIsLoginModalOpen(open)
          // If modal is closed without successful login, do nothing
        }}
      />
    </>
  )
}
