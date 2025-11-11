'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rashmi Joshi',
    role: 'Owner, I Think Fitness',
    content: 'Very customer friendly. Meets the need of figures that we need on a daily basis. Tracks the business very well from manager & owner perspective.',
    rating: 5
  },
  {
    name: 'Siraj Lalani',
    role: 'Master Franchisee, Plus Fitness',
    content: 'This software is a true asset. It\'s a seamless all-in-one solution for managing memberships, scheduling classes, and tracking progress. Highly recommended!',
    rating: 5
  },
  {
    name: 'Kshipra Ashtewale',
    role: 'Director, IFSI Fitness Academy',
    content: 'I have many branches and can handle all of them sitting in any location. Very user-friendly, affordable, and secure. Thank you team!',
    rating: 5
  },
  {
    name: 'Mayur Madkaikar',
    role: 'Owner, DotFit Fitness',
    content: 'Using this software for the last year and this is the best and easy to use software in fitness industry. The support team is very helpful.',
    rating: 5
  },
  {
    name: 'Jabir Khan',
    role: 'Owner, Xtreme Fitness',
    content: 'Amazing software, very user friendly, easy to train new staff. Member\'s data are fully secured, it is better than other software in India.',
    rating: 5
  },
  {
    name: 'Sonali Parab',
    role: 'Owner, Curves & Cuts',
    content: 'Using since 2016. Very user-friendly and systematic. Always comes up with new updates. The support team is very supportive and helpful.',
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6"
          >
            Trusted by fitness leaders.
            <br />
            <span className="text-muted-foreground">Proven at scale.</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl sm:rounded-3xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg cursor-pointer">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="space-y-1">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-yellow-500"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
        >
          {[
            { value: '2016', label: 'Established' },
            { value: '320+', label: 'Happy Clients' },
            { value: '50+', label: 'Cities' },
            { value: '99%', label: 'Satisfaction' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

