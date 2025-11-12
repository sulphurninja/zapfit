import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Biometric from '@/models/Biometric'
import Member from '@/models/Member'
import Trainer from '@/models/Trainer'
import { verifyToken } from '@/lib/jwt'

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
      userId,
      userType,
      biometricType,
      templateData,
      fingerIndex,
      quality,
      deviceId,
    } = body

    // Verify user exists
    if (userType === 'member') {
      const member = await Member.findOne({ _id: userId, organizationId: decoded.organizationId })
      if (!member) {
        return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
      }
    } else if (userType === 'trainer') {
      const trainer = await Trainer.findOne({ _id: userId, organizationId: decoded.organizationId })
      if (!trainer) {
        return NextResponse.json({ success: false, message: 'Trainer not found' }, { status: 404 })
      }
    }

    // Check if biometric already exists for this user and finger/type
    const existing = await Biometric.findOne({
      userId,
      biometricType,
      fingerIndex: fingerIndex || undefined,
      isActive: true,
    })

    if (existing) {
      // Update existing biometric
      existing.templateData = templateData
      existing.quality = quality
      existing.deviceId = deviceId
      existing.enrolledBy = decoded.userId
      existing.enrollmentDate = new Date()
      await existing.save()

      return NextResponse.json({
        success: true,
        message: 'Biometric updated successfully',
        biometric: existing,
      })
    }

    // Create new biometric record
    const biometric = await Biometric.create({
      userId,
      organizationId: decoded.organizationId,
      userType,
      biometricType,
      templateData,
      fingerIndex,
      quality,
      enrolledBy: decoded.userId,
      deviceId,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Biometric enrolled successfully',
        biometric: {
          _id: biometric._id,
          userId: biometric.userId,
          biometricType: biometric.biometricType,
          quality: biometric.quality,
          enrollmentDate: biometric.enrollmentDate,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Enroll biometric error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to enroll biometric' },
      { status: 500 }
    )
  }
}

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
    const userId = searchParams.get('userId')
    const userType = searchParams.get('userType')

    const query: any = { organizationId: decoded.organizationId, isActive: true }
    if (userId) query.userId = userId
    if (userType) query.userType = userType

    const biometrics = await Biometric.find(query).select('-templateData')

    return NextResponse.json({
      success: true,
      biometrics,
    })
  } catch (error: any) {
    console.error('Get biometrics error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch biometrics' },
      { status: 500 }
    )
  }
}

