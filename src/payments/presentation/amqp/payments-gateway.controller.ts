import * as Nest from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import * as NestAddons from '@shared/nest-addons';
import { Log } from '@shared/telemetry';

@Nest.Controller()
export class AmqpPaymentsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    AmqpPaymentsGatewayController.name,
  );

  @RabbitSubscribe({
    name: 'test',
  })
  public async paymentsTestHandle(data: any): Promise<void> {
    this.logger.log(new Log('AMQP message received to handle TestEvent', data));
  }
}
