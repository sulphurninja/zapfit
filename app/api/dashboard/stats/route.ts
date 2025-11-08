import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Member'
import Payment from '@/models/Payment'
import Lead from '@/models/Lead'
import Attendance from '@/models/Attendance'
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

    const orgId = decoded.organizationId

    // Get current month dates
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

    // Parallel queries for better performance
    const [
      totalMembers,
      activeMembers,
      expiredMembers,
      newThisMonth,
      totalRevenue,
      monthlyRevenue,
      todayAttendance,
      upcomingRenewals,
      pendingLeads,
      pendingDues,
      recentMembers,
      recentPayments,
    ] = await Promise.all([
      // Total members
      Member.countDocuments({ organizationId: orgId, isActive: true }),
      
      // Active members
      Member.countDocuments({ 
        organizationId: orgId, 
        isActive: true,
        'subscription.status': 'active'
      }),
      
      // Expired members
      Member.countDocuments({ 
        organizationId: orgId, 
        isActive: true,
        'subscription.status': 'expired'
      }),
      
      // New members this month
      Member.countDocuments({
        organizationId: orgId,
        createdAt: { $gte: startOfMonth }
      }),
      
      // Total revenue (all time)
      Payment.aggregate([
        { $match: { organizationId: orgId, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]).then(result => result[0]?.total || 0),
      
      // Monthly revenue
      Payment.aggregate([
        { 
          $match: { 
            organizationId: orgId, 
            status: 'completed',
            paymentDate: { $gte: startOfMonth }
          } 
        },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]).then(result => result[0]?.total || 0),
      
      // Today's attendance
      Attendance.countDocuments({
        organizationId: orgId,
        date: { $gte: startOfToday, $lte: endOfToday }
      }),
      
      // Upcoming renewals (next 7 days)
      Member.countDocuments({
        organizationId: orgId,
        'subscription.status': 'active',
        'subscription.endDate': {
          $gte: now,
          $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }),
      
      // Pending leads
      Lead.countDocuments({
        organizationId: orgId,
        status: { $in: ['new', 'contacted', 'interested'] }
      }),
      
      // Pending dues - members with expired subscriptions
      Member.countDocuments({
        organizationId: orgId,
        'subscription.status': 'expired',
        'subscription.endDate': { $lt: now }
      }),
      
      // Recent members (last 5)
      Member.find({ organizationId: orgId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name subscription.planName createdAt'),
      
      // Recent payments (last 5)
      Payment.find({ organizationId: orgId, status: 'completed' })
        .sort({ paymentDate: -1 })
        .limit(5)
        .populate('memberId', 'name')
        .select('amount paymentMethod paymentDate memberId')
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        expiredMembers,
        newThisMonth,
        totalRevenue,
        monthlyRevenue,
        todayAttendance,
        upcomingRenewals,
        pendingLeads,
        pendingDues,
      },
      recentMembers: recentMembers.map(m => ({
        name: m.name,
        plan: m.subscription.planName,
        date: m.createdAt,
      })),
      recentPayments: recentPayments.map(p => ({
        name: p.memberId?.name || 'Unknown',
        amount: p.amount,
        method: p.paymentMethod,
        date: p.paymentDate,
      })),
    })
  } catch (error: any) {
    console.error('Get dashboard stats error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

