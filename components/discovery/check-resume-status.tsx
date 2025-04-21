"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function CheckResumeStatus() {
  const { user } = useAuth()
  const [isChecking, setIsChecking] = useState(false)
  const [resumeStatus, setResumeStatus] = useState<{
    exists: boolean
    parsed: boolean
    timestamp?: string
  } | null>(null)

  const checkResumeStatus = async () => {
    if (!user) return

    setIsChecking(true)
    try {
      const { data, error } = await supabase.from("profiles").select("discovery_data").eq("id", user.id).single()

      if (error) throw error

      const resumeData = data?.discovery_data?.resume
      setResumeStatus({
        exists: !!resumeData,
        parsed: !!resumeData?.parsed,
        timestamp: resumeData?.parsed_at,
      })

      if (resumeData) {
        toast({
          title: "Resume Status",
          description: `Resume data ${resumeData.parsed ? "is" : "is not"} parsed. Last updated: ${
            new Date(resumeData.parsed_at).toLocaleString() || "unknown"
          }`,
        })
      } else {
        toast({
          title: "Resume Status",
          description: "No resume data found in your profile.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error checking resume status:", error)
      toast({
        title: "Error",
        description: "Could not check resume status.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="mt-4">
      <Button variant="outline" size="sm" onClick={checkResumeStatus} disabled={isChecking}>
        {isChecking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          "Check Resume Status"
        )}
      </Button>
      {resumeStatus && (
        <div className="mt-2 text-sm">
          <p>
            Resume data: {resumeStatus.exists ? "Found" : "Not found"}
            {resumeStatus.exists && (
              <>
                {" "}
                ({resumeStatus.parsed ? "Parsed" : "Not parsed"})
                {resumeStatus.timestamp && <>, Last updated: {new Date(resumeStatus.timestamp).toLocaleString()}</>}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
