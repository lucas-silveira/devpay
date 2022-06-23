import { Cents, PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import { Features } from '../features.vo';
import { ProviderLiable } from '../provider-liable.vo';

Tests.unitScope('Features', () => {
  describe('creation', () => {
    it('Should be able to create a Features correctly', () => {
      expect(
        new Features(new Cents(100), [
          new ProviderLiable('stone', PaymentMethod.CreditCard),
        ]),
      ).toEqual({
        withdrawLimit: {
          value: 100,
        },
        providerLiables: [
          {
            paymentProviderId: 'stone',
            paymentMethod: 'credit_card',
          },
        ],
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty withdrawLimit', () => {
      expect(
        () =>
          new Features(undefined, [
            new ProviderLiable('stone', PaymentMethod.CreditCard),
          ]),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty providerLiables', () => {
      expect(() => new Features(new Cents(100), undefined)).toThrowError(
        DomainException,
      );
      expect(() => new Features(new Cents(100), [])).toThrowError(
        DomainException,
      );
    });
  });

  describe('paymentProviderFor', () => {
    it('Should be able to get a PaymentProvider id', () => {
      const features = new Features(new Cents(100), [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]);
      const paymentMethod = PaymentMethod.CreditCard;
      expect(features.paymentProviderFor(paymentMethod)).toBe('stone');
    });

    it('Should be able to throw a DomainException if a PaymentProvider doesn´t exists ', () => {
      const features = new Features(new Cents(100), [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]);
      const paymentMethod = PaymentMethod.Boleto;
      expect(() => features.paymentProviderFor(paymentMethod)).toThrowError(
        DomainException,
      );
    });
  });
});
