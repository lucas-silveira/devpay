import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { PaymentProvider } from './payment-provider.entity';
import { ProviderType } from './provider-type.enum';

describe('PaymentProvider', () => {
  it('Should be able to create a Recipient correctly', () => {
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

  it('Should be able to create a Recipient with id in lower-case', () => {
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
