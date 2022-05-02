import { DomainException } from '@shared/infra-objects';
import { BankAccount } from './bank-account.vo';

describe('BankAccount', () => {
  it('Should be able to create a BankAccount correctly', () => {
    expect(new BankAccount('John', '12345678', '123', '12345', '1')).toEqual({
      holderName: 'John',
      document: '12345678',
      bankCode: '123',
      accountNumber: '12345',
      accountCheckDigit: '1',
    });
  });

  it('Should be able to throw a DomainException if we pass an empty holderName', () => {
    expect(
      () => new BankAccount(undefined, '12345678', '123', '12345', '1'),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty document', () => {
    expect(
      () => new BankAccount('John', undefined, '123', '12345', '1'),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty bankCode', () => {
    expect(
      () => new BankAccount('John', '12345678', undefined, '12345', '1'),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty accountNumber', () => {
    expect(
      () => new BankAccount('John', '12345678', '123', undefined, '1'),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty accountCheckDigit', () => {
    expect(
      () => new BankAccount('John', '12345678', '123', '12345', undefined),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid accountCheckDigit', () => {
    expect(
      () => new BankAccount('John', '12345678', '123', '12345', '12'),
    ).toThrowError(DomainException);
    expect(
      () => new BankAccount('John', '12345678', '123', '12345', ''),
    ).toThrowError(DomainException);
  });
});
