import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as Mocks from '@infra/mocks';
import { AppRecipientsSignUpService } from './app-recipients-sign-up.service';

describe('AppRecipientsSignUpService', () => {
  let moduleRef: TestingModule;
  let appService: AppRecipientsSignUpService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AppModule.controllers,
      providers: AppModule.providers,
    }).compile();

    appService = moduleRef.get<AppRecipientsSignUpService>(
      AppRecipientsSignUpService,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a Recipient', async () => {
    const { firstName, lastName, email, document, type } =
      Mocks.makeRecipientPlainObject();
    const recipientDto = { firstName, lastName, email, document, type };

    await expect(
      appService.createRecipient(recipientDto),
    ).resolves.not.toThrow();
  });
});
