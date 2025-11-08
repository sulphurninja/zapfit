import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Organization from '@/models/Organization'
import { signToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, password, phone, organizationName, role = 'gym_owner' } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role,
    })

    // Create organization if gym_owner
    let organization = null
    if (role === 'gym_owner' && organizationName) {
      const subscriptionEndDate = new Date()
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1) // 1 month trial

      organization = await Organization.create({
        name: organizationName,
        email: email.toLowerCase(),
        phone: phone || '',
        ownerId: user._id,
        subscription: {
          plan: 'starter',
          status: 'active',
          startDate: new Date(),
          endDate: subscriptionEndDate,
          amount: 999,
        },
      })

      // Update user with organizationId
      user.organizationId = organization._id
      await user.save()
    }

    // Generate JWT token
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      organizationId: organization?._id.toString(),
    })

    const response = NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          organizationId: organization?._id,
        },
        token,
      },
      { status: 201 }
    )

    // Set token in cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}

