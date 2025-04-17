"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SummerBootcampFAQ() {
  const [openItem, setOpenItem] = useState<string | null>("item-1")

  const faqs = [
    {
      id: "item-1",
      question: "What makes this bootcamp different from other summer programs?",
      answer:
        "Our bootcamp is uniquely focused on career discovery and personal development, not just academic enrichment. We combine scientifically validated assessments, mentorship from real industry professionals, and hands-on skill-building activities to help students discover career paths that align with their natural strengths and interests. Unlike generic summer programs, we provide each student with a personalized career roadmap they can use to guide their high school journey and beyond.",
    },
    {
      id: "item-2",
      question: "How will this program benefit my child's future?",
      answer:
        "This program helps students gain clarity about their strengths and potential career paths early, which can guide their academic choices, extracurricular activities, and college applications. Students develop essential skills like communication, problem-solving, and self-awareness that benefit them regardless of their eventual career path. They'll also build connections with mentors and peers that can support their journey. Many parents report that their children return with increased confidence, motivation, and purpose in their studies.",
    },
    {
      id: "item-3",
      question: "Is this program only for students who already know what they want to do?",
      answer:
        "Not at all! This program is especially valuable for students who are unsure about their future path. Our structured discovery process helps students explore diverse career options they may never have considered and identify paths that align with their natural strengths and interests. Whether your child has a clear direction or is completely undecided, they'll gain valuable insights about themselves and potential career paths.",
    },
    {
      id: "item-4",
      question: "What safety and supervision measures are in place?",
      answer:
        "Student safety is our top priority. We maintain a low student-to-staff ratio (10:1) with trained educators and counselors present at all times. Our facility is secure with controlled access, and all staff undergo thorough background checks. We have clear protocols for emergencies, and parents receive daily updates. For field trips, we use professional transportation services and ensure additional supervision.",
    },
    {
      id: "item-5",
      question: "What if my child can't attend all days of the program?",
      answer:
        "While we recommend attending the full program for the most comprehensive experience, we understand that summer schedules can be complicated. Please contact us about specific dates your child might miss, and we can discuss whether partial attendance would still provide value and arrange for them to make up key activities. For absences of more than two days, we may recommend deferring to a future session.",
    },
    {
      id: "item-6",
      question: "Is there a virtual option available?",
      answer:
        "Yes, we offer a parallel virtual program for students unable to attend in person. The virtual program includes live interactive sessions, digital assessments, virtual mentoring, and collaborative online projects. While the in-person experience offers additional benefits, our virtual program is designed to provide a similarly impactful experience. Virtual participants receive the same materials and career roadmap as in-person students.",
    },
    {
      id: "item-7",
      question: "What is your refund policy?",
      answer:
        "We offer a full refund up to 30 days before the program start date. Within 30 days, we provide a 50% refund or a full credit toward a future program. No refunds are available within 7 days of the program start, but we can transfer the registration to another student or provide credit for a future program. If we cancel the program for any reason, you'll receive a full refund.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700">Find answers to common questions about our summer bootcamp program.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            value={openItem || undefined}
            onValueChange={(value) => setOpenItem(value)}
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-semibold py-4 hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-700">
            Have more questions? Contact us at{" "}
            <a href="mailto:summerbootcamp@classment.com" className="text-primary hover:underline">
              summerbootcamp@classment.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
