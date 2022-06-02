import { Test, TestingModule } from '@nestjs/testing';
import * as Tests from '@shared/tests';
import { AccountsModule } from '@accounts/accounts.module';
import * as Mocks from '@accounts/infra/mocks';
import { ProvidersIntegrationService } from '../providers-integration.service';

Tests.serviceScope('ProvidersIntegrationService', () => {
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
    const account = Mocks.AccountDomainObjectBuilder()
      .withoutFields('id')
      .build();

    await expect(
      providersIntegrationService.integrateWithStone(account),
    ).resolves.not.toThrow();
  });
});
