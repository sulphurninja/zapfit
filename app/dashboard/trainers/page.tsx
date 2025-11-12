'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp, Star, Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Trainer {
  _id: string
  name: string
  email: string
  phone: string
  specialization?: string[]
  experience?: number
  rating?: number
  commissionRate?: number
  assignedMembers: any[]
  isActive: boolean
}

interface Stats {
  total: number
  activeTrainers: number
  totalClients: number
  avgRating: number
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, activeTrainers: 0, totalClients: 0, avgRating: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trainers')
      const data = await response.json()

      if (data.success) {
        setTrainers(data.trainers)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Fetch trainers error:', error)
      toast.error('Failed to load trainers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete trainer "${name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/trainers/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Trainer deleted successfully')
        fetchTrainers()
      } else {
        toast.error(data.message || 'Failed to delete trainer')
      }
    } catch (error) {
      console.error('Delete trainer error:', error)
      toast.error('Something went wrong')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading trainers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trainers & Staff</h1>
          <p className="text-muted-foreground mt-2">
            Manage your gym trainers and track their performance
          </p>
        </div>
        <Link href="/dashboard/trainers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trainers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.activeTrainers} active</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground mt-1">Assigned members</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Commission Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainers.length > 0
                ? (trainers.reduce((sum, t) => sum + (t.commissionRate || 0), 0) / trainers.length).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">Average rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Trainers Grid */}
      {trainers.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No trainers yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Get started by adding your first trainer to the team
            </p>
            <Link href="/dashboard/trainers/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Trainer
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Card
              key={trainer._id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {trainer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{trainer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {trainer.specialization && trainer.specialization.length > 0
                        ? trainer.specialization.join(', ')
                        : 'No specialization'}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{trainer.rating?.toFixed(1) || '0.0'}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium truncate ml-2">{trainer.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{trainer.phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{trainer.experience || 0} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Clients</span>
                    <Badge variant="secondary">{trainer.assignedMembers.length}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Commission</span>
                    <span className="font-bold text-green-600">{trainer.commissionRate || 0}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={trainer.isActive ? 'default' : 'secondary'}>
                      {trainer.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Link href={`/dashboard/trainers/${trainer._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(trainer._id, trainer.name)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

