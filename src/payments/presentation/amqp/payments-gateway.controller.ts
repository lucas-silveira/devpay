import * as Nest from '@nestjs/common';
import { Log } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';

@Nest.Controller()
export class AmqpPaymentsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    AmqpPaymentsGatewayController.name,
  );

  public async paymentsTestHandle(data: any): Promise<void> {
    this.logger.log(new Log('AMQP message received to handle TestEvent', data));
  }
}
