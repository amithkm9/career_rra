import { Loader2 } from "lucide-react"

interface LoadingPageProps {
  title: string
  message: string
}

export function LoadingPage({ title, message }: LoadingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
      <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  )
}
