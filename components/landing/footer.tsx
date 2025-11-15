'use client'

import Link from 'next/link'
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const navigation = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Industries', href: '/industries' },
    { name: 'Mobile Apps', href: '/#apps' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/contact' },
    { name: 'Contact', href: '/contact' }
  ],
  resources: [
    { name: 'Documentation', href: '/help' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Reference', href: '/help' },
    { name: 'Status', href: '/help' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/terms' },
    { name: 'Security', href: '/privacy' }
  ]
}

const contact = {
  sales: {
    phone: '+91 9836630366',
    email: 'contact@gymz.in'
  },
  support: {
    phone: '+91 9836630366',
    email: 'support@gymz.in'
  },
}

export function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
             <img src='/logo.png' className='h-12'/>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Your fitness operating system. Built by Zapllo. Perfected for gyms.
            </p>
              
              {/* Contact Info */}
             
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
                {/* Product */}
                <div>
                  <h3 className="font-semibold mb-4">Product</h3>
                  <ul className="space-y-3">
                    {navigation.product.map((item, index) => (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link 
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground inline-block hover:translate-x-1 transition-all duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-3">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <Link 
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-semibold mb-4">Resources</h3>
                  <ul className="space-y-3">
                    {navigation.resources.map((item) => (
                      <li key={item.name}>
                        <Link 
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="font-semibold mb-4">Legal</h3>
                  <ul className="space-y-3">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link 
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mt-12 pt-12 border-t">
            {/* Sales */}
            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
              <h4 className="font-semibold mb-4">Sales Inquiries</h4>
              <div className="space-y-3">
                <a 
                  href={`tel:${contact.sales.phone}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contact.sales.phone}
                </a>
                <a 
                  href={`mailto:${contact.sales.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.sales.email}
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
              <h4 className="font-semibold mb-4">Customer Support</h4>
              <div className="space-y-3">
                <a 
                  href={`tel:${contact.support.phone}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contact.support.phone}
                </a>
                <a 
                  href={`mailto:${contact.support.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.support.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GymZ by Zapllo. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

