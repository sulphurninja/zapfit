'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using GymZ, you accept and agree to be bound by these terms and conditions. If you do not agree, please do not use our service.'
    },
    {
      title: 'Service Description',
      content: 'GymZ provides cloud-based gym management software including member management, billing, attendance tracking, and analytics. We reserve the right to modify or discontinue features with notice.'
    },
    {
      title: 'User Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account, ensuring data accuracy, complying with applicable laws, and using the service in good faith.'
    },
    {
      title: 'Payment Terms',
      content: 'Subscription fees are billed monthly or annually as selected. Payments are non-refundable except as required by law. We reserve the right to modify pricing with 30 days notice.'
    },
    {
      title: 'Data Ownership',
      content: 'You retain full ownership of all data entered into GymZ. We license the right to process and store this data to provide our services. You can export or delete your data at any time.'
    },
    {
      title: 'Limitation of Liability',
      content: 'GymZ is provided "as is" without warranties. We are not liable for indirect damages, data loss, or business interruption beyond the amount paid for the service.'
    },
    {
      title: 'Termination',
      content: 'You may cancel your subscription at any time. We may suspend or terminate accounts that violate these terms or engage in fraudulent activity.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
              >
                <FileText className="h-10 w-10 text-primary" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-semibold tracking-tight"
              >
                Terms of Service
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                Clear, straightforward terms for using GymZ.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm text-muted-foreground"
              >
                Last updated: November 11, 2025
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl sm:text-3xl font-semibold">
                    {section.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 sm:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Questions about our terms?
              </h2>
              <p className="text-lg text-muted-foreground">
                Contact our legal team at legal@gymz.online
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

