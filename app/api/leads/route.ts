import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Lead from '@/models/Lead'
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
    const source = searchParams.get('source')
    const search = searchParams.get('search')

    const query: any = { organizationId: decoded.organizationId }

    if (status) query.status = status
    if (source) query.source = source
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email')
      .limit(100)

    const stats = await Lead.aggregate([
      { $match: { organizationId: decoded.organizationId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    return NextResponse.json({ success: true, leads, stats })
  } catch (error: any) {
    console.error('Get leads error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch leads' },
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
    const { name, email, phone, source, interestedIn, assignedTo, notes } = body

    const lead = await Lead.create({
      organizationId: decoded.organizationId,
      name,
      email,
      phone,
      source: source || 'walk_in',
      interestedIn,
      assignedTo,
      notes,
      status: 'new',
      activities: [
        {
          type: 'note',
          description: 'Lead created',
          date: new Date(),
          createdBy: decoded.userId,
        },
      ],
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        lead,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create lead error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create lead' },
      { status: 500 }
    )
  }
}

