'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewMemberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    planName: '',
    amount: '',
    planDuration: '',
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Member added successfully!')
        router.push('/dashboard/members')
      } else {
        toast.error(data.error || 'Failed to add member')
      }
    } catch (error) {
      console.error('Add member error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/members">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Member</h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details to register a new member
          </p>
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Membership Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Membership Details</CardTitle>
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
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="planDuration">Duration (days) *</Label>
                    <Input
                      id="planDuration"
                      name="planDuration"
                      type="number"
                      placeholder="30, 90, 180, 365"
                      value={formData.planDuration}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{formData.planDuration ? `${formData.planDuration} days` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">{formData.amount ? `₹${formData.amount}` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="font-medium capitalize">{formData.paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding Member...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Add Member
                      </>
                    )}
                  </Button>
                  <Link href="/dashboard/members" className="block">
                    <Button type="button" variant="outline" className="w-full" disabled={loading}>
                      Cancel
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                  * Required fields must be filled
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

