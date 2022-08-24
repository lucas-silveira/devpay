import * as Nest from '@nestjs/common';
import * as Mongoose from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { IEventStreamPublisher, PaymentEvent } from '@payments/domain';
import { PaymentEventFactory } from './event-factory';
import { PaymentEventDocument } from './payment-event.doc';

@Nest.Injectable()
export class MongoEventStoreDecorator implements IEventStreamPublisher {
  private readonly logger = new NestAddons.AppLogger(
    MongoEventStoreDecorator.name,
  );

  constructor(
    @Mongoose.InjectModel(PaymentEventDocument.name)
    private readonly paymentEventModel: Model<PaymentEventDocument & Document>,
    @Nest.Inject('EventStreamPublisherAdapter')
    private readonly eventStreamPublisher: IEventStreamPublisher,
  ) {}

  public async publish(paymentEvent: PaymentEvent): Promise<void> {
    const session = await this.paymentEventModel.startSession();
    try {
      const paymentEventDoc = PaymentEventFactory.toDocument(paymentEvent);
      await session.withTransaction(async () => {
        await this.paymentEventModel.create([paymentEventDoc], { session });
        await this.eventStreamPublisher.publish(paymentEvent);
      });
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while publishing and saving PaymentEvent ${paymentEvent.key}`,
          { paymentEvent },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while publishing and saving PaymentEvent ${paymentEvent.key}`,
      );
    } finally {
      await session.endSession();
    }
  }
}
