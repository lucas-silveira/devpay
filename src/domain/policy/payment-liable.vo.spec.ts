import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { PaymentLiable } from './payment-liable.vo';

describe('PaymentLiable', () => {
  it('Should be able to create a PaymentLiable correctly', () => {
    expect(new PaymentLiable('stone', PaymentMethod.CreditCard)).toEqual({
      paymentProviderId: 'stone',
      paymentMethod: 'credit_card',
    });
  });

  it('Should be able to throw a DomainException if we pass an empty paymentProviderId', () => {
    expect(
      () => new PaymentLiable(undefined, PaymentMethod.CreditCard),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty paymentMethod', () => {
    expect(() => new PaymentLiable('stone', undefined)).toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw a DomainException if we pass an invalid paymentMethod', () => {
    expect(() => new PaymentLiable('stone', 'X' as any)).toThrowError(
      DomainException,
    );
  });
});
