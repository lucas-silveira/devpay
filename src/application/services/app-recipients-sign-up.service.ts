import * as Nest from '@nestjs/common';
import { Request } from '@application/dtos';

@Nest.Injectable()
export class AppRecipientsSignUp {
  public async createRecipient(
    recipientDto: Request.CreateRecipientDto,
  ): Promise<any> {
    return;
  }
}
