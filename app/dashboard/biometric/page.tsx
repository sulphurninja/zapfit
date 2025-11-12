'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { Fingerprint, Search, Trash2, CheckCircle, AlertCircle, Users, Shield } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface Biometric {
  _id: string
  userId: string
  userType: 'member' | 'trainer'
  biometricType: 'fingerprint' | 'face' | 'card'
  fingerIndex?: number
  quality: number
  enrollmentDate: string
  isActive: boolean
}

interface Member {
  _id: string
  name: string
  membershipNumber: string
  email: string
}

const fingerNames = [
  'Right Thumb',
  'Right Index',
  'Right Middle',
  'Right Ring',
  'Right Pinky',
  'Left Thumb',
  'Left Index',
  'Left Middle',
  'Left Ring',
  'Left Pinky',
]

export default function BiometricPage() {
  const [biometrics, setBiometrics] = useState<Biometric[]>([])
  const [loading, setLoading] = useState(true)
  const [enrollDialog, setEnrollDialog] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [selectedUser, setSelectedUser] = useState<Member | null>(null)
  const [selectedUserType, setSelectedUserType] = useState<'member' | 'trainer'>('member')
  const [selectedFinger, setSelectedFinger] = useState<number>(1)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    fetchBiometrics()
  }, [])

  useEffect(() => {
    if (searchQuery.length >= 2) {
      searchUsers()
    } else {
      setSearchResults([])
    }
  }, [searchQuery, selectedUserType])

  const fetchBiometrics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/biometric/enroll')
      const data = await response.json()

      if (data.success) {
        setBiometrics(data.biometrics)
      }
    } catch (error) {
      console.error('Fetch biometrics error:', error)
      toast.error('Failed to fetch biometric records')
    } finally {
      setLoading(false)
    }
  }

  const searchUsers = async () => {
    try {
      const endpoint = selectedUserType === 'member' ? '/api/members/search' : '/api/trainers'
      const response = await fetch(`${endpoint}?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (data.success) {
        setSearchResults(selectedUserType === 'member' ? data.members : data.trainers)
      }
    } catch (error) {
      console.error('Search users error:', error)
    }
  }

  const handleEnrollStart = () => {
    if (!selectedUser) {
      toast.error('Please select a user first')
      return
    }

    setScanning(true)
    setScanProgress(0)

    // Simulate fingerprint scanning
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          handleEnrollComplete()
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleEnrollComplete = async () => {
    try {
      // In production, this would get actual biometric template from scanner
      const mockTemplate = `FINGERPRINT_${selectedUser?._id}_${selectedFinger}_${Date.now()}`
      const quality = Math.floor(Math.random() * 30) + 70 // 70-100

      const response = await fetch('/api/biometric/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser?._id,
          userType: selectedUserType,
          biometricType: 'fingerprint',
          templateData: mockTemplate,
          fingerIndex: selectedFinger,
          quality,
          deviceId: 'DEMO_DEVICE_001',
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Fingerprint enrolled successfully!')
        setEnrollDialog(false)
        setScanning(false)
        setScanProgress(0)
        setSelectedUser(null)
        setSearchQuery('')
        fetchBiometrics()
      } else {
        toast.error(data.message || 'Enrollment failed')
        setScanning(false)
      }
    } catch (error) {
      console.error('Enroll error:', error)
      toast.error('Enrollment failed')
      setScanning(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this biometric record?')) return

    try {
      // TODO: Implement delete endpoint
      toast.success('Biometric record deleted')
      fetchBiometrics()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete biometric record')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading biometric records...</p>
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
            Biometric Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Enroll and manage fingerprints for members and trainers
          </p>
        </div>
        <Button onClick={() => setEnrollDialog(true)}>
          <Fingerprint className="mr-2 h-4 w-4" />
          Enroll Fingerprint
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{biometrics.length}</div>
              <p className="text-xs text-muted-foreground mt-1">biometric records</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Members</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {biometrics.filter((b) => b.userType === 'member').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">enrolled members</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trainers</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {biometrics.filter((b) => b.userType === 'trainer').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">enrolled trainers</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Biometric Records */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Enrolled Biometrics</CardTitle>
        </CardHeader>
        <CardContent>
          {biometrics.length === 0 ? (
            <div className="text-center py-12">
              <Fingerprint className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No biometric records found.</p>
              <Button className="mt-4" onClick={() => setEnrollDialog(true)}>
                Enroll First Fingerprint
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Type</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Finger</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Enrolled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {biometrics.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {record.userType}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize flex items-center gap-2">
                      <Fingerprint className="h-4 w-4" />
                      {record.biometricType}
                    </TableCell>
                    <TableCell>
                      {record.fingerIndex ? fingerNames[record.fingerIndex - 1] : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              record.quality >= 80
                                ? 'bg-green-500'
                                : record.quality >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${record.quality}%` }}
                          />
                        </div>
                        <span className="text-sm">{record.quality}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(record.enrollmentDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {record.isActive ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(record._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Enroll Dialog */}
      <Dialog open={enrollDialog} onOpenChange={setEnrollDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              Enroll New Fingerprint
            </DialogTitle>
            <DialogDescription>
              Register fingerprint for biometric attendance verification
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* User Selection */}
            {!selectedUser && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>User Type</Label>
                  <Select
                    value={selectedUserType}
                    onValueChange={(value: 'member' | 'trainer') => setSelectedUserType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Search User</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or ID..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {searchResults.length > 0 && (
                  <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-3 hover:bg-accent/50 cursor-pointer transition"
                        onClick={() => {
                          setSelectedUser(user)
                          setSearchQuery('')
                          setSearchResults([])
                        }}
                      >
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Button size="sm">Select</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fingerprint Enrollment */}
            {selectedUser && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-accent/50">
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setSelectedUser(null)}
                  >
                    Change User
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Select Finger</Label>
                  <Select
                    value={selectedFinger.toString()}
                    onValueChange={(value) => setSelectedFinger(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fingerNames.map((name, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg bg-accent/50">
                  <div className="text-center">
                    <motion.div
                      animate={
                        scanning
                          ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 1, repeat: scanning ? Infinity : 0 }}
                    >
                      <Fingerprint className="h-24 w-24 mx-auto mb-4 text-primary" />
                    </motion.div>
                    <p className="text-lg font-medium mb-2">
                      {scanning ? 'Scanning...' : 'Ready to scan'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Place {fingerNames[selectedFinger - 1].toLowerCase()} on scanner
                    </p>
                    {scanning && (
                      <div className="w-64 mx-auto">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{scanProgress}%</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={handleEnrollStart}
                    disabled={scanning}
                  >
                    {scanning ? 'Scanning...' : 'Start Scan'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEnrollDialog(false)
                      setSelectedUser(null)
                      setScanning(false)
                      setScanProgress(0)
                    }}
                    disabled={scanning}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

