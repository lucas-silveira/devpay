import { Cents, PaymentMethod } from '@shared/domain-objects';
import { Types } from '@shared/infra-objects';
import { MockBuilder } from '@shared/testing';
import {
  CandidateType,
  Candidate,
  Policy,
  Requirements,
  ProviderLiable,
  Features,
} from '@payments/domain';

export const PolicyPlainObjectBuilder = (): MockBuilder<Types.Plain<Policy>> =>
  new MockBuilder<Types.Plain<Policy>>({
    id: 'default',
    fee: 0.1,
    requirements: {
      minAccountMonths: 2,
      candidateType: CandidateType.Individual,
    },
    features: {
      withdrawLimit: {
        value: 100,
      },
      providerLiables: [
        {
          paymentProviderId: 'stone',
          paymentMethod: PaymentMethod.CreditCard,
        },
      ],
    },
    createdAt: jasmine.any(Date),
  });

export const PolicyDomainObjectBuilder = (): MockBuilder<Policy> =>
  new MockBuilder<Policy>(
    new Policy(
      'default',
      0.1,
      new Requirements(2, CandidateType.Individual),
      new Features(new Cents(100), [
        new ProviderLiable('stone', PaymentMethod.CreditCard),
      ]),
      new Date(),
    ),
  );

export const CandidatePlainObjectBuilder = (): MockBuilder<
  Types.Plain<Candidate>
> =>
  new MockBuilder<Types.Plain<Candidate>>({
    name: 'John Snow',
    type: CandidateType.Individual,
    createdAt: jasmine.any(Date),
  });

export const CandidateDomainObjectBuilder = (): MockBuilder<Candidate> =>
  new MockBuilder<Candidate>(
    new Candidate('John Snow', CandidateType.Individual, new Date()),
  );
