'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  CreditCard, 
  CheckCircle, 
  UserCheck,
  Calendar,
  Shield,
  BarChart3,
  Bell,
  ShoppingCart,
  Smartphone
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Member OS',
    description: 'All your members, plans, payments, and renewals — one unified interface.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: UserCheck,
    title: 'Trainer Hub',
    description: 'Assign workouts, track progress, automate communication. Every trainer, empowered.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: CreditCard,
    title: 'Smart Billing',
    description: 'Invoices, renewals, and reminders — done automatically. No manual work.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    description: 'Real-time dashboards that don\'t just show data — they tell stories.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integration',
    description: 'Instant alerts, updates, and engagement — powered by Zaptick.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: TrendingUp,
    title: 'AI-Powered Engagement',
    description: 'Predict renewals, identify drop-offs, and automate retention.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: CheckCircle,
    title: 'Attendance Tracking',
    description: 'QR code and biometric check-ins with real-time monitoring.',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Calendar,
    title: 'Class Scheduling',
    description: 'Schedule group classes, PT sessions, and manage bookings effortlessly.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Bell,
    title: 'Intelligent Alerts',
    description: 'Automated reminders that keep members engaged and coming back.',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: ShoppingCart,
    title: 'Point of Sale',
    description: 'Sell supplements and merchandise with integrated inventory.',
    color: 'from-lime-500 to-green-500'
  },
  {
    icon: Shield,
    title: 'Access Control',
    description: 'Secure facility access with biometric integration.',
    color: 'from-slate-500 to-zinc-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native apps for members, trainers, and admins.',
    color: 'from-sky-500 to-blue-500'
  }
]

export function Features() {
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
            Smarter. Faster. Simpler.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-muted-foreground"
          >
            It's not just management. It's momentum.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-lg h-full cursor-pointer">
                {/* Icon */}
                <motion.div 
                  className={`inline-flex p-3 rounded-2xl bg-linear-to-br ${feature.color} mb-4 sm:mb-6`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
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

