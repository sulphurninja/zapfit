'use client'

import { motion } from 'framer-motion'

export function QuoteRevamped() {
  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 via-muted/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          {/* Quote marks - artistic element */}
          <div className="relative">
            <div className="absolute -top-8 -left-4 text-[120px] text-primary/10 font-serif leading-none">"</div>
            
            <div className="relative z-10 text-center space-y-12">
              {/* Main quote */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-relaxed tracking-tight text-balance">
                <span className="text-muted-foreground">Innovation is not about</span>
                <br />
                <span className="text-foreground">adding more.</span>
                <br />
                <span className="text-muted-foreground">It's about removing</span>
                <br />
                <span className="text-foreground">everything that doesn't matter.</span>
              </h2>

              {/* Attribution */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent" />
                <p className="text-lg text-muted-foreground font-light">
                  — Steve Jobs
                </p>
              </div>

              {/* Context for gym owners */}
              <div className="pt-12 max-w-3xl mx-auto">
                <p className="text-xl sm:text-2xl text-foreground/90 leading-relaxed">
                  In a world cluttered with features nobody asked for,
                  <br />
                  <span className="text-primary font-medium">we built something different.</span>
                </p>
                <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                  Every button you see. Every screen you touch. Every number you track.
                  <br />
                  <span className="text-foreground">It earned its place by solving a real problem.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

