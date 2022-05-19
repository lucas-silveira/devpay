import * as Nest from '@nestjs/common';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { IRecipientsRepository } from '@domain/recipient';
import { Response } from '@application/dtos';
import { RecipientFactory } from './recipient.factory';

@Nest.Injectable()
export class AppRecipientsFetchService {
  private readonly logger = new NestAddons.AppLogger(
    AppRecipientsFetchService.name,
  );

  constructor(
    @Nest.Inject('RecipientsRepository')
    private readonly recipientsRepository: IRecipientsRepository,
  ) {}

  public async fetchRecipientById(id: number): Promise<Response.RecipientDto> {
    try {
      const recipient = await this.recipientsRepository.findOneById(id);

      if (!recipient)
        throw new Nest.NotFoundException(`The Recipient ${id} doesn't exists`);

      return RecipientFactory.toDto(recipient);
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          'Error while executing AppRecipientsFetchService.fetchRecipientById',
          { id },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while executing AppRecipientsFetchService.fetchRecipientById',
      );
    }
  }
}
