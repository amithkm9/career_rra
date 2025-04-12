"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Heart, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { toast } from "@/components/ui/use-toast"
import { trackEvent, setUserMetadata } from "@/lib/openreplay"

// Define the recommendation interface
interface RoleRecommendation {
  id: number
  title: string
  description: string
  personalMatch: string
  professionalMatch: string
}

// Dummy recommendations data
const dummyRecommendations: RoleRecommendation[] = [
  {
    id: 1,
    title: "Business Development Manager",
    description:
      "A Business Development Manager is responsible for identifying and developing new business opportunities, building and maintaining relationships with clients, and creating strategies to increase sales and revenue. This role requires strong communication and negotiation skills, as well as the ability to analyze market trends and make strategic decisions.",
    personalMatch:
      "You have a strong interest in business and have experience as an entrepreneur, making a career as a Business Development Manager a natural fit for you. Additionally, this role allows you to have a good work-life balance and make a social impact, aligning with your personal values.",
    professionalMatch:
      "With your skills in decision-making, data analysis, and emotional intelligence, you have the necessary abilities to excel as a Business Development Manager. Your previous experience in HR and as an entrepreneur also give you a well-rounded background for this role. Additionally, the potential for advancement and a high salary align with your professional values and goals.",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    description:
      "A UX/UI Designer is responsible for creating intuitive, engaging user experiences for digital products. This role combines creativity with technical skills to design interfaces that are both visually appealing and functional. UX/UI Designers conduct user research, create wireframes and prototypes, and collaborate with developers to implement designs.",
    personalMatch:
      "Your interest in design and creativity, combined with your analytical thinking, makes UX/UI Design a great match for your personality. This role allows you to express your creativity while solving real problems for users, which aligns with your desire to make a meaningful impact.",
    professionalMatch:
      "Your skills in visual design, problem-solving, and attention to detail are perfectly suited for a UX/UI Designer role. Your background in creative work and understanding of user psychology gives you a strong foundation. The growing demand for UX/UI designers also offers excellent job security and competitive compensation.",
  },
  {
    id: 3,
    title: "Data Scientist",
    description:
      "A Data Scientist analyzes and interprets complex data to help organizations make better decisions. This role involves using statistical methods, machine learning, and data visualization to extract insights from large datasets. Data Scientists work across various industries to solve problems and identify opportunities through data analysis.",
    personalMatch:
      "Your curiosity and love for solving complex problems make Data Science an excellent personal fit. This role allows you to continuously learn and discover new insights, which aligns with your intellectual interests and desire for challenging work.",
    professionalMatch:
      "Your strong analytical skills, background in mathematics, and programming knowledge provide the perfect foundation for a career in Data Science. Your ability to communicate complex findings in simple terms is also valuable in this field. The high demand for data scientists across industries offers excellent career growth and compensation.",
  },
  {
    id: 4,
    title: "Product Manager",
    description:
      "A Product Manager oversees the development and success of products throughout their lifecycle. This role involves understanding customer needs, defining product vision, coordinating with development teams, and ensuring products meet business objectives. Product Managers serve as the bridge between technical and business stakeholders.",
    personalMatch:
      "Your interest in both business strategy and technology makes Product Management an ideal fit. This role allows you to work collaboratively with diverse teams while having significant influence on product direction, which aligns with your leadership aspirations and desire for varied work.",
    professionalMatch:
      "Your combination of technical understanding, business acumen, and strong communication skills is perfectly suited for Product Management. Your experience working with cross-functional teams and ability to prioritize competing demands are valuable assets in this role. The career path offers excellent growth potential and the opportunity to develop a diverse skill set.",
  },
  {
    id: 5,
    title: "Digital Marketing Specialist",
    description:
      "A Digital Marketing Specialist develops and implements online marketing strategies to promote products or services. This role involves managing social media campaigns, email marketing, content creation, SEO optimization, and analyzing marketing metrics to improve performance. Digital Marketers work to increase brand awareness and drive customer engagement.",
    personalMatch:
      "Your creativity combined with your interest in psychology and consumer behavior makes Digital Marketing a great personal fit. This role allows you to express your creative ideas while also analyzing data to understand what resonates with audiences, aligning with your diverse interests.",
    professionalMatch:
      "Your skills in content creation, social media management, and data analysis provide a strong foundation for a Digital Marketing career. Your understanding of audience targeting and messaging strategy gives you an advantage in this field. The digital marketing industry continues to grow, offering numerous opportunities for specialization and advancement.",
  },
  {
    id: 6,
    title: "Software Engineer",
    description:
      "A Software Engineer designs, develops, and maintains software systems and applications. This role involves writing and testing code, collaborating with other developers, and solving complex technical problems. Software Engineers work across various industries to create technology solutions that meet business and user needs.",
    personalMatch:
      "Your logical thinking and problem-solving mindset make Software Engineering a natural fit. This role offers the intellectual challenges you enjoy and the satisfaction of building products that have tangible impact, which aligns with your desire for meaningful work.",
    professionalMatch:
      "Your programming skills, systematic approach to problem-solving, and attention to detail are well-suited for Software Engineering. Your ability to learn new technologies quickly is particularly valuable in this rapidly evolving field. The tech industry offers excellent compensation, flexibility in work arrangements, and abundant opportunities for growth.",
  },
]

