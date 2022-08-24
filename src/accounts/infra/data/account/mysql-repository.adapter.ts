import * as Nest from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { Repository } from 'typeorm';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { IAccountsRepository, Account } from '@accounts/domain';
import { AccountActiveRecord } from './account.ar';
import { AccountFactory } from './factory';

export class MysqlRepositoryAdapter implements IAccountsRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryAdapter.name,
  );

  constructor(
    @InjectRepository(AccountActiveRecord)
    private readonly mysqlRepository: Repository<AccountActiveRecord>,
  ) {}

  public async save(account: Account): Promise<void> {
    try {
      const { id } = await this.mysqlRepository.save(cloneDeep(account));
      this.loadIdentification(id, account);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while saving Account: ${account.id}`, {
          account,
        }),
      );

      throw new Nest.BadGatewayException(
        `Error while saving Account: ${account.id}`,
      );
    }
  }

  public async findOneById(id: number): Promise<Account> {
    try {
      const accountAR = await this.mysqlRepository
        .createQueryBuilder('account')
        .where('account.id = :id', { id })
        .getOne();
      if (accountAR) return AccountFactory.toDomainObject(accountAR);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching Account by id ${id}`, {
          accountId: id,
        }),
      );

      throw new Nest.BadGatewayException(
        `Error while fetching Account by id ${id}`,
      );
    }
  }

  public async isEmailInUse(email: string): Promise<boolean> {
    const count = await this.mysqlRepository
      .createQueryBuilder('account')
      .where('account.email = :email', { email })
      .getCount();

    return count > 0;
  }

  private loadIdentification(id: number, account: Account): void {
    if (!account.id) account.id = id;
  }
}
