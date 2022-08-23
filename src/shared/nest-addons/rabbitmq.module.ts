import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQModule as GLURabbitMQModule } from '@golevelup/nestjs-rabbitmq';

export class RabbitMQModule {
  static imports = [
    GLURabbitMQModule.forRootAsync(GLURabbitMQModule, {
      useFactory: (config: ConfigService) => ({
        exchanges: [
          {
            name: config.get('rabbitMq.exchanges.topic'),
            type: 'topic',
          },
        ],
        handlers: {
          test: {
            exchange: 'devpay.topic',
            routingKey: 'payment.*',
            queue: 'payments',
            createQueueIfNotExists: false,
            queueOptions: {
              messageTtl: 604800000,
              deadLetterExchange: 'devpay.topic.dlq',
            },
          },
        },
        uri: config.get('rabbitMq.host'),
        prefetchCount: config.get('rabbitMq.channel.prefetchCount'),
        enableControllerDiscovery: true,
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
  ];

  static exports = [GLURabbitMQModule];

  static register(): Nest.DynamicModule {
    return {
      module: RabbitMQModule,
      imports: RabbitMQModule.imports,
      exports: RabbitMQModule.exports,
    };
  }
}
