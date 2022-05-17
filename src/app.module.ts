import * as Nest from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as NestAddons from '@shared/nest-addons';
import * as Application from './application';
import { makeConfigAndValidate } from './config';
import * as Domain from './domain';
import * as Infra from './infra';
import * as Presentation from './presentation';

export class AppModule {
  static imports = [
    ConfigModule.forRoot({
      envFilePath: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: [makeConfigAndValidate],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.user'),
        password: config.get('database.pass'),
        database: config.get('database.name'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ];
  static controllers = [
    Presentation.Http.HttpGlobalGatewayController,
    Presentation.Http.HttpPaymentsGatewayController,
    Presentation.Http.HttpRecipientsGatewayController,
  ];
  static providers = [
    NestAddons.AppLogger,
    Application.Services.AppRecipientsSignUpService,
    Domain.Services.ProvidersIntegrationService,
    {
      provide: 'RecipientsRepository',
      useClass: Infra.Data.Recipient.MysqlRepositoryAdapter,
    },
  ];

  static register(): Nest.DynamicModule {
    return {
      module: AppModule,
      imports: AppModule.imports,
      providers: AppModule.providers,
      controllers: AppModule.controllers,
    };
  }
}
