'use client'

import { motion, useInView } from 'framer-motion'
import { Clock, Heart, Rocket, Zap } from 'lucide-react'
import { useRef } from 'react'

const journeySteps = [
  {
    icon: Clock,
    number: '01',
    title: 'You're drowning in admin work',
    problem: 'Spreadsheets. Paper forms. Chasing payments. Following up on renewals.',
    solution: 'What if all of that... just happened automatically?',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    icon: Heart,
    title: 'You started this to change lives',
    problem: 'But you're stuck managing schedules instead of coaching members.',
    solution: 'Imagine having time to do what you love again.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Rocket,
    title: 'You want to grow',
    problem: 'But scaling feels impossible with your current systems.',
    solution: 'Growth shouldn't mean more chaos. It should mean more impact.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'You deserve better',
    problem: 'Software that actually understands gym owners. Built by people who get it.',
    solution: 'This is that software.',
    gradient: 'from-green-500 to-emerald-500'
  }
]

export function Journey() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 sm:py-40 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/10 to-background" />
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="space-y-6">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              We understand
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Because we've
              <br />
              <span className="text-muted-foreground">walked this path.</span>
            </h2>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-4xl mx-auto space-y-24">
          {journeySteps.map((step, index) => (
            <div
              key={step.title}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Icon and number side */}
                <div className="flex-shrink-0 lg:w-48">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    {/* Large number */}
                    <div className="text-7xl font-bold text-primary/10 leading-none">
                      {step.number}
                    </div>
                    
                    {/* Icon with gradient */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${step.gradient} shadow-lg`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Content side */}
                <div className="flex-1 space-y-6">
                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">
                    {step.title}
                  </h3>

                  {/* Problem */}
                  <div className="pl-6 border-l-2 border-muted-foreground/20">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.problem}
                    </p>
                  </div>

                  {/* Solution - the magic moment */}
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-lg text-foreground font-medium leading-relaxed">
                      {step.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting line (except for last item) */}
              {index < journeySteps.length - 1 && (
                <div className="hidden lg:block absolute left-24 top-32 w-0.5 h-24 bg-linear-to-b from-primary/20 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Final message */}
        <div className="max-w-3xl mx-auto text-center mt-24 space-y-6">
          <div className="w-16 h-1 bg-linear-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="text-2xl sm:text-3xl font-medium leading-relaxed">
            GymZ isn't just software.
            <br />
            <span className="text-primary">It's your business partner.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

