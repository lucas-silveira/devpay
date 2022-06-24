import { IEventPublisher } from '@payments/domain';

export class FakeEventPublisher implements IEventPublisher {
  public async publish(): Promise<void> {
    return;
  }
}
