import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Member'
import { verifyToken } from '@/lib/jwt'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const member = await Member.findById(id).populate('assignedTrainerId', 'name email')

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, member })
  } catch (error: any) {
    console.error('Get member error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch member' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const body = await request.json()

    const member = await Member.findByIdAndUpdate(id, body, { new: true, runValidators: true })

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member updated successfully',
      member,
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
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params
    const member = await Member.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    )

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member deactivated successfully',
    })
  } catch (error: any) {
    console.error('Delete member error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete member' },
      { status: 500 }
    )
  }
}

