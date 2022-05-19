import { PaymentMethod } from '@shared/domain-objects';
import { MockBuilder } from '@shared/tests';
import {
  AccountType,
  Policy,
  Requirements,
  ProviderLiable,
} from '@accounts/domain';

export const PolicyPlainObjectBuilder = (): MockBuilder<Plain<Policy>> =>
  new MockBuilder<Plain<Policy>>({
    id: 'default',
    fee: 0.1,
    requirements: {
      minAccountMonths: 2,
      accountType: AccountType.Individual,
    },
    providerLiables: [
      {
        paymentProviderId: 'stone',
        paymentMethod: PaymentMethod.CreditCard,
      },
    ],
    createdAt: jasmine.any(Date),
  });

export const PolicyDomainObjectBuilder = (): MockBuilder<Policy> =>
  new MockBuilder<Policy>(
    new Policy(
      'default',
      0.1,
      new Requirements(2, AccountType.Individual),
      [new ProviderLiable('stone', PaymentMethod.CreditCard)],
      new Date(),
    ),
  );
