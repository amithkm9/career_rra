import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RolesClient } from "@/components/roles/roles-client"

export default function RolesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <RolesClient />
      </main>
      <Footer />
    </div>
  )
}
