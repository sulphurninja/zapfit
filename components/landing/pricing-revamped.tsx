'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect to get started',
    price: '₹999',
    period: '/month',
    description: 'For small gyms finding their groove',
    features: [
      'Up to 100 active members',
      'Member & lead management',
      'Attendance tracking',
      'Payment processing',
      'Basic analytics',
      'WhatsApp notifications',
      'Email support'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Growth',
    tagline: 'Most popular choice',
    price: '₹1,999',
    period: '/month',
    description: 'For gyms ready to scale',
    features: [
      'Up to 500 active members',
      'Everything in Starter',
      'WhatsApp automation',
      'Advanced analytics & reports',
      'Staff management',
      'Custom branding',
      'Priority support',
      'API access'
    ],
    cta: 'Start Free Trial',
    popular: true,
    badge: 'Most Popular'
  },
  {
    name: 'Pro',
    tagline: 'For serious operations',
    price: '₹4,999',
    period: '/month',
    description: 'For chains & franchises',
    features: [
      'Unlimited members',
      'Everything in Growth',
      'Multi-branch management',
      'AI-powered insights',
      'White-label options',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

export function PricingRevamped() {
  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/10 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="space-y-6">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Simple pricing
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              One price.
              <br />
              <span className="text-muted-foreground">All features.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              No hidden fees. No surprises. Cancel anytime.
            </p>
            
            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
              <Check className="h-4 w-4 text-primary" />
              <span>14-day free trial</span>
              <span className="text-muted-foreground/50">•</span>
              <Check className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative ${plan.popular ? 'lg:-mt-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                  <div className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <motion.div
                whileHover={{ y: plan.popular ? 0 : -8 }}
                transition={{ duration: 0.3 }}
                className={`relative h-full p-10 rounded-3xl border ${
                  plan.popular 
                    ? 'border-primary bg-card shadow-2xl shadow-primary/10' 
                    : 'border-border/50 bg-card hover:border-border hover:shadow-xl'
                } transition-all duration-500`}
              >
                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                      <p className="text-sm text-primary font-medium">{plan.tagline}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Billed monthly, cancel anytime</p>
                </div>

                {/* CTA Button */}
                <Link href={plan.cta === 'Contact Sales' ? '/contact' : '/register'}>
                  <Button
                    className={`w-full h-12 rounded-full text-base mb-8 ${
                      plan.popular ? 'shadow-lg shadow-primary/25' : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features List */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    What's included
                  </p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover glow effect */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-3xl bg-primary/5 opacity-50 blur-2xl -z-10" />
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            All plans include free updates, data migration support, and onboarding assistance.
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom plan?{' '}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Let's talk →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

