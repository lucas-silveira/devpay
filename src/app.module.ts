import * as Nest from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
        host: config.get('mysqlDatabase.host'),
        port: config.get('mysqlDatabase.port'),
        username: config.get('mysqlDatabase.user'),
        password: config.get('mysqlDatabase.pass'),
        database: config.get('mysqlDatabase.name'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('mongoDatabase.uri'),
        ignoreUndefined: true,
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
