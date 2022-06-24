import * as Nest from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as NestAddons from '@shared/nest-addons';
import * as Application from './application';
import * as Infra from './infra';
import * as Presentation from './presentation';

export class AccountsModule {
  static imports = [
    TypeOrmModule.forFeature([Infra.Data.Account.AccountActiveRecord]),
    NestAddons.RabbitMQModule.register(),
  ];
  static controllers = [Presentation.Http.HttpAccountsGatewayController];
  static providers = [
    NestAddons.AppLogger,
    Application.Services.AppAccountsSignUpService,
    Application.Services.AppAccountsFetchService,
    {
      provide: 'AccountsRepositoryAdapter',
      useClass: Infra.Data.Account.MysqlRepositoryAdapter,
    },
    {
      provide: 'AccountsRepository',
      useClass: Infra.Data.Account.MysqlRepositoryDecorator,
    },
    {
      provide: 'EventPublisher',
      useClass: Infra.Events.AmqpEventPublisherAdapter,
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
