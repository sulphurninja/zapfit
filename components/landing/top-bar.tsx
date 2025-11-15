'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, ExternalLink, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function TopBar() {
  return (
    <div className="w-full bg-background/80 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-11">
          {/* Left side - Zapllo branding */}
          <Link 
            href="https://zapllo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5"
          >
            <span className="text-xs text-muted-foreground hidden sm:inline">
              A product of
            </span>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-primary/10 to-purple-500/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <img 
                  src="https://zapllo.com/logoonly.png" 
                  alt="Zapllo" 
                  
                  className="w- h-4 object-contain"
                />
                {/* <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-2 h-2 text-primary" />
                </motion.div> */}
              </div>
              <span className="text-sm font-semibold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
                Zapllo
              </span>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </Link>
          
          {/* Right side - Contact */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/contact" 
              className="group relative flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Mail className="h-3.5 w-3.5 text-primary relative z-10" />
              <span className="text-sm font-medium relative z-10 hidden sm:inline">
                Contact Us
              </span>
              <span className="text-sm font-medium relative z-10 sm:hidden">
                Contact
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  )
}
