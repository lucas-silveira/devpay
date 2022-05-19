import * as Nest from '@nestjs/common';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { IRecipientsRepository } from '@domain/recipient';
import { ProvidersIntegrationService } from '@domain/services';
import { Request, Response } from '@application/dtos';
import { RecipientFactory } from './recipient.factory';

@Nest.Injectable()
export class AppRecipientsSignUpService {
  private readonly logger = new NestAddons.AppLogger(
    AppRecipientsSignUpService.name,
  );

  constructor(
    private readonly providersIntegrationService: ProvidersIntegrationService,
    @Nest.Inject('RecipientsRepository')
    private readonly recipientsRepository: IRecipientsRepository,
  ) {}

  public async createRecipient(
    recipientDto: Request.CreateRecipientDto,
  ): Promise<Response.RecipientDto> {
    try {
      const recipient = await RecipientFactory.from(recipientDto);
      await this.providersIntegrationService.integrateWithStone(recipient);
      await this.recipientsRepository.save(recipient);

      return RecipientFactory.toDto(recipient);
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          'Error while executing AppRecipientsSignUpService.createRecipient',
          { recipientDto },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while executing AppRecipientsSignUpService.createRecipient',
      );
    }
  }
}
