"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      content:
        "The online summer bootcamp was transformative for my daughter. She discovered strengths she didn't know she had and became excited about career possibilities she'd never considered. The virtual sessions were engaging and the mentors took a genuine interest in each student. She's now approaching her studies with renewed purpose and direction.",
      name: "Priya Sharma",
      role: "Parent of Ananya, 16",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      id: 2,
      content:
        "My son was reluctant to join an online program at first, but by day three, he was eagerly logging in each day. The interactive activities and virtual sessions with professionals made all the difference. The career assessment was eye-opening for both of us, and the personalized roadmap gives him clear next steps. This program was worth every rupee.",
      name: "Rajesh Mehta",
      role: "Parent of Arjun, 15",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      id: 3,
      content:
        "As parents, we were impressed by how well-organized the online program was. Daily updates kept us informed, and we could see our daughter's growth throughout the bootcamp. She connected with a mentor in her field of interest who continues to advise her virtually. The digital resources provided will be valuable for years to come.",
      name: "Meera and Vikram Patel",
      role: "Parents of Riya, 17",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Parents Say</h2>
          <p className="text-lg text-gray-600">
            Hear from parents whose children have participated in our career discovery programs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="text-lg text-gray-700 italic mb-8">"{testimonials[currentIndex].content}"</p>

                <div className="flex flex-col items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mb-3">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full h-10 w-10 bg-white shadow-sm hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      index === currentIndex ? "bg-purple-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full h-10 w-10 bg-white shadow-sm hover:bg-gray-100"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-700">
            Have questions about our program? Contact us at{" "}
            <a href="mailto:teamclassment@gmail.com" className="text-purple-600 hover:underline">
              teamclassment@gmail.com
            </a>{" "}
            or call us at{" "}
            <a href="tel:+919353634945" className="text-purple-600 hover:underline">
              +91 9353634945
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
