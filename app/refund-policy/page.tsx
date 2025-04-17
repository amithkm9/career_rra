import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              At ClassMent, we strive to provide high-quality services that meet your expectations. However, we
              understand that there may be instances where our services may not align with your needs.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Cancellation and Refund Policy</h2>
            <p>
              In case of dissatisfaction with the product, you have the liberty to cancel the assessment and request a
              refund from us. Our Policy for the cancellation and refund is as follows:
            </p>

            <ul className="list-disc pl-6 my-4">
              <li>
                If you decide to not take the test, we will refund you 100% of the price before the coupon code is
                assigned.
              </li>
              <li>
                At any point within this time frame, write to{" "}
                <a href="mailto:teamclassment@gmail.com" className="text-primary hover:underline">
                  teamclassment@gmail.com
                </a>{" "}
                to claim a refund.
              </li>
              <li>
                Once processed, the money will be returned to your original payment mode within 3-5 business working
                days.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How to Request a Refund</h2>
            <p>
              To request a refund, please send an email to{" "}
              <a href="mailto:teamclassment@gmail.com" className="text-primary hover:underline">
                teamclassment@gmail.com
              </a>{" "}
              with the following information:
            </p>

            <ul className="list-disc pl-6 my-4">
              <li>Your full name</li>
              <li>Date of purchase</li>
              <li>Order reference number (if available)</li>
              <li>Reason for requesting a refund</li>
            </ul>

            <p>
              Our team will review your request and respond within 2 business days. If your refund request is approved,
              we will process the refund to your original payment method.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Refund Policy, please contact us at{" "}
              <a href="mailto:teamclassment@gmail.com" className="text-primary hover:underline">
                teamclassment@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
