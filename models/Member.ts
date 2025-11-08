import mongoose, { Document, Schema } from 'mongoose'

export interface IMember extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  organizationId: mongoose.Types.ObjectId
  membershipNumber: string
  name: string
  email: string
  phone: string
  dateOfBirth?: Date
  gender?: 'male' | 'female' | 'other'
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relation: string
  }
  healthInfo?: {
    bloodGroup?: string
    height?: number
    weight?: number
    medicalConditions?: string[]
    allergies?: string[]
  }
  subscription: {
    planId: mongoose.Types.ObjectId
    planName: string
    startDate: Date
    endDate: Date
    amount: number
    status: 'active' | 'expired' | 'suspended'
    autoRenewal: boolean
  }
  assignedTrainerId?: mongoose.Types.ObjectId
  joinDate: Date
  photo?: string
  qrCode?: string
  notes?: string
  tags?: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const MemberSchema = new Schema<IMember>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    membershipNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Member name is required'],
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
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    address: String,
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    healthInfo: {
      bloodGroup: String,
      height: Number,
      weight: Number,
      medicalConditions: [String],
      allergies: [String],
    },
    subscription: {
      planId: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
      },
      planName: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['active', 'expired', 'suspended'],
        default: 'active',
      },
      autoRenewal: {
        type: Boolean,
        default: false,
      },
    },
    assignedTrainerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    photo: String,
    qrCode: String,
    notes: String,
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Generate unique membership number
MemberSchema.pre('save', async function (next) {
  if (!this.membershipNumber) {
    const count = await mongoose.model('Member').countDocuments({ organizationId: this.organizationId })
    this.membershipNumber = `MEM${String(count + 1).padStart(6, '0')}`
  }
  next()
})

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema)

