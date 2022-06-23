import { Cents, PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import * as Mocks from '@payments/infra/mocks';
import { CandidateType } from '../candidate-type.enum';
import { Features } from '../features.vo';
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
          new Features(new Cents(100), [
            new ProviderLiable('stone', PaymentMethod.CreditCard),
          ]),
        ),
      ).toEqual({
        id: 'default',
        fee: 0.1,
        requirements: {
          minAccountMonths: 2,
          candidateType: 'individual',
        },
        features: {
          withdrawLimit: {
            value: 100,
          },
          providerLiables: [
            {
              paymentProviderId: 'stone',
              paymentMethod: 'credit_card',
            },
          ],
        },
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
            new Features(new Cents(100), [
              new ProviderLiable('stone', PaymentMethod.CreditCard),
            ]),
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
            new Features(new Cents(100), [
              new ProviderLiable('stone', PaymentMethod.CreditCard),
            ]),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty requirements', () => {
      expect(
        () =>
          new Policy(
            'default',
            0.1,
            undefined,
            new Features(new Cents(100), [
              new ProviderLiable('stone', PaymentMethod.CreditCard),
            ]),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty features', () => {
      expect(
        () =>
          new Policy(
            'default',
            0.1,
            new Requirements(2, CandidateType.Individual),
            undefined,
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
            new Features(new Cents(100), [
              new ProviderLiable('stone', PaymentMethod.CreditCard),
            ]),
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('isEligible', () => {
    it('Should be able to know if a Candidate is eligible', () => {
      const createdAt = new Date(2022, 1, 1);
      const candidate = Mocks.CandidateDomainObjectBuilder()
        .withFields({ createdAt })
        .build();
      const policy = new Policy(
        'default',
        0.1,
        new Requirements(2, CandidateType.Individual),
        new Features(new Cents(100), [
          new ProviderLiable('stone', PaymentMethod.CreditCard),
        ]),
      );

      expect(policy.isEligible(candidate)).toBe(true);
    });
  });

  describe('paymentProviderFor', () => {
    it('Should be able to get a PaymentProvider id', () => {
      const policy = new Policy(
        'default',
        0.1,
        new Requirements(2, CandidateType.Individual),
        new Features(new Cents(100), [
          new ProviderLiable('stone', PaymentMethod.CreditCard),
        ]),
      );
      const paymentMethod = PaymentMethod.CreditCard;

      expect(policy.paymentProviderFor(paymentMethod)).toBe('stone');
    });
  });
});
