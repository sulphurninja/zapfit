'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Menu, LogOut, User, Settings, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import { CommandMenu } from '@/components/command-menu'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  user?: {
    name: string
    email: string
    role: string
  }
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [notificationCount] = useState(3)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background/80 backdrop-blur-xl px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="lg:hidden">
        <Menu className="h-6 w-6" />
      </button>

      {/* Command Menu */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 max-w-md items-center">
          <CommandMenu />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-x-2 lg:gap-x-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-accent"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="text-[10px] font-bold text-primary-foreground">
                  {notificationCount}
                </span>
              </motion.div>
            )}
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="hidden lg:block h-6 w-px bg-border" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-auto rounded-full pl-2 pr-3 hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 text-primary-foreground text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start text-left">
                  <span className="text-sm font-medium leading-none">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-muted-foreground leading-none mt-1 capitalize">
                    {user?.role?.replace('_', ' ') || 'Member'}
                  </span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mr-4" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 py-2">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 text-primary-foreground text-lg font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-semibold leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || ''}</p>
                  <Badge variant="secondary" className="w-fit text-[10px] px-2 py-0.5 capitalize">
                    {user?.role?.replace('_', ' ') || 'Member'}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="cursor-pointer py-2.5">
              <User className="mr-3 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="cursor-pointer py-2.5">
              <Settings className="mr-3 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/billing')} className="cursor-pointer py-2.5">
              <Zap className="mr-3 h-4 w-4" />
              <span>Upgrade Plan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="cursor-pointer py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
