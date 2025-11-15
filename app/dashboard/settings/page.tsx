'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Bell, MessageSquare, CreditCard, Shield, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

interface Organization {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  settings: {
    currency: string
    timezone: string
    dateFormat: string
    autoSuspendExpiredMembers: boolean
    whatsappEnabled: boolean
    reminderDays: number[]
  }
  zaptickConfig?: {
    apiKey: string
    phoneNumber: string
    isConnected: boolean
  }
  subscription: {
    plan: string
    status: string
    startDate: string
    endDate: string
    amount: number
  }
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [settings, setSettings] = useState({
    autoSuspendExpiredMembers: true,
    whatsappEnabled: false,
    newMemberNotification: true,
    paymentNotification: true,
    expiringMembershipsNotification: true,
  })
  const [zaptickConfig, setZaptickConfig] = useState({
    apiKey: '',
    phoneNumber: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    fetchOrganization()
  }, [])

  const fetchOrganization = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/organization')
      const data = await response.json()

      if (data.success) {
        setOrganization(data.organization)
        setFormData({
          name: data.organization.name || '',
          email: data.organization.email || '',
          phone: data.organization.phone || '',
          address: data.organization.address || '',
          city: data.organization.city || '',
          state: data.organization.state || '',
          pincode: data.organization.pincode || '',
        })
        setSettings({
          autoSuspendExpiredMembers: data.organization.settings?.autoSuspendExpiredMembers ?? true,
          whatsappEnabled: data.organization.settings?.whatsappEnabled ?? false,
          newMemberNotification: true,
          paymentNotification: true,
          expiringMembershipsNotification: true,
        })
        setZaptickConfig({
          apiKey: data.organization.zaptickConfig?.apiKey || '',
          phoneNumber: data.organization.zaptickConfig?.phoneNumber || '',
        })
      } else {
        toast.error(data.message || 'Failed to load organization settings')
      }
    } catch (error) {
      console.error('Fetch organization error:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveGeneral = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/organization', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Settings saved successfully!')
        fetchOrganization()
      } else {
        toast.error(data.message || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Save settings error:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/organization', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            ...organization?.settings,
            autoSuspendExpiredMembers: settings.autoSuspendExpiredMembers,
            whatsappEnabled: settings.whatsappEnabled,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Preferences saved successfully!')
        fetchOrganization()
      } else {
        toast.error(data.message || 'Failed to save preferences')
      }
    } catch (error) {
      console.error('Save preferences error:', error)
      toast.error('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveWhatsApp = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/organization', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zaptickConfig: {
            ...zaptickConfig,
            isConnected: false,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('WhatsApp settings saved successfully!')
        fetchOrganization()
      } else {
        toast.error(data.message || 'Failed to save WhatsApp settings')
      }
    } catch (error) {
      console.error('Save WhatsApp settings error:', error)
      toast.error('Failed to save WhatsApp settings')
    } finally {
      setSaving(false)
    }
  }

  const handleTestWhatsApp = async () => {
    toast.info('Testing WhatsApp connection...')
    // TODO: Implement test connection endpoint
  }

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    toast.info('Password update functionality coming soon')
    // TODO: Implement password update endpoint
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your gym settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <CardTitle>Organization Details</CardTitle>
              </div>
              <CardDescription>Update your gym information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="gym-name">Gym Name</Label>
                  <Input
                    id="gym-name"
                    placeholder="My Awesome Gym"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="gym@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Fitness Street"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleSaveGeneral} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your gym settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-suspend expired members</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically suspend members when their subscription expires
                  </p>
                </div>
                <Switch
                  checked={settings.autoSuspendExpiredMembers}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoSuspendExpiredMembers: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>WhatsApp Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable WhatsApp messaging for notifications
                  </p>
                </div>
                <Switch
                  checked={settings.whatsappEnabled}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, whatsappEnabled: checked })
                  }
                />
              </div>
              <Button onClick={handleSaveSettings} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New member signup</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a new member joins
                  </p>
                </div>
                <Switch
                  checked={settings.newMemberNotification}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, newMemberNotification: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment received</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a payment is received
                  </p>
                </div>
                <Switch
                  checked={settings.paymentNotification}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, paymentNotification: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiring memberships</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily summary of expiring memberships
                  </p>
                </div>
                <Switch
                  checked={settings.expiringMembershipsNotification}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, expiringMembershipsNotification: checked })
                  }
                />
              </div>
              <Button disabled>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
              <p className="text-xs text-muted-foreground">
                Note: Individual notification settings coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <CardTitle>WhatsApp Integration</CardTitle>
              </div>
              <CardDescription>Configure Zaptick.io WhatsApp integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="zaptick-key">Zaptick API Key</Label>
                <Input
                  id="zaptick-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={zaptickConfig.apiKey}
                  onChange={(e) => setZaptickConfig({ ...zaptickConfig, apiKey: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
                <Input
                  id="whatsapp-number"
                  placeholder="+91 98765 43210"
                  value={zaptickConfig.phoneNumber}
                  onChange={(e) =>
                    setZaptickConfig({ ...zaptickConfig, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleSaveWhatsApp} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleTestWhatsApp}>
                  Test Connection
                </Button>
              </div>
              {organization?.zaptickConfig?.isConnected && (
                <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✓ WhatsApp is connected and active
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle>Subscription & Billing</CardTitle>
              </div>
              <CardDescription>Manage your ZapFit OS subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization && (
                <>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        Current Plan:{' '}
                        <span className="capitalize">{organization.subscription.plan}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ₹{organization.subscription.amount}/month
                      </p>
                    </div>
                    <Button>Upgrade Plan</Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Next billing date:{' '}
                      {new Date(organization.subscription.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your subscription will automatically renew
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleUpdatePassword}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
