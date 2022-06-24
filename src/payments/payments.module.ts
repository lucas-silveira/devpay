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
    NestAddons.RabbitMQModule.register(),
  ];
  static controllers = [
    Presentation.Http.HttpPaymentsGatewayController,
    Presentation.Http.HttpPoliciesGatewayController,
    Presentation.Amqp.AmqpPaymentsGatewayController,
  ];
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
      provide: 'PaymentsRepository',
      useClass: Infra.Data.Payment.MongoRepositoryAdapter,
    },
    {
      provide: 'PaymentEventStoreAdapter',
      useClass: Infra.Data.Payment.MongoEventStoreAdapter,
    },
    {
      provide: 'PaymentEventStore',
      useClass: Infra.Data.Payment.MongoEventStoreDecorator,
    },
    {
      provide: 'EventPublisher',
      useClass: Infra.Events.AmqpEventPublisherAdapter,
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
