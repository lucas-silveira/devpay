import { DomainEvent } from '@shared/domain-objects';

export interface IEventStreamPublisher {
  publish(event: DomainEvent): Promise<void>;
}
