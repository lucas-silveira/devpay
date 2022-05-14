import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as Mocks from '@infra/mocks';
import { HttpRecipientsGatewayController } from './recipients-gateway.controller';

describe('HttpRecipientsGatewayController', () => {
  let moduleRef: TestingModule;
  let httpGatewayController: HttpRecipientsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpRecipientsGatewayController],
      providers: AppModule.providers,
    }).compile();

    httpGatewayController = moduleRef.get<HttpRecipientsGatewayController>(
      HttpRecipientsGatewayController,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a recipient', async () => {
    const { firstName, lastName, email, document, type } =
      Mocks.makeRecipientPlainObject();
    const recipientDto = { firstName, lastName, email, document, type };

    await expect(
      httpGatewayController.postRecipients(recipientDto),
    ).resolves.not.toThrow();
  });
});
