import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Trainer from '@/models/Trainer'
import User from '@/models/User'
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
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')

    const query: any = { organizationId: decoded.organizationId }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (page - 1) * limit

    const [trainers, total] = await Promise.all([
      Trainer.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('assignedMembers', 'name email'),
      Trainer.countDocuments(query),
    ])

    // Calculate stats
    const stats = {
      total: total,
      activeTrainers: trainers.filter((t) => t.isActive).length,
      totalClients: trainers.reduce((sum, t) => sum + t.assignedMembers.length, 0),
      avgRating: trainers.reduce((sum, t) => sum + (t.rating || 0), 0) / (trainers.length || 1),
    }

    return NextResponse.json({
      success: true,
      trainers,
      stats,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Get trainers error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch trainers' },
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
      password,
      specialization,
      certifications,
      experience,
      bio,
      commissionRate,
    } = body

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      // Create user account for trainer
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: password || phone.slice(-6), // Default password is last 6 digits of phone
        phone,
        role: 'trainer',
        organizationId: decoded.organizationId,
      })
    }

    // Create trainer profile
    const trainer = await Trainer.create({
      userId: user._id,
      organizationId: decoded.organizationId,
      name,
      email: email.toLowerCase(),
      phone,
      specialization: specialization || [],
      certifications: certifications || [],
      experience: experience || 0,
      bio,
      commissionRate: commissionRate || 0,
      assignedMembers: [],
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Trainer created successfully',
        trainer,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create trainer error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create trainer' },
      { status: 500 }
    )
  }
}

