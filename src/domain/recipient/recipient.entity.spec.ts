import { DomainException } from '@shared/infra-objects';
import { RecipientType } from './recipient-type.enum';
import { Recipient } from './recipient.entity';

describe('Recipient', () => {
  describe('creation', () => {
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
  });

  describe('empty validation', () => {
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
  });

  describe('type validation', () => {
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

  describe('giveNewSecretKey', () => {
    it('Should be able to give a new secret key', async () => {
      const recipient = new Recipient(
        undefined,
        'John',
        'Snow',
        'john@snow.com',
        '123456789',
        RecipientType.Individual,
        undefined,
        'default',
      );

      expect(recipient.secretKey).toBeFalsy();
      await recipient.giveNewSecretKey();
      expect(recipient.secretKey).toBeTruthy();
      expect(typeof recipient.secretKey).toBe('string');
    });

    it('Should be able to give a new secret key even already has one', async () => {
      const recipient = new Recipient(
        undefined,
        'John',
        'Snow',
        'john@snow.com',
        '123456789',
        RecipientType.Individual,
        'skey_123',
        'default',
      );

      expect(recipient.secretKey).toBe('skey_123');
      await recipient.giveNewSecretKey();
      expect(recipient.secretKey).not.toBe('skey_123');
      expect(recipient.secretKey).toBeTruthy();
      expect(typeof recipient.secretKey).toBe('string');
    });
  });
});
