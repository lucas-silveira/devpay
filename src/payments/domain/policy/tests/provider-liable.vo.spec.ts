import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import { ProviderLiable } from '../provider-liable.vo';

Tests.unitScope('ProviderLiable', () => {
  describe('creation', () => {
    it('Should be able to create a ProviderLiable correctly', () => {
      expect(new ProviderLiable('stone', PaymentMethod.CreditCard)).toEqual({
        paymentProviderId: 'stone',
        paymentMethod: 'credit_card',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty paymentProviderId', () => {
      expect(
        () => new ProviderLiable(undefined, PaymentMethod.CreditCard),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty paymentMethod', () => {
      expect(() => new ProviderLiable('stone', undefined)).toThrowError(
        DomainException,
      );
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid paymentMethod', () => {
      expect(() => new ProviderLiable('stone', 'X' as any)).toThrowError(
        DomainException,
      );
    });
  });
});
