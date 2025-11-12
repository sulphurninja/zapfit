'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  IndianRupee,
  User,
  Activity,
  Edit,
  Trash2,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatCurrency, getDaysUntil } from '@/lib/utils'
import { toast } from 'sonner'

interface Member {
  _id: string
  name: string
  email: string
  phone: string
  membershipNumber: string
  address?: string
  emergencyContact?: string
  subscription: {
    planName: string
    status: 'active' | 'expired' | 'suspended'
    startDate: string
    endDate: string
    amount: number
  }
  joinDate: string
}

export default function MemberDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

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
        setMember(data.member)
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Member deleted successfully')
        router.push('/dashboard/members')
      } else {
        toast.error(data.message || 'Failed to delete member')
      }
    } catch (error) {
      console.error('Delete member error:', error)
      toast.error('Something went wrong')
    }
  }

  const handleExport = () => {
    if (!member) return

    // Create a text representation of member data
    const exportData = `
MEMBER DETAILS - ${member.name}
${'='.repeat(50)}

PERSONAL INFORMATION:
Member ID: ${member.membershipNumber}
Name: ${member.name}
Email: ${member.email}
Phone: ${member.phone}
${member.address ? `Address: ${member.address}` : ''}
${member.emergencyContact ? `Emergency Contact: ${member.emergencyContact}` : ''}
Join Date: ${formatDate(member.joinDate)}

SUBSCRIPTION DETAILS:
Plan: ${member.subscription.planName}
Amount: ${formatCurrency(member.subscription.amount)}
Status: ${member.subscription.status.toUpperCase()}
Start Date: ${formatDate(member.subscription.startDate)}
End Date: ${formatDate(member.subscription.endDate)}
Days Until Expiry: ${getDaysUntil(member.subscription.endDate)}

${'='.repeat(50)}
Generated on: ${new Date().toLocaleString()}
    `.trim()

    // Create blob and download
    const blob = new Blob([exportData], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `member-${member.membershipNumber}-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    toast.success('Member data exported successfully')
  }

  const getStatusBadge = (status: string) => {
    const config = {
      active: { variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600' },
      expired: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      suspended: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-orange-600' },
    }

    const { variant, icon: Icon, color } = config[status as keyof typeof config] || config.active

    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className={`h-3 w-3 ${color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRenewalStatus = (endDate: string) => {
    const days = getDaysUntil(endDate)
    if (days < 0) return { text: 'Expired', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950/20' }
    if (days <= 3)
      return { text: `${days} days left`, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/20' }
    if (days <= 7)
      return { text: `${days} days left`, color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20' }
    return { text: `${days} days left`, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/20' }
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

  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-muted-foreground">Member not found</p>
        </div>
      </div>
    )
  }

  const renewal = getRenewalStatus(member.subscription.endDate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/members">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{member.name}</h1>
            <p className="text-muted-foreground mt-1">Member ID: {member.membershipNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href={`/dashboard/members/${id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" size="sm" className="cursor-pointer text-white" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>{getStatusBadge(member.subscription.status)}</CardContent>
        </Card>

        <Card className={`border-border/50 ${renewal.bgColor}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Renewal</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${renewal.color}`}>{renewal.text}</div>
            <p className="text-xs text-muted-foreground mt-1">Expires {formatDate(member.subscription.endDate)}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Plan</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{member.subscription.planName}</div>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(member.subscription.amount)}/period</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Member Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(member.joinDate)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.floor((new Date().getTime() - new Date(member.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{member.phone}</p>
                  </div>
                </div>
                {member.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{member.address}</p>
                    </div>
                  </div>
                )}
                {member.emergencyContact && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency Contact</p>
                      <p className="font-medium">{member.emergencyContact}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan Name</span>
                  <span className="font-medium">{member.subscription.planName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">{formatCurrency(member.subscription.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{formatDate(member.subscription.startDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{formatDate(member.subscription.endDate)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-muted-foreground">Status</span>
                  {getStatusBadge(member.subscription.status)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Track member check-ins and attendance patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No attendance records yet</p>
                <p className="text-sm mt-2">Attendance tracking coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View all transactions and payment records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <IndianRupee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No payment records yet</p>
                <p className="text-sm mt-2">Payment history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent actions and updates for this member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No activity records yet</p>
                <p className="text-sm mt-2">Activity log coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

