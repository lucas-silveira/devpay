import * as Nest from '@nestjs/common';

@Nest.Controller()
export class HttpGlobalGatewayController {
  @Nest.Get('health')
  public async health(): Promise<void> {
    return Promise.resolve();
  }
}
