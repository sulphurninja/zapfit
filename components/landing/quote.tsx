'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export function QuoteSection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <Quote className="h-12 w-12 sm:h-16 sm:w-16 text-primary/20 mx-auto" />
          
          <blockquote className="space-y-6">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight">
              "Innovation is not about adding more.
              <br className="hidden sm:block" />
              It's about removing everything
              <br className="hidden sm:block" />
              that doesn't matter."
            </p>
            <footer className="text-lg sm:text-xl text-muted-foreground">
              — Steve Jobs
            </footer>
          </blockquote>

          <div className="pt-8 space-y-4">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              In a world full of gym software that just manage,
              <br className="hidden sm:block" />
              we built one that <span className="text-foreground font-medium">inspires</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

