import * as Nest from '@nestjs/common';
import { connections } from 'mongoose';

export const UseMongoTransaction = <T extends Record<string, any>>(
  target: T,
  name: keyof T,
  descriptor: PropertyDescriptor,
): void => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    if (connections[1].readyState !== 1)
      throw new Nest.BadGatewayException('MongoDB connection is not ready');

    const session = await connections[1].startSession();
    let result: unknown;

    try {
      result = await session.withTransaction(() => {
        return originalMethod.apply(this, [...args, session]);
      });
    } finally {
      await session.endSession();
    }

    return result;
  };
};
