"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { RoleRecommendations } from "@/components/roles/role-recommendations"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"

export function RolesClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const router = useRouter()
  const { user } = useAuth()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSelectRole = async (role: any) => {
    setSelectedRole(role)

    try {
      // Update the discovery_done field to true if it's not already
      if (user) {
        const { error } = await supabase.from("profiles").update({ discovery_done: true }).eq("id", user.id)

        if (error) {
          console.error("Error updating discovery status:", error)
        }
      }

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
        <p>Checking your profile...</p>
      </div>
    )
  }

  return <RoleRecommendations onSelectRole={handleSelectRole} isLoading={false} />
}
