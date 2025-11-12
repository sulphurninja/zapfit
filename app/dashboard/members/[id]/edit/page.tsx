'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Member {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
  emergencyContact?: string
  subscription: {
    planName: string
    amount: number
    startDate: string
    endDate: string
    status: 'active' | 'expired' | 'suspended'
  }
}

export default function EditMemberPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    planName: '',
    amount: '',
    startDate: '',
    status: 'active' as 'active' | 'expired' | 'suspended',
  })

  useEffect(() => {
    if (id) {
      fetchMember()
    }
  }, [id])

  const fetchMember = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/members/${id}`)
      const data = await response.json()

      if (data.success) {
        const member: Member = data.member
        setFormData({
          name: member.name,
          email: member.email,
          phone: member.phone,
          address: member.address || '',
          emergencyContact: member.emergencyContact || '',
          planName: member.subscription.planName,
          amount: member.subscription.amount.toString(),
          startDate: new Date(member.subscription.startDate).toISOString().split('T')[0],
          status: member.subscription.status,
        })
      } else {
        toast.error('Member not found')
        router.push('/dashboard/members')
      }
    } catch (error) {
      console.error('Fetch member error:', error)
      toast.error('Failed to load member details')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      const response = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
          subscription: {
            planName: formData.planName,
            amount: parseFloat(formData.amount),
            startDate: formData.startDate,
            status: formData.status,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Member updated successfully!')
        router.push(`/dashboard/members/${id}`)
      } else {
        toast.error(data.message || 'Failed to update member')
      }
    } catch (error) {
      console.error('Update member error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading member details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/members/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Member</h1>
          <p className="text-muted-foreground mt-2">Update member information and subscription details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic member details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street, City, State, PIN"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={saving}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Subscription Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>Plan and subscription information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label htmlFor="planName">Plan Name *</Label>
                    <Input
                      id="planName"
                      name="planName"
                      placeholder="e.g., Monthly, Quarterly"
                      value={formData.planName}
                      onChange={handleChange}
                      required
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="amount">Amount (₹) *</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="1999"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      name="status"
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, status: value as 'active' | 'expired' | 'suspended' }))
                      }
                      disabled={saving}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-primary/10 sticky top-6">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Name:</span>
                    <span className="font-medium">{formData.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">{formData.planName || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">{formData.amount ? `₹${formData.amount}` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium capitalize">{formData.status}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Link href={`/dashboard/members/${id}`} className="block">
                    <Button type="button" variant="outline" className="w-full" disabled={saving}>
                      Cancel
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">* Required fields must be filled</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

