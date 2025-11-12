import mongoose, { Document, Schema } from 'mongoose'

export interface ITrainer extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  organizationId: mongoose.Types.ObjectId
  name: string
  email: string
  phone: string
  specialization?: string[]
  certifications?: string[]
  experience?: number // years
  bio?: string
  rating?: number
  commissionRate?: number // percentage
  assignedMembers: mongoose.Types.ObjectId[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const TrainerSchema = new Schema<ITrainer>(
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
    name: {
      type: String,
      required: [true, 'Trainer name is required'],
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
    specialization: [String],
    certifications: [String],
    experience: {
      type: Number,
      default: 0,
    },
    bio: String,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    commissionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    assignedMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Trainer || mongoose.model<ITrainer>('Trainer', TrainerSchema)

