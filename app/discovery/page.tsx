import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { DiscoveryForm } from "@/components/discovery/discovery-form"

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Career Discovery</h1>
          <p className="text-lg mb-8">
            Tell us about your interests, skills, and values so we can help you discover the perfect career path.
          </p>

          <DiscoveryForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
