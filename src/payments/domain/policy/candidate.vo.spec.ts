import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { CandidateType } from './candidate-type.enum';
import { Candidate } from './candidate.vo';

Tests.unitScope('Candidate', () => {
  describe('creation', () => {
    it('Should be able to create a Candidate correctly', () => {
      expect(
        new Candidate('John Snow', CandidateType.Individual, new Date()),
      ).toEqual({
        name: 'John Snow',
        type: 'individual',
        createdAt: jasmine.any(Date),
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty type', () => {
      expect(
        () => new Candidate('John Snow', undefined, new Date()),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty createdAt', () => {
      expect(
        () => new Candidate('John Snow', CandidateType.Individual, undefined),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid type', () => {
      expect(
        () => new Candidate('John Snow', 'X' as any, new Date()),
      ).toThrowError(DomainException);
    });
  });
});
