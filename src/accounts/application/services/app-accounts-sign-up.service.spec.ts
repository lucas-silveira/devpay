import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '@accounts/accounts.module';
import { Account } from '@accounts/domain';
import { ProvidersIntegrationService } from '@accounts/domain/services';
import * as Mocks from '@accounts/infra/mocks';
import { AppAccountsSignUpService } from './app-accounts-sign-up.service';

describe('AppAccountsSignUpService', () => {
  let moduleRef: TestingModule;
  let providersIntegrationService: ProvidersIntegrationService;
  let accountsRepository: Mocks.FakeAccountsRepository;
  let appService: AppAccountsSignUpService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AccountsModule.controllers,
      providers: AccountsModule.providers,
    })
      .overrideProvider('AccountsRepository')
      .useClass(Mocks.FakeAccountsRepository)
      .compile();

    appService = moduleRef.get<AppAccountsSignUpService>(
      AppAccountsSignUpService,
    );
    providersIntegrationService = moduleRef.get<ProvidersIntegrationService>(
      ProvidersIntegrationService,
    );
    accountsRepository =
      moduleRef.get<Mocks.FakeAccountsRepository>('AccountsRepository');
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a Account and return a Dto', async () => {
    const accountDto = Mocks.AccountPlainObjectBuilder()
      .withFields({ email: 'john2@snow.com' })
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    const expectedAccount = Mocks.AccountPlainObjectBuilder()
      .withFields({ id: 2, email: 'john2@snow.com' })
      .withoutFields('secretKey')
      .build();
    const providersIntegrationServiceSpy = jest.spyOn(
      providersIntegrationService,
      'integrateWithStone',
    );
    const accountsRepositorySpy = jest.spyOn(accountsRepository, 'save');

    await expect(appService.createAccount(accountDto)).resolves.toEqual(
      expectedAccount,
    );
    expect(providersIntegrationServiceSpy).toBeCalledWith(jasmine.any(Account));
    expect(accountsRepositorySpy).toBeCalledWith(jasmine.any(Account));
  });

  it('Should be able to throw ConflictException if an email is already in use', async () => {
    const accountDto = Mocks.AccountPlainObjectBuilder()
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    await expect(appService.createAccount(accountDto)).rejects.toThrow(
      Nest.ConflictException,
    );
  });
});
