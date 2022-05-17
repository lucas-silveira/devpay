import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as Mocks from '@infra/mocks';
import { Services } from '@application';
import { HttpRecipientsGatewayController } from './recipients-gateway.controller';

describe('HttpRecipientsGatewayController', () => {
  let moduleRef: TestingModule;
  let appRecipientsSignUpService: Services.AppRecipientsSignUpService;
  let httpGatewayController: HttpRecipientsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpRecipientsGatewayController],
      providers: AppModule.providers,
    }).compile();

    httpGatewayController = moduleRef.get<HttpRecipientsGatewayController>(
      HttpRecipientsGatewayController,
    );
    appRecipientsSignUpService =
      moduleRef.get<Services.AppRecipientsSignUpService>(
        Services.AppRecipientsSignUpService,
      );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a recipient', async () => {
    const { firstName, lastName, email, document, type } =
      Mocks.RecipientPlainObjectBuilder().build();
    const recipientDto = { firstName, lastName, email, document, type };
    const appRecipientsSignUpServiceSpy = jest.spyOn(
      appRecipientsSignUpService,
      'createRecipient',
    );

    await expect(
      httpGatewayController.postRecipients(recipientDto),
    ).resolves.not.toThrow();
    expect(appRecipientsSignUpServiceSpy).toBeCalledWith(recipientDto);
  });
});
