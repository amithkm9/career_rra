"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, Home } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { trackEvent } from "@/lib/openreplay"

// Define role-specific roadmap content
const roleRoadmaps = {
  "Software Developer": {
    description: "Software developers create applications and systems that run on computers and other devices.",
    steps: [
      {
        title: "Foundation Building",
        description: "Learn programming fundamentals and computer science basics",
        tasks: [
          "Master a programming language (JavaScript, Python, or Java)",
          "Learn data structures and algorithms",
          "Understand version control with Git",
          "Build simple applications to practice your skills",
        ],
      },
      {
        title: "Practical Experience",
        description: "Develop real-world projects and expand your technical skills",
        tasks: [
          "Create a portfolio of personal projects",
          "Contribute to open-source projects",
          "Learn frameworks relevant to your interests (React, Django, etc.)",
          "Practice problem-solving on platforms like LeetCode or HackerRank",
        ],
      },
      {
        title: "Professional Development",
        description: "Gain industry experience and specialized knowledge",
        tasks: [
          "Obtain relevant certifications",
          "Participate in hackathons or coding competitions",
          "Network with other developers",
          "Learn about software development methodologies (Agile, Scrum)",
        ],
      },
      {
        title: "Career Advancement",
        description: "Grow your expertise and leadership skills",
        tasks: [
          "Mentor junior developers",
          "Lead development projects",
          "Specialize in a specific domain (web, mobile, AI, etc.)",
          "Stay updated with industry trends and new technologies",
        ],
      },
    ],
  },
  "UX/UI Designer": {
    description: "UX/UI Designers create intuitive, engaging user experiences for digital products.",
    steps: [
      {
        title: "Foundation Building",
        description: "Learn design fundamentals and user experience principles",
        tasks: [
          "Master design tools (Figma, Adobe XD, Sketch)",
          "Study color theory, typography, and visual hierarchy",
          "Learn UX research methods and user-centered design",
          "Create simple design projects to practice your skills",
        ],
      },
      {
        title: "Practical Experience",
        description: "Develop a portfolio and expand your design skills",
        tasks: [
          "Create case studies for your design projects",
          "Practice user testing and gathering feedback",
          "Learn about accessibility and inclusive design",
          "Develop prototyping and interaction design skills",
        ],
      },
      {
        title: "Professional Development",
        description: "Gain industry experience and specialized knowledge",
        tasks: [
          "Collaborate with developers to understand technical constraints",
          "Learn about design systems and component libraries",
          "Network with other designers",
          "Stay updated with design trends and tools",
        ],
      },
      {
        title: "Career Advancement",
        description: "Grow your expertise and leadership skills",
        tasks: [
          "Lead design projects and mentor junior designers",
          "Develop a unique design perspective or specialty",
          "Contribute to design strategy and business goals",
          "Present and advocate for design decisions to stakeholders",
        ],
      },
    ],
  },
  "Data Scientist": {
    description: "Data Scientists analyze and interpret complex data to help organizations make better decisions.",
    steps: [
      {
        title: "Foundation Building",
        description: "Learn data analysis fundamentals and programming",
        tasks: [
          "Master Python or R for data analysis",
          "Learn statistics and probability",
          "Understand data manipulation and visualization",
          "Practice with small datasets and simple models",
        ],
      },
      {
        title: "Practical Experience",
        description: "Work on real data projects and expand your technical skills",
        tasks: [
          "Build a portfolio of data analysis projects",
          "Learn machine learning algorithms and techniques",
          "Participate in data science competitions (Kaggle)",
          "Develop database and SQL skills",
        ],
      },
      {
        title: "Professional Development",
        description: "Gain industry experience and specialized knowledge",
        tasks: [
          "Learn big data technologies (Spark, Hadoop)",
          "Develop expertise in a specific domain (finance, healthcare, etc.)",
          "Network with other data professionals",
          "Stay updated with new algorithms and research",
        ],
      },
      {
        title: "Career Advancement",
        description: "Grow your expertise and leadership skills",
        tasks: [
          "Lead data science projects and teams",
          "Communicate insights effectively to non-technical stakeholders",
          "Develop advanced modeling and AI skills",
          "Contribute to data strategy and business decisions",
        ],
      },
    ],
  },
  "Business Development Manager": {
    description:
      "Business Development Managers identify opportunities, build relationships, and create strategies to increase sales and revenue.",
    steps: [
      {
        title: "Foundation Building",
        description: "Learn business fundamentals and relationship management",
        tasks: [
          "Develop strong communication and negotiation skills",
          "Learn about sales processes and techniques",
          "Understand market research and competitive analysis",
          "Build a network of professional contacts",
        ],
      },
      {
        title: "Practical Experience",
        description: "Gain hands-on experience in sales and business development",
        tasks: [
          "Practice pitching and presenting business proposals",
          "Learn to identify and qualify leads",
          "Develop account management skills",
          "Understand contract negotiation and closing deals",
        ],
      },
      {
        title: "Professional Development",
        description: "Expand your business acumen and industry knowledge",
        tasks: [
          "Learn about financial analysis and business metrics",
          "Develop expertise in your industry or market",
          "Build strategic partnership skills",
          "Stay updated with industry trends and opportunities",
        ],
      },
      {
        title: "Career Advancement",
        description: "Grow your leadership and strategic skills",
        tasks: [
          "Lead business development teams and initiatives",
          "Develop and implement growth strategies",
          "Build and maintain executive-level relationships",
          "Contribute to overall business strategy and direction",
        ],
      },
    ],
  },
  "Product Manager": {
    description: "Product Managers oversee the development and success of products throughout their lifecycle.",
    steps: [
      {
        title: "Foundation Building",
        description: "Learn product management fundamentals",
        tasks: [
          "Understand user research and customer needs analysis",
          "Learn about product development processes",
          "Develop project management skills",
          "Build basic technical knowledge",
        ],
      },
      {
        title: "Practical Experience",
        description: "Gain hands-on experience managing products",
        tasks: [
          "Create product roadmaps and specifications",
          "Practice prioritizing features and requirements",
          "Learn to work with cross-functional teams",
          "Develop data analysis skills for product metrics",
        ],
      },
      {
        title: "Professional Development",
        description: "Expand your product expertise and leadership skills",
        tasks: [
          "Learn about product strategy and market positioning",
          "Develop user experience design knowledge",
          "Build stakeholder management skills",
          "Stay updated with industry trends and methodologies",
        ],
      },
      {
        title: "Career Advancement",
        description: "Grow your strategic impact and leadership",
        tasks: [
          "Lead product teams and mentor junior product managers",
          "Develop product vision and strategy",
          "Drive innovation and new product development",
          "Align product goals with business objectives",
        ],
      },
    ],
  },
  "Digital Marketing Specialist": {
    description:
      "Digital Marketing Specialists develop and implement online marketing strategies to promote products or services.",
    steps: [
      {
        title: "Foundation Building",
        description: "Learn digital marketing fundamentals",
        tasks: [
          "Understand SEO and content marketing",
          "Learn social media marketing strategies",
          "Develop email marketing skills",
          "Build basic analytics knowledge",
        ],
      },
      {
        title: "Practical Experience",
        description: "Gain hands-on experience with marketing campaigns",
        tasks: [
          "Create and manage social media campaigns",
          "Develop content marketing materials",
          "Learn paid advertising (Google Ads, Facebook Ads)",
          "Practice analyzing marketing metrics",
        ],
      },
      {
        title: "Professional Development",
        description: "Expand your marketing expertise and technical skills",
        tasks: [
          "Learn marketing automation tools",
          "Develop data analysis and reporting skills",
          "Build expertise in specific marketing channels",
          "Stay updated with digital marketing trends",
        ],
      },
      {
        title: "Career Advancement",
        description: "Grow your strategic impact and leadership",
        tasks: [
          "Lead marketing teams and campaigns",
          "Develop comprehensive marketing strategies",
          "Build brand management skills",
          "Align marketing goals with business objectives",
        ],
      },
    ],
  },
}

