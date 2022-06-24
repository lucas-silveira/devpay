import * as Nest from '@nestjs/common';
import { DomainEvent } from '@shared/domain-objects';
import { AmqpEventPublisher } from '@shared/infra-objects';
import { IEventPublisher } from '@payments/domain';

@Nest.Injectable()
export class AmqpEventPublisherAdapter
  extends AmqpEventPublisher
  implements IEventPublisher
{
  public override async publish(event: DomainEvent): Promise<void> {
    return super.publish(event);
  }
}
