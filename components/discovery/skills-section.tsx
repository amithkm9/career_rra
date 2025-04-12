"use client"

import { Textarea } from "@/components/ui/textarea"

interface SkillsSectionProps {
  selectedSkills: string[]
  setSelectedSkills: (skills: string[]) => void
  skillsInfo: string
  setSkillsInfo: (info: string) => void
}

export function SkillsSection({ selectedSkills, setSelectedSkills, skillsInfo, setSkillsInfo }: SkillsSectionProps) {
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
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <p className="text-muted-foreground mb-6">
        Select the skills you already possess or would like to develop. This helps us match you with careers that
        leverage your strengths.
      </p>

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
