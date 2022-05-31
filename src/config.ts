import * as Utils from '@shared/utils';

export type Config = {
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
  rabbitMq: {
    host: string;
    port: number;
    user: string;
    pass: string;
    queues: {
      payments: {
        name: string;
        arguments: Record<string, unknown>;
      };
    };
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
  rabbitMq: {
    host: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_VHOST}`,
    port: Number(process.env.RABBITMQ_PORT),
    user: process.env.RABBITMQ_USER,
    pass: process.env.RABBITMQ_PASS,
    queues: {
      payments: {
        name: process.env.RABBITMQ_QPAYMENTS,
        arguments: {
          'x-message-ttl': Number(process.env.RABBITMQ_QPAYMENTS_MSG_TTL),
          'x-dead-letter-exchange': process.env.RABBITMQ_QPAYMENTS_EXCHANGE_DLQ,
        },
      },
    },
  },
});

export const makeConfigAndValidate = (): Config =>
  Utils.Config.makeAndValidate(makeConfig);

export const makeConfigAndValidateFor = (field: keyof Config): Config =>
  Utils.Config.makeAndValidateFor(makeConfig, field);
