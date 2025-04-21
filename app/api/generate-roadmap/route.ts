import ModelClient from "@azure-rest/ai-inference"
import { AzureKeyCredential } from "@azure/core-auth"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, roleTitle } = await request.json()

    if (!userId || !roleTitle) {
      return NextResponse.json({ error: "User ID and role title are required" }, { status: 400 })
    }

    // Fetch user's discovery data and resume data from Supabase
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("discovery_data, resume_data")
      .eq("id", userId)
      .single()

    if (profileError) {
      console.error("Error fetching profile data:", profileError)
      return NextResponse.json({ error: "Failed to fetch user profile data" }, { status: 500 })
    }

    const discoveryData = profileData?.discovery_data || {}
    const resumeData = profileData?.resume_data || ""

    // Extract skills and interests from discovery data
    const skills = discoveryData.skills?.selected?.join(", ") || ""
    const interests = discoveryData.interests?.selected?.join(", ") || ""
    const values = discoveryData.values?.selected?.join(", ") || ""

    // Initialize Azure AI client
    const client = new ModelClient(
      process.env.AZURE_INFERENCE_SDK_ENDPOINT || "https://techc-m9gn6hvm-eastus2.services.ai.azure.com/models",
      new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY || ""),
    )

    // Prepare the messages for the AI model
    const messages = [
      {
        role: "system",
        content: `You are a career coach and AI expert who helps individuals with guidance on how to reach a selected role by doing various things like taking courses, networking, attending events, reading articles, building portfolio and projects.
Given the following information:

Selected Role: ${roleTitle}
Resume: ${resumeData}
Skills: ${skills}
Interests: ${interests}
Values: ${values}

Based on this data, analyze the individual's background and suggest a 3 month plan for them to upskill and land a job opportunity for the selected role. Let the resources provided preferably be available for free of cost.
For each career role, provide the following fields in the response:

[
  {
    "step1": {
      "title": "Foundation Building",
      "description": "Description of foundation building phase",
      "tasks": [
        "Task 1 description",
        "Task 2 description",
        "Task 3 description",
        "Task 4 description"
      ]
    },
    "step2": {
      "title": "Practical Experience",
      "description": "Description of practical experience phase",
      "tasks": [
        "Task 1 description",
        "Task 2 description",
        "Task 3 description",
        "Task 4 description"
      ]
    },
    "step3": {
      "title": "Professional Development",
      "description": "Description of professional development phase",
      "tasks": [
        "Task 1 description",
        "Task 2 description",
        "Task 3 description",
        "Task 4 description"
      ]
    },
    "step4": {
      "title": "Career Advancement",
      "description": "Description of career advancement phase",
      "tasks": [
        "Task 1 description",
        "Task 2 description",
        "Task 3 description",
        "Task 4 description"
      ]
    }
  }
]

IMPORTANT: Return ONLY the JSON array without any markdown formatting, code block indicators, or additional text. Do not include \`\`\`json or \`\`\` markers in your response.`,
      },
      {
        role: "user",
        content: `Generate a personalized roadmap for the role: ${roleTitle}`,
      },
    ]

    // Call the Azure AI API
    const response = await client.path("chat/completions").post({
      body: {
        messages: messages,
        max_tokens: 4000,
        model: process.env.DEPLOYMENT_NAME || "Phi-4-2",
      },
    })

    // Extract the response content
    const responseContent = response.body.choices[0].message.content

    // Clean the response content by removing markdown code block indicators
    const cleanedContent = responseContent
      .replace(/^```json\s*/g, "") // Remove opening ```json
      .replace(/^```\s*/g, "") // Remove opening ``` (without json)
      .replace(/\s*```$/g, "") // Remove closing ```
      .trim()

    console.log("Cleaned content:", cleanedContent)

    let roadmapData
    try {
      // Try to parse the JSON response
      roadmapData = JSON.parse(cleanedContent)
    } catch (error) {
      console.error("Error parsing AI response:", error)
      console.log("Raw response:", responseContent)
      console.log("Cleaned response:", cleanedContent)

      // Try to extract JSON from the response using regex as a fallback
      try {
        const jsonMatch = responseContent.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          roadmapData = JSON.parse(jsonMatch[0])
          console.log("Successfully extracted JSON using regex")
        } else {
          throw new Error("Could not extract JSON using regex")
        }
      } catch (regexError) {
        console.error("Regex extraction failed:", regexError)

        // Fallback to a default roadmap structure
        roadmapData = [
          {
            step1: {
              title: "Foundation Building",
              description: "Learn the fundamental skills and knowledge required for the role",
              tasks: [
                "Research the core competencies needed for the role",
                "Identify online courses or resources to learn these skills",
                "Set up a learning schedule",
                "Join relevant online communities",
              ],
            },
            step2: {
              title: "Practical Experience",
              description: "Apply your knowledge through practical projects",
              tasks: [
                "Start a personal project related to the role",
                "Contribute to open-source projects if applicable",
                "Create a portfolio showcasing your work",
                "Practice explaining your projects to others",
              ],
            },
            step3: {
              title: "Professional Development",
              description: "Enhance your professional skills and network",
              tasks: [
                "Update your resume and LinkedIn profile",
                "Attend industry events and webinars",
                "Connect with professionals in your target role",
                "Practice interview questions specific to the role",
              ],
            },
            step4: {
              title: "Career Advancement",
              description: "Take steps to secure opportunities in your chosen role",
              tasks: [
                "Apply for relevant positions",
                "Prepare for technical interviews",
                "Research companies of interest",
                "Develop a strategy for salary negotiation",
              ],
            },
          },
        ]
      }
    }

    // Save the generated roadmap to Supabase
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        roadmap_data: roadmapData[0],
        role_selected: roleTitle,
      })
      .eq("id", userId)

    if (updateError) {
      console.error("Error saving roadmap data:", updateError)
      return NextResponse.json({ error: "Failed to save roadmap data" }, { status: 500 })
    }

    return NextResponse.json({ roadmap: roadmapData[0] })
  } catch (error) {
    console.error("Error generating roadmap:", error)
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 })
  }
}
