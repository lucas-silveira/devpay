import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import * as Application from './application';
import * as Presentation from './presentation';

export class AppModule {
  static imports = [];
  static controllers = [
    Presentation.Http.HttpGlobalGatewayController,
    Presentation.Http.HttpPaymentsGatewayController,
    Presentation.Http.HttpRecipientsGatewayController,
  ];
  static providers = [
    NestAddons.AppLogger,
    Application.Services.AppRecipientsSignUpService,
  ];

  static register(): Nest.DynamicModule {
    return {
      module: AppModule,
      imports: AppModule.imports,
      providers: AppModule.providers,
      controllers: AppModule.controllers,
    };
  }
}
