"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { InterestsSection } from "./interests-section"
import { SkillsSection } from "./skills-section"
import { ValuesSection } from "./values-section"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { trackEvent } from "@/lib/openreplay"

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
  const router = useRouter()
  const { user } = useAuth()

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
        description: "Your resume has been uploaded successfully",
      })

      // Track CV upload in OpenReplay
      trackEvent("cv_uploaded", {
        fileType: file.type,
        fileSize: file.size,
      })

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
        // Create a signed URL that expires in 7 days (604800 seconds)
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

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Interests Section */}
      <InterestsSection
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
        interestsInfo={interestsInfo}
        setInterestsInfo={setInterestsInfo}
      />

      {/* Skills Section */}
      <SkillsSection
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
        skillsInfo={skillsInfo}
        setSkillsInfo={setSkillsInfo}
      />

      {/* Values Section */}
      <ValuesSection
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        valuesInfo={valuesInfo}
        setValuesInfo={setValuesInfo}
      />

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
              <p className="text-sm text-gray-500 mt-2">{selectedFile?.name}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedFile(null)
                  setUploadStatus("idle")
                  setResumePath(null)
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
