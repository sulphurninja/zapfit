'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewTrainerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    specialization: [] as string[],
    certifications: [] as string[],
    experience: '',
    bio: '',
    commissionRate: '',
  })
  const [specializationInput, setSpecializationInput] = useState('')
  const [certificationInput, setCertificationInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSpecialization = () => {
    if (specializationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        specialization: [...prev.specialization, specializationInput.trim()],
      }))
      setSpecializationInput('')
    }
  }

  const removeSpecialization = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    if (certificationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()],
      }))
      setCertificationInput('')
    }
  }

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/trainers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          experience: formData.experience ? parseInt(formData.experience) : 0,
          commissionRate: formData.commissionRate ? parseFloat(formData.commissionRate) : 0,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Trainer added successfully!')
        router.push('/dashboard/trainers')
      } else {
        toast.error(data.message || 'Failed to add trainer')
      }
    } catch (error) {
      console.error('Add trainer error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/trainers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Trainer</h1>
          <p className="text-muted-foreground mt-2">Fill in the details to add a new trainer to your team</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic trainer details and contact information</CardDescription>
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
                    <Label htmlFor="password">Password (Optional)</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Leave empty for auto-generated"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Brief description about the trainer..."
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={loading}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
                <CardDescription>Experience, specialization, and certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-4">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      placeholder="5"
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={loading}
                      min="0"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      name="commissionRate"
                      type="number"
                      placeholder="15"
                      value={formData.commissionRate}
                      onChange={handleChange}
                      disabled={loading}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Specializations</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Weight Training, Yoga"
                      value={specializationInput}
                      onChange={(e) => setSpecializationInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                      disabled={loading}
                    />
                    <Button type="button" onClick={addSpecialization} disabled={loading} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.specialization.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {spec}
                          <button
                            type="button"
                            onClick={() => removeSpecialization(index)}
                            className="hover:bg-primary/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Certifications</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., ACE Certified, NASM CPT"
                      value={certificationInput}
                      onChange={(e) => setCertificationInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                      disabled={loading}
                    />
                    <Button type="button" onClick={addCertification} disabled={loading} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm"
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="hover:bg-green-500/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                    <span className="text-muted-foreground">Trainer Name:</span>
                    <span className="font-medium">{formData.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{formData.experience ? `${formData.experience} years` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission:</span>
                    <span className="font-medium">{formData.commissionRate ? `${formData.commissionRate}%` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Specializations:</span>
                    <span className="font-medium">{formData.specialization.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certifications:</span>
                    <span className="font-medium">{formData.certifications.length}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding Trainer...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Add Trainer
                      </>
                    )}
                  </Button>
                  <Link href="/dashboard/trainers" className="block">
                    <Button type="button" variant="outline" className="w-full" disabled={loading}>
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

