import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Payment from '@/models/Payment'
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
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const query: any = { organizationId: decoded.organizationId }

    if (status) query.status = status
    if (startDate && endDate) {
      query.paymentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const payments = await Payment.find(query)
      .sort({ paymentDate: -1 })
      .populate('memberId', 'name email membershipNumber')
      .limit(100)

    // Calculate stats
    const stats = await Payment.aggregate([
      { $match: { organizationId: decoded.organizationId, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ])

    const monthlyStats = await Payment.aggregate([
      {
        $match: {
          organizationId: decoded.organizationId,
          status: 'completed',
          paymentDate: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ])

    return NextResponse.json({
      success: true,
      payments,
      stats: {
        totalRevenue: stats[0]?.totalRevenue || 0,
        totalPayments: stats[0]?.count || 0,
        monthlyRevenue: monthlyStats[0]?.monthlyRevenue || 0,
        monthlyPayments: monthlyStats[0]?.count || 0,
      },
    })
  } catch (error: any) {
    console.error('Get payments error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch payments' },
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
    const { memberId, amount, paymentMethod, paymentType, transactionId, notes } = body

    // Check if member exists
    const member = await Member.findById(memberId)
    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 })
    }

    // Create payment
    const payment = await Payment.create({
      organizationId: decoded.organizationId,
      memberId,
      amount,
      paymentMethod,
      paymentType: paymentType || 'membership',
      transactionId,
      notes,
      status: 'completed',
      paymentDate: new Date(),
      receiptSent: false,
      createdBy: decoded.userId,
    })

    // If it's a renewal payment, update member subscription
    if (paymentType === 'renewal' || paymentType === 'membership') {
      const currentEndDate = new Date(member.subscription.endDate)
      const newEndDate = new Date(currentEndDate)
      
      // Extend by plan duration (assuming monthly for now)
      newEndDate.setMonth(newEndDate.getMonth() + 1)

      await Member.findByIdAndUpdate(memberId, {
        'subscription.endDate': newEndDate,
        'subscription.status': 'active',
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment recorded successfully',
        payment,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create payment error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to record payment' },
      { status: 500 }
    )
  }
}

