import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Mocks from '@payments/infra/mocks';
import { RecipientType } from '../recipient';
import { Policy } from './policy.entity';
import { ProviderLiable } from './provider-liable.vo';
import { Requirements } from './requirements.vo';

describe('Policy', () => {
  describe('creation', () => {
    it('Should be able to create a Policy correctly', () => {
      expect(
        new Policy(
          'default',
          0.1,
          new Requirements(2, RecipientType.Individual),
          [new ProviderLiable('stone', PaymentMethod.CreditCard)],
        ),
      ).toEqual({
        id: 'default',
        fee: 0.1,
        requirements: {
          minAccountMonths: 2,
          recipientType: 'individual',
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
            new Requirements(2, RecipientType.Individual),
            [new ProviderLiable('stone', PaymentMethod.CreditCard)],
          ),
      ).toThrowError(DomainException);
      expect(
        () =>
          new Policy('', 0.1, new Requirements(2, RecipientType.Individual), [
            new ProviderLiable('stone', PaymentMethod.CreditCard),
          ]),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty fee', () => {
      expect(
        () =>
          new Policy(
            'default',
            undefined,
            new Requirements(2, RecipientType.Individual),
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
            new Requirements(2, RecipientType.Individual),
            undefined,
          ),
      ).toThrowError(DomainException);
      expect(
        () =>
          new Policy(
            'default',
            0.1,
            new Requirements(2, RecipientType.Individual),
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
            new Requirements(2, RecipientType.Individual),
            [new ProviderLiable('stone', PaymentMethod.CreditCard)],
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('isEligible', () => {
    it('Should be able to get true if a Recipient is eligible', () => {
      const createdAt = new Date(2022, 1, 1);
      const recipientType = RecipientType.Individual;
      const recipient = Mocks.RecipientDomainObjectBuilder()
        .withFields({ createdAt })
        .build();
      const requirements = new Requirements(2, RecipientType.Individual);
      const policy = new Policy('default', 0.1, requirements, [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]);
      const requirementsSpy = jest.spyOn(requirements, 'isEligible');

      expect(policy.isEligible(recipient)).toBe(true);
      expect(requirementsSpy).toBeCalledWith(createdAt, recipientType);
    });

    it('Should be able to get false if a Recipient is not eligible', () => {
      const createdAt = new Date();
      const recipientType = RecipientType.Individual;
      const recipient = Mocks.RecipientDomainObjectBuilder()
        .withFields({ createdAt })
        .build();
      const requirements = new Requirements(2, RecipientType.Individual);
      const policy = new Policy('default', 0.1, requirements, [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]);
      const requirementsSpy = jest.spyOn(requirements, 'isEligible');

      expect(policy.isEligible(recipient)).toBe(false);
      expect(requirementsSpy).toBeCalledWith(createdAt, recipientType);
    });
  });
});
