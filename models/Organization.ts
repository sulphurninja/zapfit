import mongoose, { Document, Schema } from 'mongoose'

export interface IOrganization extends Document {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  logo?: string
  ownerId: mongoose.Types.ObjectId
  subscription: {
    plan: 'starter' | 'growth' | 'pro' | 'white_label'
    status: 'active' | 'expired' | 'cancelled'
    startDate: Date
    endDate: Date
    amount: number
  }
  branches: Array<{
    name: string
    address: string
    phone: string
    isActive: boolean
  }>
  settings: {
    currency: string
    timezone: string
    dateFormat: string
    autoSuspendExpiredMembers: boolean
    whatsappEnabled: boolean
    reminderDays: number[]
  }
  zaptickConfig?: {
    apiKey: string
    phoneNumber: string
    isConnected: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    address: String,
    city: String,
    state: String,
    pincode: String,
    logo: String,
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscription: {
      plan: {
        type: String,
        enum: ['starter', 'growth', 'pro', 'white_label'],
        default: 'starter',
      },
      status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        default: 999,
      },
    },
    branches: [
      {
        name: String,
        address: String,
        phone: String,
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
    settings: {
      currency: {
        type: String,
        default: 'INR',
      },
      timezone: {
        type: String,
        default: 'Asia/Kolkata',
      },
      dateFormat: {
        type: String,
        default: 'DD/MM/YYYY',
      },
      autoSuspendExpiredMembers: {
        type: Boolean,
        default: true,
      },
      whatsappEnabled: {
        type: Boolean,
        default: false,
      },
      reminderDays: {
        type: [Number],
        default: [3, 0, -7],
      },
    },
    zaptickConfig: {
      apiKey: String,
      phoneNumber: String,
      isConnected: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema)

