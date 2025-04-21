// Generate fallback resume data when Mistral OCR is not available
export function generateFallbackResumeData() {
  return {
    skills: ["Communication", "Problem Solving", "Teamwork", "Time Management", "Adaptability"],
    experiences: [
      {
        company: "Previous Experience",
        position: "Various Roles",
        description: "The user has uploaded a resume, but we couldn't extract specific experience details.",
      },
    ],
    education: [
      {
        institution: "Educational Background",
        degree: "Various Qualifications",
        description: "The user has uploaded a resume, but we couldn't extract specific education details.",
      },
    ],
    projects: "The user has uploaded a resume, but we couldn't extract specific project details.",
    full_text: "Resume content is available but could not be fully parsed into structured data.",
  }
}
