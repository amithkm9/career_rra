"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { toast } from "@/components/ui/use-toast"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const { user } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  const typeformUrl = "https://form.typeform.com/to/nb5601aU"

  const validatePhone = (phone: string) => {
    // Basic validation - can be enhanced based on requirements
    if (!phone.trim()) {
      setPhoneError("Phone number is required")
      return false
    }

    // Clear error if valid
    setPhoneError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhone(phoneNumber)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Insert data into roadmap_waitlist table
      const { error } = await supabase.from("roadmap_waitlist").insert({
        user_id: user?.id,
        email: user?.email,
        phone_number: phoneNumber,
        feedback: feedback,
      })

      if (error) {
        throw error
      }

      // Show success state
      setIsSubmitted(true)

      // Reset form
      setPhoneNumber("")
      setFeedback("")

      // Note: We're no longer automatically closing the modal
      // so users can click on the Typeform link
    } catch (error) {
      console.error("Error submitting waitlist form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTypeformClick = () => {
    // Open Typeform in a new tab
    window.open(typeformUrl, "_blank")

    // Close the modal after opening Typeform
    onClose()
    setIsSubmitted(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">We're in Beta!</DialogTitle>
              <DialogDescription className="pt-2 text-base">
                Thank you for your interest in our premium roadmap. We're currently in beta and will notify you when
                payment options are available.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={phoneError ? "border-red-500" : ""}
                />
                {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium">
                  What are you hoping to get from our premium roadmap?
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <DialogTitle className="text-xl mb-2">Thank You!</DialogTitle>
            <p className="text-gray-600 mb-6">
              We've added you to our waitlist and will notify you when our premium roadmap becomes available.
            </p>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Would you like to provide more detailed feedback to help us improve?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleTypeformClick} className="flex items-center">
                  Fill out our survey <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    onClose()
                    setIsSubmitted(false)
                  }}
                >
                  Maybe later
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
