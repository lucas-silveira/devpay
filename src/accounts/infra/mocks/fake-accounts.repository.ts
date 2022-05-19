import { Account, IAccountsRepository } from '@accounts/domain';
import { AccountDomainObjectBuilder } from './accounts.mock';

export class FakeAccountsRepository implements IAccountsRepository {
  private readonly data = [AccountDomainObjectBuilder().build()];

  public async save(account: Account): Promise<void> {
    this.loadIdentification(account);
    this.data.push(account);
  }

  public async findOneById(id: number): Promise<Account> {
    return this.data.find((acc) => acc.id === id);
  }

  public async isEmailInUse(email: string): Promise<boolean> {
    return this.data.some((acc) => acc.email === email);
  }

  private loadIdentification(account: Account): void {
    const nextId = this.data.length + 1;
    account.id = nextId;
  }
}
