import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { Recipient } from '@domain/recipient';

@Nest.Injectable()
export class ProvidersIntegrationService {
  private readonly logger = new NestAddons.AppLogger(
    ProvidersIntegrationService.name,
  );

  public async integrateWithStone(recipient: Recipient): Promise<void> {
    return;
  }
}
