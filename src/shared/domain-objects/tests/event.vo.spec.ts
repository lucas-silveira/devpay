import { DomainException } from '@shared/infra-objects';
import { DomainEvent } from '../event.vo';

describe('DomainEvent', () => {
  describe('creation', () => {
    it('Should be able to create a DomainEvent correctly', () => {
      expect(new DomainEvent('event.any')).toEqual({
        name: 'event.any',
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty name', () => {
      expect(() => new DomainEvent(undefined)).toThrowError(DomainException);
    });
  });
});
