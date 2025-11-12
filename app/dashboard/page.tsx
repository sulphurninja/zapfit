'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserPlus, IndianRupee, TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import { formatCurrency, formatDate, getGreeting } from '@/lib/utils'

interface DashboardStats {
  totalMembers: number
  activeMembers: number
  expiredMembers: number
  newThisMonth: number
  totalRevenue: number
  monthlyRevenue: number
  todayAttendance: number
  upcomingRenewals: number
  pendingLeads: number
  pendingDues: number
}

interface RecentMember {
  name: string
  plan: string
  date: string
}

interface RecentPayment {
  name: string
  amount: number
  method: string
  date: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMembers, setRecentMembers] = useState<RecentMember[]>([])
  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
        setRecentMembers(data.recentMembers || [])
        setRecentPayments(data.recentPayments || [])
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {getGreeting()}, {userName}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what&apos;s happening with your gym today
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalMembers || 0}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <span className="text-green-600 dark:text-green-400 font-semibold">+{stats?.newThisMonth || 0}</span> 
              this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.activeMembers || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.expiredMembers || 0} expired
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <IndianRupee className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(stats?.monthlyRevenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total: {formatCurrency(stats?.totalRevenue || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today&apos;s Attendance</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.todayAttendance || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.activeMembers ? Math.round((stats.todayAttendance / stats.activeMembers) * 100) : 0}% of active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-500/10 hover:shadow-lg hover:border-orange-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats?.upcomingRenewals || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Expiring in next 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-500/10 hover:shadow-lg hover:border-red-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Subscriptions</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats?.pendingDues || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Need follow-up
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 hover:shadow-lg hover:border-blue-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leads</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats?.pendingLeads || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Need follow-up
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMembers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No members yet</p>
            ) : (
              <div className="space-y-4">
                {recentMembers.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.plan}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(member.date)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPayments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No payments yet</p>
            ) : (
              <div className="space-y-4">
                {recentPayments.map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{payment.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{payment.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(payment.amount)}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(payment.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
