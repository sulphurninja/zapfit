'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  Calendar,
  Dumbbell,
  MessageSquare,
  FileText,
  Settings,
  Building2,
  Sparkles,
  Fingerprint,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview',
  },
  {
    name: 'Members',
    href: '/dashboard/members',
    icon: Users,
    description: 'Manage',
  },
  {
    name: 'Leads',
    href: '/dashboard/leads',
    icon: UserPlus,
    description: 'Pipeline',
  },
  {
    name: 'Attendance',
    href: '/dashboard/attendance',
    icon: Calendar,
    description: 'Check-ins',
  },
  {
    name: 'Biometric',
    href: '/dashboard/biometric',
    icon: Fingerprint,
    description: 'Fingerprints',
  },
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
    description: 'Revenue',
  },
  {
    name: 'Trainers',
    href: '/dashboard/trainers',
    icon: Dumbbell,
    description: 'Staff',
  },
  {
    name: 'WhatsApp',
    href: '/dashboard/whatsapp',
    icon: MessageSquare,
    description: 'Automation',
  },
  {
    name: 'Plans',
    href: '/dashboard/plans',
    icon: Building2,
    description: 'Plans',
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
    description: 'Analytics',
  },
]

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void
}

export function Sidebar({ onCollapse }: SidebarProps = {}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const handleToggle = () => {
    const newState = !collapsed
    setCollapsed(newState)
    onCollapse?.(newState)
  }

  return (
    <motion.div
      initial={false}
      animate={{
        width: collapsed ? 80 : 288,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col relative"
    >
      {/* Toggle Button - Outside scrollable container */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={cn(
          'absolute top-6 -right-3 h-6 w-6 rounded-full bg-background border border-border shadow-md hover:shadow-lg transition-all p-0 z-9999',
          collapsed && 'rotate-180'
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-card/50 backdrop-blur-xl border-r border-border/50 px-4 pb-6 scrollbar-hide">
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between">
          <Link href="/dashboard" className="flex justify-center items-center group">
            <AnimatePresence mode="wait">
              {collapsed ? (
                <motion.div
                  key="logo2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-10 h-10"
                >
                  <Image
                    src="/logo2.png"
                    alt="GymZ"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              ) : (
                <div className='flex justify-center items-center'>
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-32 h-10"
                >
                  <Image
                    src="/logo.png"
                    alt="GymZ"
                    fill
                    className="object-contain"
                  />
                
                </motion.div>
                </div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-8">
            <li>
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3"
                  >
                    Main
                  </motion.p>
                )}
              </AnimatePresence>
              <ul role="list" className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                          collapsed && 'justify-center'
                        )}
                        title={collapsed ? item.name : undefined}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                            )}
                            aria-hidden="true"
                          />
                        </motion.div>
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-1 min-w-0 overflow-hidden"
                            >
                              <span className="font-medium whitespace-nowrap">{item.name}</span>
                              {!isActive && (
                                <span className="block text-xs text-muted-foreground/70 mt-0.5 whitespace-nowrap">
                                  {item.description}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {isActive && !collapsed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                          />
                        )}
                        {/* Tooltip for collapsed state */}
                        {collapsed && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Settings at bottom */}
            <li className="mt-auto">
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3"
                  >
                    System
                  </motion.p>
                )}
              </AnimatePresence>
              <Link
                href="/dashboard/settings"
                className={cn(
                  'group flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                  pathname === '/dashboard/settings'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  collapsed && 'justify-center'
                )}
                title={collapsed ? 'Settings' : undefined}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Settings
                    className={cn(
                      'h-5 w-5 shrink-0',
                      pathname === '/dashboard/settings' ? 'text-primary-foreground' : 'text-muted-foreground'
                    )}
                    aria-hidden="true"
                  />
                </motion.div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 min-w-0 overflow-hidden"
                    >
                      <span className="font-medium whitespace-nowrap">Settings</span>
                      {pathname !== '/dashboard/settings' && (
                        <span className="block text-xs text-muted-foreground/70 mt-0.5 whitespace-nowrap">
                          Preferences
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    <div className="font-medium">Settings</div>
                    <div className="text-xs text-muted-foreground">Preferences</div>
                  </div>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Upgrade Card */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-purple-500/10 p-4 border border-primary/20 cursor-pointer group overflow-hidden"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/25"
                >
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">Starter Plan</p>
                  <p className="text-xs text-muted-foreground mt-0.5">₹999/month</p>
                  <button className="mt-2 text-xs font-medium text-primary group-hover:underline underline-offset-2 transition-all">
                    Upgrade Plan →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
