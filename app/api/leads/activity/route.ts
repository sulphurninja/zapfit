import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Lead from '@/models/Lead'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { leadId, type, description } = body

    const lead = await Lead.findById(leadId)
    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }

    lead.activities.push({
      type,
      description,
      date: new Date(),
      createdBy: decoded.userId,
    })

    await lead.save()

    return NextResponse.json({
      success: true,
      message: 'Activity added successfully',
      lead,
    })
  } catch (error: any) {
    console.error('Add activity error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to add activity' },
      { status: 500 }
    )
  }
}

