// Zaptick.io WhatsApp API Integration

const ZAPTICK_API_KEY = process.env.ZAPTICK_API_KEY || ''
const ZAPTICK_API_URL = process.env.ZAPTICK_API_URL || 'https://api.zaptick.io/v1'

export interface WhatsAppMessage {
  to: string // Phone number with country code
  templateName: string
  templateParams?: Record<string, string>
  message?: string
}

export interface WhatsAppBroadcast {
  recipients: string[]
  templateName: string
  templateParams?: Record<string, string>
}

class ZaptickService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = ZAPTICK_API_KEY
    this.baseUrl = ZAPTICK_API_URL
  }

  private async makeRequest(endpoint: string, method: string, data?: any) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        throw new Error(`Zaptick API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Zaptick API request failed:', error)
      throw error
    }
  }

  // Send template message
  async sendTemplateMessage({ to, templateName, templateParams }: WhatsAppMessage) {
    return this.makeRequest('/messages/template', 'POST', {
      to,
      template: {
        name: templateName,
        params: templateParams,
      },
    })
  }

  // Send text message
  async sendTextMessage(to: string, message: string) {
    return this.makeRequest('/messages/text', 'POST', {
      to,
      message,
    })
  }

  // Send broadcast message
  async sendBroadcast({ recipients, templateName, templateParams }: WhatsAppBroadcast) {
    return this.makeRequest('/messages/broadcast', 'POST', {
      recipients,
      template: {
        name: templateName,
        params: templateParams,
      },
    })
  }

  // Pre-defined templates for common scenarios
  async sendWelcomeMessage(phoneNumber: string, memberName: string, gymName: string) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      templateName: 'welcome_message',
      templateParams: {
        member_name: memberName,
        gym_name: gymName,
      },
    })
  }

  async sendRenewalReminder(
    phoneNumber: string,
    memberName: string,
    expiryDate: string,
    planName: string
  ) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      templateName: 'renewal_reminder',
      templateParams: {
        member_name: memberName,
        expiry_date: expiryDate,
        plan_name: planName,
      },
    })
  }

  async sendPaymentReceipt(
    phoneNumber: string,
    memberName: string,
    amount: string,
    invoiceNumber: string
  ) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      templateName: 'payment_receipt',
      templateParams: {
        member_name: memberName,
        amount,
        invoice_number: invoiceNumber,
      },
    })
  }

  async sendExpiryNotification(
    phoneNumber: string,
    memberName: string,
    planName: string
  ) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      templateName: 'expiry_notification',
      templateParams: {
        member_name: memberName,
        plan_name: planName,
      },
    })
  }

  async sendLeadFollowUp(phoneNumber: string, leadName: string, gymName: string) {
    return this.sendTemplateMessage({
      to: phoneNumber,
      templateName: 'lead_followup',
      templateParams: {
        lead_name: leadName,
        gym_name: gymName,
      },
    })
  }

  // Get message delivery status
  async getMessageStatus(messageId: string) {
    return this.makeRequest(`/messages/${messageId}/status`, 'GET')
  }

  // Get campaign statistics
  async getCampaignStats(campaignId: string) {
    return this.makeRequest(`/campaigns/${campaignId}/stats`, 'GET')
  }
}

export const zaptickService = new ZaptickService()

