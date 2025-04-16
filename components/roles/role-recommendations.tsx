"use client"

import { useState } from "react"
import { ArrowRight, Heart, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { trackEvent, setUserMetadata } from "@/lib/openreplay"
import { RoleRecommendation } from "./roles-client"

interface RoleRecommendationsProps {
  recommendations: RoleRecommendation[]
  onSelectRole: (role: RoleRecommendation) => void
  isLoading: boolean
}

export function RoleRecommendations({ recommendations, onSelectRole, isLoading }: RoleRecommendationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savingRole, setSavingRole] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendations.length) % recommendations.length)
  }

  const handleSelectRole = async (role: RoleRecommendation) => {
    setSavingRole(true)
    try {
      // Track role selection in OpenReplay
      trackEvent("role_selected", { role: role.role_title })
      setUserMetadata("selected_role", role.role_title)

      // Call the parent component's onSelectRole function
      await onSelectRole(role)
    } catch (error) {
      console.error("Error saving role:", error)
    } finally {
      setSavingRole(false)
    }
  }

  const currentRecommendation = recommendations[currentIndex]

  if (!currentRecommendation) {
    return <div>No recommendations available</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Your Top Recommendations</h1>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to recommendation ${index + 1}`}
          />
        ))}
      </div>

      <Card className="p-8 shadow-lg rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-bl-full -z-10"></div>

        {/* Navigation buttons at the top */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Previous
          </Button>

          <Button variant="outline" onClick={handleNext} className="flex items-center gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Centered role title */}
        <h2 className="text-3xl font-bold mb-6 text-center">{currentRecommendation.role_title}</h2>

        <p className="text-gray-700 mb-8 leading-relaxed">{currentRecommendation.description}</p>

        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-bold">Why it's a match</h3>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-semibold">Personally</h4>
                <p className="text-gray-700 leading-relaxed mt-2">{currentRecommendation.why_it_fits_personally}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Briefcase className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-semibold">Professionally</h4>
                <p className="text-gray-700 leading-relaxed mt-2">{currentRecommendation.why_it_fits_professionally}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Select button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => handleSelectRole(currentRecommendation)}
            disabled={isLoading || savingRole}
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            {savingRole ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Selecting...
              </span>
            ) : isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Loading...
              </span>
            ) : (
              "Select This Role"
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}