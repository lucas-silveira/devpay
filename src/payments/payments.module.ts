import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
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
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (config: ConfigService) => ({
        exchanges: [
          {
            name: config.get('rabbitMq.exchanges.topic'),
            type: 'topic',
          },
        ],
        uri: config.get('rabbitMq.host'),
        prefetchCount: config.get('rabbitMq.channel.prefetchCount'),
        enableControllerDiscovery: true,
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
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
      useClass: Infra.Data.Payment.EventStoreDecorator,
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
