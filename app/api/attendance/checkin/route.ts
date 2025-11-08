import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Attendance from '@/models/Attendance'
import Member from '@/models/Member'
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
    const { memberId, membershipNumber, method = 'manual' } = body

    // Find member by ID or membership number
    let member
    if (memberId) {
      member = await Member.findById(memberId)
    } else if (membershipNumber) {
      member = await Member.findOne({ 
        membershipNumber,
        organizationId: decoded.organizationId 
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Member ID or membership number required' },
        { status: 400 }
      )
    }

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    // Check if subscription is active
    if (member.subscription.status !== 'active') {
      return NextResponse.json(
        { 
          success: false, 
          message: `Cannot check in. Subscription is ${member.subscription.status}`,
          member: {
            name: member.name,
            status: member.subscription.status,
            endDate: member.subscription.endDate
          }
        },
        { status: 400 }
      )
    }

    // Check if already checked in today
    const today = new Date()
    const todayStart = new Date(today.setHours(0, 0, 0, 0))
    const todayEnd = new Date(today.setHours(23, 59, 59, 999))

    const existingAttendance = await Attendance.findOne({
      memberId: member._id,
      date: { $gte: todayStart, $lte: todayEnd },
    })

    if (existingAttendance) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Already checked in today',
          attendance: existingAttendance
        },
        { status: 400 }
      )
    }

    // Create attendance record
    const attendance = await Attendance.create({
      organizationId: decoded.organizationId,
      memberId: member._id,
      checkInTime: new Date(),
      method,
    })

    return NextResponse.json(
      {
        success: true,
        message: `Welcome ${member.name}! Checked in successfully`,
        attendance,
        member: {
          name: member.name,
          membershipNumber: member.membershipNumber,
          planName: member.subscription.planName,
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Check-in error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to check in' },
      { status: 500 }
    )
  }
}

