import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

console.log = jest.fn();
