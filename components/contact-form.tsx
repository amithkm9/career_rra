"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ContactForm() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get In Touch</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Whether you have a question, need assistance, or want to join us, our team is here to help.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3 mt-12">
          <Card className="border-0 shadow-md animate-fade-in animate-delay-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">
                <a href="tel:+918904347516" className="hover:text-primary transition-colors">
                  +91 89043 47516
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">Monday - Friday, 9am - 6pm IST</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md animate-fade-in animate-delay-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">
                <a href="mailto:teamclassment@gmail.com" className="hover:text-primary transition-colors">
                  teamclassment@gmail.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">We'll respond to your message within 24 hours</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md animate-fade-in animate-delay-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Proworks, Indiranagar, Bengaluru North</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
