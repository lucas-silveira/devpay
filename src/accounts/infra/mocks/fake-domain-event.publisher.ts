import { IDomainEventPublisher } from '@accounts/domain';

export class FakeDomainEventPublisher implements IDomainEventPublisher {
  public publish(): Promise<void> {
    return;
  }
}
