import * as Nest from '@nestjs/common';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { ProvidersIntegrationService } from '@domain/services';
import { Request } from '@application/dtos';
import { RecipientFactory } from './recipient.factory';

@Nest.Injectable()
export class AppRecipientsSignUpService {
  private readonly logger = new NestAddons.AppLogger(
    AppRecipientsSignUpService.name,
  );

  constructor(
    private readonly providersIntegrationService: ProvidersIntegrationService,
  ) {}

  public async createRecipient(
    recipientDto: Request.CreateRecipientDto,
  ): Promise<any> {
    try {
      const recipient = await RecipientFactory.from(recipientDto);
      await this.providersIntegrationService.integrateWithStone(recipient);
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          'Error while executing AppRecipientsSignUpService.createRecipient',
          { recipientDto },
        ),
      );

      if (err instanceof HttpException) throw err;

      throw new InternalServerErrorException(
        'Error while executing AppRecipientsSignUpService.createRecipient',
      );
    }
  }
}
