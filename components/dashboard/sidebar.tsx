'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
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
  ChevronRight,
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Stats',
  },
  {
    name: 'Members',
    href: '/dashboard/members',
    icon: Users,
    description: 'Member Management',
  },
  {
    name: 'Leads',
    href: '/dashboard/leads',
    icon: UserPlus,
    description: 'CRM & Pipeline',
  },
  {
    name: 'Attendance',
    href: '/dashboard/attendance',
    icon: Calendar,
    description: 'Check-ins',
  },
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
    description: 'Payments & Revenue',
  },
  {
    name: 'Trainers',
    href: '/dashboard/trainers',
    icon: Dumbbell,
    description: 'Staff Management',
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
    description: 'Membership Plans',
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
    description: 'Analytics',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 px-6 pb-4">
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ZapFit OS
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Gym Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex items-center justify-between gap-x-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white'
                        )}
                      >
                        <div className="flex items-center gap-x-3">
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110',
                              isActive ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'
                            )}
                            aria-hidden="true"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">{item.name}</span>
                            {!isActive && (
                              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-white" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Settings at bottom */}
            <li className="mt-auto pb-4">
              <Link
                href="/dashboard/settings"
                className={cn(
                  'group flex items-center gap-x-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                  pathname === '/dashboard/settings'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white'
                )}
              >
                <Settings
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200 group-hover:rotate-90',
                    pathname === '/dashboard/settings' ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">Settings</span>
                  {pathname !== '/dashboard/settings' && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-500">
                      Preferences
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Upgrade Card */}
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 border border-blue-200 dark:border-blue-900">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Starter Plan
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                ₹999/month
              </p>
              <button className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Upgrade Plan →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
