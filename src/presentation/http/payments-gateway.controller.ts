import * as Nest from '@nestjs/common';

@Nest.Controller('payments')
export class HttpPaymentsGatewayController {
  @Nest.Post()
  public async postPayments(): Promise<void> {
    return Promise.resolve();
  }
}
