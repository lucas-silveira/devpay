import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ClientSession } from 'mongoose';
import { UseMongoTransaction } from '@shared/infra-objects';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { IPaymentEventStore, PaymentEvent } from '@payments/domain';

@Nest.Injectable()
export class EventStoreDecorator implements IPaymentEventStore {
  private readonly logger = new NestAddons.AppLogger(EventStoreDecorator.name);

  constructor(
    @Nest.Inject('PaymentEventStoreAdapter')
    private readonly paymentEventStore: IPaymentEventStore,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: ConfigService,
  ) {}

  @UseMongoTransaction
  public async append(
    paymentEvent: PaymentEvent,
    session?: ClientSession,
  ): Promise<void> {
    try {
      await this.paymentEventStore.append(paymentEvent, session);
      this.amqpConnection.publish(
        this.config.get('rabbitMq.exchanges.topic'),
        paymentEvent.key,
        paymentEvent,
        { persistent: true },
      );
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while appending and broadcasting PaymentEvent: ${paymentEvent.key}`,
          { paymentEvent },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while appending and broadcasting PaymentEvent: ${paymentEvent.key}`,
      );
    }
  }
}
