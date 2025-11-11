'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rashmi Joshi',
    role: 'Owner',
    gym: 'I Think Fitness',
    location: 'Mumbai',
    content: "We tried three other platforms before GymZ. They were complicated, buggy, and expensive. GymZ just works. My staff learned it in a day. My members love the app. And I finally have time to actually run my gym instead of fighting with software.",
    highlight: "I finally have time to actually run my gym.",
    rating: 5,
    members: '450+'
  },
  {
    name: 'Siraj Lalani',
    role: 'Master Franchisee',
    gym: 'Plus Fitness',
    location: 'Pan India',
    content: "Managing 12 locations was a nightmare. Different systems, different reports, no visibility. GymZ gave me a single dashboard to see everything. Now I can spot problems before they become problems. Best decision we made.",
    highlight: "Best decision we made.",
    rating: 5,
    members: '3000+'
  },
  {
    name: 'Kshipra Ashtewale',
    role: 'Director',
    gym: 'IFSI Fitness Academy',
    location: 'Pune',
    content: "As a fitness academy with multiple branches, we needed something robust but simple. GymZ delivered. The automated billing alone saved us 20 hours a week. And their support team? They actually care.",
    highlight: "Saved us 20 hours a week.",
    rating: 5,
    members: '800+'
  }
]

export function TestimonialsRevamped() {
  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 via-transparent to-muted/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="space-y-6">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Real stories
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Don't take our word for it.
              <br />
              <span className="text-muted-foreground">Take theirs.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              These are real gym owners. Real results. Real businesses transformed.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative h-full p-8 rounded-3xl border border-border/50 bg-card hover:border-border hover:shadow-2xl transition-all duration-500"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-10 w-10 text-primary/20" />
                </div>

                {/* Content */}
                <div className="space-y-6 mb-8">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {testimonial.content}
                  </p>
                  
                  {/* Highlight */}
                  <div className="pl-4 border-l-2 border-primary/50">
                    <p className="text-lg font-medium text-primary italic">
                      "{testimonial.highlight}"
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-start justify-between pt-6 border-t">
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.gym}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location} • {testimonial.members} members
                    </p>
                  </div>
                  
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>

                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Stats Bar - Social Proof */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="p-8 rounded-3xl bg-muted/30 border border-border/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '2016', label: 'Established' },
                { value: '320+', label: 'Gyms Trust Us' },
                { value: '50+', label: 'Cities' },
                { value: '99%', label: 'Stay With Us' }
              ].map((stat, index) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

