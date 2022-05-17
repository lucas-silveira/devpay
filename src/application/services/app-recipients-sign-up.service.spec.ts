import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { Recipient } from '@domain/recipient';
import { ProvidersIntegrationService } from '@domain/services';
import * as Mocks from '@infra/mocks';
import { AppRecipientsSignUpService } from './app-recipients-sign-up.service';

describe('AppRecipientsSignUpService', () => {
  let moduleRef: TestingModule;
  let providersIntegrationService: ProvidersIntegrationService;
  let recipientsRepository: Mocks.FakeRecipientsRepository;
  let appService: AppRecipientsSignUpService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AppModule.controllers,
      providers: AppModule.providers,
    })
      .overrideProvider('RecipientsRepository')
      .useClass(Mocks.FakeRecipientsRepository)
      .compile();

    appService = moduleRef.get<AppRecipientsSignUpService>(
      AppRecipientsSignUpService,
    );
    providersIntegrationService = moduleRef.get<ProvidersIntegrationService>(
      ProvidersIntegrationService,
    );
    recipientsRepository = moduleRef.get<Mocks.FakeRecipientsRepository>(
      'RecipientsRepository',
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a Recipient', async () => {
    const { firstName, lastName, email, document, type } =
      Mocks.RecipientPlainObjectBuilder().build();
    const recipientDto = { firstName, lastName, email, document, type };
    const providersIntegrationServiceSpy = jest.spyOn(
      providersIntegrationService,
      'integrateWithStone',
    );
    const recipientsRepositorySpy = jest.spyOn(recipientsRepository, 'save');

    await expect(
      appService.createRecipient(recipientDto),
    ).resolves.not.toThrow();
    expect(providersIntegrationServiceSpy).toBeCalledWith(
      jasmine.any(Recipient),
    );
    expect(recipientsRepositorySpy).toBeCalledWith(jasmine.any(Recipient));
  });
});
