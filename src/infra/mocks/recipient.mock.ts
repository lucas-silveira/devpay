import { Recipient, RecipientType } from '@domain/recipient';

export const makeRecipientPlainObject = (
  args: Partial<Recipient> = {},
): Plain<Recipient> => ({
  id: args.id ?? 1,
  firstName: args.firstName ?? 'John',
  lastName: args.lastName ?? 'Snow',
  email: args.email ?? 'john@snow.com',
  document: args.document ?? '123456789',
  type: args.type ?? RecipientType.Individual,
  secretKey: args.secretKey ?? 'skey_123',
  policyId: args.policyId ?? 'default',
  createdAt: args.createdAt ?? (jasmine.any(Date) as any),
});

export const makeRecipientDomainObject = (
  args: Partial<Recipient> = {},
): Recipient =>
  new Recipient(
    args.id ?? 1,
    args.firstName ?? 'John',
    args.lastName ?? 'Snow',
    args.email ?? 'john@snow.com',
    args.document ?? '123456789',
    args.type ?? RecipientType.Individual,
    args.secretKey ?? 'skey_123',
    args.policyId ?? 'default',
    args.createdAt ?? new Date(),
  );
