import { DomainException } from '@shared/infra-objects';
import { PaymentData } from './payment-data.vo';
import { PaymentStatus } from './payment-status.enum';
import { PaymentEvent } from './payment.event';

describe('PaymentEvent', () => {
  it('Should be able to create a PaymentEvent correctly', () => {
    expect(
      new PaymentEvent(
        '38640e97-ee5a-4437-b10b-59b690b737c3',
        1,
        'stone',
        new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),

        new Date(),
      ),
    ).toEqual({
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

  it('Should be able to throw a DomainException if we pass an empty pid', () => {
    expect(
      () =>
        new PaymentEvent(
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
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          1,
          undefined,
          new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to generate a new pid on uuidv4 format', () => {
    const pid = PaymentEvent.generatePid();

    expect(pid).toBeTruthy();
    expect(typeof pid).toBe('string');
    expect(pid.length).toBe(36);
  });
});
