import * as Nest from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    MongooseModule.forFeature([
      {
        name: Infra.Data.Payment.PaymentEventDocument.name,
        schema: Infra.Data.Payment.PaymentEventSchema,
      },
      {
        name: Infra.Data.Payment.PaymentDocument.name,
        schema: Infra.Data.Payment.PaymentSchema,
      },
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
    {
      provide: 'PaymentEventStore',
      useClass: Infra.Data.Payment.MongoEventStoreAdapter,
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
