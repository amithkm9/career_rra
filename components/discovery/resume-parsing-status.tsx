import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface ResumeParsedStatusProps {
  status: "idle" | "parsing" | "success" | "error"
  resumeData: any
  error: string | null
}

export function ResumeParsedStatus({ status, resumeData, error }: ResumeParsedStatusProps) {
  if (status === "idle") {
    return null
  }

  if (status === "parsing") {
    return (
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
        <div className="flex items-center">
          <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
          <p className="text-blue-700">Analyzing your resume...</p>
        </div>
        <p className="text-sm text-blue-600 mt-1">This may take a minute or two.</p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700">Resume analysis failed</p>
        </div>
        <p className="text-sm text-red-600 mt-1">
          {error ||
            "There was an error analyzing your resume. Your other information will still be used for recommendations."}
        </p>
      </div>
    )
  }

  if (status === "success" && resumeData) {
    // Show a summary of what was extracted
    const skillsCount = resumeData.skills?.length || 0
    const experiencesCount = resumeData.experiences?.length || 0
    const educationCount = resumeData.education?.length || 0

    return (
      <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md">
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700">Resume analyzed successfully!</p>
        </div>
        <p className="text-sm text-green-600 mt-1">
          We extracted {skillsCount} skills, {experiencesCount} work experiences, and {educationCount} education items.
        </p>
        {skillsCount > 0 && (
          <div className="mt-2">
            <p className="text-xs text-green-700 font-medium">Skills identified:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {resumeData.skills.slice(0, 5).map((skill: string, index: number) => (
                <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {resumeData.skills.length > 5 && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  +{resumeData.skills.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
