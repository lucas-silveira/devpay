import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/testing';
import { HttpPaymentsGatewayController } from '../payments-gateway.controller';

Tests.unitScope('HttpPaymentsGatewayController', () => {
  let moduleRef: TestingModule;
  let httpGatewayController: HttpPaymentsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpPaymentsGatewayController],
    }).compile();

    httpGatewayController = moduleRef.get<HttpPaymentsGatewayController>(
      HttpPaymentsGatewayController,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a payment', async () => {
    await expect(httpGatewayController.postPayments()).resolves.not.toThrow();
  });
});
