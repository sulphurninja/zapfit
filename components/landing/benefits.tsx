'use client'

import { motion } from 'framer-motion'
import { UserPlus, Heart, Rocket } from 'lucide-react'

const benefits = [
  {
    icon: UserPlus,
    title: 'Built by Zapllo',
    description: 'We have spent years engineering precision into CRM and automation. Now, we have brought that same obsession with perfection into fitness.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Heart,
    title: 'Perfected for Gyms',
    description: 'Every click designed to feel effortless. Every number, beautifully visualized. Every member, connected.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Rocket,
    title: 'It is Not Software',
    description: 'It is synergy. Where your gym runs itself — and you focus on what matters: results.',
    gradient: 'from-orange-500 to-red-500'
  }
]

export function Benefits() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 via-background to-muted/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6"
          >
            Built by Zapllo.
            <br />
            <span className="text-muted-foreground">Perfected for Gyms.</span>
          </motion.h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative">
                {/* Card */}
                <div className="relative p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-border/50 bg-card hover:border-border transition-all duration-500 hover:shadow-2xl">
                  {/* Icon with gradient */}
                  <div className="relative mb-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${benefit.gradient}`}>
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl sm:rounded-[2.5rem] bg-linear-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

