import { DomainException } from '@shared/infra-objects';
import {
  checkIfIsEmpty,
  checkIfIsAValidEnum,
  checkIfIsGreaterThanMax,
  checkIfIsLowerThanMin,
  checkIfIsNaN,
  checkIfIsInteger,
} from './validator';

describe('Validator', () => {
  describe('checkIfIsEmpty', () => {
    it('Should be able to not throw a DomainException if the value is not empty', () => {
      expect(() => checkIfIsEmpty(1, 'message')).not.toThrow();
      expect(() => checkIfIsEmpty(0, 'message')).not.toThrow();
      expect(() => checkIfIsEmpty(false, 'message')).not.toThrow();
      expect(() => checkIfIsEmpty({ x: 1 }, 'message')).not.toThrow();
      expect(() => checkIfIsEmpty([1], 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is empty', () => {
      expect(() => checkIfIsEmpty(undefined, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsEmpty(null, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsEmpty({}, 'message')).toThrowError(DomainException);
      expect(() => checkIfIsEmpty([], 'message')).toThrowError(DomainException);
    });
  });

  describe('checkIfIsAValidEnum', () => {
    enum TestEnum {
      One = 'one',
      Two = 'two',
    }

    it('Should be able to not throw a DomainException if the value is a valid enum', () => {
      expect(() =>
        checkIfIsAValidEnum(TestEnum, TestEnum.One, 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfIsAValidEnum(TestEnum, 'two', 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfIsAValidEnum(TestEnum, [TestEnum.One], 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfIsAValidEnum(TestEnum, ['two'], 'message'),
      ).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is not a valid enum', () => {
      expect(() =>
        checkIfIsAValidEnum(TestEnum, undefined, 'message'),
      ).toThrowError(DomainException);
      expect(() => checkIfIsAValidEnum(TestEnum, 1, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsAValidEnum(TestEnum, [1], 'message')).toThrowError(
        DomainException,
      );
    });
  });

  describe('checkIfIsGreaterThanMax', () => {
    it('Should be able to not throw a DomainException if the value is lower or equal to maximum', () => {
      expect(() => checkIfIsGreaterThanMax(1, 10, 'message')).not.toThrow();
      expect(() => checkIfIsGreaterThanMax(1, 1, 'message')).not.toThrow();
      expect(() => checkIfIsGreaterThanMax('1', 1, 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is greater to maximum', () => {
      expect(() => checkIfIsGreaterThanMax(10, 1, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsGreaterThanMax('10', 1, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsGreaterThanMax('x', 1, 'message')).toThrowError(
        DomainException,
      );
    });
  });

  describe('checkIfIsLowerThanMin', () => {
    it('Should be able to not throw a DomainException if the value is lower or equal to minimum', () => {
      expect(() => checkIfIsLowerThanMin(10, 1, 'message')).not.toThrow();
      expect(() => checkIfIsLowerThanMin(1, 1, 'message')).not.toThrow();
      expect(() => checkIfIsLowerThanMin('1', 1, 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is lower to minimum', () => {
      expect(() => checkIfIsLowerThanMin(1, 10, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsLowerThanMin('1', 10, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsLowerThanMin('x', 1, 'message')).toThrowError(
        DomainException,
      );
    });
  });

  describe('checkIfIsNaN', () => {
    it('Should be able to not throw a DomainException if the value is a number', () => {
      expect(() => checkIfIsNaN(0, 'message')).not.toThrow();
      expect(() => checkIfIsNaN(1, 'message')).not.toThrow();
      expect(() => checkIfIsNaN(-1, 'message')).not.toThrow();
      expect(() => checkIfIsNaN('1', 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is not a number', () => {
      expect(() => checkIfIsNaN('x', 'message')).toThrowError(DomainException);
      expect(() => checkIfIsNaN(undefined, 'message')).toThrowError(
        DomainException,
      );
    });
  });

  describe('checkIfIsInteger', () => {
    it('Should be able to not throw a DomainException if the value is a integer', () => {
      expect(() => checkIfIsInteger(0, 'message')).not.toThrow();
      expect(() => checkIfIsInteger(1, 'message')).not.toThrow();
      expect(() => checkIfIsInteger(10, 'message')).not.toThrow();
      expect(() => checkIfIsInteger(-1, 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is not a integer', () => {
      expect(() => checkIfIsInteger(1.2, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsInteger('1', 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsInteger('1.2', 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsInteger('x', 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsInteger(undefined, 'message')).toThrowError(
        DomainException,
      );
    });
  });
});
