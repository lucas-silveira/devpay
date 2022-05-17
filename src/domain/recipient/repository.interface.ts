import { Recipient } from './recipient.entity';

export interface IRecipientsRepository {
  save(recipient: Recipient): Promise<void>;
  findOneById(id: number): Promise<Recipient>;
}
