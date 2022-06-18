import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { Request, Response } from '@accounts/application/dtos';
import {
  AccountCreated,
  IAccountsRepository,
  IDomainEventPublisher,
} from '@accounts/domain';
import { AccountFactory } from './account.factory';

@Nest.Injectable()
export class AppAccountsSignUpService {
  private readonly logger = new NestAddons.AppLogger(
    AppAccountsSignUpService.name,
  );

  constructor(
    @Nest.Inject('AccountsRepository')
    private readonly accountsRepository: IAccountsRepository,
    @Nest.Inject('DomainEventPublisher')
    private readonly domainEventPublisher: IDomainEventPublisher,
  ) {}

  public async createAccount(
    accountDto: Request.CreateAccountDto,
  ): Promise<Response.AccountDto> {
    try {
      await this.checkIfEmailIsAlreadyInUse(accountDto.email);
      const account = await AccountFactory.from(accountDto);
      // @Todo: adicionar as duas seguintes operações em uma transação
      await this.accountsRepository.save(account);
      await this.domainEventPublisher.publish(
        new AccountCreated(
          account.id,
          account.fullName(),
          account.email,
          account.document,
        ),
      );

      return AccountFactory.toDto(account);
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          'Error while executing AppAccountsSignUpService.createAccount',
          { accountDto },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while executing AppAccountsSignUpService.createAccount',
      );
    }
  }

  private async checkIfEmailIsAlreadyInUse(email: string): Promise<void> {
    const isEmailInUse = await this.accountsRepository.isEmailInUse(email);

    if (isEmailInUse)
      throw new Nest.ConflictException('The email is already in use');
  }
}
