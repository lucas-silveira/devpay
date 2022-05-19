import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '@accounts/accounts.module';
import * as Mocks from '@accounts/infra/mocks';
import { ProvidersIntegrationService } from './providers-integration.service';

describe('ProvidersIntegrationService', () => {
  let moduleRef: TestingModule;
  let providersIntegrationService: ProvidersIntegrationService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: AccountsModule.controllers,
      providers: AccountsModule.providers,
    }).compile();

    providersIntegrationService = moduleRef.get<ProvidersIntegrationService>(
      ProvidersIntegrationService,
    );
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should be able to integrate with Stone', async () => {
    const recipient = Mocks.RecipientDomainObjectBuilder()
      .withoutFields('id')
      .build();

    await expect(
      providersIntegrationService.integrateWithStone(recipient),
    ).resolves.not.toThrow();
  });
});
