import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Member'
import { verifyToken } from '@/lib/jwt'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

    const { id } = await context.params

    const member = await Member.findOne({
      _id: id,
      organizationId: decoded.organizationId,
    }).populate('assignedTrainerId', 'name email')

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      member,
    })
  } catch (error: any) {
    console.error('Get member error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch member' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

    const { id } = await context.params
    const body = await request.json()
    const { name, email, phone, address, emergencyContact, subscription } = body

    // Find the member first
    const existingMember = await Member.findOne({
      _id: id,
      organizationId: decoded.organizationId,
    })

    if (!existingMember) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    // Update fields
    if (name) existingMember.name = name
    if (email) existingMember.email = email.toLowerCase()
    if (phone) existingMember.phone = phone
    if (address !== undefined) existingMember.address = address
    if (emergencyContact !== undefined) existingMember.emergencyContact = emergencyContact

    // Update subscription if provided
    if (subscription) {
      if (subscription.planName) existingMember.subscription.planName = subscription.planName
      if (subscription.amount) existingMember.subscription.amount = subscription.amount
      if (subscription.startDate) existingMember.subscription.startDate = new Date(subscription.startDate)
      if (subscription.status) existingMember.subscription.status = subscription.status
      
      // Recalculate end date if start date changed
      if (subscription.startDate && existingMember.subscription.endDate) {
        const duration = Math.floor(
          (new Date(existingMember.subscription.endDate).getTime() - 
           new Date(existingMember.subscription.startDate).getTime()) / 
          (1000 * 60 * 60 * 24)
        )
        const newEndDate = new Date(subscription.startDate)
        newEndDate.setDate(newEndDate.getDate() + duration)
        existingMember.subscription.endDate = newEndDate
      }
    }

    await existingMember.save()

    return NextResponse.json({
      success: true,
      message: 'Member updated successfully',
      member: existingMember,
    })
  } catch (error: any) {
    console.error('Update member error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

    const { id } = await context.params

    const member = await Member.findOneAndDelete({
      _id: id,
      organizationId: decoded.organizationId,
    })

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete member error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete member' },
      { status: 500 }
    )
  }
}
