import { DomainException } from '@shared/infra-objects';
import { PolicyId } from '@domain/policy';
import { PaymentStatus } from './payment-status.enum';
import { PaymentEvent } from './payment.event';

describe('PaymentEvent', () => {
  it('Should be able to create a Policy correctly', () => {
    expect(
      new PaymentEvent(
        '38640e97-ee5a-4437-b10b-59b690b737c3',
        PolicyId.Default,
        PaymentStatus.Pending,
        10,
        10,
        new Date(),
      ),
    ).toEqual({
      pid: '38640e97-ee5a-4437-b10b-59b690b737c3',
      policy: 'default',
      status: 'pending',
      amount: 10,
      paidAmount: 10,
      timestamp: jasmine.any(Date),
    });
  });

  it('Should be able to throw a DomainException if we pass an empty id', () => {
    expect(
      () =>
        new PaymentEvent(
          undefined,
          PolicyId.Default,
          PaymentStatus.Pending,
          10,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty policy', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          undefined,
          PaymentStatus.Pending,
          10,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty status', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          undefined,
          10,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty amount', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          PaymentStatus.Pending,
          undefined,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty paidAmount', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          PaymentStatus.Pending,
          10,
          undefined,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid policy', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          'X' as any,
          PaymentStatus.Pending,
          10,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid status', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          'X' as any,
          10,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid amount', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          PaymentStatus.Pending,
          -1,
          10,
        ),
    ).toThrowError(DomainException);
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          PaymentStatus.Pending,
          'X' as any,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid paidAmount', () => {
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          PaymentStatus.Pending,
          10,
          -1,
        ),
    ).toThrowError(DomainException);
    expect(
      () =>
        new PaymentEvent(
          '38640e97-ee5a-4437-b10b-59b690b737c3',
          PolicyId.Default,
          PaymentStatus.Pending,
          10,
          'X' as any,
        ),
    ).toThrowError(DomainException);
  });
});