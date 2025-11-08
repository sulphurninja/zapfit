import mongoose, { Document, Schema } from 'mongoose'

export interface IAttendance extends Document {
  _id: string
  organizationId: mongoose.Types.ObjectId
  memberId: mongoose.Types.ObjectId
  checkInTime: Date
  checkOutTime?: Date
  date: Date
  method: 'manual' | 'qr' | 'face' | 'biometric'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
    checkOutTime: Date,
    date: {
      type: Date,
      default: () => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), now.getDate())
      },
    },
    method: {
      type: String,
      enum: ['manual', 'qr', 'face', 'biometric'],
      default: 'manual',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
AttendanceSchema.index({ organizationId: 1, date: -1 })
AttendanceSchema.index({ memberId: 1, date: -1 })

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema)

