import * as Nest from '@nestjs/common';
import { DTOs, Services } from '@application';

@Nest.Controller('recipients')
export class HttpRecipientsGatewayController {
  constructor(
    private readonly appRecipientsSignUpService: Services.AppRecipientsSignUpService,
  ) {}
  @Nest.Post()
  public async postRecipients(
    @Nest.Body() recipientDto: DTOs.Request.CreateRecipientDto,
  ): Promise<void> {
    return this.appRecipientsSignUpService.createRecipient(recipientDto);
  }
}
