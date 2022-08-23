import * as Nest from '@nestjs/common';
import { DomainEvent } from '@shared/domain-objects';
import { AmqpEventPublisher } from '@shared/infra-objects';
import { IEventStreamPublisher } from '@payments/domain';

@Nest.Injectable()
export class AmqpEventStreamPublisherAdapter
  extends AmqpEventPublisher
  implements IEventStreamPublisher
{
  public override async publish(event: DomainEvent): Promise<void> {
    return super.publish(event);
  }
}
