import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/tests';
import { HttpPoliciesGatewayController } from './policies-gateway.controller';

Tests.serviceScope('HttpPoliciesGatewayController', () => {
  let moduleRef: TestingModule;
  let httpGatewayController: HttpPoliciesGatewayController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [HttpPoliciesGatewayController],
    }).compile();

    httpGatewayController = moduleRef.get<HttpPoliciesGatewayController>(
      HttpPoliciesGatewayController,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to create a payment', async () => {
    await expect(httpGatewayController.postPolicies()).resolves.not.toThrow();
  });
});
