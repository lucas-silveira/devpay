import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { AccountType } from './account-type.enum';
import { Account } from './account.entity';
import { BankAccountType } from './bank-account-type.enum';
import { BankAccount } from './bank-account.vo';
import { BankHolderType } from './bank-holder-type.enum';

Tests.unitScope('Account', () => {
  describe('creation', () => {
    it('Should be able to create a Account with all args correctly', () => {
      expect(
        new Account(
          undefined,
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
        ),
      ).toEqual({
        firstName: 'John',
        lastName: 'Snow',
        email: 'john@snow.com',
        document: '123456789',
        type: 'individual',
        secretKey: 'skey_123',
        policyId: 'default',
        bankAccount: {
          holderName: 'John',
          holderType: 'individual',
          document: '12345678',
          bankCode: '123',
          accountType: 'checking',
          accountNumber: '12345',
          accountCheckDigit: '1',
        },
        createdAt: jasmine.any(Date),
      });
    });

    it('Should be able to create a Account without optional args correctly', () => {
      expect(
        new Account(
          undefined,
          'John',
          'Snow',
          'john@snow.com',
          '123456789',
          AccountType.Individual,
          'skey_123',
          undefined,
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            '123',
            BankAccountType.Checking,
            '12345',
            '1',
          ),
        ),
      ).toEqual({
        firstName: 'John',
        lastName: 'Snow',
        email: 'john@snow.com',
        document: '123456789',
        type: 'individual',
        secretKey: 'skey_123',
        policyId: 'default',
        bankAccount: {
          holderName: 'John',
          holderType: 'individual',
          document: '12345678',
          bankCode: '123',
          accountType: 'checking',
          accountNumber: '12345',
          accountCheckDigit: '1',
        },
        createdAt: jasmine.any(Date),
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty firstName', () => {
      expect(
        () =>
          new Account(
            1,
            undefined,
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
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty lastName', () => {
      expect(
        () =>
          new Account(
            1,
            'John',
            undefined,
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
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty email', () => {
      expect(
        () =>
          new Account(
            1,
            'John',
            'Snow',
            undefined,
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
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty document', () => {
      expect(
        () =>
          new Account(
            1,
            'John',
            'Snow',
            'john@snow.com',
            undefined,
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
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty type', () => {
      expect(
        () =>
          new Account(
            1,
            'John',
            'Snow',
            'john@snow.com',
            '123456789',
            undefined,
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
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty bankAccount', () => {
      expect(
        () =>
          new Account(
            1,
            'John',
            'Snow',
            'john@snow.com',
            '123456789',
            AccountType.Individual,
            'skey_123',
            'default',
            undefined,
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid type', () => {
      expect(
        () =>
          new Account(
            1,
            'John',
            'Snow',
            'john@snow.com',
            '123456789',
            'X' as any,
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
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('giveNewSecretKey', () => {
    it('Should be able to give a new secret key', async () => {
      const account = new Account(
        1,
        'John',
        'Snow',
        'john@snow.com',
        '123456789',
        AccountType.Individual,
        undefined,
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
      );

      expect(account.secretKey).toBeFalsy();
      await account.giveNewSecretKey();
      expect(account.secretKey).toBeTruthy();
      expect(typeof account.secretKey).toBe('string');
    });

    it('Should be able to give a new secret key even already has one', async () => {
      const account = new Account(
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
      );

      expect(account.secretKey).toBe('skey_123');
      await account.giveNewSecretKey();
      expect(account.secretKey).not.toBe('skey_123');
      expect(account.secretKey).toBeTruthy();
      expect(typeof account.secretKey).toBe('string');
    });
  });
});
