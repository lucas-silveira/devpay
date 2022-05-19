import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import * as Presentation from './presentation';

export class PaymentsModule {
  static imports = [];
  static controllers = [Presentation.Http.HttpPaymentsGatewayController];
  static providers = [NestAddons.AppLogger];

  static register(): Nest.DynamicModule {
    return {
      module: PaymentsModule,
      imports: PaymentsModule.imports,
      providers: PaymentsModule.providers,
      controllers: PaymentsModule.controllers,
    };
  }
}
