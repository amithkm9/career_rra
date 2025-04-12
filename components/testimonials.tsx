"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Uthkarsh",
    role: "Cybersecurity Engineer",
    company: "MIT",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I always knew I was good with tech, but I had no idea how to turn it into a career with the current level of competition. ClassMent's AI pointed me towards cybersecurity, and the resources provided gave me hands-on experience. If you're feeling lost, this is the best place to start.",
    rating: 5,
  },
  {
    id: 2,
    name: "Akshat",
    role: "CS & Communications",
    company: "Volunteer Services Organization",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "ClassMent's AI bot was able to encompass me as a person and take into consideration all my academic and logical capabilities to help me navigate my future options and prospects. Would definitely recommend to anyone navigating their own career choices.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anamika",
    role: "Social Media Manager",
    company: "HeyCoach",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I was stuck in a job I didn't enjoy, unsure of my next move. ClassMent's AI bot recommended social media marketing based on my interests. I upskilled, joined an externship, and landed a full-time role at a top startup—all within months! This platform is a game-changer for anyone feeling lost.",
    rating: 5,
  },
  {
    id: 4,
    name: "Prithvi",
    role: "Opthalmologist",
    company: "Aster Hospitals",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I had approached Classment when I had reached a point in my career as a clinician where I felt like I needed to explore other vocations. This is a great platform for non just students who are starting out their careers but also professionals like myself who have gotten into their respective fields and exploring other options.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const visibleTestimonials = testimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Users Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our users have to say about working with us.
            </p>
          </div>
        </div>
        <div className="relative mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="border-0 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm italic">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0 && totalPages === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex === totalPages - 1}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
