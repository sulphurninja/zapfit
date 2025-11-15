'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { Plus, Search, LayoutGrid, List, Phone, Mail, MessageSquare, Calendar, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { toast } from 'sonner'

interface Lead {
  _id: string
  name: string
  email?: string
  phone: string
  source: string
  status: 'new' | 'contacted' | 'trial' | 'interested' | 'converted' | 'lost'
  followUpDate?: string
  interestedIn?: string[]
  notes?: string
  createdAt: string
}

const statusConfig = {
  new: { 
    label: 'New', 
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    cardBg: 'bg-blue-50/50 dark:bg-blue-950/30',
    headerBg: 'bg-blue-100 dark:bg-blue-900/50'
  },
  contacted: { 
    label: 'Contacted', 
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    cardBg: 'bg-purple-50/50 dark:bg-purple-950/30',
    headerBg: 'bg-purple-100 dark:bg-purple-900/50'
  },
  trial: { 
    label: 'Trial', 
    color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    cardBg: 'bg-yellow-50/50 dark:bg-yellow-950/30',
    headerBg: 'bg-yellow-100 dark:bg-yellow-900/50'
  },
  interested: { 
    label: 'Interested', 
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    cardBg: 'bg-green-50/50 dark:bg-green-950/30',
    headerBg: 'bg-green-100 dark:bg-green-900/50'
  },
  converted: { 
    label: 'Converted', 
    color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    cardBg: 'bg-emerald-50/50 dark:bg-emerald-950/30',
    headerBg: 'bg-emerald-100 dark:bg-emerald-900/50'
  },
  lost: { 
    label: 'Lost', 
    color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    cardBg: 'bg-red-50/50 dark:bg-red-950/30',
    headerBg: 'bg-red-100 dark:bg-red-900/50'
  },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'kanban' | 'table'>('kanban')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'walk_in',
    interestedIn: '',
    notes: '',
  })

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/leads')
      const data = await response.json()

      if (data.success) {
        setLeads(data.leads)
      }
    } catch (error) {
      console.error('Fetch leads error:', error)
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Lead added successfully!')
        setDialogOpen(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          source: 'walk_in',
          interestedIn: '',
          notes: '',
        })
        fetchLeads()
      } else {
        toast.error(data.message || 'Failed to add lead')
      }
    } catch (error) {
      console.error('Create lead error:', error)
      toast.error('Failed to add lead')
    }
  }

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success('Lead status updated')
        fetchLeads()
      } else {
        toast.error('Failed to update lead status')
      }
    } catch (error) {
      console.error('Update lead error:', error)
      toast.error('Failed to update lead')
    }
  }

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result

    // If dropped outside a droppable area or in the same position
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return
    }

    const newStatus = destination.droppableId
    handleStatusChange(draggableId, newStatus)
  }

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status)
  }

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.phone.includes(search) ||
    (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads CRM</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your gym leads through the sales pipeline
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Capture new lead information to start the conversion process.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="source">Source</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData({ ...formData, source: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walk_in">Walk In</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interestedIn">Interested In</Label>
                  <Input
                    id="interestedIn"
                    placeholder="e.g., Gym membership, Personal training"
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Lead</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and View Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, email, phone..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 border rounded-md p-1">
          <Button
            variant={view === 'kanban' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('kanban')}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          <Button
            variant={view === 'table' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('table')}
          >
            <List className="h-4 w-4 mr-2" />
            Table
          </Button>
        </div>
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>Drag and drop leads between columns to update their status</p>
            <p className="flex items-center gap-1">
              <span>Scroll horizontally to see all stages</span>
              <span className="text-lg">→</span>
            </p>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative">
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-4 min-w-max">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const statusLeads = getLeadsByStatus(status).filter(lead =>
                    lead.name.toLowerCase().includes(search.toLowerCase()) ||
                    lead.phone.includes(search) ||
                    (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()))
                  )

                  return (
                    <div key={status} className="flex flex-col w-xs shrink-0">
                      <div className={`${config.headerBg} rounded-t-lg px-4 py-3 border border-b-0`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{config.label}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {statusLeads.length}
                          </Badge>
                        </div>
                      </div>
                      
                      <Droppable droppableId={status}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 p-3 space-y-3 min-h-[600px] max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar border border-t-0 rounded-b-lg transition-colors ${
                              snapshot.isDraggingOver ? config.cardBg : 'bg-muted/20'
                            }`}
                          >
                            {statusLeads.map((lead, index) => (
                              <Draggable key={lead._id} draggableId={lead._id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Card
                                      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
                                        snapshot.isDragging ? 'shadow-lg ring-2 ring-primary' : ''
                                      }`}
                                      onClick={(e) => {
                                        // Prevent opening dialog while dragging
                                        if (!snapshot.isDragging) {
                                          setSelectedLead(lead)
                                        }
                                      }}
                                    >
                                      <CardContent className="p-4 space-y-3">
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate mb-1">{lead.name}</h4>
                                            <Badge className={`${config.color} text-xs`}>
                                              {config.label}
                                            </Badge>
                                          </div>
                                        </div>
                                        
                                        <div className="space-y-2 text-xs text-muted-foreground">
                                          <div className="flex items-center gap-2 truncate">
                                            <Phone className="h-3 w-3 shrink-0" />
                                            <span className="truncate">{lead.phone}</span>
                                          </div>
                                          {lead.email && (
                                            <div className="flex items-center gap-2 truncate">
                                              <Mail className="h-3 w-3 shrink-0" />
                                              <span className="truncate">{lead.email}</span>
                                            </div>
                                          )}
                                          <div className="flex items-center gap-2 justify-between pt-2 border-t">
                                            <span className="text-xs capitalize truncate">{lead.source.replace('_', ' ')}</span>
                                            <span className="text-xs shrink-0">{formatDate(lead.createdAt)}</span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            {statusLeads.length === 0 && (
                              <div className="text-center py-12">
                                <p className="text-sm text-muted-foreground">No leads</p>
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent pointer-events-none" />
          </div>
        </DragDropContext>
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No leads found. Add your first lead to get started.
                </p>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{lead.name}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                        {lead.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground capitalize">{lead.source.replace('_', ' ')}</span>
                      <Badge className={statusConfig[lead.status].color}>
                        {statusConfig[lead.status].label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lead Detail Dialog */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedLead.name}
              </DialogTitle>
              <DialogDescription>
                Lead details and activity history
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <p className="text-sm font-medium">{selectedLead.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="text-sm font-medium">{selectedLead.email || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Source</Label>
                  <p className="text-sm font-medium capitalize">{selectedLead.source.replace('_', ' ')}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Added On</Label>
                  <p className="text-sm font-medium">{formatDate(selectedLead.createdAt)}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Status</Label>
                <Select
                  value={selectedLead.status}
                  onValueChange={(value) => handleStatusChange(selectedLead._id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <SelectItem key={status} value={status}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedLead.notes && (
                <div>
                  <Label className="text-xs text-muted-foreground">Notes</Label>
                  <p className="text-sm mt-1 p-3 bg-muted/50 rounded-md">{selectedLead.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
