import * as Mongoose from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';

@Mongoose.Schema({
  collection: 'payments',
  autoIndex: true,
  timestamps: { createdAt: true },
})
export class PaymentDocument {
  @Mongoose.Prop({
    type: MongoTypes.ObjectId,
    required: true,
    immutable: true,
  })
  public readonly _id: MongoTypes.ObjectId;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly recipientId: number;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly policyId: string;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly orderId: string;

  @Mongoose.Prop({ required: true, immutable: true })
  public readonly providerId: string;

  // This field will be auto-generated by the Mongo
  public readonly createdAt: Date;
}

export const PaymentSchema = Mongoose.SchemaFactory.createForClass(
  PaymentDocument,
).index({ recipientId: 1, orderId: -1, createdAt: -1 });
