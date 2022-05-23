import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { RecipientType } from './recipient-type.enum';
import { Recipient } from './recipient.entity';

Tests.unitScope('Recipient', () => {
  describe('creation', () => {
    it('Should be able to create a Recipient correctly', () => {
      expect(
        new Recipient(1, 'John Snow', RecipientType.Individual, new Date()),
      ).toEqual({
        id: 1,
        name: 'John Snow',
        type: 'individual',
        createdAt: jasmine.any(Date),
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty id', () => {
      expect(
        () =>
          new Recipient(
            undefined,
            'John Snow',
            RecipientType.Individual,
            new Date(),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty type', () => {
      expect(
        () => new Recipient(1, 'John Snow', undefined, new Date()),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty createdAt', () => {
      expect(
        () =>
          new Recipient(1, 'John Snow', RecipientType.Individual, undefined),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid type', () => {
      expect(
        () => new Recipient(1, 'John Snow', 'X' as any, new Date()),
      ).toThrowError(DomainException);
    });
  });
});
