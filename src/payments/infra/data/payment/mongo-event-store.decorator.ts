import * as Nest from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { UseMongoTransaction } from '@shared/infra-objects';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import {
  IEventPublisher,
  IPaymentEventStore,
  PaymentEvent,
} from '@payments/domain';

@Nest.Injectable()
export class MongoEventStoreDecorator implements IPaymentEventStore {
  private readonly logger = new NestAddons.AppLogger(
    MongoEventStoreDecorator.name,
  );

  constructor(
    @Nest.Inject('PaymentEventStoreAdapter')
    private readonly paymentEventStore: IPaymentEventStore,
    @Nest.Inject('EventPublisher')
    private readonly eventPublisher: IEventPublisher,
  ) {}

  @UseMongoTransaction
  public async append(
    paymentEvent: PaymentEvent,
    session?: ClientSession,
  ): Promise<void> {
    try {
      await this.paymentEventStore.append(paymentEvent, session);
      await this.eventPublisher.publish(paymentEvent);
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while appending and publishing PaymentEvent: ${paymentEvent.key}`,
          { paymentEvent },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while appending and publishing PaymentEvent: ${paymentEvent.key}`,
      );
    }
  }
}
