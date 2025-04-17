"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { initTracker, identifyUser } from "@/lib/openreplay"

export function OpenReplayProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  useEffect(() => {
    // Initialize tracker
    const tracker = initTracker()

    // Identify user if logged in
    if (user?.email) {
      identifyUser(user.email)
    }

    return () => {
      // Cleanup if needed
    }
  }, [user])

  return <>{children}</>
}
