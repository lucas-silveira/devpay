import { Test, TestingModule } from '@nestjs/testing';
import { HttpRecipientsGatewayController } from './recipients-gateway.controller';

describe('HttpRecipientsGatewayController', () => {
  let moduleRef: TestingModule;
  let httpGatewayController: HttpRecipientsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpRecipientsGatewayController],
    }).compile();

    httpGatewayController = moduleRef.get<HttpRecipientsGatewayController>(
      HttpRecipientsGatewayController,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a recipient', async () => {
    await expect(httpGatewayController.postRecipients()).resolves.not.toThrow();
  });
});
