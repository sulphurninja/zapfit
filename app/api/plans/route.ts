import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Plan from '@/models/Plan'
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

    const plans = await Plan.find({
      organizationId: decoded.organizationId,
      isActive: true,
    }).sort({ amount: 1 })

    return NextResponse.json({ success: true, plans })
  } catch (error: any) {
    console.error('Get plans error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch plans' },
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
    const { name, description, duration, durationType, amount, features } = body

    const plan = await Plan.create({
      organizationId: decoded.organizationId,
      name,
      description,
      duration,
      durationType,
      amount,
      features,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Plan created successfully',
        plan,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create plan error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create plan' },
      { status: 500 }
    )
  }
}

