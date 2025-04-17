"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("item-1")

  const faqs = [
    {
      id: "item-1",
      question: "How does the online bootcamp work?",
      answer:
        "Our online bootcamp combines live interactive sessions, self-paced activities, and one-on-one virtual counseling. Students receive access to our digital platform where they complete psychometric assessments, participate in guided exercises, attend virtual workshops with industry professionals, and receive personalized feedback and guidance throughout the program.",
    },
    {
      id: "item-2",
      question: "What technology requirements are needed to participate?",
      answer:
        "Students need a computer or tablet with a stable internet connection, webcam, and microphone. Our platform works on all modern browsers, and we'll provide detailed setup instructions before the program begins. Technical support is available throughout the bootcamp to ensure a smooth experience.",
    },
    {
      id: "item-3",
      question: "What will my child gain from this program?",
      answer:
        "Participants gain self-awareness about their strengths and interests, exposure to diverse career paths, practical insights from industry professionals, and a personalized career roadmap. The program helps them develop confidence and clarity about their future direction, which typically leads to increased motivation in their academic pursuits.",
    },
    {
      id: "item-4",
      question: "How long is the online summer bootcamp?",
      answer:
        "The bootcamp runs for two weeks with a mix of scheduled live sessions and self-paced activities. Live sessions are typically 1-2 hours each day, with additional time for completing assessments and exercises. This flexible format allows students to engage deeply with the material while balancing other summer activities.",
    },
    {
      id: "item-5",
      question: "Will there be any follow-up after the bootcamp ends?",
      answer:
        "Yes, we provide three months of post-bootcamp support. This includes access to our online resource library, a follow-up counseling session, and opportunities to connect with mentors through our digital platform. We believe in supporting students throughout their journey, not just during the bootcamp.",
    },
    {
      id: "item-6",
      question: "How do you match students with career mentors?",
      answer:
        "We carefully match students with career mentors based on their assessment results, expressed interests, and career exploration goals. Our network includes professionals across various sectors who are passionate about guiding young people. Students can interact with these mentors through moderated virtual sessions, asking questions and gaining insights about different career paths.",
    },
    {
      id: "item-7",
      question: "Is the psychometric assessment scientifically validated?",
      answer:
        "Yes, our assessment is developed by a team of 25 PhD psychologists and is scientifically validated across diverse populations. It measures multiple dimensions including personality traits, aptitudes, interests, emotional intelligence, and work style preferences to create a comprehensive profile that informs personalized career recommendations.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our summer bootcamp program.</p>
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
                <AccordionTrigger className="text-left font-semibold py-4 hover:text-purple-600 transition-colors">
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
