'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Plan {
  _id: string
  name: string
  description?: string
  duration: number
  durationType: 'days' | 'months' | 'years'
  amount: number
  features: string[]
}

export default function NewMemberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    planId: '',
    planName: '',
    amount: '',
    planDuration: '',
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoadingPlans(true)
      const response = await fetch('/api/plans')
      const data = await response.json()
      if (data.success) {
        setPlans(data.plans)
      }
    } catch (error) {
      console.error('Fetch plans error:', error)
      toast.error('Failed to load plans')
    } finally {
      setLoadingPlans(false)
    }
  }

  const handlePlanChange = (planId: string) => {
    const plan = plans.find(p => p._id === planId)
    if (plan) {
      setSelectedPlan(plan)
      // Calculate duration in days
      let durationInDays = plan.duration
      if (plan.durationType === 'months') {
        durationInDays = plan.duration * 30
      } else if (plan.durationType === 'years') {
        durationInDays = plan.duration * 365
      }
      
      setFormData(prev => ({
        ...prev,
        planId: plan._id,
        planName: plan.name,
        amount: plan.amount.toString(),
        planDuration: durationInDays.toString(),
      }))
    }
  }

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

    if (!formData.planId && !formData.planName) {
      toast.error('Please select a plan or enter plan details')
      return
    }

    if (!formData.amount || !formData.planDuration) {
      toast.error('Please ensure plan amount and duration are specified')
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
        toast.error(data.message || data.error || 'Failed to add member')
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
                <div className="space-y-4">
                  <Label htmlFor="planId">Select Plan *</Label>
                  {loadingPlans ? (
                    <div className="flex items-center justify-center p-4 border rounded-md">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm text-muted-foreground">Loading plans...</span>
                    </div>
                  ) : plans.length === 0 ? (
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-sm text-muted-foreground mb-2">No plans available</p>
                      <Link href="/dashboard/plans">
                        <Button type="button" size="sm" variant="outline">
                          Create Plan First
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Select
                      value={formData.planId}
                      onValueChange={handlePlanChange}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a membership plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan) => (
                          <SelectItem key={plan._id} value={plan._id}>
                            {plan.name} - ₹{plan.amount} ({plan.duration} {plan.durationType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {selectedPlan && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
                      <p className="text-sm font-medium">{selectedPlan.name}</p>
                      {selectedPlan.description && (
                        <p className="text-xs text-muted-foreground mt-1">{selectedPlan.description}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-xs">
                        <span>Duration: {selectedPlan.duration} {selectedPlan.durationType}</span>
                        <span>Amount: ₹{selectedPlan.amount}</span>
                      </div>
                    </div>
                  )}
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
                      disabled={loading || !!selectedPlan}
                    />
                    {selectedPlan && (
                      <p className="text-xs text-muted-foreground">Auto-filled from selected plan</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="planDuration">Duration (days) *</Label>
                    <Input
                      id="planDuration"
                      name="planDuration"
                      type="number"
                      placeholder="30"
                      value={formData.planDuration}
                      onChange={handleChange}
                      required
                      disabled={loading || !!selectedPlan}
                    />
                    {selectedPlan && (
                      <p className="text-xs text-muted-foreground">Auto-calculated from plan</p>
                    )}
                  </div>
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
                    <span className="font-medium truncate ml-2">{formData.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-xs truncate ml-2">{formData.email || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{formData.phone || '-'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">{selectedPlan ? selectedPlan.name : (formData.planName || '-')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{formData.planDuration ? `${formData.planDuration} days` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium text-primary">{formData.amount ? `₹${formData.amount}` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="font-medium capitalize">{formData.paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button type="submit" className="w-full" disabled={loading || loadingPlans}>
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
                  * All required fields must be filled
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

