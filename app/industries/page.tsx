'use client'

import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Dumbbell, Wind, Activity, Trophy, Waves, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const industries = [
  {
    icon: Dumbbell,
    title: 'Health & Fitness Clubs',
    description: 'Complete management for multi-service gyms with cardio zones, weight training, group classes, and personal training.',
    features: ['Multi-tier memberships', 'Equipment tracking', 'Locker management', 'Supplements POS'],
    gradient: 'from-blue-500 to-cyan-500',
    href: '/industries/health-fitness'
  },
  {
    icon: Wind,
    title: 'Yoga Studios',
    description: 'Mindful management for yoga spaces focusing on class scheduling, instructor management, and member wellness journeys.',
    features: ['Class scheduling', 'Workshop management', 'Meditation tracking', 'Retreat planning'],
    gradient: 'from-purple-500 to-pink-500',
    href: '/industries/yoga'
  },
  {
    icon: Activity,
    title: 'Pilates Studios',
    description: 'Specialized tools for reformer and mat Pilates studios with equipment booking and personalized session tracking.',
    features: ['Equipment reservations', 'Private sessions', 'Progress tracking', 'Instructor assignments'],
    gradient: 'from-green-500 to-emerald-500',
    href: '/industries/pilates'
  },
  {
    icon: Trophy,
    title: 'Martial Arts Schools',
    description: 'Belt progression tracking, tournament management, and family membership handling for martial arts academies.',
    features: ['Belt progression', 'Tournament tracking', 'Family plans', 'Discipline-specific forms'],
    gradient: 'from-orange-500 to-red-500',
    href: '/industries/martial-arts'
  },
  {
    icon: Waves,
    title: 'Swim Schools',
    description: 'Lane management, level progression, and safety compliance for swimming programs and aquatic centers.',
    features: ['Level tracking', 'Lane scheduling', 'Safety certifications', 'Parent communication'],
    gradient: 'from-sky-500 to-blue-500',
    href: '/industries/swim-school'
  }
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 sm:pt-32 sm:pb-40">
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
              >
                Built for every
                <br />
                <span className="text-muted-foreground">fitness vertical.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              >
                Whether you run a gym, yoga studio, martial arts school, or swim academy — 
                GymZ adapts to your unique needs while maintaining the simplicity you love.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={industry.href}>
                    <div className="relative p-8 sm:p-10 rounded-2xl sm:rounded-3xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-2xl h-full">
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${industry.gradient} mb-6`}>
                        <industry.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                        {industry.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {industry.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {industry.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </div>

                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-linear-to-br ${industry.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl -z-10`} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
                  Not seeing your industry?
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                  GymZ is flexible enough to adapt to any fitness vertical. 
                  Let's talk about your specific needs.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="rounded-full">
                    Schedule a Demo
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

