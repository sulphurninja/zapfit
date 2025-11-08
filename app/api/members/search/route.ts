import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
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
    const query = searchParams.get('q') || ''

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, members: [] })
    }

    const members = await Member.find({
      organizationId: decoded.organizationId,
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { membershipNumber: { $regex: query, $options: 'i' } },
      ],
    })
      .select('name email phone membershipNumber subscription.status subscription.planName')
      .limit(10)

    return NextResponse.json({ success: true, members })
  } catch (error: any) {
    console.error('Search members error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to search members' },
      { status: 500 }
    )
  }
}

