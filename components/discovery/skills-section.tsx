"use client"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"

interface SkillsSectionProps {
  selectedSkills: string[]
  setSelectedSkills: (skills: string[]) => void
  skillsInfo: string
  setSkillsInfo: (info: string) => void
  maxSelections?: number
}

export function SkillsSection({ 
  selectedSkills, 
  setSelectedSkills, 
  skillsInfo, 
  setSkillsInfo,
  maxSelections = 5
}: SkillsSectionProps) {
  const skills = [
    "Analytical thinking",
    "Communication",
    "Creativity",
    "Critical thinking",
    "Data analysis",
    "Design",
    "Leadership",
    "Organization",
    "Problem-solving",
    "Programming",
    "Project management",
    "Public speaking",
    "Research",
    "Teaching",
    "Technical writing",
    "Time management",
    "Teamwork",
    "Writing",
    "Adaptability",
    "Attention to detail",
    "Collaboration",
    "Customer service",
    "Decision making",
    "Emotional intelligence",
    "Foreign languages",
    "Negotiation",
    "Networking",
    "Strategic planning",
  ]

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      if (selectedSkills.length >= maxSelections) {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${maxSelections} skills`,
          variant: "destructive",
        })
        return
      }
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className="mt-4">
      <p className="text-muted-foreground mb-6">
        Select the skills you already possess or would like to develop. This helps us match you with careers that
        leverage your strengths.
      </p>

      {selectedSkills.length >= maxSelections && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <p className="text-amber-800 font-medium">Maximum selections reached</p>
            <p className="text-sm text-amber-700">
              You've selected {selectedSkills.length} out of {maxSelections} possible skills. 
              Remove an item if you want to select a different one.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedSkills.includes(skill)
                ? "bg-primary text-white border-primary"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <p className="w-full text-sm font-medium text-slate-500">
          Selected skills ({selectedSkills.length}/{maxSelections}):
        </p>
        {selectedSkills.length > 0 ? (
          selectedSkills.map((skill) => (
            <div key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex gap-2 items-center">
              {skill}
              <button 
                type="button" 
                onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
                className="hover:bg-primary/20 rounded-full h-5 w-5 inline-flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 italic">No skills selected yet</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Tell us more (optional)</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Describe any additional skills or provide more context about your skill level and experience.
        </p>
        <Textarea
          placeholder="Type here... (500 characters max)"
          value={skillsInfo}
          onChange={(e) => setSkillsInfo(e.target.value)}
          maxLength={500}
          className="min-h-[120px]"
        />
      </div>
    </div>
  )
}