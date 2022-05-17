import * as NestAddons from '@shared/nest-addons';
import { IRecipientsRepository, Recipient } from '@domain/recipient';

export class MysqlRepositoryAdapter implements IRecipientsRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryAdapter.name,
  );

  public async save(recipient: Recipient): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findOneById(id: number): Promise<Recipient> {
    throw new Error('Method not implemented.');
  }
}
