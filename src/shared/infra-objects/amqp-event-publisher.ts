import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEvent } from '@shared/domain-objects';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';

@Nest.Injectable()
export class AmqpEventPublisher {
  private readonly logger = new NestAddons.AppLogger(AmqpEventPublisher.name);

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly config: ConfigService,
  ) {}

  public publish(event: DomainEvent): void {
    try {
      this.amqpConnection.publish(
        this.config.get('rabbitMq.exchanges.topic'),
        event.key,
        event,
        { persistent: true },
      );
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while publishing event ${event.key} in RabbitMQ`,
          {
            event,
          },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while publishing event ${event.key} in RabbitMQ`,
      );
    }
  }
}
