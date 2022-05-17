import { MockBuilder } from '@shared/infra-objects';
import {
  Recipient,
  RecipientType,
  BankAccount,
  BankHolderType,
  BankAccountType,
} from '@domain/recipient';

export const RecipientPlainObjectBuilder = (): MockBuilder<Plain<Recipient>> =>
  new MockBuilder<Plain<Recipient>>({
    id: 1,
    firstName: 'John',
    lastName: 'Snow',
    email: 'john@snow.com',
    document: '123456789',
    type: RecipientType.Individual,
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

export const RecipientDomainObjectBuilder = (): MockBuilder<Recipient> =>
  new MockBuilder<Recipient>(
    new Recipient(
      1,
      'John',
      'Snow',
      'john@snow.com',
      '123456789',
      RecipientType.Individual,
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
