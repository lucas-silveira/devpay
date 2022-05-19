import { Recipient, IRecipientsRepository } from '@domain/recipient';
import { RecipientDomainObjectBuilder } from './recipient.mock';

export class FakeRecipientsRepository implements IRecipientsRepository {
  private readonly data = [RecipientDomainObjectBuilder().build()];

  public async save(recipient: Recipient): Promise<void> {
    this.loadIdentification(recipient);
    this.data.push(recipient);
  }

  public async findOneById(id: number): Promise<Recipient> {
    return this.data.find((rcp) => rcp.id === id);
  }

  public async isEmailInUse(email: string): Promise<boolean> {
    return this.data.some((rcp) => rcp.email === email);
  }

  private loadIdentification(recipient: Recipient): void {
    const nextId = this.data.length + 1;
    recipient.id = nextId;
  }
}
