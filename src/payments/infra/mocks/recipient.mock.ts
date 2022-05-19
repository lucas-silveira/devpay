import { MockBuilder } from '@shared/tests';
import { RecipientType, Recipient } from '@payments/domain';

export const RecipientPlainObjectBuilder = (): MockBuilder<Plain<Recipient>> =>
  new MockBuilder<Plain<Recipient>>({
    name: 'John Snow',
    type: RecipientType.Individual,
    createdAt: jasmine.any(Date),
  });

export const RecipientDomainObjectBuilder = (): MockBuilder<Recipient> =>
  new MockBuilder<Recipient>(
    new Recipient('John Snow', RecipientType.Individual, new Date()),
  );
