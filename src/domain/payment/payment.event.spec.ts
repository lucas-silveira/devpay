import { DomainException } from '@shared/infra-objects';
import { PaymentData } from './payment-data.vo';
import { PaymentEventName } from './payment-event-name.enum';
import { PaymentStatus } from './payment-status.enum';
import { PaymentEvent } from './payment.event';

describe('PaymentEvent', () => {
  describe('creation', () => {
    it('Should be able to create a PaymentEvent correctly', () => {
      expect(
        new PaymentEvent(
          PaymentEventName.PaymentCreated,
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          1,
          'stone',
          new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
          new Date(),
        ),
      ).toEqual({
        name: 'payment_created',
        pid: '38640e97-ee5a-4437-b10b-59b690b737c3',
        rid: 1,
        pmid: 'stone',
        data: {
          policyId: 'default',
          orderId: '12345',
          status: 'pending',
          amount: 10,
          paidAmount: 10,
        },
        timestamp: jasmine.any(Date),
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty name', () => {
      expect(
        () =>
          new PaymentEvent(
            undefined,
            '38640e97-ee5a-4437-b10b-59b690b737c3',
            1,
            'stone',
            new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty pid', () => {
      expect(
        () =>
          new PaymentEvent(
            PaymentEventName.PaymentCreated,
            undefined,
            1,
            'stone',
            new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty rid', () => {
      expect(
        () =>
          new PaymentEvent(
            PaymentEventName.PaymentCreated,
            '38640e97-ee5a-4437-b10b-59b690b737c3',
            undefined,
            'stone',
            new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty pmid', () => {
      expect(
        () =>
          new PaymentEvent(
            PaymentEventName.PaymentCreated,
            '38640e97-ee5a-4437-b10b-59b690b737c3',
            1,
            undefined,
            new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid name', () => {
      expect(
        () =>
          new PaymentEvent(
            'X' as any,
            '38640e97-ee5a-4437-b10b-59b690b737c3',
            1,
            'stone',
            new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
          ),
      ).toThrowError(DomainException);
    });
  });
});
