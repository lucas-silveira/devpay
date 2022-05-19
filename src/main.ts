import * as Nest from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestAddons } from '@shared';
import { AppModule } from './app.module';
import { makeConfigAndValidate } from './config';

async function bootstrap() {
  const config = makeConfigAndValidate();
  const app = await NestFactory.create(AppModule.register());
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
  await app.listen(config.app.httpPort || 3000);
}
bootstrap();
