import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { Policy } from '@domain/policy';
import { Recipient } from '@domain/recipient';
import { Request } from '@application/dtos';

export class RecipientFactory {
  public static async from(
    recipientDto: Request.CreateRecipientDto,
  ): Promise<Recipient> {
    try {
      const recipient = new Recipient(
        undefined,
        recipientDto.firstName,
        recipientDto.lastName,
        recipientDto.email,
        recipientDto.document,
        recipientDto.type,
        undefined,
        Policy.Default,
      );
      await recipient.giveNewSecretKey();
      return recipient;
    } catch (err: unknown) {
      new NestAddons.AppLogger(RecipientFactory.name).error(
        new ErrorLog(err, 'Error while Recipient creation from dto', {
          recipientDto,
        }),
      );

      if (err instanceof HttpException) throw err;

      throw new InternalServerErrorException(
        'Error while Recipient creation from dto',
      );
    }
  }
}
