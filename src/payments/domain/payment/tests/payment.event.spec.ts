import { Cents } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import { PaymentData } from '../payment-data.vo';
import { PaymentEventKey } from '../payment-event-key.enum';
import { PaymentStatus } from '../payment-status.enum';
import { PaymentEvent } from '../payment.event';

Tests.unitScope('PaymentEvent', () => {
  describe('creation', () => {
    it('Should be able to create a PaymentEvent correctly', () => {
      expect(
        new PaymentEvent(
          PaymentEventKey.PaymentCreated,
          '6290315378d50b220f49626c',
          1,
          'stone',
          new PaymentData(
            'default',
            '12345',
            PaymentStatus.Pending,
            new Cents(100),
            new Cents(100),
          ),
          new Date(),
        ),
      ).toEqual({
        key: 'payment.created',
        pid: '6290315378d50b220f49626c',
        rid: 1,
        ppid: 'stone',
        data: {
          policyId: 'default',
          orderId: '12345',
          status: 'pending',
          amount: { value: 100 },
          paidAmount: { value: 100 },
        },
        timestamp: jasmine.any(Date),
      });
    });

    it('Should be able to create a PaymentEvent with a generated pid', () => {
      expect(
        new PaymentEvent(
          PaymentEventKey.PaymentCreated,
          undefined,
          1,
          'stone',
          new PaymentData(
            'default',
            '12345',
            PaymentStatus.Pending,
            new Cents(100),
            new Cents(100),
          ),
          new Date(),
        ),
      ).toEqual({
        key: 'payment.created',
        pid: jasmine.any(String),
        rid: 1,
        ppid: 'stone',
        data: {
          policyId: 'default',
          orderId: '12345',
          status: 'pending',
          amount: { value: 100 },
          paidAmount: { value: 100 },
        },
        timestamp: jasmine.any(Date),
      });
    });
  });

  describe('empty validation', () => {
    it('Should be able to throw a DomainException if we pass an empty key', () => {
      expect(
        () =>
          new PaymentEvent(
            undefined,
            '6290315378d50b220f49626c',
            1,
            'stone',
            new PaymentData(
              'default',
              '12345',
              PaymentStatus.Pending,
              new Cents(100),
              new Cents(100),
            ),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty rid', () => {
      expect(
        () =>
          new PaymentEvent(
            PaymentEventKey.PaymentCreated,
            '6290315378d50b220f49626c',
            undefined,
            'stone',
            new PaymentData(
              'default',
              '12345',
              PaymentStatus.Pending,
              new Cents(100),
              new Cents(100),
            ),
          ),
      ).toThrowError(DomainException);
    });

    it('Should be able to throw a DomainException if we pass an empty ppid', () => {
      expect(
        () =>
          new PaymentEvent(
            PaymentEventKey.PaymentCreated,
            '6290315378d50b220f49626c',
            1,
            undefined,
            new PaymentData(
              'default',
              '12345',
              PaymentStatus.Pending,
              new Cents(100),
              new Cents(100),
            ),
          ),
      ).toThrowError(DomainException);
    });
  });

  describe('type validation', () => {
    it('Should be able to throw a DomainException if we pass an invalid key', () => {
      expect(
        () =>
          new PaymentEvent(
            'X' as any,
            '6290315378d50b220f49626c',
            1,
            'stone',
            new PaymentData(
              'default',
              '12345',
              PaymentStatus.Pending,
              new Cents(100),
              new Cents(100),
            ),
          ),
      ).toThrowError(DomainException);
    });
  });
});
