import { MockBuilder } from '@shared/tests';
import {
  Account,
  AccountType,
  BankAccount,
  BankHolderType,
  BankAccountType,
} from '@accounts/domain';

export const AccountPlainObjectBuilder = (): MockBuilder<Plain<Account>> =>
  new MockBuilder<Plain<Account>>({
    id: 1,
    firstName: 'John',
    lastName: 'Snow',
    email: 'john@snow.com',
    document: '123456789',
    type: AccountType.Individual,
    secretKey: 'skey_123',
    policyId: 'default',
    bankAccount: {
      holderName: 'John',
      holderType: BankHolderType.Individual,
      document: '12345678',
      bankCode: '123',
      accountType: BankAccountType.Checking,
      accountNumber: '12345',
      accountCheckDigit: '1',
    },
    createdAt: jasmine.any(Date),
  });

export const AccountDomainObjectBuilder = (): MockBuilder<Account> =>
  new MockBuilder<Account>(
    new Account(
      1,
      'John',
      'Snow',
      'john@snow.com',
      '123456789',
      AccountType.Individual,
      'skey_123',
      'default',
      new BankAccount(
        'John',
        BankHolderType.Individual,
        '12345678',
        '123',
        BankAccountType.Checking,
        '12345',
        '1',
      ),
      new Date(),
    ),
  );
