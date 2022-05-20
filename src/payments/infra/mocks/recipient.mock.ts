import { Types } from '@shared/infra-objects';
import { MockBuilder } from '@shared/tests';
import { RecipientType, Recipient } from '@payments/domain';

export const RecipientPlainObjectBuilder = (): MockBuilder<
  Types.Plain<Recipient>
> =>
  new MockBuilder<Types.Plain<Recipient>>({
    id: 1,
    name: 'John Snow',
    type: RecipientType.Individual,
    createdAt: jasmine.any(Date),
  });

export const RecipientDomainObjectBuilder = (): MockBuilder<Recipient> =>
  new MockBuilder<Recipient>(
    new Recipient(1, 'John Snow', RecipientType.Individual, new Date()),
  );
