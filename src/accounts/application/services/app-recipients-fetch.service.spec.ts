import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '@accounts/accounts.module';
import * as Mocks from '@accounts/infra/mocks';
import { AppRecipientsFetchService } from './app-recipients-fetch.service';

describe('AppRecipientsFetchService', () => {
  let moduleRef: TestingModule;
  let recipientsRepository: Mocks.FakeRecipientsRepository;
  let appService: AppRecipientsFetchService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AccountsModule.controllers,
      providers: AccountsModule.providers,
    })
      .overrideProvider('RecipientsRepository')
      .useClass(Mocks.FakeRecipientsRepository)
      .compile();

    appService = moduleRef.get<AppRecipientsFetchService>(
      AppRecipientsFetchService,
    );
    recipientsRepository = moduleRef.get<Mocks.FakeRecipientsRepository>(
      'RecipientsRepository',
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to retrieve a Recipient by id', async () => {
    const id = 1;
    const expectedRecipient = Mocks.RecipientPlainObjectBuilder()
      .withoutFields('secretKey')
      .build();
    const recipientsRepositorySpy = jest.spyOn(
      recipientsRepository,
      'findOneById',
    );

    await expect(appService.fetchRecipientById(id)).resolves.toEqual(
      expectedRecipient,
    );
    expect(recipientsRepositorySpy).toBeCalledWith(id);
  });

  it('Should be able to throw NotFoundException if the Recipient doesn`t exists', async () => {
    await expect(appService.fetchRecipientById(2)).rejects.toThrowError(
      Nest.NotFoundException,
    );
  });
});
