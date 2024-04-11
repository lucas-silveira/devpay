import { PaymentMethod } from '@shared/domain-objects';
import { Types } from '@shared/infra-objects';
import { DummyBuilder } from '@shared/testing';
import { PaymentProvider, ProviderType } from '@payments/domain';

export const PaymentProviderPlainObjectBuilder = (): DummyBuilder<
  Types.Plain<PaymentProvider>
> =>
  new DummyBuilder<Types.Plain<PaymentProvider>>({
    id: 'stone',
    type: ProviderType.Acquirer,
    acceptedPaymentMethods: [PaymentMethod.CreditCard],
    apiUrl: 'http://localhost:3001',
    authToken: '123',
  });

export const PaymentProviderDomainObjectBuilder =
  (): DummyBuilder<PaymentProvider> =>
    new DummyBuilder<PaymentProvider>(
      new PaymentProvider(
        'stone',
        ProviderType.Acquirer,
        [PaymentMethod.CreditCard],
        'http://localhost:3001',
        '123',
      ),
    );
