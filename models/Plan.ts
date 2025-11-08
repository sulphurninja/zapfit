import mongoose, { Document, Schema } from 'mongoose'

export interface IPlan extends Document {
  _id: string
  organizationId: mongoose.Types.ObjectId
  name: string
  description?: string
  duration: number // in days
  durationType: 'days' | 'months' | 'years'
  amount: number
  features: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const PlanSchema = new Schema<IPlan>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
    },
    description: String,
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    durationType: {
      type: String,
      enum: ['days', 'months', 'years'],
      default: 'months',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    features: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema)

