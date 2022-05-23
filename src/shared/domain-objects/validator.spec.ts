import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import {
  checkIfIsEmpty,
  checkIfIsInvalidEnum,
  checkIfLengthIsGreaterThanMax,
  checkIfIsGreaterThanMax,
  checkIfIsLowerThanMin,
  checkIfIsNaN,
  checkIfIsNotInteger,
} from './validator';

Tests.unitScope('Validator', () => {
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

  describe('checkIfIsInvalidEnum', () => {
    enum TestEnum {
      One = 'one',
      Two = 'two',
    }

    it('Should be able to not throw a DomainException if the value is a valid enum', () => {
      expect(() =>
        checkIfIsInvalidEnum(TestEnum, TestEnum.One, 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfIsInvalidEnum(TestEnum, 'two', 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfIsInvalidEnum(TestEnum, [TestEnum.One], 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfIsInvalidEnum(TestEnum, ['two'], 'message'),
      ).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is not a valid enum', () => {
      expect(() =>
        checkIfIsInvalidEnum(TestEnum, undefined, 'message'),
      ).toThrowError(DomainException);
      expect(() => checkIfIsInvalidEnum(TestEnum, 1, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsInvalidEnum(TestEnum, [1], 'message')).toThrowError(
        DomainException,
      );
    });
  });

  describe('checkIfLengthIsGreaterThanMax', () => {
    it('Should be able to not throw a DomainException if the value is lower or equal to maximum', () => {
      expect(() =>
        checkIfLengthIsGreaterThanMax('1', 10, 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfLengthIsGreaterThanMax('1', 1, 'message'),
      ).not.toThrow();
      expect(() =>
        checkIfLengthIsGreaterThanMax('x', 1, 'message'),
      ).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is greater than maximum', () => {
      expect(() =>
        checkIfLengthIsGreaterThanMax('10', 1, 'message'),
      ).toThrowError(DomainException);
      expect(() =>
        checkIfLengthIsGreaterThanMax(10, 1, 'message'),
      ).toThrowError(DomainException);
      expect(() =>
        checkIfLengthIsGreaterThanMax('xx', 1, 'message'),
      ).toThrowError(DomainException);
    });
  });

  describe('checkIfIsGreaterThanMax', () => {
    it('Should be able to not throw a DomainException if the value is lower or equal to maximum', () => {
      expect(() => checkIfIsGreaterThanMax(1, 10, 'message')).not.toThrow();
      expect(() => checkIfIsGreaterThanMax(1, 1, 'message')).not.toThrow();
      expect(() => checkIfIsGreaterThanMax('1', 1, 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is greater than maximum', () => {
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

    it('Should be able to throw a DomainException if the value is lower than minimum', () => {
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

  describe('checkIfIsNotInteger', () => {
    it('Should be able to not throw a DomainException if the value is a integer', () => {
      expect(() => checkIfIsNotInteger(0, 'message')).not.toThrow();
      expect(() => checkIfIsNotInteger(1, 'message')).not.toThrow();
      expect(() => checkIfIsNotInteger(10, 'message')).not.toThrow();
      expect(() => checkIfIsNotInteger(-1, 'message')).not.toThrow();
    });

    it('Should be able to throw a DomainException if the value is not a integer', () => {
      expect(() => checkIfIsNotInteger(1.2, 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsNotInteger('1', 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsNotInteger('1.2', 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsNotInteger('x', 'message')).toThrowError(
        DomainException,
      );
      expect(() => checkIfIsNotInteger(undefined, 'message')).toThrowError(
        DomainException,
      );
    });
  });
});
