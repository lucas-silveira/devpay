import * as Nest from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { IRecipientsRepository, Recipient } from '@domain/recipient';
import { RecipientFactory } from './factory';
import { RecipientActiveRecord } from './recipient.ar';

export class MysqlRepositoryAdapter implements IRecipientsRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryAdapter.name,
  );

  public async save(recipient: Recipient): Promise<void> {
    try {
      const { id } = await RecipientActiveRecord.getRepository().save(
        cloneDeep(recipient),
      );
      this.loadIdentification(id, recipient);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while saving Recipient: ${recipient.id}`, {
          recipient,
        }),
      );

      throw new Nest.InternalServerErrorException(
        `Error while saving Recipient: ${recipient.id}`,
      );
    }
  }

  public async findOneById(id: number): Promise<Recipient> {
    try {
      const recipientAR = await RecipientActiveRecord.createQueryBuilder(
        'recipient',
      )
        .where('recipient.id = :id', { id })
        .getOne();
      return RecipientFactory.toDomainObject(recipientAR);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching Recipient by id ${id}`, {
          recipientId: id,
        }),
      );

      throw new Nest.InternalServerErrorException(
        `Error while fetching Recipient by id ${id}`,
      );
    }
  }

  public async isEmailInUse(email: string): Promise<boolean> {
    const count = await RecipientActiveRecord.createQueryBuilder('recipient')
      .where('recipient.email = :email', { email })
      .getCount();

    return count > 0;
  }

  private loadIdentification(id: number, recipient: Recipient): void {
    if (!recipient.id) recipient.id = id;
  }
}
