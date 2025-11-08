import mongoose, { Document, Schema } from 'mongoose'

export interface ILead extends Document {
  _id: string
  organizationId: mongoose.Types.ObjectId
  name: string
  email?: string
  phone: string
  source: 'website' | 'whatsapp' | 'walk_in' | 'instagram' | 'facebook' | 'referral' | 'other'
  status: 'new' | 'contacted' | 'trial' | 'interested' | 'converted' | 'lost'
  interestedIn?: string[]
  assignedTo?: mongoose.Types.ObjectId
  followUpDate?: Date
  notes?: string
  convertedToMemberId?: mongoose.Types.ObjectId
  conversionDate?: Date
  activities: Array<{
    type: 'call' | 'whatsapp' | 'email' | 'meeting' | 'note'
    description: string
    date: Date
    createdBy: mongoose.Types.ObjectId
  }>
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'walk_in', 'instagram', 'facebook', 'referral', 'other'],
      default: 'walk_in',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'trial', 'interested', 'converted', 'lost'],
      default: 'new',
    },
    interestedIn: [String],
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    followUpDate: Date,
    notes: String,
    convertedToMemberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
    },
    conversionDate: Date,
    activities: [
      {
        type: {
          type: String,
          enum: ['call', 'whatsapp', 'email', 'meeting', 'note'],
        },
        description: String,
        date: {
          type: Date,
          default: Date.now,
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)

