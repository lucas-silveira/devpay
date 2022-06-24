import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/testing';
import { AccountsModule } from '@accounts/accounts.module';
import * as Mocks from '@accounts/infra/mocks';
import { AppAccountsFetchService } from '../app-accounts-fetch.service';

Tests.serviceScope('AppAccountsFetchService', () => {
  let moduleRef: TestingModule;
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
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to retrieve a Account by id', async () => {
    const id = 1;
    const expectedAccount = Mocks.AccountPlainObjectBuilder()
      .withoutFields('secretKey')
      .build();

    await expect(appService.fetchAccountById(id)).resolves.toEqual(
      expectedAccount,
    );
  });

  it('Should be able to throw NotFoundException if the Account doesn`t exists', async () => {
    await expect(appService.fetchAccountById(2)).rejects.toThrowError(
      Nest.NotFoundException,
    );
  });
});
