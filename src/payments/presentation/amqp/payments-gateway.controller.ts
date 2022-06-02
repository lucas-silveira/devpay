import * as Nest from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Log } from '@shared/telemetry';
import * as NestAddons from '@shared/nest-addons';

@Nest.Controller()
export class AmqpPaymentsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    AmqpPaymentsGatewayController.name,
  );

  @RabbitSubscribe({
    exchange: 'devpay.topic',
    routingKey: 'payments.test',
    queue: 'payments',
    createQueueIfNotExists: false,
    queueOptions: {
      messageTtl: 604800000,
      deadLetterExchange: 'devpay.topic.dlq',
    },
  })
  public async paymentsTestHandle(data: any): Promise<void> {
    this.logger.log(new Log('AMQP message received to handle TestEvent', data));
  }
}
