import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Biometric from '@/models/Biometric'
import Attendance from '@/models/Attendance'
import Member from '@/models/Member'
import Trainer from '@/models/Trainer'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || !decoded.organizationId) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { templateData, biometricType, deviceId, location } = body

    // In a real implementation, you would use a biometric matching algorithm
    // For now, we'll do a simple string comparison (NOT SECURE - for demo only)
    // In production, use proper biometric matching libraries

    const biometric = await Biometric.findOne({
      organizationId: decoded.organizationId,
      biometricType,
      templateData, // In production, use proper matching algorithm
      isActive: true,
    })

    if (!biometric) {
      return NextResponse.json(
        { success: false, message: 'Biometric not recognized' },
        { status: 404 }
      )
    }

    // Get user details
    let user: any
    let userName: string

    if (biometric.userType === 'member') {
      user = await Member.findById(biometric.userId)
      userName = user?.name || 'Unknown Member'
    } else {
      user = await Trainer.findById(biometric.userId)
      userName = user?.name || 'Unknown Trainer'
    }

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    // Check if there's an open attendance record for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingAttendance = await Attendance.findOne({
      userId: biometric.userId,
      organizationId: decoded.organizationId,
      date: today,
      checkOutTime: null,
    })

    let attendance
    let action: 'check-in' | 'check-out'

    if (existingAttendance) {
      // Check out
      existingAttendance.checkOutTime = new Date()
      const durationMs =
        existingAttendance.checkOutTime.getTime() - existingAttendance.checkInTime.getTime()
      existingAttendance.duration = Math.floor(durationMs / (1000 * 60))
      await existingAttendance.save()
      attendance = existingAttendance
      action = 'check-out'
    } else {
      // Check in
      attendance = await Attendance.create({
        userId: biometric.userId,
        organizationId: decoded.organizationId,
        userType: biometric.userType,
        userName,
        checkInTime: new Date(),
        date: today,
        attendanceType: 'biometric',
        biometricDeviceId: deviceId,
        verificationMethod: biometricType,
        location,
      })
      action = 'check-in'
    }

    return NextResponse.json({
      success: true,
      action,
      message: `${action === 'check-in' ? 'Checked in' : 'Checked out'} successfully`,
      attendance: {
        _id: attendance._id,
        userName,
        userType: biometric.userType,
        checkInTime: attendance.checkInTime,
        checkOutTime: attendance.checkOutTime,
        duration: attendance.duration,
      },
      user: {
        name: userName,
        type: biometric.userType,
      },
    })
  } catch (error: any) {
    console.error('Verify biometric error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to verify biometric' },
      { status: 500 }
    )
  }
}