interface RoleRecommendationsProps {
  onSelectRole: (role: RoleRecommendation) => void
  isLoading: boolean
}

export function RoleRecommendations({ onSelectRole, isLoading }: RoleRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RoleRecommendation[]>(dummyRecommendations)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fetchingRecommendations, setFetchingRecommendations] = useState(false)
  const [savingRole, setSavingRole] = useState(false)
  const { user } = useAuth()

  // Function to fetch recommendations
  const fetchRecommendations = async () => {
    setFetchingRecommendations(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Get discovery data from localStorage if available
      let discoveryData = null
      try {
        const storedData = localStorage.getItem("discoveryData")
        if (storedData) {
          discoveryData = JSON.parse(storedData)
        }
      } catch (e) {
        console.error("Error reading discovery data:", e)
      }

      // In a real app, we would use the discovery data to personalize recommendations
      // For now, just use the dummy data
      setRecommendations(dummyRecommendations)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setFetchingRecommendations(false)
    }
  }

  // Fetch recommendations when the component mounts
  useEffect(() => {
    fetchRecommendations()
  }, [])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendations.length) % recommendations.length)
  }

  const handleSelectRole = async (role: RoleRecommendation) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to select a role",
        variant: "destructive",
      })
      return
    }

    setSavingRole(true)
    try {
      // Update the role_selected field in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({
          role_selected: role.title,
        })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      toast({
        title: "Role selected",
        description: `You've selected ${role.title} as your career path.`,
      })

      // Track role selection in OpenReplay
      trackEvent("role_selected", { role: role.title })
      setUserMetadata("selected_role", role.title)

      // Call the parent component's onSelectRole function
      onSelectRole(role)
    } catch (error) {
      console.error("Error saving role:", error)
      toast({
        title: "Error",
        description: "Failed to save your role selection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSavingRole(false)
    }
  }

  const currentRecommendation = recommendations[currentIndex]

  if (fetchingRecommendations) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-lg font-medium">Analyzing your profile and generating recommendations...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Your Top Recommendations</h1>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {recommendations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to recommendation ${index + 1}`}
          />
        ))}
      </div>

      {currentRecommendation && (
        <Card className="p-8 shadow-lg rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-bl-full -z-10"></div>

          {/* Navigation buttons at the top */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Previous
            </Button>

            <Button variant="outline" onClick={handleNext} className="flex items-center gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Centered role title */}
          <h2 className="text-3xl font-bold mb-6 text-center">{currentRecommendation.title}</h2>

          <p className="text-gray-700 mb-8 leading-relaxed">{currentRecommendation.description}</p>

          <div className="space-y-6 mb-8">
            <h3 className="text-2xl font-bold">Why it's a match</h3>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold">Personally</h4>
                  <p className="text-gray-700 leading-relaxed mt-2">{currentRecommendation.personalMatch}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Briefcase className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold">Professionally</h4>
                  <p className="text-gray-700 leading-relaxed mt-2">{currentRecommendation.professionalMatch}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Select button */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => handleSelectRole(currentRecommendation)}
              disabled={isLoading || savingRole}
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              {savingRole ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Selecting...
                </span>
              ) : isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Loading...
                </span>
              ) : (
                "Select This Role"
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
