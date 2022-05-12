import { Test, TestingModule } from '@nestjs/testing';
import { HttpGlobalGatewayController } from './global-gateway.controller';

describe('HttpGlobalGatewayController', () => {
  let moduleRef: TestingModule;
  let httpGatewayController: HttpGlobalGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpGlobalGatewayController],
    }).compile();

    httpGatewayController = moduleRef.get<HttpGlobalGatewayController>(
      HttpGlobalGatewayController,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to verify the application health', async () => {
    await expect(httpGatewayController.health()).resolves.not.toThrow();
  });
});
