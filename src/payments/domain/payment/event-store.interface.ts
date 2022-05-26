import { DomainEvent } from '@shared/domain-objects';

export interface IEventStore {
  append(event: DomainEvent): Promise<void>;
}
