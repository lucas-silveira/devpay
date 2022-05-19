import { ErrorLog } from '@shared/apm';
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
