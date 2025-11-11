'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Database, Eye, Key, Server } from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'No Clutter',
    description: 'A clean, focused interface that removes everything that doesn\'t matter.'
  },
  {
    icon: Eye,
    title: 'No Chaos',
    description: 'Intuitive workflows that make complex operations feel simple and natural.'
  },
  {
    icon: Database,
    title: 'No Learning Curve',
    description: 'So intuitive, your team will master it in minutes, not weeks.'
  },
  {
    icon: Key,
    title: 'Just Clarity',
    description: 'Every screen, every button, every insight — crystal clear purpose.'
  },
  {
    icon: Server,
    title: 'Scales Beautifully',
    description: 'Whether you run one studio or fifty — GymZ grows with you effortlessly.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: '256-bit encryption, automated backups, and role-based access control.'
  }
]

export function Security() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6"
          >
            <Shield className="h-8 w-8 text-primary" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6"
          >
            Designed to Feel
            <br />
            <span className="text-muted-foreground">Premium.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground"
          >
            Minimal. Cinematic. Effortless. Every pixel breathes simplicity — because great design is invisible until you feel how right it is.
          </motion.p>
        </div>

        {/* Security Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

