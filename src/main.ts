import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as NestMs from '@nestjs/microservices';
import { NestAddons } from '@shared';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.useLogger(app.get(NestAddons.AppLogger));
  app.useGlobalInterceptors(
    new NestAddons.Interceptors.HttpRequestCamelCaseInterceptor(),
    new NestAddons.Interceptors.HttpResponseSnakeCaseInterceptor(),
  );
  app.useGlobalPipes(
    new Nest.ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.connectMicroservice<NestMs.MicroserviceOptions>(
    {
      transport: NestMs.Transport.RMQ,
      options: {
        urls: [config.get<string>('rabbitMq.host')],
        queue: config.get('rabbitMq.queues.payments.name'),
        prefetchCount: config.get('rabbitMq.queues.payments.prefetchCount'),
        noAck: config.get('rabbitMq.queues.payments.noAck'),
        persistent: config.get('rabbitMq.queues.payments.persistent'),
        queueOptions: {
          arguments: config.get('rabbitMq.queues.payments.arguments'),
        },
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(config.get('app.httpPort') || 3000);
}
bootstrap();
