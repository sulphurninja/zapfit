import mongoose, { Document, Schema } from 'mongoose'

export interface IBiometric extends Document {
  _id: string
  userId: mongoose.Types.ObjectId // Member or Trainer
  organizationId: mongoose.Types.ObjectId
  userType: 'member' | 'trainer'
  biometricType: 'fingerprint' | 'face' | 'card'
  templateData: string // Encrypted biometric template
  fingerIndex?: number // For fingerprint (1-10)
  quality: number // Quality score (0-100)
  enrolledBy: mongoose.Types.ObjectId // Staff who enrolled
  enrollmentDate: Date
  deviceId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BiometricSchema = new Schema<IBiometric>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'userType',
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    userType: {
      type: String,
      enum: ['member', 'trainer'],
      required: true,
    },
    biometricType: {
      type: String,
      enum: ['fingerprint', 'face', 'card'],
      default: 'fingerprint',
    },
    templateData: {
      type: String,
      required: true,
      select: false, // Don't include in queries by default for security
    },
    fingerIndex: {
      type: Number,
      min: 1,
      max: 10,
    },
    quality: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    enrolledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    deviceId: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster lookups
BiometricSchema.index({ userId: 1, biometricType: 1, isActive: 1 })

export default mongoose.models.Biometric || mongoose.model<IBiometric>('Biometric', BiometricSchema)

