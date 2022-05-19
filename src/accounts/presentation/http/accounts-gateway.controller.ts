import * as Nest from '@nestjs/common';
import { Log } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { DTOs, Services } from '@accounts/application';

@Nest.Controller('accounts')
export class HttpAccountsGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    HttpAccountsGatewayController.name,
  );

  constructor(
    private readonly appAccountsSignUpService: Services.AppAccountsSignUpService,
    private readonly appAccountsFetchService: Services.AppAccountsFetchService,
  ) {}

  @Nest.Post()
  public async postAccounts(
    @Nest.Body() accountDto: DTOs.Request.CreateAccountDto,
  ): Promise<DTOs.Response.AccountDto> {
    this.logger.log(
      new Log('Http Request received to create a Account', {
        accountDto,
      }),
    );
    return this.appAccountsSignUpService.createAccount(accountDto);
  }

  @Nest.Get(':id')
  public async getAccounts(
    @Nest.Param('id', Nest.ParseIntPipe) id: number,
  ): Promise<DTOs.Response.AccountDto> {
    return this.appAccountsFetchService.fetchAccountById(id);
  }
}
