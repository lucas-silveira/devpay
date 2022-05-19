import * as Nest from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as NestAddons from '@shared/nest-addons';
import * as Application from './application';
import * as Domain from './domain';
import * as Infra from './infra';
import * as Presentation from './presentation';

export class AccountsModule {
  static imports = [
    TypeOrmModule.forFeature([Infra.Data.Recipient.RecipientActiveRecord]),
  ];
  static controllers = [Presentation.Http.HttpRecipientsGatewayController];
  static providers = [
    NestAddons.AppLogger,
    Application.Services.AppRecipientsSignUpService,
    Application.Services.AppRecipientsFetchService,
    Domain.Services.ProvidersIntegrationService,
    {
      provide: 'RecipientsRepository',
      useClass: Infra.Data.Recipient.MysqlRepositoryAdapter,
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
