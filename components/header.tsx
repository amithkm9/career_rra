"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { CareerQuestionnaire } from "./career-questionnaire"
import { LoginModal } from "./login-modal"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

// Update the Header component to include login modal and auth state
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "why-classment", "how it works", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100 // Add offset for header

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Home", href: "#home", onClick: () => scrollToSection("home") },
    { name: "Why ClassMent", href: "#why-classment", onClick: () => scrollToSection("why-classment") },
    { name: "How It Works", href: "#how it works", onClick: () => scrollToSection("how it works") },
    { name: "Testimonials", href: "#testimonials", onClick: () => scrollToSection("testimonials") },
    { name: "Contact", href: "#contact", onClick: () => scrollToSection("contact") },
  ]

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleProfileClick = () => {
    // Redirect to dashboard if logged in
    router.push("/dashboard")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-without-name.png" alt="ClassMent Logo" width={40} height={40} className="h-8 w-auto" />
          <span className="font-bold text-xl">ClassMent</span>
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <nav className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" onClick={handleProfileClick} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              My Account
            </Button>
            <Button variant="ghost" onClick={signOut}>
              Logout
            </Button>
          </div>
        ) : (
          <Button className="hidden md:inline-flex" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`text-sm font-medium transition-colors px-3 py-2 rounded-md text-left ${
                      activeSection === item.href.replace("#", "")
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors px-3 py-2 rounded-md text-left hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {user ? (
              <>
                <Button
                  onClick={handleProfileClick}
                  className="w-full flex items-center justify-center gap-2"
                  variant="outline"
                >
                  <User className="h-4 w-4" />
                  My Account
                </Button>
                <Button onClick={signOut} className="w-full" variant="ghost">
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsLoginModalOpen(true)
                }}
                className="w-full"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      )}

      <CareerQuestionnaire isOpen={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </header>
  )
}
