import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/testing';
import { AmqpPaymentsGatewayController } from '../payments-gateway.controller';

Tests.unitScope('AmqpPaymentsGatewayController', () => {
  let moduleRef: TestingModule;
  let amqpGatewayController: AmqpPaymentsGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AmqpPaymentsGatewayController],
    }).compile();

    amqpGatewayController = moduleRef.get<AmqpPaymentsGatewayController>(
      AmqpPaymentsGatewayController,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a payment', async () => {
    await expect(
      amqpGatewayController.paymentsTestHandle({}),
    ).resolves.not.toThrow();
  });
});
