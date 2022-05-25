import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { CandidateType } from './candidate-type.enum';
import { Requirements } from './requirements.vo';

Tests.unitScope('Requirements', () => {
  describe('creation', () => {
    it('Should be able to create a Requirements correctly', () => {
      expect(new Requirements(2, CandidateType.Individual)).toEqual({
        minAccountMonths: 2,
        candidateType: 'individual',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty minAccountMonths', () => {
      expect(
        () => new Requirements(undefined, CandidateType.Individual),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty candidateType', () => {
      expect(() => new Requirements(2, undefined)).toThrowError(
        DomainException,
      );
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid minAccountMonths', () => {
      expect(() => new Requirements(-1, CandidateType.Individual)).toThrowError(
        DomainException,
      );
      expect(
        () => new Requirements('A' as any, CandidateType.Individual),
      ).toThrowError(DomainException);
      expect(
        () => new Requirements(1.2, CandidateType.Individual),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid candidateType', () => {
      expect(() => new Requirements(2, 'X' as any)).toThrowError(
        DomainException,
      );
    });
  });

  describe('isEligible', () => {
    it('Should be able to get true if a Candidate is eligible', () => {
      const candidateType = CandidateType.Individual;
      const createdAt = new Date(2022, 1, 1);
      const requirements = new Requirements(2, CandidateType.Individual);

      expect(requirements.isEligible(candidateType, createdAt)).toBe(true);
    });

    it('Should be able to get false if a Candidate is not eligible', () => {
      const candidateType = CandidateType.Individual;
      const createdAt = new Date();
      const requirements = new Requirements(2, CandidateType.Individual);

      expect(requirements.isEligible(candidateType, createdAt)).toBe(false);
    });
  });
});
