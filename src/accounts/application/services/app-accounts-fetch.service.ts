import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { Response } from '@accounts/application/dtos';
import { IAccountsRepository } from '@accounts/domain';
import { AccountFactory } from './account.factory';

@Nest.Injectable()
export class AppAccountsFetchService {
  private readonly logger = new NestAddons.AppLogger(
    AppAccountsFetchService.name,
  );

  constructor(
    @Nest.Inject('AccountsRepository')
    private readonly accountsRepository: IAccountsRepository,
  ) {}

  public async fetchAccountById(id: number): Promise<Response.AccountDto> {
    try {
      const account = await this.accountsRepository.findOneById(id);

      if (!account)
        throw new Nest.NotFoundException(`The Account ${id} doesn't exists`);

      return AccountFactory.toDto(account);
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          'Error while executing AppAccountsFetchService.fetchAccountById',
          { id },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while executing AppAccountsFetchService.fetchAccountById',
      );
    }
  }
}
