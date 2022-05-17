import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import * as Application from './application';
import * as Domain from './domain';
import * as Infra from './infra';
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
    Domain.Services.ProvidersIntegrationService,
    {
      provide: 'RecipientsRepository',
      useClass: Infra.Data.Recipient.MysqlRepositoryAdapter,
    },
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
