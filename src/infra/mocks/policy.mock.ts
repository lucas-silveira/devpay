import { PaymentMethod } from '@shared/domain-objects';
import { Policy, Requirements, ProviderLiable } from '@domain/policy';
import { RecipientType } from '@domain/recipient';

export const makePolicyPlainObject = (
  args: Partial<Policy> = {},
): Plain<Policy> => ({
  id: args.id || 'default',
  fee: args.fee || 0.1,
  requirements: args.requirements || {
    minAccountMonths: 2,
    recipientType: RecipientType.Individual,
  },
  providerLiables: args.providerLiables || [
    {
      paymentProviderId: 'stone',
      paymentMethod: PaymentMethod.CreditCard,
    },
  ],
  createdAt: args.createdAt || (jasmine.any(Date) as any),
});

export const makePolicyDomainObject = (args: Partial<Policy> = {}): Policy =>
  new Policy(
    args.id || 'default',
    args.fee || 0.1,
    args.requirements || new Requirements(2, RecipientType.Individual),
    args.providerLiables || [
      new ProviderLiable('stone', PaymentMethod.CreditCard),
    ],
    args.createdAt || new Date(),
  );
