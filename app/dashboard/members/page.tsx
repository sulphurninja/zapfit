'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search, Filter, Download } from 'lucide-react'
import { formatDate, formatCurrency, getDaysUntil } from '@/lib/utils'
import Link from 'next/link'

interface Member {
  _id: string
  name: string
  email: string
  phone: string
  membershipNumber: string
  subscription: {
    planName: string
    status: 'active' | 'expired' | 'suspended'
    startDate: string
    endDate: string
    amount: number
  }
  joinDate: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all')

  useEffect(() => {
    fetchMembers()
  }, [filter, search])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('status', filter)
      if (search) params.append('search', search)

      const response = await fetch(`/api/members?${params}`)
      const data = await response.json()

      if (data.success) {
        setMembers(data.members)
      }
    } catch (error) {
      console.error('Fetch members error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'success' as const,
      expired: 'destructive' as const,
      suspended: 'warning' as const,
    }
    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>
  }

  const getRenewalStatus = (endDate: string) => {
    const days = getDaysUntil(endDate)
    if (days < 0) return { text: 'Expired', color: 'text-red-600' }
    if (days <= 3) return { text: `${days}d left`, color: 'text-orange-600' }
    if (days <= 7) return { text: `${days}d left`, color: 'text-yellow-600' }
    return { text: `${days}d left`, color: 'text-green-600' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage your gym members and subscriptions
          </p>
        </div>
        <Link href="/dashboard/members/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members by name, email, phone..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'expired' ? 'default' : 'outline'}
            onClick={() => setFilter('expired')}
          >
            Expired
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading members...</div>
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No members found. Add your first member to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renewal</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => {
                  const renewal = getRenewalStatus(member.subscription.endDate)
                  return (
                    <TableRow key={member._id}>
                      <TableCell className="font-medium">{member.membershipNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {formatDate(member.joinDate)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{member.email}</p>
                          <p className="text-muted-foreground">{member.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{member.subscription.planName}</TableCell>
                      <TableCell>{getStatusBadge(member.subscription.status)}</TableCell>
                      <TableCell>
                        <span className={renewal.color + ' font-medium text-sm'}>
                          {renewal.text}
                        </span>
                      </TableCell>
                      <TableCell>{formatCurrency(member.subscription.amount)}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/members/${member._id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

