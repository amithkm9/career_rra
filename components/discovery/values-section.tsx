"use client"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"

interface ValuesSectionProps {
  selectedValues: string[]
  setSelectedValues: (values: string[]) => void
  valuesInfo: string
  setValuesInfo: (info: string) => void
  maxSelections?: number
}

export function ValuesSection({ 
  selectedValues, 
  setSelectedValues, 
  valuesInfo, 
  setValuesInfo,
  maxSelections = 5 
}: ValuesSectionProps) {
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
      if (selectedValues.length >= maxSelections) {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${maxSelections} values`,
          variant: "destructive",
        })
        return
      }
      setSelectedValues([...selectedValues, value])
    }
  }

  return (
    <div className="mt-4">
      <p className="text-muted-foreground mb-6">
        Select the values that are most important to you in your career. This helps us find roles that align with what
        matters to you.
      </p>

      {selectedValues.length >= maxSelections && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <p className="text-amber-800 font-medium">Maximum selections reached</p>
            <p className="text-sm text-amber-700">
              You've selected {selectedValues.length} out of {maxSelections} possible values. 
              Remove an item if you want to select a different one.
            </p>
          </div>
        </div>
      )}

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

      <div className="flex flex-wrap gap-2 mb-6">
        <p className="w-full text-sm font-medium text-slate-500">
          Selected values ({selectedValues.length}/{maxSelections}):
        </p>
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => (
            <div key={value} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex gap-2 items-center">
              {value}
              <button 
                type="button" 
                onClick={() => setSelectedValues(selectedValues.filter(v => v !== value))}
                className="hover:bg-primary/20 rounded-full h-5 w-5 inline-flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 italic">No values selected yet</p>
        )}
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
