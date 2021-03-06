import { randomBytes } from 'crypto';
import { Types as MongoTypes } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const generateUuidV4 = (): string => uuidv4();

export const generateRandomKey = (size = 8): Promise<string> =>
  new Promise((res, rej) => {
    randomBytes(size, (err: Error, buff: Buffer) => {
      if (err) return rej(err);
      return res(buff.toString('hex'));
    });
  });

export const generateObjectId = (): string =>
  new MongoTypes.ObjectId().toString();
