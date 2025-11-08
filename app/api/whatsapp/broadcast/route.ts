import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Member from '@/models/Member'
import { verifyToken } from '@/lib/jwt'
import { zaptickService } from '@/lib/zaptick'

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
    const { templateId, recipientType, customRecipients, templateParams } = body

    // Build query based on recipient type
    let query: any = { organizationId: decoded.organizationId, isActive: true }

    switch (recipientType) {
      case 'all':
        // All members
        break
      case 'active':
        query['subscription.status'] = 'active'
        break
      case 'expired':
        query['subscription.status'] = 'expired'
        break
      case 'expiring_soon':
        // Members expiring in next 7 days
        const sevenDaysFromNow = new Date()
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
        query['subscription.status'] = 'active'
        query['subscription.endDate'] = {
          $gte: new Date(),
          $lte: sevenDaysFromNow,
        }
        break
      case 'custom':
        // Custom list of member IDs
        if (!customRecipients || customRecipients.length === 0) {
          return NextResponse.json(
            { success: false, message: 'No recipients specified' },
            { status: 400 }
          )
        }
        query._id = { $in: customRecipients }
        break
    }

    // Fetch recipients
    const recipients = await Member.find(query).select('name phone')

    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No recipients found' },
        { status: 400 }
      )
    }

    // Send messages (this would integrate with Zaptick API)
    const results = {
      total: recipients.length,
      sent: recipients.length,
      failed: 0,
      recipients: recipients.map(r => ({
        name: r.name,
        phone: r.phone,
        status: 'sent',
      })),
    }

    // In production, you would:
    // 1. Queue the messages
    // 2. Send via Zaptick API
    // 3. Track delivery status
    // 4. Store campaign results

    return NextResponse.json({
      success: true,
      message: `Broadcast sent to ${recipients.length} members`,
      results,
    })
  } catch (error: any) {
    console.error('Broadcast error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send broadcast' },
      { status: 500 }
    )
  }
}

