import { DomainException } from '@shared/infra-objects';
import { RecipientType } from './recipient-type.enum';
import { Recipient } from './recipient.entity';

describe('Recipient', () => {
  it('Should be able to create a Recipient correctly', () => {
    expect(
      new Recipient(
        undefined,
        'John',
        'Snow',
        'john@snow.com',
        '123456789',
        RecipientType.Individual,
      ),
    ).toEqual({
      firstName: 'John',
      lastName: 'Snow',
      email: 'john@snow.com',
      document: '123456789',
      type: 'individual',
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
        ),
    ).toThrowError(DomainException);
  });
});
