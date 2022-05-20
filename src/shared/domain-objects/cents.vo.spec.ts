import { DomainException } from '@shared/infra-objects';
import { Cents } from './cents.vo';

describe('Cents', () => {
  describe('creation', () => {
    it('Should be able to create a Cents', () => {
      expect(new Cents(100)).toEqual({ value: 100 });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty value', () => {
      expect(() => new Cents(undefined)).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid value', () => {
      expect(() => new Cents(1.2)).toThrowError(DomainException);
      expect(() => new Cents(-1)).toThrowError(DomainException);
      expect(() => new Cents('1' as any)).toThrowError(DomainException);
    });
  });

  describe('plus', () => {
    it('Should be able to plus Cents', () => {
      const cents1 = new Cents(100);
      const cents2 = new Cents(100);
      const result = cents1.plus(cents2);

      expect(result).toBeInstanceOf(Cents);
      expect(result).toEqual({ value: 200 });
    });
  });

  describe('discount', () => {
    it('Should be able to discount Cents', () => {
      const cents1 = new Cents(100);
      const cents2 = new Cents(90);
      const result = cents1.discount(cents2);

      expect(result).toBeInstanceOf(Cents);
      expect(result).toEqual({ value: 10 });
    });

    it('Should be able to throw a DomainException if the discount result is invalid', () => {
      const cents1 = new Cents(90);
      const cents2 = new Cents(100);

      expect(() => cents1.discount(cents2)).toThrowError(DomainException);
    });
  });
});
