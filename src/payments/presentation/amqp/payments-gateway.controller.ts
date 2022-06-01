import * as NestMs from '@nestjs/microservices';
import { Log } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';

export class AmqpPaymentsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    AmqpPaymentsGatewayController.name,
  );

  @NestMs.EventPattern('payments.test')
  public async paymentsTestHandle(
    @NestMs.Payload() data: any,
    @NestMs.Ctx() context: NestMs.RmqContext,
  ): Promise<void> {
    this.logger.log(new Log('AMQP message received to handle TestEvent', data));
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
