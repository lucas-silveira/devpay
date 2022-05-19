import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as Mocks from '@infra/mocks';
import { Services } from '@application';
import { HttpRecipientsGatewayController } from './recipients-gateway.controller';

describe('HttpRecipientsGatewayController', () => {
  let moduleRef: TestingModule;
  let appRecipientsSignUpService: Services.AppRecipientsSignUpService;
  let appRecipientsFetchService: Services.AppRecipientsFetchService;
  let httpGatewayController: HttpRecipientsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpRecipientsGatewayController],
      providers: AppModule.providers,
    })
      .overrideProvider('RecipientsRepository')
      .useClass(Mocks.FakeRecipientsRepository)
      .compile();

    httpGatewayController = moduleRef.get<HttpRecipientsGatewayController>(
      HttpRecipientsGatewayController,
    );
    appRecipientsSignUpService =
      moduleRef.get<Services.AppRecipientsSignUpService>(
        Services.AppRecipientsSignUpService,
      );
    appRecipientsFetchService =
      moduleRef.get<Services.AppRecipientsFetchService>(
        Services.AppRecipientsFetchService,
      );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a recipient', async () => {
    const recipientDto = Mocks.RecipientPlainObjectBuilder()
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    const expectedRecipient = Mocks.RecipientPlainObjectBuilder()
      .withFields({ id: 2 })
      .withoutFields('secretKey')
      .build();
    const appRecipientsSignUpServiceSpy = jest.spyOn(
      appRecipientsSignUpService,
      'createRecipient',
    );

    await expect(
      httpGatewayController.postRecipients(recipientDto),
    ).resolves.toEqual(expectedRecipient);
    expect(appRecipientsSignUpServiceSpy).toBeCalledWith(recipientDto);
  });

  it('Should be able to retrieve a recipient', async () => {
    const id = 1;
    const expectedRecipient = Mocks.RecipientPlainObjectBuilder()
      .withoutFields('secretKey')
      .build();
    const appRecipientsFetchServiceSpy = jest.spyOn(
      appRecipientsFetchService,
      'fetchRecipientById',
    );

    await expect(httpGatewayController.getRecipients(id)).resolves.toEqual(
      expectedRecipient,
    );
    expect(appRecipientsFetchServiceSpy).toBeCalledWith(id);
  });
});
