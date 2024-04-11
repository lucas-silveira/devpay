import { Cents, PaymentMethod } from '@shared/domain-objects';
import { Types } from '@shared/infra-objects';
import { DummyBuilder } from '@shared/testing';
import {
  CandidateType,
  Candidate,
  Policy,
  Requirements,
  ProviderLiable,
  Features,
} from '@payments/domain';

export const PolicyPlainObjectBuilder = (): DummyBuilder<Types.Plain<Policy>> =>
  new DummyBuilder<Types.Plain<Policy>>({
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

export const PolicyDomainObjectBuilder = (): DummyBuilder<Policy> =>
  new DummyBuilder<Policy>(
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

export const CandidatePlainObjectBuilder = (): DummyBuilder<
  Types.Plain<Candidate>
> =>
  new DummyBuilder<Types.Plain<Candidate>>({
    name: 'John Snow',
    type: CandidateType.Individual,
    createdAt: jasmine.any(Date),
  });

export const CandidateDomainObjectBuilder = (): DummyBuilder<Candidate> =>
  new DummyBuilder<Candidate>(
    new Candidate('John Snow', CandidateType.Individual, new Date()),
  );
