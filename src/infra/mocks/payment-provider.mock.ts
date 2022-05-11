import { PaymentMethod } from '@shared/domain-objects';
import { PaymentProvider, ProviderType } from '@domain/payment-provider';

export const makePaymentProviderPlainObject = (
  args: Partial<PaymentProvider> = {},
): Plain<PaymentProvider> => ({
  id: args.id || 'stone',
  type: args.type || ProviderType.Acquirer,
  acceptedPaymentMethods: args.acceptedPaymentMethods || [
    PaymentMethod.CreditCard,
  ],
  authToken: args.authToken || '123',
});

export const makePaymentProviderDomainObject = (
  args: Partial<PaymentProvider>,
): PaymentProvider =>
  new PaymentProvider(
    args.id || 'stone',
    args.type || ProviderType.Acquirer,
    args.acceptedPaymentMethods || [PaymentMethod.CreditCard],
    args.authToken || '123',
  );
