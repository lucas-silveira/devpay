import { DomainEvent } from '@shared/domain-objects';

export interface IEventPublisher {
  publish(event: DomainEvent): Promise<void>;
}
