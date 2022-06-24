import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/testing';
import { AccountsModule } from '@accounts/accounts.module';
import { Account } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { AppAccountsSignUpService } from '../app-accounts-sign-up.service';

Tests.serviceScope('AppAccountsSignUpService', () => {
  let moduleRef: TestingModule;
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
    accountsRepository =
      moduleRef.get<Mocks.FakeAccountsRepository>('AccountsRepository');
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create an Account and return a Dto', async () => {
    const accountDto = Mocks.AccountPlainObjectBuilder()
      .withFields({ email: 'john2@snow.com' })
      .withoutFields('id', 'secretKey', 'level', 'createdAt')
      .build();
    const expectedAccount = Mocks.AccountPlainObjectBuilder()
      .withFields({ id: 2, email: 'john2@snow.com' })
      .withoutFields('secretKey')
      .build();
    const accountsRepositorySpy = jest.spyOn(accountsRepository, 'save');

    await expect(appService.createAccount(accountDto)).resolves.toEqual(
      expectedAccount,
    );
    expect(accountsRepositorySpy).toBeCalledWith(jasmine.any(Account));
  });

  it('Should be able to throw ConflictException if an email is already in use', async () => {
    const accountDto = Mocks.AccountPlainObjectBuilder()
      .withoutFields('id', 'secretKey', 'level', 'createdAt')
      .build();
    await expect(appService.createAccount(accountDto)).rejects.toThrow(
      Nest.ConflictException,
    );
  });
});
