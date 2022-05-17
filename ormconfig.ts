import * as dotenv from 'dotenv';
import * as path from 'path';
import { makeConfigAndValidateFor } from './src/config';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const makeConfig = async () => {
  const database = makeConfigAndValidateFor('database').database;

  return {
    type: 'mysql',
    host: database.host,
    database: database.name,
    port: database.port,
    username: database.user,
    password: database.pass,
    synchronize: false,
    entities: ['src/**/*.ar.{js,ts}'],
    migrations: ['src/**/migrations/*.{js,ts}'],
  };
};
const config = makeConfig();

export = config;
