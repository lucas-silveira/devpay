import { DomainException } from '@shared/infra-objects';
import { RecipientType } from './recipient-type.enum';
import { Recipient } from './recipient.entity';

describe('Recipient', () => {
  it('Should be able to create a Recipient with all args correctly', () => {
    expect(
      new Recipient(
        undefined,
        'John',
        'Snow',
        'john@snow.com',
        '123456789',
        RecipientType.Individual,
        'skey_123',
        'default',
      ),
    ).toEqual({
      firstName: 'John',
      lastName: 'Snow',
      email: 'john@snow.com',
      document: '123456789',
      type: 'individual',
      secretKey: 'skey_123',
      policyId: 'default',
      createdAt: jasmine.any(Date),
    });
  });

  it('Should be able to create a Recipient without optional args correctly', () => {
    expect(
      new Recipient(
        undefined,
        'John',
        'Snow',
        'john@snow.com',
        '123456789',
        RecipientType.Individual,
        'skey_123',
      ),
    ).toEqual({
      firstName: 'John',
      lastName: 'Snow',
      email: 'john@snow.com',
      document: '123456789',
      type: 'individual',
      secretKey: 'skey_123',
      policyId: 'default',
      createdAt: jasmine.any(Date),
    });
  });

  it('Should be able to throw a DomainException if we pass an empty firstName', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          undefined,
          'Snow',
          'john@snow.com',
          '123456789',
          RecipientType.Individual,
          'skey_123',
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty lastName', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          'John',
          undefined,
          'john@snow.com',
          '123456789',
          RecipientType.Individual,
          'skey_123',
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty email', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          'John',
          'Snow',
          undefined,
          '123456789',
          RecipientType.Individual,
          'skey_123',
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty document', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          'John',
          'Snow',
          'john@snow.com',
          undefined,
          RecipientType.Individual,
          'skey_123',
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty type', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          'John',
          'Snow',
          'john@snow.com',
          '123456789',
          undefined,
          'skey_123',
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty secretKey', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          'John',
          'Snow',
          'john@snow.com',
          '123456789',
          RecipientType.Individual,
          undefined,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid type', () => {
    expect(
      () =>
        new Recipient(
          undefined,
          'John',
          'Snow',
          'john@snow.com',
          '123456789',
          'X' as any,
          'skey_123',
        ),
    ).toThrowError(DomainException);
  });
});
