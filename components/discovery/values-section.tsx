"use client"

import { Textarea } from "@/components/ui/textarea"

interface ValuesSectionProps {
  selectedValues: string[]
  setSelectedValues: (values: string[]) => void
  valuesInfo: string
  setValuesInfo: (info: string) => void
}

export function ValuesSection({ selectedValues, setSelectedValues, valuesInfo, setValuesInfo }: ValuesSectionProps) {
  const values = [
    "Achievement",
    "Adventure",
    "Autonomy",
    "Balance",
    "Challenge",
    "Collaboration",
    "Community",
    "Creativity",
    "Curiosity",
    "Diversity",
    "Economic security",
    "Fairness",
    "Family",
    "Freedom",
    "Growth",
    "Helping others",
    "Honesty",
    "Impact",
    "Independence",
    "Innovation",
    "Integrity",
    "Leadership",
    "Learning",
    "Meaningful work",
    "Recognition",
    "Responsibility",
    "Security",
    "Social justice",
    "Stability",
    "Status",
    "Sustainability",
    "Variety",
    "Wealth",
  ]

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value))
    } else {
      setSelectedValues([...selectedValues, value])
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Values</h2>
      <p className="text-muted-foreground mb-6">
        Select the values that are most important to you in your career. This helps us find roles that align with what
        matters to you.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => toggleValue(value)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedValues.includes(value)
                ? "bg-primary text-white border-primary"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Tell us more (optional)</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Describe any additional values or provide more context about what matters most to you in your career.
        </p>
        <Textarea
          placeholder="Type here... (500 characters max)"
          value={valuesInfo}
          onChange={(e) => setValuesInfo(e.target.value)}
          maxLength={500}
          className="min-h-[120px]"
        />
      </div>
    </div>
  )
}
