import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Organization from '@/models/Organization'
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

    const organization = await Organization.findById(decoded.organizationId)
    if (!organization) {
      return NextResponse.json({ success: false, message: 'Organization not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, organization })
  } catch (error: any) {
    console.error('Get organization error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch organization' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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
    const { name, email, phone, address, city, state, pincode, settings, zaptickConfig } = body

    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (phone) updateData.phone = phone
    if (address !== undefined) updateData.address = address
    if (city !== undefined) updateData.city = city
    if (state !== undefined) updateData.state = state
    if (pincode !== undefined) updateData.pincode = pincode
    if (settings) updateData.settings = settings
    if (zaptickConfig) updateData.zaptickConfig = zaptickConfig

    const organization = await Organization.findByIdAndUpdate(
      decoded.organizationId,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!organization) {
      return NextResponse.json({ success: false, message: 'Organization not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Organization updated successfully',
      organization,
    })
  } catch (error: any) {
    console.error('Update organization error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update organization' },
      { status: 500 }
    )
  }
}

