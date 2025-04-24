"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { identifyUser } from "@/lib/openreplay"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showPhonePrompt, setShowPhonePrompt] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Identify user in OpenReplay
          if (session.user.email) {
            identifyUser(session.user.email)
          }
          
          // Get phone number from localStorage if we have it (for Google auth)
          const googlePhoneNumber = localStorage.getItem("google_phone_number")
          
          if (googlePhoneNumber) {
            // Save phone number to profile
            const { error } = await supabase
              .from("profiles")
              .update({
                phone_number: googlePhoneNumber
              })
              .eq("id", session.user.id)
              
            if (error) {
              console.error("Error saving phone number:", error)
            }
            
            // Clear from localStorage
            localStorage.removeItem("google_phone_number")
          }

          // Fetch user profile data
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("discovery_done, role_selected")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            console.error("Error fetching profile:", profileError)
            router.push("/dashboard") // Default fallback
            return
          }

          // Conditional redirect based on profile data
          if (profileData?.role_selected) {
            router.push("/dashboard")
          } else if (profileData?.discovery_done) {
            router.push("/roles")
          } else {
            router.push("/discovery")
          }
        } else {
          // If no session, redirect to home
          router.push("/")
        }
      } catch (error) {
        console.error("Error in auth callback:", error)
        router.push("/") // Default fallback on error
      } finally {
        setIsLoading(false)
      }
    }

    handleRedirect()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Signing you in...</h2>
        <p className="text-muted-foreground">You'll be redirected shortly</p>
      </div>
    </div>
  )
}