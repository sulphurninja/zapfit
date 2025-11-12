import mongoose, { Document, Schema } from 'mongoose'

export interface IAttendance extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  organizationId: mongoose.Types.ObjectId
  userType: 'member' | 'trainer'
  userName: string
  checkInTime: Date
  checkOutTime?: Date
  duration?: number // in minutes
  date: Date
  attendanceType: 'biometric' | 'manual' | 'qr'
  biometricDeviceId?: string
  verificationMethod?: 'fingerprint' | 'face' | 'card' | 'manual'
  location?: string
  notes?: string
  recordedBy?: mongoose.Types.ObjectId // For manual entries
  createdAt: Date
  updatedAt: Date
}

const AttendanceSchema = new Schema<IAttendance>(
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
    userName: {
      type: String,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: Date,
    duration: Number,
    date: {
      type: Date,
      required: true,
      index: true,
    },
    attendanceType: {
      type: String,
      enum: ['biometric', 'manual', 'qr'],
      default: 'biometric',
    },
    biometricDeviceId: String,
    verificationMethod: {
      type: String,
      enum: ['fingerprint', 'face', 'card', 'manual'],
    },
    location: String,
    notes: String,
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
AttendanceSchema.index({ organizationId: 1, date: -1 })
AttendanceSchema.index({ userId: 1, date: -1 })

// Calculate duration before saving if checkOutTime exists
AttendanceSchema.pre('save', function (next) {
  if (this.checkOutTime && this.checkInTime) {
    const durationMs = this.checkOutTime.getTime() - this.checkInTime.getTime()
    this.duration = Math.floor(durationMs / (1000 * 60)) // Convert to minutes
  }
  next()
})

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema)
