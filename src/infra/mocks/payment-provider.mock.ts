import { PaymentMethod } from '@shared/domain-objects';
import { MockBuilder } from '@shared/infra-objects';
import { PaymentProvider, ProviderType } from '@domain/payment-provider';

export const PaymentProviderPlainObjectBuilder = (): MockBuilder<
  Plain<PaymentProvider>
> =>
  new MockBuilder<Plain<PaymentProvider>>({
    id: 'stone',
    type: ProviderType.Acquirer,
    acceptedPaymentMethods: [PaymentMethod.CreditCard],
    authToken: '123',
  });

export const PaymentProviderDomainObjectBuilder =
  (): MockBuilder<PaymentProvider> =>
    new MockBuilder<PaymentProvider>(
      new PaymentProvider(
        'stone',
        ProviderType.Acquirer,
        [PaymentMethod.CreditCard],
        '123',
      ),
    );
