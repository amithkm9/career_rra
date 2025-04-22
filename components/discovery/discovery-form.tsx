"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { InterestsSection } from "./interests-section"
import { SkillsSection } from "./skills-section"
import { ValuesSection } from "./values-section"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { trackEvent } from "@/lib/openreplay"
import { ResumeParsedStatus } from "./resume-parsing-status"

// Define the structure of our discovery data
interface DiscoveryData {
  interests: {
    selected: string[]
    additional_info: string
  }
  skills: {
    selected: string[]
    additional_info: string
  }
  values: {
    selected: string[]
    additional_info: string
  }
  timestamp: string
}

export function DiscoveryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()
  const { user } = useAuth()

  // Collapsible state
  const [sections, setSections] = useState({
    interests: true,
    skills: false,
    values: false,
  })

  // Selected items state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  // Additional information state
  const [interestsInfo, setInterestsInfo] = useState("")
  const [skillsInfo, setSkillsInfo] = useState("")
  const [valuesInfo, setValuesInfo] = useState("")

  // Resume path after upload (for internal reference)
  const [resumePath, setResumePath] = useState<string | null>(null)

  const [resumeParsingStatus, setResumeParsingStatus] = useState<"idle" | "parsing" | "success" | "error">("idle")
  const [parsedResumeData, setParsedResumeData] = useState<any>(null)
  const [resumeParsingError, setResumeParsingError] = useState<string | null>(null)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoadingData(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("discovery_data, resume_link, resume_parsed, resume_structured_data")
          .eq("id", user.id)
          .single()

        if (error) {
          throw error
        }

        if (data && data.discovery_data) {
          const discoveryData = data.discovery_data as DiscoveryData

          // Set selected items
          setSelectedInterests(discoveryData.interests.selected || [])
          setSelectedSkills(discoveryData.skills.selected || [])
          setSelectedValues(discoveryData.values.selected || [])

          // Set additional info
          setInterestsInfo(discoveryData.interests.additional_info || "")
          setSkillsInfo(discoveryData.skills.additional_info || "")
          setValuesInfo(discoveryData.values.additional_info || "")
        }

        if (data && data.resume_link) {
          // The resume has already been uploaded
          setUploadStatus("success")

          // If resume is parsed, show the parsed data
          if (data.resume_parsed && data.resume_structured_data) {
            setResumeParsingStatus("success")
            setParsedResumeData(data.resume_structured_data)
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to load your profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoadingData(false)
      }
    }

    fetchUserData()
  }, [user])

  const toggleSection = (section: "interests" | "skills" | "values") => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      // Check file type
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF or DOCX file",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
      setUploadStatus("idle")
      setUploadError(null)

      // Automatically start the upload process
      uploadFile(file)
    }
  }

  // Add this function to implement retry logic for resume parsing
  const handleParseResume = async (filePath: string, retryCount = 0) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to parse your resume",
        variant: "destructive",
      })
      return
    }

    setResumeParsingStatus("parsing")
    setResumeParsingError(null)

    try {
      // Get a signed URL for the uploaded resume
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("resumes")
        .createSignedUrl(filePath, 3600) // 1 hour expiry

      if (signedUrlError) {
        console.error("Error creating signed URL:", signedUrlError)
        throw new Error(`Failed to create signed URL: ${signedUrlError.message}`)
      }

      const resumeUrl = signedUrlData.signedUrl

      // Call the resume parsing API
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          resumeUrl,
        }),
      })

      // First check if the response is ok
      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `${response.status}: ${response.statusText}`

        try {
          // Try to parse the response as JSON
          const errorData = await response.json()
          if (errorData && errorData.error) {
            errorMessage = `${errorData.error}: ${errorData.details || ""}`
          }
        } catch (jsonError) {
          // If we can't parse JSON, try to get text
          try {
            const textError = await response.text()
            if (textError) {
              errorMessage = textError.substring(0, 100) // Limit length
            }
          } catch (textError) {
            // If we can't get text either, use the status
            console.error("Could not parse error response as text:", textError)
          }
        }

        // If this is a server error and we haven't retried too many times, retry
        if (response.status >= 500 && retryCount < 2) {
          console.log(`Retrying resume parsing (attempt ${retryCount + 1})...`)
          // Wait a bit before retrying
          await new Promise((resolve) => setTimeout(resolve, 2000))
          return handleParseResume(filePath, retryCount + 1)
        }

        throw new Error(errorMessage)
      }

      // Now safely parse the JSON response
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError)
        throw new Error("Invalid response format from server")
      }

      if (!data || !data.success) {
        throw new Error(data?.error || "Unknown error parsing resume")
      }

      setParsedResumeData(data.resumeData)
      setResumeParsingStatus("success")

      toast({
        title: "Resume parsed successfully",
        description:
          "Your resume has been analyzed and the information will be used to improve your career recommendations.",
      })

      // Track resume parsing in OpenReplay - wrap in try/catch to prevent errors
      try {
        trackEvent("resume_parsed", {
          success: true,
        })
      } catch (trackError) {
        console.error("Error tracking event:", trackError)
      }

      return data.resumeData
    } catch (error) {
      console.error("Error parsing resume:", error)

      setResumeParsingStatus("error")
      const errorMessage = error instanceof Error ? error.message : String(error)
      setResumeParsingError(errorMessage)

      toast({
        title: "Resume parsing failed",
        description:
          "There was an error analyzing your resume. Your other information will still be used for recommendations.",
        variant: "destructive",
      })

      // Track resume parsing error in OpenReplay - wrap in try/catch to prevent errors
      try {
        trackEvent("resume_parsed", {
          success: false,
          error: errorMessage,
        })
      } catch (trackError) {
        console.error("Error tracking event:", trackError)
      }

      return null
    }
  }

  // Update the uploadFile function to include resume parsing
  const uploadFile = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload your resume",
        variant: "destructive",
      })
      return null
    }

    setUploadStatus("uploading")
    setUploadError(null)

    try {
      // Generate a unique filename to avoid collisions
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage.from("resumes").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        throw error
      }

      // Store the file path for later use
      setResumePath(filePath)
      setUploadStatus("success")

      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully and is being analyzed...",
      })

      // Track CV upload in OpenReplay
      try {
        trackEvent("cv_uploaded", {
          fileType: file.type,
          fileSize: file.size,
        })
      } catch (trackError) {
        console.error("Error tracking CV upload:", trackError)
      }

      // Parse the resume after upload
      if (fileExt === "pdf" || fileExt === "docx") {
        handleParseResume(filePath)
      }

      return filePath
    } catch (error: any) {
      // Check if error is because the folder doesn't exist
      if (error.message && error.message.includes("The resource was not found")) {
        try {
          // Create the user folder by uploading a placeholder file and then deleting it
          const placeholderPath = `${user.id}/.placeholder`
          const placeholderFile = new Blob([""], { type: "text/plain" })

          await supabase.storage.from("resumes").upload(placeholderPath, placeholderFile)

          // Delete the placeholder file
          await supabase.storage.from("resumes").remove([placeholderPath])

          // Try uploading the actual file again
          return uploadFile(file)
        } catch (folderError) {
          console.error("Error creating folder:", folderError)
          throw folderError
        }
      }

      const errorMessage = error instanceof Error ? error.message : "Failed to upload resume"
      setUploadStatus("error")
      setUploadError(errorMessage)

      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      })

      return null
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) return null
    return uploadFile(selectedFile)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that no more than 5 items are selected in each category
    if (selectedInterests.length > 5 || selectedSkills.length > 5 || selectedValues.length > 5) {
      toast({
        title: "Too many selections",
        description: "Please select no more than 5 options in each category",
        variant: "destructive",
      })
      return
    }

    // Validate form
    if (selectedInterests.length === 0 || selectedSkills.length === 0 || selectedValues.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select at least one option in each category",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your discovery information",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // If a file is selected but not uploaded yet, upload it first
      let finalResumePath = resumePath
      if (selectedFile && uploadStatus !== "success") {
        finalResumePath = await handleFileUpload()
      }

      // Create the discovery data JSON object
      const discoveryData: DiscoveryData = {
        interests: {
          selected: selectedInterests,
          additional_info: interestsInfo,
        },
        skills: {
          selected: selectedSkills,
          additional_info: skillsInfo,
        },
        values: {
          selected: selectedValues,
          additional_info: valuesInfo,
        },
        timestamp: new Date().toISOString(),
      }

      // Create an update object for the profile
      const profileUpdate: any = {
        discovery_data: discoveryData,
        discovery_done: true,
      }

      // If we have a resume path, get a signed URL and add it to the profile update
      if (finalResumePath) {
        // Create a signed URL that expires in 1 year (31536000 seconds)
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from("resumes")
          .createSignedUrl(finalResumePath, 31536000)

        if (signedUrlError) {
          console.error("Error creating signed URL:", signedUrlError)
          throw signedUrlError
        }

        // Add the signed URL to the profile update
        profileUpdate.resume_link = signedUrlData.signedUrl
      }

      // Save discovery data and resume link to Supabase
      const { error } = await supabase.from("profiles").update(profileUpdate).eq("id", user.id)

      if (error) {
        throw error
      }

      toast({
        title: "Discovery completed",
        description: "Your information has been saved successfully",
      })

      // Redirect to roles page
      router.push("/roles")
    } catch (error) {
      console.error("Error saving discovery data:", error)
      toast({
        title: "Error",
        description: "There was an error saving your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your profile data...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Interests Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("interests")}>
          <h2 className="text-2xl font-semibold">Interests</h2>
          <Button variant="ghost" size="sm" type="button">
            {sections.interests ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </Button>
        </div>

        {sections.interests && (
          <InterestsSection
            selectedInterests={selectedInterests}
            setSelectedInterests={setSelectedInterests}
            interestsInfo={interestsInfo}
            setInterestsInfo={setInterestsInfo}
            maxSelections={5}
          />
        )}
      </div>

      {/* Skills Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("skills")}>
          <h2 className="text-2xl font-semibold">Skills</h2>
          <Button variant="ghost" size="sm" type="button">
            {sections.skills ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </Button>
        </div>

        {sections.skills && (
          <SkillsSection
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            skillsInfo={skillsInfo}
            setSkillsInfo={setSkillsInfo}
            maxSelections={5}
          />
        )}
      </div>

      {/* Values Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("values")}>
          <h2 className="text-2xl font-semibold">Values</h2>
          <Button variant="ghost" size="sm" type="button">
            {sections.values ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </Button>
        </div>

        {sections.values && (
          <ValuesSection
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            valuesInfo={valuesInfo}
            setValuesInfo={setValuesInfo}
            maxSelections={5}
          />
        )}
      </div>

      {/* CV Upload Section */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Upload Your CV (Optional)</h2>
        <p className="text-muted-foreground mb-6">
          Upload your CV to help us better understand your background and experience.
        </p>

        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50"
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              const file = e.dataTransfer.files[0]

              // Check file size (5MB limit)
              if (file.size > 5 * 1024 * 1024) {
                toast({
                  title: "File too large",
                  description: "Please select a file smaller than 5MB",
                  variant: "destructive",
                })
                return
              }

              // Check file type
              const validTypes = [
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]
              if (!validTypes.includes(file.type)) {
                toast({
                  title: "Invalid file type",
                  description: "Please select a PDF or DOCX file",
                  variant: "destructive",
                })
                return
              }

              setSelectedFile(file)
              setUploadStatus("idle")
              setUploadError(null)

              // Automatically start the upload process
              uploadFile(file)
            }
          }}
        >
          {uploadStatus === "success" ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-10 w-10 text-green-500 mb-4" />
              <p className="text-green-600 font-medium">Resume uploaded successfully!</p>
              <p className="text-sm text-gray-500 mt-2">{selectedFile?.name || "Your resume is saved"}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedFile(null)
                  setUploadStatus("idle")
                  setResumePath(null)
                  setResumeParsingStatus("idle")
                  setParsedResumeData(null)
                  setResumeParsingError(null)
                }}
              >
                Upload a different file
              </Button>
            </div>
          ) : uploadStatus === "error" ? (
            <div className="flex flex-col items-center">
              <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">Upload failed</p>
              <p className="text-sm text-gray-500 mt-2">{uploadError}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setUploadStatus("idle")
                  setUploadError(null)
                }}
              >
                Try again
              </Button>
            </div>
          ) : uploadStatus === "uploading" ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-primary font-medium">Uploading...</p>
              <p className="text-sm text-gray-500 mt-2">{selectedFile?.name}</p>
            </div>
          ) : selectedFile ? (
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2">Selected file: {selectedFile.name}</p>
              {uploadStatus === "idle" && (
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    onClick={() => uploadFile(selectedFile)}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Upload File
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setSelectedFile(null)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop your CV here, or click to browse</p>
              <p className="text-xs text-gray-500 mb-4">Supports PDF, DOCX (Max 5MB)</p>

              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("cv-upload")?.click()}>
                Browse Files
              </Button>
            </>
          )}
        </div>
        <ResumeParsedStatus
          status={resumeParsingStatus}
          resumeData={parsedResumeData}
          error={resumeParsingError || uploadError}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Complete Discovery"
          )}
        </Button>
      </div>
    </form>
  )
}
