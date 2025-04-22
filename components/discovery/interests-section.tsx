"use client"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"

interface InterestsSectionProps {
  selectedInterests: string[]
  setSelectedInterests: (interests: string[]) => void
  interestsInfo: string
  setInterestsInfo: (info: string) => void
  maxSelections?: number
}

export function InterestsSection({
  selectedInterests,
  setSelectedInterests,
  interestsInfo,
  setInterestsInfo,
  maxSelections = 5
}: InterestsSectionProps) {
  const interests = [
    "Academia",
    "Business",
    "Charity",
    "Community/society",
    "Computing",
    "Creative arts",
    "Design",
    "Economics",
    "Education",
    "Engineering",
    "Film/TV",
    "Finance",
    "Health/wellness",
    "History",
    "Law/justice",
    "Literature",
    "Mathematics",
    "Media",
    "Nature",
    "Philosophy",
    "Politics",
    "Psychology",
    "Research",
    "Science",
    "Sports/fitness",
    "Sustainability",
    "Technology",
    "Travel/adventure",
  ]

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      if (selectedInterests.length >= maxSelections) {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${maxSelections} interests`,
          variant: "destructive",
        })
        return
      }
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  return (
    <div className="mt-4">
      <p className="text-muted-foreground mb-6">
        Choose the areas that spark your curiosity and passion. This will help us identify careers that align with what
        you enjoy.
      </p>

      {selectedInterests.length >= maxSelections && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <p className="text-amber-800 font-medium">Maximum selections reached</p>
            <p className="text-sm text-amber-700">
              You've selected {selectedInterests.length} out of {maxSelections} possible interests. 
              Remove an item if you want to select a different one.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedInterests.includes(interest)
                ? "bg-primary text-white border-primary"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <p className="w-full text-sm font-medium text-slate-500">
          Selected interests ({selectedInterests.length}/{maxSelections}):
        </p>
        {selectedInterests.length > 0 ? (
          selectedInterests.map((interest) => (
            <div key={interest} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex gap-2 items-center">
              {interest}
              <button 
                type="button" 
                onClick={() => setSelectedInterests(selectedInterests.filter(i => i !== interest))}
                className="hover:bg-primary/20 rounded-full h-5 w-5 inline-flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 italic">No interests selected yet</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Tell us more (optional)</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Describe any additional interests or provide more context about your selections to help us better understand
          your passions.
        </p>
        <Textarea
          placeholder="Type here... (500 characters max)"
          value={interestsInfo}
          onChange={(e) => setInterestsInfo(e.target.value)}
          maxLength={500}
          className="min-h-[120px]"
        />
      </div>
    </div>
  )
}
