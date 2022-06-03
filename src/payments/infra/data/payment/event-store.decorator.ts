import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
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

  public async append(paymentEvent: PaymentEvent): Promise<void> {
    try {
      await this.paymentEventStore.append(paymentEvent);
      this.amqpConnection.publish(
        this.config.get('rabbitMq.exchanges.topic'),
        paymentEvent.name,
        paymentEvent,
        { persistent: true },
      );
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while appending and broadcasting PaymentEvent: ${paymentEvent.name}`,
          { paymentEvent },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while appending and broadcasting PaymentEvent: ${paymentEvent.name}`,
      );
    }
  }
}
