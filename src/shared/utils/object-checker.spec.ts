import { fieldExists } from './object-checker';

describe('ObjectChecker', () => {
  describe('fieldExists', () => {
    it('Should be able to get true if a field exists in a object', () => {
      const obj = { field1: 123 };
      expect(fieldExists(obj, 'field1')).toBe(true);
    });

    it('Should be able to get false if a field not exists in a object', () => {
      const obj = { field1: 123 };
      expect(fieldExists(obj, 'field2')).toBe(false);
    });

    it('Should be able to get false if a field is in a nested object', () => {
      const obj = {
        field1: {
          field2: 123,
        },
      };
      expect(fieldExists(obj, 'field2')).toBe(false);
    });

    it('Should be able to get false if we pass an undefined object', () => {
      expect(fieldExists(undefined, 'field1')).toBe(false);
    });
  });
});
