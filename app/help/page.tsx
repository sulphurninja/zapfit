'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Book, Video, MessageCircle, Search, FileText, Settings, Users, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const categories = [
  {
    icon: Settings,
    title: 'Getting Started',
    description: 'Setup your gym, add members, and start using GymZ',
    articles: 12
  },
  {
    icon: Users,
    title: 'Member Management',
    description: 'Adding, tracking, and managing member information',
    articles: 18
  },
  {
    icon: CreditCard,
    title: 'Billing & Payments',
    description: 'Process payments, invoices, and manage subscriptions',
    articles: 15
  },
  {
    icon: FileText,
    title: 'Reports & Analytics',
    description: 'Generate reports and understand your gym metrics',
    articles: 10
  }
]

const resources = [
  {
    icon: Book,
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    link: '#'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides to master GymZ',
    link: '#'
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with other gym owners and share tips',
    link: '#'
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
              >
                How can we help?
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative max-w-2xl mx-auto"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-12 h-14 rounded-full text-base"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl font-semibold mb-12 text-center"
              >
                Browse by Category
              </motion.h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href="#" className="block group">
                      <div className="p-8 rounded-2xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg">
                        <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {category.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {category.articles} articles
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 sm:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl font-semibold mb-12 text-center"
              >
                More Resources
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={resource.link} className="block group">
                      <div className="p-6 rounded-2xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg text-center h-full">
                        <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
                          <resource.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Still need help?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our support team is here to assist you. Reach out anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                    Contact Support
                  </button>
                </Link>
                <Link href="#chat">
                  <button className="px-8 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors">
                    Start Live Chat
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

