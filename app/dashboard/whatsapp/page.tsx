'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MessageSquare, Send, Users, CheckCircle, Clock, Sparkles } from 'lucide-react'

interface Template {
  id: string
  name: string
  category: string
  description: string
  status: string
  variables: string[]
  content: string
}

export default function WhatsAppPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [broadcastDialog, setBroadcastDialog] = useState(false)
  const [recipientType, setRecipientType] = useState('active')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/whatsapp/templates')
      const data = await response.json()

      if (data.success) {
        setTemplates(data.templates)
      }
    } catch (error) {
      console.error('Fetch templates error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBroadcast = async () => {
    if (!selectedTemplate) return

    try {
      setSending(true)
      const response = await fetch('/api/whatsapp/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          recipientType,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Broadcast sent successfully to ${data.results.total} members!`)
        setBroadcastDialog(false)
        setSelectedTemplate(null)
      } else {
        alert(data.message || 'Failed to send broadcast')
      }
    } catch (error) {
      console.error('Broadcast error:', error)
      alert('An error occurred while sending broadcast')
    } finally {
      setSending(false)
    }
  }

  const getTemplatesByCategory = (category: string) => {
    return templates.filter(t => t.category === category && t.status === 'active')
  }

  const categories = [
    { id: 'onboarding', name: 'Onboarding', icon: '👋', color: 'bg-blue-100 text-blue-800' },
    { id: 'renewals', name: 'Renewals', icon: '🔄', color: 'bg-orange-100 text-orange-800' },
    { id: 'billing', name: 'Billing', icon: '💰', color: 'bg-green-100 text-green-800' },
    { id: 'leads', name: 'Leads', icon: '🎯', color: 'bg-purple-100 text-purple-800' },
    { id: 'engagement', name: 'Engagement', icon: '💪', color: 'bg-pink-100 text-pink-800' },
    { id: 'classes', name: 'Classes', icon: '🏋️', color: 'bg-indigo-100 text-indigo-800' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Automation</h1>
          <p className="text-muted-foreground mt-2">
            Manage message templates and send broadcasts via Zaptick.io
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Sparkles className="mr-2 h-4 w-4" />
            Configure Zaptick
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter(t => t.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready to use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--%</div>
            <p className="text-xs text-muted-foreground mt-1">
              average rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">
              auto-trigger templates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Templates by Category */}
      <Tabs defaultValue="onboarding" className="space-y-4">
        <TabsList>
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id}>
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTemplatesByCategory(category.id).map(template => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                      <Badge className={category.color}>
                        {category.icon}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-accent/50 rounded-md text-sm whitespace-pre-wrap">
                      {template.content}
                    </div>

                    {template.variables.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Variables:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {template.variables.map(variable => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {`{{${variable}}}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedTemplate(template)
                        setBroadcastDialog(true)
                      }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Broadcast
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {getTemplatesByCategory(category.id).length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No templates in this category</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Broadcast Dialog */}
      <Dialog open={broadcastDialog} onOpenChange={setBroadcastDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Broadcast</DialogTitle>
            <DialogDescription>
              Send {selectedTemplate?.name} to selected members
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient-type">Select Recipients</Label>
              <Select value={recipientType} onValueChange={setRecipientType}>
                <SelectTrigger id="recipient-type" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="active">Active Members Only</SelectItem>
                  <SelectItem value="expired">Expired Members</SelectItem>
                  <SelectItem value="expiring_soon">Expiring in 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="p-4 bg-accent rounded-lg">
                <p className="text-sm font-medium mb-2">Template Preview:</p>
                <div className="text-sm whitespace-pre-wrap text-muted-foreground">
                  {selectedTemplate.content}
                </div>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Messages will be sent via Zaptick.io API. 
                Ensure your Zaptick account is properly configured in Settings.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setBroadcastDialog(false)
                setSelectedTemplate(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleBroadcast} disabled={sending}>
              {sending ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Broadcast
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
