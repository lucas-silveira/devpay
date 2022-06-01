import * as Nest from '@nestjs/common';
import * as NestMs from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Log } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';

@Nest.Controller('payments')
export class HttpPaymentsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    HttpPaymentsGatewayController.name,
  );

  constructor(
    @Nest.Inject('RmqpClient') private readonly client: NestMs.ClientProxy,
  ) {}

  @Nest.Post()
  public async postPayments(): Promise<void> {
    this.logger.log(new Log('Http Request received to create a Payment', {}));
    await lastValueFrom(
      this.client.emit('payments.test', { message: 'Hello World' }),
    );
  }
}
