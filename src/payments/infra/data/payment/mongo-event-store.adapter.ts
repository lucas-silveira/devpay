import * as Nest from '@nestjs/common';
import * as Mongoose from '@nestjs/mongoose';
import { ClientSession, Document, Model } from 'mongoose';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { IPaymentEventStore, PaymentEvent } from '@payments/domain';
import { PaymentEventFactory } from './event-factory';
import { PaymentEventDocument } from './payment-event.doc';

@Nest.Injectable()
export class MongoEventStoreAdapter implements IPaymentEventStore {
  private readonly logger = new NestAddons.AppLogger(
    MongoEventStoreAdapter.name,
  );

  constructor(
    @Mongoose.InjectModel(PaymentEventDocument.name)
    private readonly paymentEventModel: Model<PaymentEventDocument & Document>,
  ) {}

  public async append(
    paymentEvent: PaymentEvent,
    session?: ClientSession,
  ): Promise<void> {
    try {
      const paymentEventDoc = PaymentEventFactory.toDocument(paymentEvent);
      await this.paymentEventModel.create([paymentEventDoc], { session });
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while appending PaymentEvent: ${paymentEvent.key}`,
          { paymentEvent },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while appending PaymentEvent: ${paymentEvent.key}`,
      );
    }
  }
}
