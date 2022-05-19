import * as Nest from '@nestjs/common';
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

  it('Should be able to create a Recipient and return a Dto', async () => {
    const recipientDto = Mocks.RecipientPlainObjectBuilder()
      .withFields({ email: 'john2@snow.com' })
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    const expectedRecipient = Mocks.RecipientPlainObjectBuilder()
      .withFields({ id: 2, email: 'john2@snow.com' })
      .withoutFields('secretKey')
      .build();
    const providersIntegrationServiceSpy = jest.spyOn(
      providersIntegrationService,
      'integrateWithStone',
    );
    const recipientsRepositorySpy = jest.spyOn(recipientsRepository, 'save');

    await expect(appService.createRecipient(recipientDto)).resolves.toEqual(
      expectedRecipient,
    );
    expect(providersIntegrationServiceSpy).toBeCalledWith(
      jasmine.any(Recipient),
    );
    expect(recipientsRepositorySpy).toBeCalledWith(jasmine.any(Recipient));
  });

  it('Should be able to throw ConflictException if an email is already in use', async () => {
    const recipientDto = Mocks.RecipientPlainObjectBuilder()
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    await expect(appService.createRecipient(recipientDto)).rejects.toThrow(
      Nest.ConflictException,
    );
  });
});
