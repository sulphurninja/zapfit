'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Search,
  QrCode,
  UserCheck,
  Fingerprint,
  LogIn,
  LogOut,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface AttendanceRecord {
  _id: string
  userId: string
  userName: string
  userType: 'member' | 'trainer'
  checkInTime: string
  checkOutTime?: string
  duration?: number
  attendanceType: 'biometric' | 'manual' | 'qr'
  verificationMethod?: 'fingerprint' | 'face' | 'card' | 'manual'
  location?: string
}

interface Member {
  _id: string
  name: string
  membershipNumber: string
  phone: string
  subscription: {
    status: string
    planName: string
  }
}

interface Stats {
  totalRecords: number
  checkedIn: number
  checkedOut: number
  avgDuration: number
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [stats, setStats] = useState<Stats>({
    totalRecords: 0,
    checkedIn: 0,
    checkedOut: 0,
    avgDuration: 0,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [memberSearch, setMemberSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [searching, setSearching] = useState(false)
  const [biometricDialog, setBiometricDialog] = useState(false)
  const [enrollDialog, setEnrollDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filterType, setFilterType] = useState<'all' | 'member' | 'trainer'>('all')

  useEffect(() => {
    fetchAttendance()
  }, [selectedDate])

  useEffect(() => {
    if (memberSearch.length >= 2) {
      searchMembers()
    } else {
      setSearchResults([])
    }
  }, [memberSearch])

  const fetchAttendance = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/attendance?date=${selectedDate}`)
      const data = await response.json()

      if (data.success) {
        setAttendance(data.attendance)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Fetch attendance error:', error)
      toast.error('Failed to fetch attendance')
    } finally {
      setLoading(false)
    }
  }

  const searchMembers = async () => {
    try {
      setSearching(true)
      const response = await fetch(`/api/members/search?q=${encodeURIComponent(memberSearch)}`)
      const data = await response.json()

      if (data.success) {
        setSearchResults(data.members)
      }
    } catch (error) {
      console.error('Search members error:', error)
    } finally {
      setSearching(false)
    }
  }

  const handleManualCheckIn = async (userId: string, userType: 'member' | 'trainer', userName: string) => {
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          userType,
          userName,
          checkInTime: new Date().toISOString(),
          attendanceType: 'manual',
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Check-in successful!')
        fetchAttendance()
        setMemberSearch('')
        setSearchResults([])
      } else {
        toast.error(data.message || 'Check-in failed')
      }
    } catch (error) {
      console.error('Check-in error:', error)
      toast.error('Check-in failed')
    }
  }

  const handleExport = () => {
    const csv = [
      ['User Name', 'Type', 'Check-in', 'Check-out', 'Duration (min)', 'Method', 'Location'],
      ...filteredAttendance.map((record) => [
        record.userName,
        record.userType,
        new Date(record.checkInTime).toLocaleString(),
        record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : '-',
        record.duration || '-',
        record.verificationMethod || record.attendanceType,
        record.location || '-',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance-${selectedDate}.csv`
    a.click()
    toast.success('Attendance exported successfully!')
  }

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(search.toLowerCase()) ||
      record.userType.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'all' || record.userType === filterType
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading attendance...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Attendance
          </h1>
          <p className="text-muted-foreground mt-2">
            Track member and trainer attendance with biometric verification
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setBiometricDialog(true)}>
            <Fingerprint className="mr-2 h-4 w-4" />
            Biometric
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={fetchAttendance}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRecords}</div>
              <p className="text-xs text-muted-foreground mt-1">attendance records</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <LogIn className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.checkedIn}</div>
              <p className="text-xs text-muted-foreground mt-1">currently in gym</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
              <LogOut className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.checkedOut}</div>
              <p className="text-xs text-muted-foreground mt-1">completed sessions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {Math.round(stats.avgDuration)}m
              </div>
              <p className="text-xs text-muted-foreground mt-1">per session</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Check-in */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Quick Manual Check-In
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search member by name, phone, or membership number..."
              className="pl-10"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
            />
          </div>

          {searching && (
            <p className="text-sm text-muted-foreground text-center py-4">Searching...</p>
          )}

          {searchResults.length > 0 && (
            <div className="border rounded-lg divide-y">
              {searchResults.map((member) => (
                <motion.div
                  key={member._id}
                  whileHover={{ backgroundColor: 'rgba(var(--accent), 0.5)' }}
                  className="flex items-center justify-between p-4 transition"
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.membershipNumber} • {member.phone}
                    </p>
                    <Badge
                      variant={member.subscription.status === 'active' ? 'default' : 'destructive'}
                      className="mt-1"
                    >
                      {member.subscription.status}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleManualCheckIn(member._id, 'member', member.name)}
                    disabled={member.subscription.status !== 'active'}
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Check In
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          {memberSearch.length >= 2 && !searching && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No members found. Try a different search term.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance Records</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={filterType === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'member' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('member')}
                >
                  Members
                </Button>
                <Button
                  variant={filterType === 'trainer' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('trainer')}
                >
                  Trainers
                </Button>
              </div>
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search attendance records..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredAttendance.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No attendance records found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="font-medium">{record.userName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {record.userType}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(record.checkInTime).toLocaleTimeString()}</TableCell>
                    <TableCell>
                      {record.checkOutTime
                        ? new Date(record.checkOutTime).toLocaleTimeString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {record.duration ? `${Math.round(record.duration)} min` : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={record.attendanceType === 'biometric' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {record.verificationMethod === 'fingerprint' && (
                          <Fingerprint className="mr-1 h-3 w-3" />
                        )}
                        {record.verificationMethod || record.attendanceType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.checkOutTime ? (
                        <Badge variant="secondary">
                          <LogOut className="mr-1 h-3 w-3" />
                          Out
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-500">
                          <LogIn className="mr-1 h-3 w-3" />
                          In
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Biometric Check-in Dialog */}
      <Dialog open={biometricDialog} onOpenChange={setBiometricDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              Biometric Attendance System
            </DialogTitle>
            <DialogDescription>
              Use fingerprint scanner for automated attendance tracking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg bg-accent/50">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Fingerprint className="h-24 w-24 mx-auto mb-4 text-primary" />
                </motion.div>
                <p className="text-lg font-medium mb-2">Place finger on scanner</p>
                <p className="text-sm text-muted-foreground">
                  Biometric device integration required
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-xs text-muted-foreground">Supported devices:</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span>ZKTeco</span>
                    <span>•</span>
                    <span>eSSL</span>
                    <span>•</span>
                    <span>Anviz</span>
                    <span>•</span>
                    <span>Hikvision</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setEnrollDialog(true)}>
                <Fingerprint className="mr-2 h-4 w-4" />
                Enroll Fingerprint
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setBiometricDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enroll Fingerprint Dialog */}
      <Dialog open={enrollDialog} onOpenChange={setEnrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll New Fingerprint</DialogTitle>
            <DialogDescription>
              Register fingerprint for biometric attendance
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground text-center">
              Feature available with biometric device integration.
            </p>
            <Button className="w-full mt-4" onClick={() => setEnrollDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
