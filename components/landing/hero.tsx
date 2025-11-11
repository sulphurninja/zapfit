'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-muted/20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-40">
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm sm:text-base font-medium">🦾 The Future of Fitness Management</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-tight">
              Your fitness
              <br />
              <span className="bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                operating system
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              GymZ isn't another management tool — it's your complete fitness OS. From member onboarding to insights, billing to automation — redefine how your fitness center operates.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 rounded-full group shadow-lg hover:shadow-xl transition-shadow">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="#demo">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 rounded-full">
                  Watch Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-muted-foreground italic"
          >
            "Running a gym should feel as seamless as a great workout."
          </motion.p>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mt-12 sm:mt-16"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-card">
              <div className="aspect-video bg-linear-to-br from-muted/50 to-muted flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="text-6xl sm:text-8xl">📊</div>
                  <p className="text-muted-foreground text-sm sm:text-base">Dashboard Preview</p>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-2xl blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

