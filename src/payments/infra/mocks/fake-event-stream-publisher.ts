import { IEventStreamPublisher } from '@payments/domain';

export class FakeEventStreamPublisher implements IEventStreamPublisher {
  public async publish(): Promise<void> {
    return;
  }
}
