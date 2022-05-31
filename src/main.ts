import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
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
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.get<string>('rabbitMq.host')],
        queue: config.get('rabbitMq.queues.payments.name'),
        noAck: false,
        persistent: true,
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
