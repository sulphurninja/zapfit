'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    title: 'The Future of Fitness Management',
    excerpt: 'How AI and automation are transforming how gyms operate, engage members, and scale their businesses.',
    category: 'Industry Insights',
    date: 'November 10, 2025',
    readTime: '5 min read',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: '10 Ways to Boost Member Retention',
    excerpt: 'Proven strategies to keep your members engaged, motivated, and coming back month after month.',
    category: 'Growth Tips',
    date: 'November 5, 2025',
    readTime: '7 min read',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Automating Your Gym Operations',
    excerpt: 'A complete guide to eliminating manual tasks and focusing on what truly matters — your members.',
    category: 'Automation',
    date: 'November 1, 2025',
    readTime: '6 min read',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
              >
                Insights & Updates
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl text-muted-foreground"
              >
                Thoughts on fitness management, growth strategies, and the future of the industry.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href="#" className="block h-full">
                    <div className="relative p-8 rounded-2xl sm:rounded-3xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                      {/* Icon */}
                      <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${post.gradient} mb-6 w-fit`}>
                        <post.icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Category */}
                      <div className="text-sm text-primary font-medium mb-3">
                        {post.category}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-primary font-medium mt-4 group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>

                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-linear-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl -z-10`} />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 sm:py-32 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground">
                Get the latest insights, tips, and product updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

