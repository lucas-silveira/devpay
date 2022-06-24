import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import {
  Account,
  AccountCreated,
  IAccountsRepository,
  IEventPublisher,
} from '@accounts/domain';

@Nest.Injectable()
export class MysqlRepositoryDecorator implements IAccountsRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryDecorator.name,
  );

  constructor(
    @Nest.Inject('AccountsRepositoryAdapter')
    private readonly accountsRepository: IAccountsRepository,
    @Nest.Inject('EventPublisher')
    private readonly eventPublisher: IEventPublisher,
  ) {}

  public async save(account: Account): Promise<void> {
    try {
      await this.accountsRepository.save(account);
      await this.eventPublisher.publish(
        new AccountCreated(
          account.id,
          account.fullName(),
          account.email,
          account.document,
        ),
      );
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

      throw new Nest.BadGatewayException(
        `Error while saving Account ${account.id} and publishing AccountCreated event`,
      );
    }
  }

  public async findOneById(id: number): Promise<Account> {
    return this.accountsRepository.findOneById(id);
  }

  public async isEmailInUse(email: string): Promise<boolean> {
    return this.accountsRepository.isEmailInUse(email);
  }
}
