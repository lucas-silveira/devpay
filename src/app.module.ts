import * as Nest from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { PaymentsModule } from '@payments/payments.module';
import { AccountsModule } from '@accounts/accounts.module';
import { makeConfigAndValidate } from './config';

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
    AccountsModule.register(),
    PaymentsModule.register(),
  ];
  static controllers = [];
  static providers = [];

  static register(): Nest.DynamicModule {
    return {
      module: AppModule,
      imports: AppModule.imports,
      providers: AppModule.providers,
      controllers: AppModule.controllers,
    };
  }
}
