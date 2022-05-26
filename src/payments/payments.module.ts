import * as Nest from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as NestAddons from '@shared/nest-addons';
import * as Infra from './infra';
import * as Presentation from './presentation';

export class PaymentsModule {
  static imports = [
    TypeOrmModule.forFeature([
      Infra.Data.Policy.PolicyActiveRecord,
      Infra.Data.PaymentProvider.PaymentProviderActiveRecord,
    ]),
  ];
  static controllers = [Presentation.Http.HttpPaymentsGatewayController];
  static providers = [
    NestAddons.AppLogger,
    {
      provide: 'PoliciesRepository',
      useClass: Infra.Data.Policy.MysqlRepositoryAdapter,
    },
    {
      provide: 'PaymentProvidersRepository',
      useClass: Infra.Data.PaymentProvider.MysqlRepositoryAdapter,
    },
  ];

  static register(): Nest.DynamicModule {
    return {
      module: PaymentsModule,
      imports: PaymentsModule.imports,
      providers: PaymentsModule.providers,
      controllers: PaymentsModule.controllers,
    };
  }
}
