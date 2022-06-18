import { DomainEvent } from '@shared/domain-objects';

export interface IDomainEventPublisher {
  publish(anEvent: DomainEvent): Promise<void>;
}
