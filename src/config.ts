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
    exchanges: {
      topic: string;
      topicDlq: string;
    };
    channel: {
      prefetchCount: number;
    };
    queues: {
      payments: {
        name: string;
        options: {
          durable: boolean;
          autoDelete: boolean;
          messageTtl: number;
          deadLetterExchange: string;
        };
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
    exchanges: {
      topic: process.env.RABBITMQ_EXCHANGE_TOPIC,
      topicDlq: process.env.RABBITMQ_EXCHANGE_TOPIC_DLQ,
    },
    channel: {
      prefetchCount: 10,
    },
    queues: {
      payments: {
        name: process.env.RABBITMQ_QUEUE_PAYMENTS,
        options: {
          durable: true,
          autoDelete: false,
          messageTtl: Number(process.env.RABBITMQ_QUEUE_PAYMENTS_MSG_TTL),
          deadLetterExchange: process.env.RABBITMQ_EXCHANGE_TOPIC_DLQ,
        },
      },
    },
  },
});

export const makeConfigAndValidate = (): Config =>
  Utils.Config.makeAndValidate(makeConfig);

export const makeConfigAndValidateFor = (field: keyof Config): Config =>
  Utils.Config.makeAndValidateFor(makeConfig, field);
