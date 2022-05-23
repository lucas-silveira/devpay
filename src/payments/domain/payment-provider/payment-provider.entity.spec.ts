import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { PaymentProvider } from './payment-provider.entity';
import { ProviderType } from './provider-type.enum';

Tests.unitScope('PaymentProvider', () => {
  describe('creation', () => {
    it('Should be able to create a PaymentProvider correctly', () => {
      expect(
        new PaymentProvider(
          'stone',
          ProviderType.Acquirer,
          [PaymentMethod.CreditCard],
          '123',
        ),
      ).toEqual({
        id: 'stone',
        type: 'acquirer',
        acceptedPaymentMethods: ['credit_card'],
        authToken: '123',
      });
    });

    it('Should be able to create a PaymentProvider with id in lower-case', () => {
      expect(
        new PaymentProvider(
          'STONE',
          ProviderType.Acquirer,
          [PaymentMethod.CreditCard],
          '123',
        ),
      ).toEqual(
        expect.objectContaining({
          id: 'stone',
        }),
      );
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty id', () => {
      expect(
        () =>
          new PaymentProvider(
            undefined,
            ProviderType.Acquirer,
            [PaymentMethod.CreditCard],
            '123',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty type', () => {
      expect(
        () =>
          new PaymentProvider(
            'stone',
            undefined,
            [PaymentMethod.CreditCard],
            '123',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty acceptedPaymentMethods', () => {
      expect(
        () =>
          new PaymentProvider('stone', ProviderType.Acquirer, undefined, '123'),
      ).toThrowError(DomainException);
      expect(
        () => new PaymentProvider('stone', ProviderType.Acquirer, [], '123'),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid id', () => {
      expect(
        () =>
          new PaymentProvider(
            'stonestonestonestonestonestone',
            ProviderType.Acquirer,
            [PaymentMethod.CreditCard],
            '123',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid type', () => {
      expect(
        () =>
          new PaymentProvider(
            'stone',
            'X' as any,
            [PaymentMethod.CreditCard],
            '123',
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid acceptedPaymentMethods', () => {
      expect(
        () =>
          new PaymentProvider(
            'stone',
            ProviderType.Acquirer,
            ['X' as any],
            '123',
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('isThePaymentMethodAccepted', () => {
    it('Should be able to get true if a PaymentMethod is accepted', () => {
      const pm = new PaymentProvider(
        'stone',
        ProviderType.Acquirer,
        [PaymentMethod.CreditCard],
        '123',
      );
      expect(pm.isThePaymentMethodAccepted(PaymentMethod.CreditCard)).toBe(
        true,
      );
    });

    it('Should be able to get false if a PaymentMethod is not accepted', () => {
      const pm = new PaymentProvider(
        'stone',
        ProviderType.Acquirer,
        [PaymentMethod.CreditCard],
        '123',
      );
      expect(pm.isThePaymentMethodAccepted(PaymentMethod.Pix)).toBe(false);
    });
  });
});
