import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { ServicesContent } from "@/components/services/services-content"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <ServicesContent />
      </main>
      <Footer />
    </div>
  )
}
