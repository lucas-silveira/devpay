import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/tests';
import { AmqpPaymentsGatewayController } from './payments-gateway.controller';

Tests.serviceScope('AmqpPaymentsGatewayController', () => {
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
      amqpGatewayController.paymentsTestHandle(
        {},
        Tests.rmqpContextMock as any,
      ),
    ).resolves.not.toThrow();
  });
});
