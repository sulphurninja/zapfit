import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Trainer from '@/models/Trainer'
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

    const trainer = await Trainer.findOne({
      _id: id,
      organizationId: decoded.organizationId,
    }).populate('assignedMembers', 'name email phone membershipNumber')

    if (!trainer) {
      return NextResponse.json({ success: false, message: 'Trainer not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      trainer,
    })
  } catch (error: any) {
    console.error('Get trainer error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch trainer' },
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

    const trainer = await Trainer.findOneAndUpdate(
      {
        _id: id,
        organizationId: decoded.organizationId,
      },
      body,
      { new: true, runValidators: true }
    )

    if (!trainer) {
      return NextResponse.json({ success: false, message: 'Trainer not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Trainer updated successfully',
      trainer,
    })
  } catch (error: any) {
    console.error('Update trainer error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update trainer' },
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

    const trainer = await Trainer.findOneAndDelete({
      _id: id,
      organizationId: decoded.organizationId,
    })

    if (!trainer) {
      return NextResponse.json({ success: false, message: 'Trainer not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Trainer deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete trainer error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete trainer' },
      { status: 500 }
    )
  }
}

