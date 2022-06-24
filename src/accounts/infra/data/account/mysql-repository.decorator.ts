import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { Account, AccountCreated, IAccountsRepository } from '@accounts/domain';

@Nest.Injectable()
export class MysqlRepositoryDecorator implements IAccountsRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryDecorator.name,
  );

  constructor(
    @Nest.Inject('AccountsRepositoryAdapter')
    private readonly accountsRepository: IAccountsRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: ConfigService,
  ) {}

  public async save(account: Account): Promise<void> {
    try {
      await this.accountsRepository.save(account);
      const accountCreatedEvent = new AccountCreated(
        account.id,
        account.fullName(),
        account.email,
        account.document,
      );
      this.amqpConnection.publish(
        this.config.get('rabbitMq.exchanges.topic'),
        accountCreatedEvent.key,
        accountCreatedEvent,
        { persistent: true },
      );
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while saving Account ${account.id} and broadcasting AccountCreated event`,
          {
            account,
          },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while saving Account ${account.id} and broadcasting AccountCreated event`,
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
