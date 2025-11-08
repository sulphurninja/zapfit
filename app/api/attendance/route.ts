import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Attendance from '@/models/Attendance'
import Member from '@/models/Member'
import { verifyToken } from '@/lib/jwt'

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const memberId = searchParams.get('memberId')

    const query: any = { organizationId: decoded.organizationId }

    if (date) {
      const selectedDate = new Date(date)
      query.date = {
        $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
        $lte: new Date(selectedDate.setHours(23, 59, 59, 999)),
      }
    } else {
      // Default to today
      const today = new Date()
      query.date = {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lte: new Date(today.setHours(23, 59, 59, 999)),
      }
    }

    if (memberId) {
      query.memberId = memberId
    }

    const attendance = await Attendance.find(query)
      .sort({ checkInTime: -1 })
      .populate('memberId', 'name membershipNumber email phone')

    // Get stats
    const today = new Date()
    const todayStart = new Date(today.setHours(0, 0, 0, 0))
    const todayEnd = new Date(today.setHours(23, 59, 59, 999))

    const todayCount = await Attendance.countDocuments({
      organizationId: decoded.organizationId,
      date: { $gte: todayStart, $lte: todayEnd },
    })

    const activeMembers = await Member.countDocuments({
      organizationId: decoded.organizationId,
      'subscription.status': 'active',
    })

    return NextResponse.json({
      success: true,
      attendance,
      stats: {
        todayCount,
        activeMembers,
        attendanceRate: activeMembers > 0 ? (todayCount / activeMembers) * 100 : 0,
      },
    })
  } catch (error: any) {
    console.error('Get attendance error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}

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
    const { memberId, method = 'manual', notes } = body

    // Check if member exists and is active
    const member = await Member.findById(memberId)
    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    if (member.subscription.status !== 'active') {
      return NextResponse.json(
        { success: false, message: 'Member subscription is not active' },
        { status: 400 }
      )
    }

    // Check if already checked in today
    const today = new Date()
    const todayStart = new Date(today.setHours(0, 0, 0, 0))
    const todayEnd = new Date(today.setHours(23, 59, 59, 999))

    const existingAttendance = await Attendance.findOne({
      memberId,
      date: { $gte: todayStart, $lte: todayEnd },
    })

    if (existingAttendance) {
      return NextResponse.json(
        { success: false, message: 'Member already checked in today' },
        { status: 400 }
      )
    }

    // Create attendance record
    const attendance = await Attendance.create({
      organizationId: decoded.organizationId,
      memberId,
      checkInTime: new Date(),
      method,
      notes,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Attendance marked successfully',
        attendance,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Mark attendance error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to mark attendance' },
      { status: 500 }
    )
  }
}

