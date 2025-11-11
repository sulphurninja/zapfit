'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small gyms',
    price: '₹999',
    period: '/month',
    features: [
      'Up to 100 members',
      'Member & lead management',
      'Attendance tracking',
      'Basic analytics',
      'WhatsApp notifications',
      'Payment processing',
      'Email support'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Growth',
    description: 'Ideal for growing gyms',
    price: '₹1,999',
    period: '/month',
    features: [
      'Up to 500 members',
      'Everything in Starter',
      'WhatsApp automation',
      'Advanced analytics',
      'Staff management',
      'Custom branding',
      'Priority support',
      'API access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Pro',
    description: 'For chains & franchises',
    price: '₹4,999',
    period: '/month',
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

export function Pricing() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-6"
          >
            One price. All features.
            <br />
            <span className="text-muted-foreground">No hidden costs.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-muted-foreground"
          >
            Because complexity shouldn't come with a price tag.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: plan.popular ? 0 : -10 }}
              className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full p-8 sm:p-10 rounded-2xl sm:rounded-3xl border ${
                plan.popular 
                  ? 'border-primary bg-card shadow-xl' 
                  : 'border-border/50 bg-card hover:border-border'
              } transition-all duration-300`}>
                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href={plan.cta === 'Contact Sales' ? '#contact' : '/register'}>
                  <Button 
                    className={`w-full h-12 rounded-full text-base mb-8 ${
                      plan.popular ? '' : 'variant-outline'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm sm:text-base text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-muted-foreground">
            All plans include free updates, secure cloud hosting, and data migration support.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

