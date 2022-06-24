import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/testing';
import { AccountsModule } from '@accounts/accounts.module';
import * as Mocks from '@accounts/infra/mocks';
import { AppAccountsFetchService } from '../app-accounts-fetch.service';

Tests.serviceScope('AppAccountsFetchService', () => {
  let moduleRef: TestingModule;
  let accountsRepository: Mocks.FakeAccountsRepository;
  let appService: AppAccountsFetchService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AccountsModule.controllers,
      providers: AccountsModule.providers,
    })
      .overrideProvider('AccountsRepository')
      .useClass(Mocks.FakeAccountsRepository)
      .overrideProvider('EventPublisher')
      .useClass(Mocks.FakeEventPublisher)
      .compile();

    appService = moduleRef.get<AppAccountsFetchService>(
      AppAccountsFetchService,
    );
    accountsRepository =
      moduleRef.get<Mocks.FakeAccountsRepository>('AccountsRepository');
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to retrieve a Account by id', async () => {
    const id = 1;
    const expectedAccount = Mocks.AccountPlainObjectBuilder()
      .withoutFields('secretKey')
      .build();
    const accountsRepositorySpy = jest.spyOn(accountsRepository, 'findOneById');

    await expect(appService.fetchAccountById(id)).resolves.toEqual(
      expectedAccount,
    );
    expect(accountsRepositorySpy).toBeCalledWith(id);
  });

  it('Should be able to throw NotFoundException if the Account doesn`t exists', async () => {
    await expect(appService.fetchAccountById(2)).rejects.toThrowError(
      Nest.NotFoundException,
    );
  });
});
