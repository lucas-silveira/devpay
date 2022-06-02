import * as Tests from '@shared/tests';
import { makeAndValidate, makeAndValidateFor } from '../config';

Tests.unitScope('Config', () => {
  beforeAll(() => {
    // changing node env in order to test functions
    process.env.NODE_ENV = 'development';
  });

  describe('makeAndValidate', () => {
    it('Should be able to validate and return a valid config data', () => {
      const configData = {
        field1: true,
        field2: {
          field2_1: true,
        },
      };
      expect(() => makeAndValidate(() => configData)).not.toThrow();
    });

    it('Should be able to throw Error if a empty field exists', () => {
      const configData = { field1: true, field2: undefined };
      const configData2 = {
        field1: true,
        field2: {
          field2_1: true,
          field2_2: undefined,
        },
      };
      expect(() => makeAndValidate(() => configData)).toThrowError(Error);
      expect(() => makeAndValidate(() => configData2)).toThrowError(Error);
    });
  });

  describe('makeAndValidateFor', () => {
    it('Should be able to validate and return a valid config data', () => {
      const configData = {
        field1: true,
        field2: undefined,
      };
      expect(() =>
        makeAndValidateFor(() => configData, 'field1'),
      ).not.toThrow();
    });

    it('Should be able to throw Error if a empty field exists', () => {
      const configData = { field1: true, field2: undefined };
      const configData2 = {
        field1: true,
        field2: {
          field2_1: true,
          field2_2: undefined,
        },
      };
      expect(() => makeAndValidateFor(() => configData, 'field2')).toThrowError(
        Error,
      );
      expect(() =>
        makeAndValidateFor(() => configData2, 'field2'),
      ).toThrowError(Error);
    });
  });
});
