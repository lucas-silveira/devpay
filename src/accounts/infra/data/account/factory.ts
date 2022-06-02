import * as Nest from '@nestjs/common';
import { ErrorLog } from '@shared/telemetry';
import * as NestAddons from '@shared/nest-addons';
import { Account, BankAccount } from '@accounts/domain';
import { AccountActiveRecord } from './account.ar';

export class AccountFactory {
  public static toDomainObject(accountAR: AccountActiveRecord): Account {
    try {
      return new Account(
        accountAR.id,
        accountAR.firstName,
        accountAR.lastName,
        accountAR.email,
        accountAR.document,
        accountAR.type,
        accountAR.secretKey,
        accountAR.policyId,
        this.remakeBankAccountFrom(accountAR),
        accountAR.createdAt,
      );
    } catch (err) {
      new NestAddons.AppLogger(AccountFactory.name).error(
        new ErrorLog(err, `Error while remaking Account from active record`, {
          accountAR,
        }),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while remaking Account from active record',
      );
    }
  }

  private static remakeBankAccountFrom(
    accountAR: AccountActiveRecord,
  ): BankAccount {
    return new BankAccount(
      accountAR.bankAccount.holderName,
      accountAR.bankAccount.holderType,
      accountAR.bankAccount.document,
      accountAR.bankAccount.bankCode,
      accountAR.bankAccount.accountType,
      accountAR.bankAccount.accountNumber,
      accountAR.bankAccount.accountCheckDigit,
    );
  }
}
