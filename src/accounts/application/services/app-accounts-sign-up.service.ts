import * as Nest from '@nestjs/common';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { Request, Response } from '@accounts/application/dtos';
import { IAccountsRepository } from '@accounts/domain';
import { ProvidersIntegrationService } from '@accounts/domain/services';
import { AccountFactory } from './account.factory';

@Nest.Injectable()
export class AppAccountsSignUpService {
  private readonly logger = new NestAddons.AppLogger(
    AppAccountsSignUpService.name,
  );

  constructor(
    private readonly providersIntegrationService: ProvidersIntegrationService,
    @Nest.Inject('AccountsRepository')
    private readonly accountsRepository: IAccountsRepository,
  ) {}

  public async createAccount(
    accountDto: Request.CreateAccountDto,
  ): Promise<Response.AccountDto> {
    try {
      await this.checkIfEmailIsAlreadyInUse(accountDto.email);
      const account = await AccountFactory.from(accountDto);
      await this.providersIntegrationService.integrateWithStone(account);
      await this.accountsRepository.save(account);

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
