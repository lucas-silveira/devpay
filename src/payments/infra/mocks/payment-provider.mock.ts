import { PaymentMethod } from '@shared/domain-objects';
import { MockBuilder } from '@shared/tests';
import { PaymentProvider, ProviderType } from '@payments/domain';

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
