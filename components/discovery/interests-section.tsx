"use client"

import { Textarea } from "@/components/ui/textarea"

interface InterestsSectionProps {
  selectedInterests: string[]
  setSelectedInterests: (interests: string[]) => void
  interestsInfo: string
  setInterestsInfo: (info: string) => void
}

export function InterestsSection({
  selectedInterests,
  setSelectedInterests,
  interestsInfo,
  setInterestsInfo,
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
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Interests</h2>
      <p className="text-muted-foreground mb-6">
        Choose the areas that spark your curiosity and passion. This will help us identify careers that align with what
        you enjoy.
      </p>

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
