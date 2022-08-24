import * as Nest from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { DataSource } from 'typeorm';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import {
  Account,
  AccountCreated,
  IAccountsRepository,
  IEventPublisher,
} from '@accounts/domain';
import { AccountActiveRecord } from './account.ar';

@Nest.Injectable()
export class EventPublisherDecorator implements IAccountsRepository {
  private readonly logger = new NestAddons.AppLogger(
    EventPublisherDecorator.name,
  );

  constructor(
    @InjectConnection()
    private readonly connection: DataSource,
    @Nest.Inject('AccountsRepositoryAdapter')
    private readonly accountsRepository: IAccountsRepository,
    @Nest.Inject('EventPublisher')
    private readonly eventPublisher: IEventPublisher,
  ) {}

  public async save(account: Account): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      const { id } = await queryRunner.manager.save(
        AccountActiveRecord,
        cloneDeep(account),
      );
      this.loadIdentification(id, account);
      await this.eventPublisher.publish(
        new AccountCreated(
          account.id,
          account.fullName(),
          account.email,
          account.document,
        ),
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while saving Account ${account.id} and publishing AccountCreated event`,
          {
            account,
          },
        ),
      );

      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();

      throw new Nest.BadGatewayException(
        `Error while saving Account ${account.id} and publishing AccountCreated event`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  public async findOneById(id: number): Promise<Account> {
    return this.accountsRepository.findOneById(id);
  }

  public async isEmailInUse(email: string): Promise<boolean> {
    return this.accountsRepository.isEmailInUse(email);
  }

  private loadIdentification(id: number, account: Account): void {
    if (!account.id) account.id = id;
  }
}
