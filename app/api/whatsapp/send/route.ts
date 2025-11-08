import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { zaptickService } from '@/lib/zaptick'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { type, to, ...params } = body

    let result

    switch (type) {
      case 'welcome':
        result = await zaptickService.sendWelcomeMessage(to, params.memberName, params.gymName)
        break
      case 'renewal':
        result = await zaptickService.sendRenewalReminder(
          to,
          params.memberName,
          params.expiryDate,
          params.planName
        )
        break
      case 'payment':
        result = await zaptickService.sendPaymentReceipt(
          to,
          params.memberName,
          params.amount,
          params.invoiceNumber
        )
        break
      case 'expiry':
        result = await zaptickService.sendExpiryNotification(to, params.memberName, params.planName)
        break
      case 'lead':
        result = await zaptickService.sendLeadFollowUp(to, params.leadName, params.gymName)
        break
      case 'custom':
        result = await zaptickService.sendTextMessage(to, params.message)
        break
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid message type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent successfully',
      result,
    })
  } catch (error: any) {
    console.error('Send WhatsApp message error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send WhatsApp message' },
      { status: 500 }
    )
  }
}

