import { MockBuilder } from '@shared/infra-objects';
import { Recipient, RecipientType } from '@domain/recipient';

export const RecipientPlainObjectBuilder = (): MockBuilder<Plain<Recipient>> =>
  new MockBuilder<Plain<Recipient>>({
    id: 1,
    firstName: 'John',
    lastName: 'Snow',
    email: 'john@snow.com',
    document: '123456789',
    type: RecipientType.Individual,
    secretKey: 'skey_123',
    policyId: 'default',
    createdAt: jasmine.any(Date),
  });

export const RecipientDomainObjectBuilder = (): MockBuilder<Recipient> =>
  new MockBuilder<Recipient>(
    new Recipient(
      1,
      'John',
      'Snow',
      'john@snow.com',
      '123456789',
      RecipientType.Individual,
      'skey_123',
      'default',
      new Date(),
    ),
  );