// Default role if none is selected
const defaultRole = {
  title: "Software Developer",
  description: "Software developers create applications and systems that run on computers and other devices.",
  match: 95,
  skills: ["Programming", "Problem-solving", "Analytical thinking", "Attention to detail"],
  education: "Bachelor's degree in Computer Science or related field",
  salary: "$70,000 - $120,000",
  growth: "Much faster than average (22% growth)",
  icon: "Code",
}

export function RoadmapClient() {
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const [personalizedRoadmap, setPersonalizedRoadmap] = useState<any>(null)

  // Fetch the selected role from Supabase
  useEffect(() => {
    const fetchSelectedRole = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        // Get the user's selected role and roadmap data from profiles
        const { data, error } = await supabase
          .from("profiles")
          .select("role_selected, roadmap_data")
          .eq("id", user.id)
          .single()

        if (error) {
          throw error
        }

        if (data && data.role_selected) {
          // Set the selected role
          const roleName = data.role_selected
          const roleData = {
            title: roleName,
            description:
              roleRoadmaps[roleName as keyof typeof roleRoadmaps]?.description ||
              "This role involves specialized skills and knowledge in your field.",
          }

          setSelectedRole(roleData)

          // If we have personalized roadmap data, use it
          if (data.roadmap_data) {
            setPersonalizedRoadmap(data.roadmap_data)
          }
        } else {
          // If no role is selected, use default
          setSelectedRole(defaultRole)
        }
      } catch (error) {
        console.error("Error fetching selected role:", error)
        setLoadingError("Failed to load your selected role. Please try again.")
        // Use default role as fallback
        setSelectedRole(defaultRole)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSelectedRole()
  }, [user])

  const handleCompleteRoadmap = () => {
    setIsProcessing(true)

    // Track roadmap start event
    trackEvent("roadmap_started", {
      role: selectedRole?.title || "Unknown Role",
    })

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Roadmap created",
        description: "Your career roadmap has been created successfully!",
      })

      // Redirect to paywall
      router.push("/paywall")
    }, 1500)
  }

  const handleSelectRole = () => {
    // Redirect to roles page
    router.push("/roles")
  }

  const handleGoToDashboard = () => {
    // Redirect to dashboard page instead of home
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading your selected role...</p>
      </div>
    )
  }

  if (loadingError || !selectedRole) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start max-w-md">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-700 font-medium">Error loading role</p>
            <p className="text-red-600">{loadingError || "No role selected"}</p>
          </div>
        </div>
        <Button onClick={handleSelectRole}>Select a Role</Button>
      </div>
    )
  }

  // Get the roadmap content for the selected role
  const roleTitle = selectedRole.title
  const defaultRoadmapContent =
    roleRoadmaps[roleTitle as keyof typeof roleRoadmaps] || roleRoadmaps["Software Developer"]

  // Use personalized roadmap if available, otherwise use default
  const roadmapContent = personalizedRoadmap
    ? {
        description: selectedRole.description,
        steps: [
          {
            title: personalizedRoadmap.step1.title,
            description: personalizedRoadmap.step1.description,
            tasks: personalizedRoadmap.step1.tasks,
          },
          {
            title: personalizedRoadmap.step2.title,
            description: personalizedRoadmap.step2.description,
            tasks: personalizedRoadmap.step2.tasks,
          },
          {
            title: personalizedRoadmap.step3.title,
            description: personalizedRoadmap.step3.description,
            tasks: personalizedRoadmap.step3.tasks,
          },
          {
            title: personalizedRoadmap.step4.title,
            description: personalizedRoadmap.step4.description,
            tasks: personalizedRoadmap.step4.tasks,
          },
        ],
      }
    : defaultRoadmapContent

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Career Roadmap</h1>
        <p className="text-lg text-gray-700">
          Based on your selected role as a <span className="font-semibold">{selectedRole.title}</span>, we've created a
          personalized roadmap to help you achieve your career goals.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Role Selected</h2>
            <p className="text-gray-600">{selectedRole.title}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{roadmapContent.description}</p>

        {/* Personalized roadmap content based on selected role */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Your Personalized Roadmap</h3>
          <p className="text-gray-700 mb-6">
            Follow this step-by-step career roadmap to become a successful {selectedRole.title}. Each stage includes key
            skills and activities to help you progress.
          </p>

          <div className="space-y-4">
            {roadmapContent.steps.map((step: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium">
                  Step {index + 1}: {step.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                {step.tasks && (
                  <ul className="text-sm text-gray-700 list-disc pl-5 mt-2 space-y-1">
                    {step.tasks.map((task: string, taskIndex: number) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        <Button onClick={handleSelectRole} variant="outline" className="flex items-center gap-2 justify-center">
          <ArrowLeft className="h-4 w-4" />
          Back To Roles
        </Button>

        <Button
          onClick={handleCompleteRoadmap}
          disabled={isProcessing}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Start My Roadmap"
          )}
        </Button>

        <Button onClick={handleGoToDashboard} variant="outline" className="flex items-center gap-2 justify-center">
          <Home className="h-4 w-4" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
