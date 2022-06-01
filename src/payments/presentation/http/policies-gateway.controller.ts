import * as Nest from '@nestjs/common';
import { Log } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';

@Nest.Controller('policies')
export class HttpPoliciesGatewayController {
  private readonly logger = new NestAddons.AppLogger(
    HttpPoliciesGatewayController.name,
  );

  @Nest.Post()
  public async postPolicies(): Promise<void> {
    this.logger.log(new Log('Http Request received to create a Policy', {}));
    return;
  }
}
