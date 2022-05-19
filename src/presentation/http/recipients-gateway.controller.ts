import * as Nest from '@nestjs/common';
import { Log } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { DTOs, Services } from '@application';

@Nest.Controller('recipients')
export class HttpRecipientsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    HttpRecipientsGatewayController.name,
  );

  constructor(
    private readonly appRecipientsSignUpService: Services.AppRecipientsSignUpService,
    private readonly appRecipientsFetchService: Services.AppRecipientsFetchService,
  ) {}

  @Nest.Post()
  public async postRecipients(
    @Nest.Body() recipientDto: DTOs.Request.CreateRecipientDto,
  ): Promise<DTOs.Response.RecipientDto> {
    this.logger.log(
      new Log('Http Request received to create a Recipient', {
        recipientDto,
      }),
    );
    return this.appRecipientsSignUpService.createRecipient(recipientDto);
  }

  @Nest.Get(':id')
  public async getRecipients(
    @Nest.Param('id', Nest.ParseIntPipe) id: number,
  ): Promise<DTOs.Response.RecipientDto> {
    return this.appRecipientsFetchService.fetchRecipientById(id);
  }
}
