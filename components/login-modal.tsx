"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { identifyUser } from "@/lib/openreplay"

interface LoginModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [googlePhoneNumber, setGooglePhoneNumber] = useState("")
  const [showGooglePhoneInput, setShowGooglePhoneInput] = useState(false)

  // Listen for auth state changes to detect Google login success
  useEffect(() => {
    const handleAuthStateChange = async ({ event }: { event: string }) => {
      if (event === 'SIGNED_IN') {
        // Check if this was a Google sign in
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.provider_token && session.provider_token.includes('google')) {
          // Show phone input for Google users
          setShowGooglePhoneInput(true)
        }
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Don't create a user if they don't exist
          shouldCreateUser: true,
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      setOtpSent(true)
      toast({
        title: "OTP sent",
        description: "Check your email for the verification code",
      })
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Update the handleVerifyOtp function to save phone number to Supabase
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error, data } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      })

      if (error) {
        setError(error.message)
        return
      }

      // Identify user in OpenReplay
      if (email) {
        identifyUser(email)
      }

      // Save phone number to the profiles table
      if (data.user && phone) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            phone_number: phone
          })
          .eq("id", data.user.id)

        if (updateError) {
          console.error("Error saving phone number:", updateError)
        }
      }

      // Fetch user profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("discovery_done, role_selected")
        .eq("id", data.user?.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
      }

      // Check for stored questionnaire data and save it if exists
      const storedData = localStorage.getItem("questionnaire_data")
      if (storedData && data.user) {
        try {
          const { career_stage, roadmap_role } = JSON.parse(storedData)

          // Save to Supabase
          await supabase
            .from("profiles")
            .update({
              career_stage,
              roadmap_role,
            })
            .eq("id", data.user.id)

          // Clear stored data
          localStorage.removeItem("questionnaire_data")
        } catch (err) {
          console.error("Error saving questionnaire data after login:", err)
        }
      }

      toast({
        title: "Success",
        description: "You have been logged in successfully",
      })

      // Close the modal
      onOpenChange(false)

      // Conditional redirect based on profile data
      if (profileData?.role_selected) {
        router.push("/dashboard")
      } else if (profileData?.discovery_done) {
        router.push("/roles")
      } else {
        router.push("/discovery")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGooglePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("User not found")
      }

      // Update the user's profile with the phone number
      const { error } = await supabase
        .from("profiles")
        .update({
          phone_number: googlePhoneNumber
        })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      // Fetch user profile data for redirection
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("discovery_done, role_selected")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
      }

      toast({
        title: "Phone number saved",
        description: "Your phone number has been saved successfully",
      })

      // Close the modal
      onOpenChange(false)

      // Redirect based on profile data
      if (profileData?.role_selected) {
        router.push("/dashboard")
      } else if (profileData?.discovery_done) {
        router.push("/roles")
      } else {
        router.push("/discovery")
      }
    } catch (err) {
      console.error("Error saving phone number:", err)
      setError("Failed to save phone number. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPhone("")
    setOtp("")
    setOtpSent(false)
    setError(null)
    setGooglePhoneNumber("")
    setShowGooglePhoneInput(false)
  }

  // If we need to collect phone after Google auth
  if (showGooglePhoneInput) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) resetForm()
          onOpenChange(open)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>One more step</DialogTitle>
            <DialogDescription>Please provide your phone number to complete your registration</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleGooglePhoneSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="googlePhone">Phone Number</Label>
              <Input
                id="googlePhone"
                type="tel"
                placeholder="+91 9876543210"
                value={googlePhoneNumber}
                onChange={(e) => setGooglePhoneNumber(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">We'll use this number for important communications</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetForm()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to ClassMent</DialogTitle>
          <DialogDescription>Access your personalized career roadmap and recommendations</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-4">
            {otpSent ? (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center mb-4">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Check your email</h3>
                  <p className="text-muted-foreground">
                    We've sent a verification code to <strong>{email}</strong>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Enter verification code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={isLoading}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOtpSent(false)
                      setOtp("")
                    }}
                    disabled={isLoading}
                  >
                    Use a different email
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Enter your phone number for communication purposes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Email Verification Code"
                  )}
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="google" className="mt-4">
            <div className="text-center py-2">
              <p className="mb-4">Continue with your Google account</p>
              
              <div className="space-y-2 mb-4">
                <Label htmlFor="googlePhoneField">Phone Number (Optional)</Label>
                <Input
                  id="googlePhoneField"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={googlePhoneNumber}
                  onChange={(e) => setGooglePhoneNumber(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">We'll use this for important communications</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm mb-4">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}