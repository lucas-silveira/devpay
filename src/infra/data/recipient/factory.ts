import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { Recipient, BankAccount } from '@domain/recipient';
import { RecipientActiveRecord } from './recipient.ar';

export class RecipientFactory {
  public static toDomainObject(recipientAR: RecipientActiveRecord): Recipient {
    try {
      return new Recipient(
        recipientAR.id,
        recipientAR.firstName,
        recipientAR.lastName,
        recipientAR.email,
        recipientAR.document,
        recipientAR.type,
        recipientAR.secretKey,
        recipientAR.policyId,
        this.remakeBankAccountFrom(recipientAR),
        recipientAR.createdAt,
      );
    } catch (err) {
      new NestAddons.AppLogger(RecipientFactory.name).error(
        new ErrorLog(err, `Error while remaking Recipient from active record`, {
          recipientAR,
        }),
      );
    }
  }

  private static remakeBankAccountFrom(
    recipientAR: RecipientActiveRecord,
  ): BankAccount {
    return new BankAccount(
      recipientAR.bankAccount.holderName,
      recipientAR.bankAccount.holderType,
      recipientAR.bankAccount.document,
      recipientAR.bankAccount.bankCode,
      recipientAR.bankAccount.accountType,
      recipientAR.bankAccount.accountNumber,
      recipientAR.bankAccount.accountCheckDigit,
    );
  }
}
