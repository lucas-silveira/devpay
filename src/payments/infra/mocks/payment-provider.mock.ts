import { PaymentMethod } from '@shared/domain-objects';
import { Types } from '@shared/infra-objects';
import { MockBuilder } from '@shared/testing';
import { PaymentProvider, ProviderType } from '@payments/domain';

export const PaymentProviderPlainObjectBuilder = (): MockBuilder<
  Types.Plain<PaymentProvider>
> =>
  new MockBuilder<Types.Plain<PaymentProvider>>({
    id: 'stone',
    type: ProviderType.Acquirer,
    acceptedPaymentMethods: [PaymentMethod.CreditCard],
    apiUrl: 'http://localhost:3001',
    authToken: '123',
  });

export const PaymentProviderDomainObjectBuilder =
  (): MockBuilder<PaymentProvider> =>
    new MockBuilder<PaymentProvider>(
      new PaymentProvider(
        'stone',
        ProviderType.Acquirer,
        [PaymentMethod.CreditCard],
        'http://localhost:3001',
        '123',
      ),
    );
