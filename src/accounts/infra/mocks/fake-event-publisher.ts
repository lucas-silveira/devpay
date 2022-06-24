import { IEventPublisher } from '@accounts/domain';

export class FakeEventPublisher implements IEventPublisher {
  public async publish(): Promise<void> {
    return;
  }
}
