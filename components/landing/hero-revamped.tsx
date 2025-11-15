'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroRevamped() {
  return (
    <section className="relative min-h-screen -mt-12 flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-muted/30" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs - subtle and elegant */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge with animation */}
          <motion.div
            animate={{ opacity: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="group inline-flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer">
              <Sparkles className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-medium">Trusted by 320+ gym owners across India</span>
            </div>
          </motion.div>

          {/* Main headline - emotional and powerful */}
          <motion.div
            animate={{ opacity: 1 }}
            className="text-center space-y-6 mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.1]">
              <span className="block mb-2">You built your gym</span>
              <span className="block mb-2">with passion.</span>
              <span className="inline-block bg-linear-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Let us handle the rest.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline - speaks to pain points */}
          <motion.p
            animate={{ opacity: 1 }}
            className="text-xl sm:text-2xl text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Stop juggling spreadsheets. Stop chasing payments. Stop worrying about renewals.
            <span className="block mt-3 text-foreground font-medium">
              Focus on what you do best — transforming lives.
            </span>
          </motion.p>

          {/* CTA Buttons - prominent and inviting */}
          <motion.div
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/register">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="text-lg px-10 h-14 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <Link href="#demo">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 h-14 rounded-full group border-2"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust line - builds confidence */}
          <motion.div
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              ✓ No credit card required  •  ✓ 14-day free trial  •  ✓ Cancel anytime
            </p>
            <p className="text-sm italic text-muted-foreground/70">
              "Finally, software that understands gym owners."
            </p>
          </motion.div>

          {/* Floating stats - social proof */}
          <motion.div
            animate={{ opacity: 1 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: '320+', label: 'Gyms Powered' },
              { value: '99%', label: 'Satisfaction' },
              { value: '50+', label: 'Cities' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                animate={{ opacity: 1 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

