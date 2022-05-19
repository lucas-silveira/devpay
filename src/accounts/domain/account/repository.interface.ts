import { Account } from './account.entity';

export interface IAccountsRepository {
  save(account: Account): Promise<void>;
  findOneById(id: number): Promise<Account>;
  isEmailInUse(email: string): Promise<boolean>;
}
