import mongoose, { Document, Schema } from 'mongoose'

export interface IBiometricDevice extends Document {
  _id: string
  organizationId: mongoose.Types.ObjectId
  deviceName: string
  deviceId: string // Unique device identifier
  deviceType: 'fingerprint' | 'face' | 'card'
  ipAddress?: string
  port?: number
  location: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  isOnline: boolean
  lastSyncDate?: Date
  settings: {
    autoSync: boolean
    syncInterval: number // in minutes
    attendanceMode: 'check-in-out' | 'check-in-only'
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BiometricDeviceSchema = new Schema<IBiometricDevice>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
      trim: true,
    },
    deviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    deviceType: {
      type: String,
      enum: ['fingerprint', 'face', 'card'],
      default: 'fingerprint',
    },
    ipAddress: String,
    port: Number,
    location: {
      type: String,
      required: true,
    },
    manufacturer: String,
    model: String,
    serialNumber: String,
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSyncDate: Date,
    settings: {
      autoSync: {
        type: Boolean,
        default: true,
      },
      syncInterval: {
        type: Number,
        default: 5, // 5 minutes
      },
      attendanceMode: {
        type: String,
        enum: ['check-in-out', 'check-in-only'],
        default: 'check-in-out',
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

export default mongoose.models.BiometricDevice ||
  mongoose.model<IBiometricDevice>('BiometricDevice', BiometricDeviceSchema)

