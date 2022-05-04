import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { PaymentProvider } from './payment-provider.entity';

describe('PaymentProvider', () => {
  it('Should be able to create a Recipient correctly', () => {
    expect(
      new PaymentProvider('stone', [PaymentMethod.CreditCard], '123'),
    ).toEqual({
      id: 'stone',
      acceptedPaymentMethods: ['credit_card'],
      authToken: '123',
    });
  });

  it('Should be able to throw a DomainException if we pass an empty id', () => {
    expect(
      () => new PaymentProvider(undefined, [PaymentMethod.CreditCard], '123'),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty acceptedPaymentMethods', () => {
    expect(() => new PaymentProvider('stone', undefined, '123')).toThrowError(
      DomainException,
    );
    expect(() => new PaymentProvider('stone', [], '123')).toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw a DomainException if we pass an invalid acceptedPaymentMethods', () => {
    expect(
      () => new PaymentProvider('stone', ['X' as any], '123'),
    ).toThrowError(DomainException);
  });

  it('Should be able to create a Recipient with id in lower-case', () => {
    expect(
      new PaymentProvider('STONE', [PaymentMethod.CreditCard], '123'),
    ).toEqual(
      expect.objectContaining({
        id: 'stone',
      }),
    );
  });
});
