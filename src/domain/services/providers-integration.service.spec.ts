import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as Mocks from '@infra/mocks';
import { ProvidersIntegrationService } from './providers-integration.service';

describe('ProvidersIntegrationService', () => {
  let moduleRef: TestingModule;
  let providersIntegrationService: ProvidersIntegrationService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AppModule.controllers,
      providers: AppModule.providers,
    }).compile();

    providersIntegrationService = moduleRef.get<ProvidersIntegrationService>(
      ProvidersIntegrationService,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to integrate with Stone', async () => {
    const recipient = Mocks.makeRecipientDomainObject();
    delete recipient.id;

    await expect(
      providersIntegrationService.integrateWithStone(recipient),
    ).resolves.not.toThrow();
  });
});
