'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface DashboardWrapperProps {
  children: React.ReactNode
  user: {
    name: string
    email: string
    role: string
  }
}

export function DashboardWrapper({ children, user }: DashboardWrapperProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <motion.div
        initial={false}
        animate={{
          paddingLeft: sidebarCollapsed ? 80 : 288,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="lg:pl-72"
      >
        <Header user={user} />
        <main className="py-6 sm:py-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </motion.div>
    </div>
  )
}

