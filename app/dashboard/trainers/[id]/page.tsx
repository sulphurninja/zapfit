'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Trainer {
  _id: string
  name: string
  email: string
  phone: string
  specialization?: string[]
  certifications?: string[]
  experience?: number
  bio?: string
  commissionRate?: number
  isActive: boolean
}

export default function EditTrainerPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: [] as string[],
    certifications: [] as string[],
    experience: '',
    bio: '',
    commissionRate: '',
    isActive: true,
  })
  const [specializationInput, setSpecializationInput] = useState('')
  const [certificationInput, setCertificationInput] = useState('')

  useEffect(() => {
    if (id) {
      fetchTrainer()
    }
  }, [id])

  const fetchTrainer = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trainers/${id}`)
      const data = await response.json()

      if (data.success) {
        const trainer: Trainer = data.trainer
        setFormData({
          name: trainer.name,
          email: trainer.email,
          phone: trainer.phone,
          specialization: trainer.specialization || [],
          certifications: trainer.certifications || [],
          experience: trainer.experience?.toString() || '',
          bio: trainer.bio || '',
          commissionRate: trainer.commissionRate?.toString() || '',
          isActive: trainer.isActive,
        })
      } else {
        toast.error('Trainer not found')
        router.push('/dashboard/trainers')
      }
    } catch (error) {
      console.error('Fetch trainer error:', error)
      toast.error('Failed to load trainer details')
    } finally {
      setLoading(false)
    }
  }

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
      setSaving(true)
      const response = await fetch(`/api/trainers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          experience: formData.experience ? parseInt(formData.experience) : 0,
          commissionRate: formData.commissionRate ? parseFloat(formData.commissionRate) : 0,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Trainer updated successfully!')
        router.push('/dashboard/trainers')
      } else {
        toast.error(data.message || 'Failed to update trainer')
      }
    } catch (error) {
      console.error('Update trainer error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading trainer details...</p>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Edit Trainer</h1>
          <p className="text-muted-foreground mt-2">Update trainer information and professional details</p>
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
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Brief description about the trainer..."
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={saving}
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
                      disabled={saving}
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
                      disabled={saving}
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
                      disabled={saving}
                    />
                    <Button type="button" onClick={addSpecialization} disabled={saving} size="icon">
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
                            disabled={saving}
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
                      disabled={saving}
                    />
                    <Button type="button" onClick={addCertification} disabled={saving} size="icon">
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
                            disabled={saving}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    disabled={saving}
                    className="rounded"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active Trainer
                  </Label>
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
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{formData.isActive ? 'Active' : 'Inactive'}</span>
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
                  <Link href="/dashboard/trainers" className="block">
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

