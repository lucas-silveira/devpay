import * as Mongoose from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PaymentEventName, PaymentStatus } from '@payments/domain';

class PaymentDataDocument {
  @Mongoose.Prop({ immutable: true })
  public readonly policyId?: string;

  @Mongoose.Prop({ immutable: true })
  public readonly orderId?: string;

  @Mongoose.Prop({
    type: String,
    enum: PaymentStatus,
    immutable: true,
  })
  public readonly status?: PaymentStatus;

  @Mongoose.Prop({ immutable: true })
  public readonly amount?: number;

  @Mongoose.Prop({ immutable: true })
  public readonly paidAmount?: number;

  @Mongoose.Prop({ immutable: true })
  public readonly cardToken?: string;
}

@Mongoose.Schema({
  collection: 'payments_store',
  autoIndex: true,
})
export class PaymentEventDocument {
  // This field will be auto-generated by the Mongo
  public readonly _id: string;

  @Mongoose.Prop({
    type: String,
    enum: PaymentEventName,
    required: true,
    immutable: true,
  })
  public readonly name: PaymentEventName;

  @Mongoose.Prop({
    type: Types.ObjectId,
    required: true,
    immutable: true,
  })
  public readonly pid: Types.ObjectId;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly rid: number;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly pmId: string;

  @Mongoose.Prop({ type: PaymentDataDocument, required: true, immutable: true })
  public readonly data: PaymentDataDocument;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly timestamp: Date;
}

export const PaymentEventSchema = Mongoose.SchemaFactory.createForClass(
  PaymentEventDocument,
).index({ pid: 1, timestamp: -1 });