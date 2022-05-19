import * as Nest from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as NestAddons from '@shared/nest-addons';
import * as Application from './application';
import * as Domain from './domain';
import * as Infra from './infra';
import * as Presentation from './presentation';

export class AccountsModule {
  static imports = [
    TypeOrmModule.forFeature([Infra.Data.Account.AccountActiveRecord]),
  ];
  static controllers = [Presentation.Http.HttpAccountsGatewayController];
  static providers = [
    NestAddons.AppLogger,
    Application.Services.AppAccountsSignUpService,
    Application.Services.AppAccountsFetchService,
    Domain.Services.ProvidersIntegrationService,
    {
      provide: 'AccountsRepository',
      useClass: Infra.Data.Account.MysqlRepositoryAdapter,
    },
  ];

  static register(): Nest.DynamicModule {
    return {
      module: AccountsModule,
      imports: AccountsModule.imports,
      providers: AccountsModule.providers,
      controllers: AccountsModule.controllers,
    };
  }
}
