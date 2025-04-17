import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoadmapClient } from "@/components/roadmap/roadmap-client"

export default function RoadmapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <RoadmapClient />
      </main>
      <Footer />
    </div>
  )
}
