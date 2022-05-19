import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { Account } from '@accounts/domain';

@Nest.Injectable()
export class ProvidersIntegrationService {
  private readonly logger = new NestAddons.AppLogger(
    ProvidersIntegrationService.name,
  );

  public async integrateWithStone(account: Account): Promise<void> {
    return;
  }
}
