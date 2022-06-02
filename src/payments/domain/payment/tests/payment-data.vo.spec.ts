import { Cents } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import { PaymentData } from '../payment-data.vo';
import { PaymentStatus } from '../payment-status.enum';

Tests.unitScope('PaymentData', () => {
  describe('creation', () => {
    it('Should be able to create a PaymentData with all args correctly', () => {
      expect(
        new PaymentData(
          'default',
          '12345',
          PaymentStatus.Pending,
          new Cents(100),
          new Cents(100),
          'card_123',
        ),
      ).toEqual({
        policyId: 'default',
        orderId: '12345',
        status: 'pending',
        amount: { value: 100 },
        paidAmount: { value: 100 },
        cardToken: 'card_123',
      });
    });

    it('Should be able to create a PaymentData without optional args correctly', () => {
      expect(new PaymentData()).toEqual({});
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid status', () => {
      expect(
        () =>
          new PaymentData(
            'default',
            '12345',
            'X' as any,
            new Cents(100),
            new Cents(100),
          ),
      ).toThrowError(DomainException);
    });
  });
});
