import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { BankAccountType } from '../bank-account-type.enum';
import { BankAccount } from '../bank-account.vo';
import { BankHolderType } from '../bank-holder-type.enum';

Tests.unitScope('BankAccount', () => {
  describe('creation', () => {
    it('Should be able to create a BankAccount correctly', () => {
      expect(
        new BankAccount(
          'John',
          BankHolderType.Individual,
          '12345678',
          '123',
          BankAccountType.Checking,
          '12345',
          '1',
        ),
      ).toEqual({
        holderName: 'John',
        holderType: 'individual',
        document: '12345678',
        bankCode: '123',
        accountType: 'checking',
        accountNumber: '12345',
        accountCheckDigit: '1',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty holderName', () => {
      expect(
        () =>
          new BankAccount(
            undefined,
            BankHolderType.Individual,
            '12345678',
            '123',
            BankAccountType.Checking,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty holderType', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            undefined,
            '12345678',
            '123',
            BankAccountType.Checking,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty document', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            undefined,
            '123',
            BankAccountType.Checking,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty bankCode', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            undefined,
            BankAccountType.Checking,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty accountType', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            '123',
            undefined,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty accountNumber', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            '123',
            BankAccountType.Checking,
            undefined,
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty accountCheckDigit', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            '123',
            BankAccountType.Checking,
            '12345',
            undefined,
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid holderType', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            'X' as any,
            '12345678',
            '123',
            BankAccountType.Checking,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid accountType', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            '123',
            'X' as any,
            '12345',
            '1',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid accountCheckDigit', () => {
      expect(
        () =>
          new BankAccount(
            'John',
            BankHolderType.Individual,
            '12345678',
            '123',
            BankAccountType.Checking,
            '12345',
            '12',
          ),
      ).toThrowError(DomainException);
    });
  });
});
