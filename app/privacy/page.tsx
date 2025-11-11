'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, including gym member data, payment information, and usage analytics. All data is encrypted and stored securely using industry-standard protocols.'
    },
    {
      title: 'How We Use Your Information',
      content: 'Your information is used to provide and improve our services, process transactions, send important updates, and ensure platform security. We never sell your data to third parties.'
    },
    {
      title: 'Data Security',
      content: 'We implement 256-bit end-to-end encryption, automated backups, role-based access control, and regular security audits. Your data is stored in secure, certified data centers.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your data at any time. You can export your data or request account deletion through your dashboard settings.'
    },
    {
      title: 'Cookies and Tracking',
      content: 'We use essential cookies for authentication and optional cookies for analytics. You can control cookie preferences in your browser settings.'
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this policy periodically. We will notify you of significant changes via email and platform notifications.'
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
                <Shield className="h-10 w-10 text-primary" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-semibold tracking-tight"
              >
                Privacy Policy
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                Your privacy matters. Here's how we protect your data.
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
                Questions about privacy?
              </h2>
              <p className="text-lg text-muted-foreground">
                Contact our privacy team at privacy@gymz.online
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

