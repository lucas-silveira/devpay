import * as Nest from '@nestjs/common';

@Nest.Controller('recipients')
export class HttpRecipientsGatewayController {
  @Nest.Post()
  public async postRecipients(): Promise<void> {
    return Promise.resolve();
  }
}
