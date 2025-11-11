'use client'

import { motion } from 'framer-motion'
import { 
  Users, UserCheck, CreditCard, BarChart3, MessageSquare, TrendingUp,
  CheckCircle, Calendar, Bell, ShoppingCart, Shield, Smartphone
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Member OS',
    tagline: 'Every member, one view',
    description: 'All your members, their plans, payments, attendance — unified. No more jumping between screens.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    icon: UserCheck,
    title: 'Trainer Hub',
    tagline: 'Empower your team',
    description: 'Assign workouts, track progress, manage schedules. Your trainers will thank you.',
    color: 'from-indigo-500 to-purple-500',
    delay: 0.1
  },
  {
    icon: CreditCard,
    title: 'Smart Billing',
    tagline: 'Money on autopilot',
    description: 'Invoices sent. Payments tracked. Renewals reminded. While you sleep.',
    color: 'from-orange-500 to-red-500',
    delay: 0.2
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    tagline: 'Data that tells stories',
    description: 'Not just numbers. Understand what is working, what is not, and why.',
    color: 'from-amber-500 to-orange-500',
    delay: 0
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integration',
    tagline: 'Stay connected',
    description: 'Instant alerts, renewal reminders, workout tips. Your members in their favorite app.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.1
  },
  {
    icon: TrendingUp,
    title: 'AI Engagement',
    tagline: 'Predict & retain',
    description: 'Know who is likely to leave before they do. Act early. Keep them longer.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  }
]

export function FeaturesRevamped() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with storytelling */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Built for gym owners
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Everything you need.
              <br />
              <span className="text-muted-foreground">Nothing you don't.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We talked to hundreds of gym owners. These are the features they actually use.
              <br />
              <span className="text-foreground">Not the ones that look good in demos.</span>
            </p>
          </div>
        </div>

        {/* Features Grid - larger cards with more breathing room */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative h-full p-10 rounded-3xl border border-border/50 bg-card hover:border-border hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
              >
                {/* Icon with gradient background */}
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </motion.div>
                </div>

                {/* Content with hierarchy */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {feature.tagline}
                    </p>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle glow effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 blur-2xl -z-10`} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - subtle invitation */}
        <div className="text-center mt-20">
          <p className="text-lg text-muted-foreground mb-4">
            And that's just scratching the surface.
          </p>
          <a href="#" className="text-primary font-medium hover:underline underline-offset-4">
            Explore all features →
          </a>
        </div>
      </div>
    </section>
  )
}

