"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { CareerQuestionnaire } from "./career-questionnaire"
import { LoginModal } from "./login-modal"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeNavItem, setActiveNavItem] = useState("")
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Set the active nav item based on the current page
  useEffect(() => {
    if (pathname === "/about") {
      setActiveNavItem("About Us")
    } else if (pathname === "/" || pathname === "") {
      setActiveNavItem("Home")
    } else if (pathname === "/services") {
      setActiveNavItem("Services")
    } else if (pathname === "/summer-bootcamp") {
      setActiveNavItem("Students")
    } else if (pathname.startsWith("/blog")) {
      setActiveNavItem("Blog")
    }
  }, [pathname])

  // Track scroll position and update active section (only for the floating nav)
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

  const scrollToSection = (sectionId: string, navItemName: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update the active nav item when clicked
      setActiveNavItem(navItemName)
    }
    setIsMenuOpen(false)
  }

  // Updated navigation items with summer-bootcamp link
  const isAboutPage = pathname === "/about"

  const navItems = [
    {
      name: "Home",
      href: isAboutPage ? "/" : "#home",
      onClick: isAboutPage ? undefined : () => scrollToSection("home", "Home"),
    },
    { name: "About Us", href: isAboutPage ? "#" : "/about", onClick: undefined },
    {
      name: "Students",
      href: "/summer-bootcamp",
      onClick: undefined,
    },
    {
      name: "Blog", // Add this item
      href: "/blog",
      onClick: undefined,
    },
    {
      name: "Services",
      href: "/services",
      onClick: undefined,
    },
  ]

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleProfileClick = () => {
    // Redirect to dashboard if logged in
    router.push("/dashboard")
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-gray-100 backdrop-blur supports-[backdrop-filter]:bg-gray-100/95">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-without-name.png" alt="ClassMent Logo" width={40} height={40} className="h-8 w-auto" />
            <span className="text-xl font-bold">ClassMent</span>
          </Link>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => {
              const isActive = activeNavItem === item.name
              const linkClass = `px-5 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive ? "bg-[#7c3aed] text-white" : "text-gray-800 hover:bg-gray-200"
              }`

              if (item.name === "About Us" && !isAboutPage) {
                return (
                  <Link key={item.name} href="/about" className={linkClass} onClick={() => setActiveNavItem(item.name)}>
                    {item.name}
                  </Link>
                )
              } else if (item.onClick) {
                return (
                  <button key={item.name} onClick={item.onClick} className={linkClass}>
                    {item.name}
                  </button>
                )
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={linkClass}
                    onClick={() => item.name !== "About Us" && setActiveNavItem(item.name)}
                  >
                    {item.name}
                  </Link>
                )
              }
            })}
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
              {navItems.map((item) => {
                const isActive = activeNavItem === item.name
                const linkClass = `text-sm font-medium transition-colors px-3 py-2 rounded-md text-left ${
                  isActive ? "bg-[#7c3aed] text-white" : "text-gray-800 hover:bg-gray-200"
                }`

                if (item.name === "About Us" && !isAboutPage) {
                  return (
                    <Link
                      key={item.name}
                      href="/about"
                      className={linkClass}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setActiveNavItem(item.name)
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                } else if (item.onClick) {
                  return (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        setIsMenuOpen(false)
                        item.onClick && item.onClick(e)
                      }}
                      className={linkClass}
                    >
                      {item.name}
                    </button>
                  )
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={linkClass}
                      onClick={() => {
                        setIsMenuOpen(false)
                        item.name !== "About Us" && setActiveNavItem(item.name)
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                }
              })}

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
      </header>

      {/* Add the section navigation bar only on home page */}
      {pathname === "/" && <SectionNav />}

      <CareerQuestionnaire isOpen={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen} />
      <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  )
}

// Update the SectionNav component to only show on the home page
function SectionNav() {
  const pathname = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY)
  }, [])

  // Track scroll position and update active section
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    const sections = ["home", "why-classment", "how it works", "testimonials", "contact"]

    // Show the navigation after scrolling down a bit
    setVisible(scrollPosition > 300)

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const top = element.offsetTop
        const height = element.offsetHeight

        if (scrollPosition + 100 >= top && scrollPosition + 100 < top + height) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [scrollPosition])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Height of header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      setActiveSection(sectionId)
    }
  }

  // Updated navigation items with shorter names
  const navItems = [
    { name: "Home", href: "#home", onClick: () => scrollToSection("home") },
    { name: "Why Us", href: "#why-classment", onClick: () => scrollToSection("why-classment") },
    { name: "Process", href: "#how it works", onClick: () => scrollToSection("how it works") },
    { name: "Reviews", href: "#testimonials", onClick: () => scrollToSection("testimonials") },
    { name: "Contact", href: "#contact", onClick: () => scrollToSection("contact") },
  ]

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
        visible ? "top-20 opacity-100" : "top-16 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gray-100 rounded-full px-3 py-1.5 inline-flex items-center shadow-sm">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
              activeSection === item.href.replace("#", "")
                ? "bg-gray-800 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}