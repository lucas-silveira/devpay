import { PaymentMethod } from '@shared/domain-objects';
import { MockBuilder } from '@shared/tests';
import {
  RecipientType,
  Policy,
  Requirements,
  ProviderLiable,
} from '@payments/domain';

export const PolicyPlainObjectBuilder = (): MockBuilder<Plain<Policy>> =>
  new MockBuilder<Plain<Policy>>({
    id: 'default',
    fee: 0.1,
    requirements: {
      minAccountMonths: 2,
      recipientType: RecipientType.Individual,
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
      new Requirements(2, RecipientType.Individual),
      [new ProviderLiable('stone', PaymentMethod.CreditCard)],
      new Date(),
    ),
  );
