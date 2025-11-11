'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Card */}
          <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-purple-600" />
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Content */}
            <div className="relative px-8 py-20 sm:px-16 sm:py-28 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-white">
                  Welcome to
                  <br />
                  the GymZ Era.
                </h2>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                  Where your gym runs itself — and you focus on what matters: results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/register">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 rounded-full group"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button 
                      size="lg"
                      className="text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                      variant="outline"
                    >
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-white/70 pt-4 italic">
                  Fitness isn't static. Neither should your management be.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Glow Effects */}
          <div className="absolute -inset-4 bg-linear-to-br from-primary to-purple-600 rounded-3xl sm:rounded-[3rem] opacity-20 blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  )
}

