import { DomainException } from '@shared/infra-objects';
import { RecipientType } from '@accounts/domain';
import { Requirements } from './requirements.vo';

describe('Requirements', () => {
  describe('creation', () => {
    it('Should be able to create a Requirements correctly', () => {
      expect(new Requirements(2, RecipientType.Individual)).toEqual({
        minAccountMonths: 2,
        recipientType: 'individual',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty minAccountMonths', () => {
      expect(
        () => new Requirements(undefined, RecipientType.Individual),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty recipientType', () => {
      expect(() => new Requirements(2, undefined)).toThrowError(
        DomainException,
      );
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid minAccountMonths', () => {
      expect(() => new Requirements(-1, RecipientType.Individual)).toThrowError(
        DomainException,
      );
      expect(
        () => new Requirements('A' as any, RecipientType.Individual),
      ).toThrowError(DomainException);
      expect(
        () => new Requirements(1.2, RecipientType.Individual),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid recipientType', () => {
      expect(() => new Requirements(2, 'X' as any)).toThrowError(
        DomainException,
      );
    });
  });

  describe('isEligible', () => {
    it('Should be able to get true if a Recipient is eligible', () => {
      const createdAt = new Date(2022, 1, 1);
      const recipientType = RecipientType.Individual;
      const requirements = new Requirements(2, RecipientType.Individual);

      expect(requirements.isEligible(createdAt, recipientType)).toBe(true);
    });

    it('Should be able to get false if a Recipient is not eligible', () => {
      const createdAt = new Date();
      const recipientType = RecipientType.Individual;
      const requirements = new Requirements(2, RecipientType.Individual);

      expect(requirements.isEligible(createdAt, recipientType)).toBe(false);
    });
  });
});
