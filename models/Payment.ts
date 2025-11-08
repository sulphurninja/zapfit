import mongoose, { Document, Schema } from 'mongoose'

export interface IPayment extends Document {
  _id: string
  organizationId: mongoose.Types.ObjectId
  memberId: mongoose.Types.ObjectId
  invoiceNumber: string
  amount: number
  paymentMethod: 'cash' | 'upi' | 'card' | 'online' | 'bank_transfer'
  paymentType: 'membership' | 'renewal' | 'personal_training' | 'other'
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  transactionId?: string
  notes?: string
  paymentDate: Date
  receiptSent: boolean
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const PaymentSchema = new Schema<IPayment>(
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
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'upi', 'card', 'online', 'bank_transfer'],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['membership', 'renewal', 'personal_training', 'other'],
      default: 'membership',
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed', 'refunded'],
      default: 'completed',
    },
    transactionId: String,
    notes: String,
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    receiptSent: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Generate unique invoice number
PaymentSchema.pre('save', async function (next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Payment').countDocuments({ organizationId: this.organizationId })
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    this.invoiceNumber = `INV${year}${month}${String(count + 1).padStart(5, '0')}`
  }
  next()
})

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema)

