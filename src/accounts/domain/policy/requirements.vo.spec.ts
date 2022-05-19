import { DomainException } from '@shared/infra-objects';
import { AccountType } from '@accounts/domain';
import { Requirements } from './requirements.vo';

describe('Requirements', () => {
  describe('creation', () => {
    it('Should be able to create a Requirements correctly', () => {
      expect(new Requirements(2, AccountType.Individual)).toEqual({
        minAccountMonths: 2,
        accountType: 'individual',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty minAccountMonths', () => {
      expect(
        () => new Requirements(undefined, AccountType.Individual),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty accountType', () => {
      expect(() => new Requirements(2, undefined)).toThrowError(
        DomainException,
      );
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid minAccountMonths', () => {
      expect(() => new Requirements(-1, AccountType.Individual)).toThrowError(
        DomainException,
      );
      expect(
        () => new Requirements('A' as any, AccountType.Individual),
      ).toThrowError(DomainException);
      expect(() => new Requirements(1.2, AccountType.Individual)).toThrowError(
        DomainException,
      );
    });

    it('Should be able to throw a DomainException if we pass an invalid accountType', () => {
      expect(() => new Requirements(2, 'X' as any)).toThrowError(
        DomainException,
      );
    });
  });

  describe('isEligible', () => {
    it('Should be able to get true if a Account is eligible', () => {
      const createdAt = new Date(2022, 1, 1);
      const accountType = AccountType.Individual;
      const requirements = new Requirements(2, AccountType.Individual);

      expect(requirements.isEligible(createdAt, accountType)).toBe(true);
    });

    it('Should be able to get false if a Account is not eligible', () => {
      const createdAt = new Date();
      const accountType = AccountType.Individual;
      const requirements = new Requirements(2, AccountType.Individual);

      expect(requirements.isEligible(createdAt, accountType)).toBe(false);
    });
  });
});
