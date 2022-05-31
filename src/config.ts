import * as Utils from '@shared/utils';

type Config = {
  app: {
    httpPort: number;
  };
  mysqlDatabase: {
    host: string;
    name: string;
    port: number;
    user: string;
    pass: string;
  };
  mongoDatabase: {
    uri: string;
  };
  rabbitMQ: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
};

export const makeConfig = (): Config => ({
  app: {
    httpPort: Number(process.env.APP_HTTP_PORT),
  },
  mysqlDatabase: {
    host: process.env.MYSQL_DATABASE_HOST,
    name: process.env.MYSQL_DATABASE_NAME,
    port: Number(process.env.MYSQL_DATABASE_PORT),
    user: process.env.MYSQL_DATABASE_USER,
    pass: process.env.MYSQL_DATABASE_PASS,
  },
  mongoDatabase: {
    uri: process.env.MONGO_DATABASE_URI,
  },
  rabbitMQ: {
    host: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    user: process.env.RABBITMQ_USER,
    pass: process.env.RABBITMQ_PASS,
  },
});

export const makeConfigAndValidate = (): Config =>
  Utils.Config.makeAndValidate(makeConfig);

export const makeConfigAndValidateFor = (field: keyof Config): Config =>
  Utils.Config.makeAndValidateFor(makeConfig, field);
