import { DomainException } from '@shared/infra-objects';
import { PaymentData } from './payment-data.vo';
import { PaymentStatus } from './payment-status.enum';

describe('PaymentData', () => {
  describe('creation', () => {
    it('Should be able to create a PaymentData with all args correctly', () => {
      expect(
        new PaymentData(
          'default',
          '12345',
          PaymentStatus.Pending,
          100,
          100,
          'card_123',
        ),
      ).toEqual({
        policyId: 'default',
        orderId: '12345',
        status: 'pending',
        amount: 100,
        paidAmount: 100,
        cardToken: 'card_123',
      });
    });

    it('Should be able to create a PaymentData without optional args correctly', () => {
      expect(new PaymentData()).toEqual({});
    });

    it('Should be able to throw a DomainException if we pass an invalid status', () => {
      expect(
        () => new PaymentData('default', '12345', 'X' as any, 1000, 1000),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an invalid amount', () => {
      expect(
        () =>
          new PaymentData('default', '12345', PaymentStatus.Pending, -100, 100),
      ).toThrowError(DomainException);
      expect(
        () =>
          new PaymentData(
            'default',
            '12345',
            PaymentStatus.Pending,
            'X' as any,
            100,
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid paidAmount', () => {
      expect(
        () =>
          new PaymentData('default', '12345', PaymentStatus.Pending, 10, -1),
      ).toThrowError(DomainException);
      expect(
        () =>
          new PaymentData(
            'default',
            '12345',
            PaymentStatus.Pending,
            100,
            'X' as any,
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to round an amount if we pass as decimal', () => {
      expect(
        new PaymentData(
          'default',
          '12345',
          PaymentStatus.Pending,
          100.2,
          100,
          'card_123',
        ),
      ).toEqual({
        policyId: 'default',
        orderId: '12345',
        status: 'pending',
        amount: 100,
        paidAmount: 100,
        cardToken: 'card_123',
      });
    });

    it('Should be able to round an paidAmount if we pass as decimal', () => {
      expect(
        new PaymentData(
          'default',
          '12345',
          PaymentStatus.Pending,
          100,
          100.6,
          'card_123',
        ),
      ).toEqual({
        policyId: 'default',
        orderId: '12345',
        status: 'pending',
        amount: 100,
        paidAmount: 101,
        cardToken: 'card_123',
      });
    });
  });
});
