import * as Tests from '@shared/tests';
import { generateRandomKey, generateUuidV4, generateObjectId } from '../hash';

Tests.unitScope('Hash', () => {
  describe('generateUuidV4', () => {
    it('Should be able to generate an UUIDv4', () => {
      const uuid = generateUuidV4();
      expect(uuid).toBeTruthy();
      expect(typeof uuid).toBe('string');
      expect(uuid.length).toBe(36);
    });
  });

  describe('generateRandomKey', () => {
    it('Should be able to generate a random key', async () => {
      const randomKey = await generateRandomKey();
      expect(randomKey).toBeTruthy();
      expect(typeof randomKey).toBe('string');
      expect(randomKey.length).toBe(16);
    });
  });

  describe('generateObjectId', () => {
    it('Should be able to generate an ObjectId string', () => {
      const objectId = generateObjectId();
      expect(objectId).toBeTruthy();
      expect(typeof objectId).toBe('string');
      expect(objectId.length).toBe(24);
    });
  });
});
