"use client"

import Tracker from "@openreplay/tracker"

// Initialize tracker only on the client side
let tracker: Tracker | null = null

// Initialize the tracker
export const initTracker = () => {
  if (typeof window !== "undefined" && !tracker) {
    tracker = new Tracker({
      projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY as string,
    })
    tracker.start()
    return tracker
  }
  return tracker
}

// Get the tracker instance
export const getTracker = () => {
  if (!tracker && typeof window !== "undefined") {
    return initTracker()
  }
  return tracker
}

// Set user ID
export const identifyUser = (userId: string) => {
  const trackerInstance = getTracker()
  if (trackerInstance && userId) {
    trackerInstance.setUserID(userId)
  }
}

// Set metadata
export const setUserMetadata = (key: string, value: string) => {
  const trackerInstance = getTracker()
  if (trackerInstance) {
    trackerInstance.setMetadata(key, value)
  }
}

// Track custom events
export const trackEvent = (eventName: string, payload?: Record<string, any>) => {
  const trackerInstance = getTracker()
  if (trackerInstance) {
    trackerInstance.event(eventName, payload)
  }
}
