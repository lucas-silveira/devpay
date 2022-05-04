import { DomainException } from '@shared/infra-objects';
import { RecipientType } from '@domain/recipient';
import { Requirements } from './requirements.vo';

describe('Requirements', () => {
  it('Should be able to create a Requirements correctly', () => {
    expect(new Requirements(100, 2, RecipientType.Individual)).toEqual({
      minTransactionalValue: 100,
      minAccountMonths: 2,
      recipientType: 'individual',
    });
  });

  it('Should be able to throw a DomainException if we pass an empty minTransactionalValue', () => {
    expect(
      () => new Requirements(undefined, 2, RecipientType.Individual),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty minAccountMonths', () => {
    expect(
      () => new Requirements(100, undefined, RecipientType.Individual),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty recipientType', () => {
    expect(() => new Requirements(100, 2, undefined)).toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw a DomainException if we pass an invalid minTransactionalValue', () => {
    expect(
      () => new Requirements(-1, 2, RecipientType.Individual),
    ).toThrowError(DomainException);
    expect(
      () => new Requirements('A' as any, 2, RecipientType.Individual),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid minAccountMonths', () => {
    expect(
      () => new Requirements(100, -1, RecipientType.Individual),
    ).toThrowError(DomainException);
    expect(
      () => new Requirements(100, 'A' as any, RecipientType.Individual),
    ).toThrowError(DomainException);
    expect(
      () => new Requirements(100, 1.2, RecipientType.Individual),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid recipientType', () => {
    expect(() => new Requirements(100, 2, 'X' as any)).toThrowError(
      DomainException,
    );
  });
});
