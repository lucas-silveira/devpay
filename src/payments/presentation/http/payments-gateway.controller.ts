import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { Log } from '@shared/telemetry';

@Nest.Controller('payments')
export class HttpPaymentsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    HttpPaymentsGatewayController.name,
  );

  @Nest.Post()
  public async postPayments(): Promise<void> {
    this.logger.log(new Log('Http Request received to create a Payment', {}));
  }
}
