import * as Mongoose from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';

@Mongoose.Schema({
  collection: 'payments',
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

  @Mongoose.Prop({ type: Date, required: true, immutable: true })
  public readonly createdAt: Date;
}

export const PaymentSchema = Mongoose.SchemaFactory.createForClass(
  PaymentDocument,
).index({ recipientId: 1, orderId: -1, createdAt: -1 });
