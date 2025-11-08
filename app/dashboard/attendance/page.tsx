'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
import { Calendar, Users, TrendingUp, Clock, Search, QrCode, UserCheck } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

interface AttendanceRecord {
  _id: string
  memberId: {
    name: string
    membershipNumber: string
    phone: string
  }
  checkInTime: string
  checkOutTime?: string
  method: string
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
  todayCount: number
  activeMembers: number
  attendanceRate: number
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [stats, setStats] = useState<Stats>({ todayCount: 0, activeMembers: 0, attendanceRate: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [memberSearch, setMemberSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [searching, setSearching] = useState(false)
  const [checkInDialog, setCheckInDialog] = useState(false)
  const [checkInResult, setCheckInResult] = useState<any>(null)

  useEffect(() => {
    fetchAttendance()
  }, [])

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
      const response = await fetch('/api/attendance')
      const data = await response.json()

      if (data.success) {
        setAttendance(data.attendance)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Fetch attendance error:', error)
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

  const handleCheckIn = async (memberId: string) => {
    try {
      const response = await fetch('/api/attendance/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      })

      const data = await response.json()
      setCheckInResult(data)
      
      if (data.success) {
        fetchAttendance()
        setMemberSearch('')
        setSearchResults([])
      }
    } catch (error) {
      console.error('Check-in error:', error)
      setCheckInResult({ success: false, message: 'Check-in failed' })
    }
  }

  const filteredAttendance = attendance.filter((record) =>
    record.memberId?.name.toLowerCase().includes(search.toLowerCase()) ||
    record.memberId?.membershipNumber.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading attendance...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground mt-2">
            Track member check-ins and attendance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCheckInDialog(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR
          </Button>
          <Button onClick={fetchAttendance}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              members checked in
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              with valid subscription
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              of active members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5h</div>
            <p className="text-xs text-muted-foreground mt-1">
              per session
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Quick Check-In
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
                <div
                  key={member._id}
                  className="flex items-center justify-between p-4 hover:bg-accent/50 transition"
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.membershipNumber} • {member.phone}
                    </p>
                    <Badge
                      variant={member.subscription.status === 'active' ? 'success' : 'destructive'}
                      className="mt-1"
                    >
                      {member.subscription.status}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleCheckIn(member._id)}
                    disabled={member.subscription.status !== 'active'}
                  >
                    Check In
                  </Button>
                </div>
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

      {/* Search existing attendance */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search today's attendance..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAttendance.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No attendance records found for today.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell className="font-medium">
                      {record.memberId?.membershipNumber}
                    </TableCell>
                    <TableCell>{record.memberId?.name}</TableCell>
                    <TableCell>{record.memberId?.phone}</TableCell>
                    <TableCell>{formatDateTime(record.checkInTime)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {record.method}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* QR Scanner Dialog */}
      <Dialog open={checkInDialog} onOpenChange={setCheckInDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code Scanner</DialogTitle>
            <DialogDescription>
              Scan member QR code to check in
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">QR Scanner</p>
              <p className="text-xs text-muted-foreground mt-1">Camera access required</p>
              <Button className="mt-4" onClick={() => setCheckInDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Check-in Result Dialog */}
      {checkInResult && (
        <Dialog open={!!checkInResult} onOpenChange={() => setCheckInResult(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {checkInResult.success ? 'Check-in Successful!' : 'Check-in Failed'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className={checkInResult.success ? 'text-green-600' : 'text-red-600'}>
                {checkInResult.message}
              </p>
              {checkInResult.member && (
                <div className="mt-4 p-4 bg-accent rounded-lg">
                  <p className="font-medium">{checkInResult.member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {checkInResult.member.membershipNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {checkInResult.member.planName}
                  </p>
                </div>
              )}
            </div>
            <Button onClick={() => setCheckInResult(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
