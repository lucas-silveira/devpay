import { DomainException } from '@shared/infra-objects';
import { AccountCreated } from '../account-created.event';

describe('AccountCreated', () => {
  describe('creation', () => {
    it('Should be able to create an AccountCreated correctly', () => {
      expect(
        new AccountCreated(1, 'John Snow', 'john@snow.com', '123456789'),
      ).toEqual({
        key: 'account.created',
        id: 1,
        name: 'John Snow',
        email: 'john@snow.com',
        document: '123456789',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty id', () => {
      expect(
        () =>
          new AccountCreated(
            undefined,
            'John Snow',
            'john@snow.com',
            '123456789',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty name', () => {
      expect(
        () => new AccountCreated(1, undefined, 'john@snow.com', '123456789'),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty email', () => {
      expect(
        () => new AccountCreated(1, 'John Snow', undefined, '123456789'),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty document', () => {
      expect(
        () => new AccountCreated(1, 'John Snow', 'john@snow.com', undefined),
      ).toThrowError(DomainException);
    });
  });
});
