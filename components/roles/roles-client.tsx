"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { RoleRecommendations } from "@/components/roles/role-recommendations"
import { Loader2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"

// Define the recommendation interface
export interface RoleRecommendation {
  id?: number
  role_title: string
  description: string
  why_it_fits_professionally: string
  why_it_fits_personally: string
}

export function RolesClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<RoleRecommendation[]>([])
  const [selectedRole, setSelectedRole] = useState<RoleRecommendation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  // Fetch recommendations when component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setIsLoading(false)
        setError("You need to be logged in to view recommendations")
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // Check if we already have stored recommendations for this user
        const { data: existingData, error: existingError } = await supabase
          .from("role_recommendations")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3)
          
        // If we have existing recommendations, use them
        if (!existingError && existingData && existingData.length > 0) {
          console.log("Using existing recommendations from database");
          setRecommendations(existingData.map(item => ({
            id: item.id,
            role_title: item.role_title,
            description: item.description,
            why_it_fits_professionally: item.why_it_fits_professionally,
            why_it_fits_personally: item.why_it_fits_personally,
          })));
          setIsLoading(false);
          return;
        }

        // Otherwise, call our API to generate new recommendations
        console.log("Generating new recommendations from Azure OpenAI");
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch recommendations');
        }

        const data = await response.json();
        
        // Store recommendations in state
        const recommendationsWithIds = data.recommendations.map((rec: RoleRecommendation, index: number) => ({
          ...rec,
          id: index + 1
        }));
        
        setRecommendations(recommendationsWithIds);

        // Store the new recommendations in Supabase for future use
        for (const rec of recommendationsWithIds) {
          await supabase.from("role_recommendations").insert({
            user_id: user.id,
            role_title: rec.role_title,
            description: rec.description,
            why_it_fits_professionally: rec.why_it_fits_professionally,
            why_it_fits_personally: rec.why_it_fits_personally
          });
        }

      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError(error instanceof Error ? error.message : "Failed to load recommendations");
        // Use fallback data in case of error
        setRecommendations([
          {
            id: 1,
            role_title: "Software Developer",
            description: "Software developers create applications and systems that run on computers and other devices. They design, code, test, and maintain software solutions across various industries.",
            why_it_fits_professionally: "Based on your skills and background, software development allows you to leverage your analytical thinking and problem-solving abilities. Your interest in technology and logic-based work aligns well with this career path.",
            why_it_fits_personally: "Your preference for creative problem-solving and building things makes software development a good match. It offers the intellectual challenges you enjoy while providing opportunities for continuous learning."
          },
          {
            id: 2,
            role_title: "Data Analyst",
            description: "Data analysts collect, process, and analyze data to help organizations make better decisions. They work with large datasets to identify trends, create visualizations, and generate insights.",
            why_it_fits_professionally: "Your analytical skills and attention to detail would be valuable assets in data analysis. Your background demonstrates comfort with numbers and logical reasoning needed in this field.",
            why_it_fits_personally: "Your interest in understanding patterns and solving complex problems aligns well with data analysis. This role provides the opportunity to make a meaningful impact through data-driven insights."
          },
          {
            id: 3,
            role_title: "Product Manager",
            description: "Product managers oversee the development and strategy of products throughout their lifecycle. They work across teams to ensure products meet market needs and business objectives.",
            why_it_fits_professionally: "Your combination of technical understanding and communication skills is ideal for product management. Your experience demonstrates the ability to collaborate and think strategically.",
            why_it_fits_personally: "Your interest in both technology and business makes product management a natural fit. This role combines creative thinking with strategic planning, matching your desire for varied and impactful work."
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const handleSelectRole = async (role: RoleRecommendation) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to select a role",
        variant: "destructive",
      })
      return
    }

    try {
      // Update the role_selected field in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({
          role_selected: role.role_title,
        })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      toast({
        title: "Role selected",
        description: `You've selected ${role.role_title} as your career path.`,
      })

      setSelectedRole(role)

      // Redirect to roadmap
      router.push("/roadmap")
    } catch (error) {
      console.error("Error in role selection:", error)
      toast({
        title: "Error",
        description: "There was a problem processing your selection. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Analyzing your profile and generating recommendations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 flex items-start max-w-md">
          <AlertCircle className="h-5 w-5 text-red-500 mr-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-700 font-medium">Error loading recommendations</p>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        </div>
        <Button onClick={() => router.push("/discovery")}>
          Return to Discovery
        </Button>
      </div>
    )
  }

  return <RoleRecommendations recommendations={recommendations} onSelectRole={handleSelectRole} isLoading={false} />
}