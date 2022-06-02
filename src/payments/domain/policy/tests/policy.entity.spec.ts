import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import * as Mocks from '@payments/infra/mocks';
import { CandidateType } from '../candidate-type.enum';
import { Policy } from '../policy.entity';
import { ProviderLiable } from '../provider-liable.vo';
import { Requirements } from '../requirements.vo';

Tests.unitScope('Policy', () => {
  describe('creation', () => {
    it('Should be able to create a Policy correctly', () => {
      expect(
        new Policy(
          'default',
          0.1,
          new Requirements(2, CandidateType.Individual),
          [new ProviderLiable('stone', PaymentMethod.CreditCard)],
        ),
      ).toEqual({
        id: 'default',
        fee: 0.1,
        requirements: {
          minAccountMonths: 2,
          candidateType: 'individual',
        },
        providerLiables: [
          {
            paymentProviderId: 'stone',
            paymentMethod: 'credit_card',
          },
        ],
        createdAt: jasmine.any(Date),
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty id', () => {
      expect(
        () =>
          new Policy(
            undefined,
            0.1,
            new Requirements(2, CandidateType.Individual),
            [new ProviderLiable('stone', PaymentMethod.CreditCard)],
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty fee', () => {
      expect(
        () =>
          new Policy(
            'default',
            undefined,
            new Requirements(2, CandidateType.Individual),
            [new ProviderLiable('stone', PaymentMethod.CreditCard)],
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty requirements', () => {
      expect(
        () =>
          new Policy('default', 0.1, undefined, [
            new ProviderLiable('stone', PaymentMethod.CreditCard),
          ]),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty providerLiables', () => {
      expect(
        () =>
          new Policy(
            'default',
            0.1,
            new Requirements(2, CandidateType.Individual),
            undefined,
          ),
      ).toThrowError(DomainException);
      expect(
        () =>
          new Policy(
            'default',
            0.1,
            new Requirements(2, CandidateType.Individual),
            [],
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid id', () => {
      expect(
        () =>
          new Policy(
            'defaultdefaultdefaultdefaultdefault',
            0.1,
            new Requirements(2, CandidateType.Individual),
            [new ProviderLiable('stone', PaymentMethod.CreditCard)],
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('isEligible', () => {
    it('Should be able to get true if a Candidate is eligible', () => {
      const candidateType = CandidateType.Individual;
      const createdAt = new Date(2022, 1, 1);
      const candidate = Mocks.CandidateDomainObjectBuilder()
        .withFields({ createdAt })
        .build();
      const requirements = new Requirements(2, CandidateType.Individual);
      const policy = new Policy('default', 0.1, requirements, [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]);
      const requirementsSpy = jest.spyOn(requirements, 'isEligible');

      expect(policy.isEligible(candidate)).toBe(true);
      expect(requirementsSpy).toBeCalledWith(candidateType, createdAt);
    });

    it('Should be able to get false if a Candidate is not eligible', () => {
      const candidateType = CandidateType.Individual;
      const createdAt = new Date();
      const candidate = Mocks.CandidateDomainObjectBuilder()
        .withFields({ createdAt })
        .build();
      const requirements = new Requirements(2, CandidateType.Individual);
      const policy = new Policy('default', 0.1, requirements, [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]);
      const requirementsSpy = jest.spyOn(requirements, 'isEligible');

      expect(policy.isEligible(candidate)).toBe(false);
      expect(requirementsSpy).toBeCalledWith(candidateType, createdAt);
    });
  });
});
