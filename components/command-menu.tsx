'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  User,
  Users,
  UserPlus,
  Dumbbell,
  MessageSquare,
  FileText,
  Building2,
  LayoutDashboard,
  Search,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

const navigation = [
  {
    group: 'Pages',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', shortcut: 'D' },
      { name: 'Members', icon: Users, href: '/dashboard/members', shortcut: 'M' },
      { name: 'Leads', icon: UserPlus, href: '/dashboard/leads', shortcut: 'L' },
      { name: 'Attendance', icon: Calendar, href: '/dashboard/attendance', shortcut: 'A' },
      { name: 'Billing', icon: CreditCard, href: '/dashboard/billing', shortcut: 'B' },
      { name: 'Trainers', icon: Dumbbell, href: '/dashboard/trainers', shortcut: 'T' },
      { name: 'WhatsApp', icon: MessageSquare, href: '/dashboard/whatsapp', shortcut: 'W' },
      { name: 'Plans', icon: Building2, href: '/dashboard/plans', shortcut: 'P' },
      { name: 'Reports', icon: FileText, href: '/dashboard/reports', shortcut: 'R' },
      { name: 'Settings', icon: Settings, href: '/dashboard/settings', shortcut: 'S' },
    ],
  },
]

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative flex h-10 w-full max-w-md items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 text-sm text-zinc-500 dark:text-zinc-400 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400 opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {navigation.map((group) => (
            <React.Fragment key={group.group}>
              <CommandGroup heading={group.group}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.name}
                    onSelect={() => {
                      runCommand(() => router.push(item.href))
                    }}
                    className="flex items-center gap-3"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {item.shortcut && (
                      <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400 opacity-100">
                        {item.shortcut}
                      </kbd>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

