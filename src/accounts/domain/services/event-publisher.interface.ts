import { DomainEvent } from '@shared/domain-objects';

export interface IEventPublisher {
  publish(anEvent: DomainEvent): Promise<void>;
}
