import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const generateUuidV4 = (): string => uuidv4();

export const generateRandomString = (size = 24): Promise<string> =>
  new Promise((res, rej) => {
    randomBytes(size, (err: Error, buff: Buffer) => {
      if (err) return rej(err);
      return res(buff.toString('base64'));
    });
  });
