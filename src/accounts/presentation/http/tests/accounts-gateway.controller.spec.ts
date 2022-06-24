import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/testing';
import { AccountsModule } from '@accounts/accounts.module';
import { Services } from '@accounts/application';
import * as Mocks from '@accounts/infra/mocks';
import { HttpAccountsGatewayController } from '../accounts-gateway.controller';

Tests.serviceScope('HttpAccountsGatewayController', () => {
  let moduleRef: TestingModule;
  let appAccountsSignUpService: Services.AppAccountsSignUpService;
  let appAccountsFetchService: Services.AppAccountsFetchService;
  let httpGatewayController: HttpAccountsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpAccountsGatewayController],
      providers: AccountsModule.providers,
    })
      .overrideProvider('AccountsRepository')
      .useClass(Mocks.FakeAccountsRepository)
      .overrideProvider('EventPublisher')
      .useClass(Mocks.FakeEventPublisher)
      .compile();

    httpGatewayController = moduleRef.get<HttpAccountsGatewayController>(
      HttpAccountsGatewayController,
    );
    appAccountsSignUpService = moduleRef.get<Services.AppAccountsSignUpService>(
      Services.AppAccountsSignUpService,
    );
    appAccountsFetchService = moduleRef.get<Services.AppAccountsFetchService>(
      Services.AppAccountsFetchService,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a account', async () => {
    const accountDto = Mocks.AccountPlainObjectBuilder()
      .withFields({ email: 'john2@snow.com' })
      .withoutFields('id', 'secretKey', 'level', 'createdAt')
      .build();
    const expectedAccount = Mocks.AccountPlainObjectBuilder()
      .withFields({ id: 2, email: 'john2@snow.com' })
      .withoutFields('secretKey')
      .build();
    const appAccountsSignUpServiceSpy = jest.spyOn(
      appAccountsSignUpService,
      'createAccount',
    );

    await expect(
      httpGatewayController.postAccounts(accountDto),
    ).resolves.toEqual(expectedAccount);
    expect(appAccountsSignUpServiceSpy).toBeCalledWith(accountDto);
  });

  it('Should be able to retrieve a account', async () => {
    const id = 1;
    const expectedAccount = Mocks.AccountPlainObjectBuilder()
      .withoutFields('secretKey')
      .build();
    const appAccountsFetchServiceSpy = jest.spyOn(
      appAccountsFetchService,
      'fetchAccountById',
    );

    await expect(httpGatewayController.getAccounts(id)).resolves.toEqual(
      expectedAccount,
    );
    expect(appAccountsFetchServiceSpy).toBeCalledWith(id);
  });
});
