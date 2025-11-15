'use client'

import { TopBar } from '@/components/landing/top-bar'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Zap, Heart, Target, Users, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Heart,
    title: 'Obsessed with Simplicity',
    description: 'We remove everything that doesn\'t matter. What remains is pure, elegant, and powerful.'
  },
  {
    icon: Target,
    title: 'Precision Engineering',
    description: 'Every pixel, every interaction, every line of code — crafted with meticulous attention to detail.'
  },
  {
    icon: Users,
    title: 'Gym Owner First',
    description: 'Built by understanding real problems. Perfected by listening to real feedback.'
  },
  {
    icon: TrendingUp,
    title: 'Continuous Innovation',
    description: 'We don\'t rest. We evolve, improve, and push boundaries every single day.'
  }
]

const stats = [
  { label: 'Established', value: '2016' },
  { label: 'Gyms Powered', value: '320+' },
  { label: 'Cities', value: '50+' },
  { label: 'Satisfaction', value: '99%' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 sm:pt-32 sm:pb-40">
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
              >
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm sm:text-base font-medium">Built by Zapllo</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
              >
                We don't just build software.
                <br />
                <span className="text-muted-foreground">We craft experiences.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              >
                GymZ is the result of years of obsession with precision, simplicity, and perfection. 
                Born from Zapllo's expertise in CRM and automation, reimagined for the fitness industry.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 sm:py-20 border-y bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                  Our Story
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed">
                    In 2016, we started with a simple belief: software should inspire, not just manage.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    At Zapllo, we spent years perfecting CRM and automation systems. We learned what makes software truly great — it's not about features, it's about removing friction. It's about making complex things feel effortless.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    When we looked at fitness management software, we saw the same problems everywhere: cluttered interfaces, steep learning curves, features nobody asked for.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    So we built GymZ. Not as another gym management tool, but as a fitness operating system. Every screen designed to feel intuitive. Every feature earning its place. Every interaction crafted with care.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 sm:py-32 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6"
              >
                What We Believe
              </motion.h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl sm:rounded-3xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg h-full">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-6">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                  A Team That Cares
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Behind GymZ is a dedicated team of designers, engineers, and fitness enthusiasts 
                  who believe great software can change how businesses operate.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're here for the long run. Your success is our success.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pt-8"
              >
                <Link href="/contact">
                  <Button size="lg" className="rounded-full">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

