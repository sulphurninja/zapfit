import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Member'
import User from '@/models/User'
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
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const query: any = { organizationId: decoded.organizationId }

    if (status) {
      query['subscription.status'] = status
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { membershipNumber: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (page - 1) * limit

    const [members, total] = await Promise.all([
      Member.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('assignedTrainerId', 'name email'),
      Member.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      members,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Get members error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch members' },
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
    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      planId,
      planName,
      planDuration,
      amount,
      assignedTrainerId,
      emergencyContact,
      healthInfo,
    } = body

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() })
    
    if (!user) {
      // Create user account for member
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: phone.slice(-6), // Default password is last 6 digits of phone
        phone,
        role: 'member',
        organizationId: decoded.organizationId,
      })
    }

    // Calculate subscription dates
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + planDuration)

    // Create member
    const member = await Member.create({
      userId: user._id,
      organizationId: decoded.organizationId,
      name,
      email: email.toLowerCase(),
      phone,
      dateOfBirth,
      gender,
      address,
      subscription: {
        planId,
        planName,
        startDate,
        endDate,
        amount,
        status: 'active',
        autoRenewal: false,
      },
      assignedTrainerId,
      emergencyContact,
      healthInfo,
      joinDate: startDate,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Member created successfully',
        member,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create member error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create member' },
      { status: 500 }
    )
  }
}

