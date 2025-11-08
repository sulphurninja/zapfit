import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

// WhatsApp message templates
const templates = [
  {
    id: 'welcome_message',
    name: 'Welcome Message',
    category: 'onboarding',
    description: 'Sent to new members upon registration',
    status: 'active',
    variables: ['member_name', 'gym_name', 'membership_id'],
    content: 'Welcome to {{gym_name}}, {{member_name}}! 🎉\n\nYour membership ID is {{membership_id}}. We\'re excited to have you on your fitness journey!\n\nFor any questions, feel free to reach out to us.',
  },
  {
    id: 'renewal_reminder',
    name: 'Renewal Reminder',
    category: 'renewals',
    description: 'Sent 3 days before membership expiry',
    status: 'active',
    variables: ['member_name', 'expiry_date', 'plan_name', 'amount'],
    content: 'Hi {{member_name}},\n\nYour {{plan_name}} membership expires on {{expiry_date}}. 📅\n\nRenewal Amount: ₹{{amount}}\n\nRenew now to continue your fitness journey without interruption!',
  },
  {
    id: 'payment_receipt',
    name: 'Payment Receipt',
    category: 'billing',
    description: 'Sent after successful payment',
    status: 'active',
    variables: ['member_name', 'amount', 'invoice_number', 'payment_date'],
    content: 'Payment Received! ✅\n\nHi {{member_name}},\n\nThank you for your payment of ₹{{amount}}.\n\nInvoice: {{invoice_number}}\nDate: {{payment_date}}\n\nYour receipt will be sent to your email shortly.',
  },
  {
    id: 'expiry_notification',
    name: 'Expiry Notification',
    category: 'renewals',
    description: 'Sent on membership expiry date',
    status: 'active',
    variables: ['member_name', 'plan_name'],
    content: 'Membership Expired ⚠️\n\nHi {{member_name}},\n\nYour {{plan_name}} membership has expired today. Renew now to continue accessing the gym.\n\nVisit us or call to renew your membership!',
  },
  {
    id: 'lead_followup',
    name: 'Lead Follow-up',
    category: 'leads',
    description: 'Sent to leads for follow-up',
    status: 'active',
    variables: ['lead_name', 'gym_name'],
    content: 'Hi {{lead_name}}! 👋\n\nThank you for your interest in {{gym_name}}. We would love to help you achieve your fitness goals!\n\nWhen would be a good time for you to visit us?',
  },
  {
    id: 'birthday_wish',
    name: 'Birthday Wishes',
    category: 'engagement',
    description: 'Sent on member birthday',
    status: 'active',
    variables: ['member_name', 'gym_name'],
    content: 'Happy Birthday, {{member_name}}! 🎂🎉\n\nThe entire {{gym_name}} team wishes you a fantastic day filled with joy and celebrations!\n\nEnjoy a special workout session on us today! 💪',
  },
  {
    id: 'inactive_reminder',
    name: 'Inactive Member Reminder',
    category: 'engagement',
    description: 'Sent to members inactive for 7+ days',
    status: 'active',
    variables: ['member_name', 'days_inactive'],
    content: 'We Miss You! 😊\n\nHi {{member_name}},\n\nWe noticed you haven\'t visited in {{days_inactive}} days. Everything okay?\n\nYour fitness goals are waiting! Let\'s get back on track together! 💪',
  },
  {
    id: 'class_reminder',
    name: 'Class Reminder',
    category: 'classes',
    description: 'Sent 1 hour before class',
    status: 'active',
    variables: ['member_name', 'class_name', 'class_time', 'trainer_name'],
    content: 'Class Reminder! 🏋️\n\nHi {{member_name}},\n\n{{class_name}} starts at {{class_time}} with {{trainer_name}}.\n\nSee you soon!',
  },
  {
    id: 'achievement_milestone',
    name: 'Achievement Milestone',
    category: 'engagement',
    description: 'Celebrate member milestones',
    status: 'active',
    variables: ['member_name', 'milestone', 'gym_name'],
    content: 'Congratulations! 🎉\n\nHi {{member_name}},\n\nYou\'ve achieved {{milestone}}! The entire {{gym_name}} team is proud of your dedication and progress!\n\nKeep crushing those goals! 💪🔥',
  },
  {
    id: 'offer_promotion',
    name: 'Special Offers',
    category: 'marketing',
    description: 'Promotional offers and discounts',
    status: 'inactive',
    variables: ['member_name', 'offer_details', 'validity'],
    content: 'Special Offer! 🎁\n\nHi {{member_name}},\n\n{{offer_details}}\n\nValid till: {{validity}}\n\nDon\'t miss out on this amazing deal!',
  },
]

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    let filteredTemplates = [...templates]

    if (category) {
      filteredTemplates = filteredTemplates.filter(t => t.category === category)
    }

    if (status) {
      filteredTemplates = filteredTemplates.filter(t => t.status === status)
    }

    return NextResponse.json({
      success: true,
      templates: filteredTemplates,
      categories: ['onboarding', 'renewals', 'billing', 'leads', 'engagement', 'classes', 'marketing'],
    })
  } catch (error: any) {
    console.error('Get templates error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

