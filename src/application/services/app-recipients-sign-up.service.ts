import * as Nest from '@nestjs/common';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Request } from '@application/dtos';
import { RecipientFactory } from './recipient.factory';

@Nest.Injectable()
export class AppRecipientsSignUp {
  public async createRecipient(
    recipientDto: Request.CreateRecipientDto,
  ): Promise<any> {
    try {
      const recipient = await RecipientFactory.from(recipientDto);
    } catch (err) {
      if (err instanceof HttpException) throw err;

      throw new InternalServerErrorException(
        'Error while executing AppRecipientsSignUp.createRecipient',
      );
    }
  }
}
