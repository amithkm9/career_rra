import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { ScrollToTop } from "@/components/scroll-to-top"
import { WhyClassment } from "@/components/why-classment"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyClassment />
        <HowItWorks />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
