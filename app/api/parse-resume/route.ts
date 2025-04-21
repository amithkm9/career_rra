import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { generateFallbackResumeData } from "./fallback"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Initialize Mistral client - we'll do this asynchronously
let mistralClient: any = null
let mistralInitialized = false

// Function to initialize Mistral client
async function initMistralClient() {
  // If we've already tried to initialize, don't try again
  if (mistralInitialized) return null

  mistralInitialized = true

  try {
    // Use dynamic import instead of require
    const MistralModule = await import("@mistralai/mistralai").catch((err) => {
      console.error("Failed to import @mistralai/mistralai:", err)
      return null
    })

    if (!MistralModule) {
      console.error("Mistral module could not be imported")
      return null
    }

    const apiKey = process.env.MISTRAL_API_KEY
    if (!apiKey) {
      console.error("MISTRAL_API_KEY environment variable is not set")
      return null
    }

    return new MistralModule.Mistral({ apiKey })
  } catch (error) {
    console.error("Error initializing Mistral client:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Mistral client if not already initialized
    if (!mistralClient && !mistralInitialized) {
      mistralClient = await initMistralClient()
    }

    // Parse request body
    let userId, resumeUrl
    try {
      const body = await request.json()
      userId = body.userId
      resumeUrl = body.resumeUrl
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json(
        {
          error: "Invalid request format",
          details: "Could not parse request body as JSON",
        },
        { status: 400 },
      )
    }

    if (!userId || !resumeUrl) {
      return NextResponse.json(
        {
          error: "Missing required parameters",
          details: "userId and resumeUrl are required",
        },
        { status: 400 },
      )
    }

    console.log(`Processing resume for user ${userId} from URL: ${resumeUrl}`)

    // Check if Mistral client is available
    if (!mistralClient) {
      console.log("Mistral client is not available, using fallback")

      // Use fallback approach
      const fallbackData = generateFallbackResumeData()

      // Save the fallback resume data to the resume_data column
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          resume_data: JSON.stringify(fallbackData),
          resume_parsed: true,
          resume_parsed_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (updateError) {
        console.error("Error updating profile data:", updateError)
        return NextResponse.json(
          {
            error: "Database update error",
            details: "Could not save resume data to user profile",
          },
          { status: 500 },
        )
      }

      return NextResponse.json({
        success: true,
        message: "Resume processing skipped, using fallback data",
        resumeData: fallbackData,
        fallback: true,
      })
    }

    // Process the resume using Mistral OCR
    try {
      const ocrResponse = await mistralClient.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: resumeUrl,
        },
      })

      // Validate OCR response
      if (!ocrResponse || !ocrResponse.pages) {
        return NextResponse.json(
          {
            error: "Invalid OCR response",
            details: "The OCR service returned an invalid response",
          },
          { status: 500 },
        )
      }

      // Combine all pages into a single markdown string
      let combinedMarkdown = ""
      ocrResponse.pages.forEach((page) => {
        if (page.markdown) {
          combinedMarkdown += page.markdown + "\n\n"
        }
      })

      if (!combinedMarkdown.trim()) {
        return NextResponse.json(
          {
            error: "Empty OCR result",
            details: "The OCR service did not extract any text from the document",
          },
          { status: 422 },
        )
      }

      // Parse the resume data from markdown
      const resumeData = parseResumeFromMarkdown(combinedMarkdown)

      // Log parsed resume data
      console.log("Parsed resume data:", JSON.stringify(resumeData, null, 2))

      // Save the parsed resume data to the resume_data column
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          resume_data: combinedMarkdown, // Save the raw markdown as resume_data
          resume_parsed: true,
          resume_parsed_at: new Date().toISOString(),
          resume_structured_data: resumeData, // Save the structured data in a separate column
        })
        .eq("id", userId)

      if (updateError) {
        console.error("Error updating profile data:", updateError)
        return NextResponse.json(
          {
            error: "Database update error",
            details: "Could not save parsed resume data to user profile",
          },
          { status: 500 },
        )
      }

      // Verify the update was successful by fetching the data again
      const { data: verificationData, error: verificationError } = await supabase
        .from("profiles")
        .select("resume_data, resume_parsed")
        .eq("id", userId)
        .single()

      if (verificationError) {
        console.error("Error verifying update:", verificationError)
      } else {
        console.log(
          "Verification - Resume data saved:",
          verificationData?.resume_data ? "Yes" : "No",
          "Parsed:",
          verificationData?.resume_parsed || false,
        )
      }

      return NextResponse.json({
        success: true,
        message: "Resume parsed and saved successfully",
        resumeData,
      })
    } catch (mistralError: any) {
      console.error("Mistral OCR error:", mistralError)

      // Extract meaningful error message
      const errorMessage =
        mistralError?.message ||
        (typeof mistralError === "object" ? JSON.stringify(mistralError) : String(mistralError))

      return NextResponse.json(
        {
          error: "OCR processing error",
          details: errorMessage,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Unhandled error in resume parsing:", error)

    // Ensure we always return a valid JSON response
    return NextResponse.json(
      {
        error: "Server error",
        details: error?.message || String(error),
      },
      { status: 500 },
    )
  }
}

// Helper function to parse resume data from markdown
function parseResumeFromMarkdown(markdown: string): any {
  try {
    // This is a simplified parsing logic
    const sections: Record<string, string> = {}

    // Try to identify common resume sections
    const experienceMatch = markdown.match(
      /(?:EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT)([\s\S]*?)(?=EDUCATION|SKILLS|PROJECTS|$)/i,
    )
    if (experienceMatch && experienceMatch[1]) {
      sections.experience = experienceMatch[1].trim()
    }

    const educationMatch = markdown.match(
      /(?:EDUCATION|ACADEMIC BACKGROUND)([\s\S]*?)(?=EXPERIENCE|SKILLS|PROJECTS|$)/i,
    )
    if (educationMatch && educationMatch[1]) {
      sections.education = educationMatch[1].trim()
    }

    const skillsMatch = markdown.match(
      /(?:SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES)([\s\S]*?)(?=EXPERIENCE|EDUCATION|PROJECTS|$)/i,
    )
    if (skillsMatch && skillsMatch[1]) {
      sections.skills = skillsMatch[1].trim()
    }

    const projectsMatch = markdown.match(/(?:PROJECTS|PROJECT EXPERIENCE)([\s\S]*?)(?=EXPERIENCE|EDUCATION|SKILLS|$)/i)
    if (projectsMatch && projectsMatch[1]) {
      sections.projects = projectsMatch[1].trim()
    }

    // Extract skills as an array
    const extractedSkills: string[] = []
    if (sections.skills) {
      // Look for skills that are comma-separated or bullet-pointed
      const skillText = sections.skills
      const skillMatches = skillText.match(/[•\-*]?\s*([A-Za-z0-9#+\s]+)(?:,|\n|$)/g)

      if (skillMatches) {
        skillMatches.forEach((match) => {
          // Clean up the skill text
          const skill = match.replace(/[•\-*,\n]/g, "").trim()
          if (skill) extractedSkills.push(skill)
        })
      }
    }

    // Extract work experiences
    const experiences: any[] = []
    if (sections.experience) {
      // This is a simplified approach - a real implementation would be more robust
      const experienceBlocks = sections.experience.split(/\n\n+/)

      experienceBlocks.forEach((block) => {
        if (block.trim()) {
          // Try to extract company and position
          const companyMatch = block.match(/^([A-Za-z0-9\s&.,]+)/)
          const positionMatch = block.match(/([A-Za-z\s]+)(?:,|\n|$)/)

          if (companyMatch || positionMatch) {
            experiences.push({
              company: companyMatch ? companyMatch[1].trim() : "Unknown",
              position: positionMatch ? positionMatch[1].trim() : "Unknown",
              description: block.trim(),
            })
          }
        }
      })
    }

    // Extract education
    const educationItems: any[] = []
    if (sections.education) {
      const educationBlocks = sections.education.split(/\n\n+/)

      educationBlocks.forEach((block) => {
        if (block.trim()) {
          // Try to extract institution and degree
          const institutionMatch = block.match(/^([A-Za-z0-9\s&.,]+)/)
          const degreeMatch = block.match(/([A-Za-z\s]+(?:Bachelor|Master|PhD|Degree|Diploma))/)

          if (institutionMatch || degreeMatch) {
            educationItems.push({
              institution: institutionMatch ? institutionMatch[1].trim() : "Unknown",
              degree: degreeMatch ? degreeMatch[1].trim() : "Unknown",
              description: block.trim(),
            })
          }
        }
      })
    }

    return {
      skills: extractedSkills,
      experiences,
      education: educationItems,
      projects: sections.projects ? sections.projects : "",
      full_text: markdown,
    }
  } catch (parseError) {
    console.error("Error parsing resume markdown:", parseError)
    // Return a minimal structure with the full text to ensure we don't lose data
    return {
      skills: [],
      experiences: [],
      education: [],
      projects: "",
      full_text: markdown,
      parse_error: true,
    }
  }
}
