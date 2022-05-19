import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '@accounts/accounts.module';
import { Services } from '@accounts/application';
import * as Mocks from '@accounts/infra/mocks';
import { HttpRecipientsGatewayController } from './recipients-gateway.controller';

describe('HttpRecipientsGatewayController', () => {
  let moduleRef: TestingModule;
  let appRecipientsSignUpService: Services.AppRecipientsSignUpService;
  let appRecipientsFetchService: Services.AppRecipientsFetchService;
  let httpGatewayController: HttpRecipientsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpRecipientsGatewayController],
      providers: AccountsModule.providers,
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
      .withFields({ email: 'john2@snow.com' })
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    const expectedRecipient = Mocks.RecipientPlainObjectBuilder()
      .withFields({ id: 2, email: 'john2@snow.com' })
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
