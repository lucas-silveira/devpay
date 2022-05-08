import { DomainException } from '@shared/infra-objects';
import { PolicyId } from '@domain/policy';
import { PaymentData } from './payment-data.vo';
import { PaymentStatus } from './payment-status.enum';

describe('PaymentData', () => {
  it('Should be able to create a PaymentData correctly', () => {
    expect(
      new PaymentData(PolicyId.Default, PaymentStatus.Pending, 10, 10),
    ).toEqual({
      policy: 'default',
      status: 'pending',
      amount: 10,
      paidAmount: 10,
    });
  });

  it('Should be able to throw a DomainException if we pass an invalid policy', () => {
    expect(
      () => new PaymentData('X' as any, PaymentStatus.Pending, 10, 10),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid status', () => {
    expect(
      () => new PaymentData(PolicyId.Default, 'X' as any, 10, 10),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid amount', () => {
    expect(
      () => new PaymentData(PolicyId.Default, PaymentStatus.Pending, -1, 10),
    ).toThrowError(DomainException);
    expect(
      () =>
        new PaymentData(
          PolicyId.Default,
          PaymentStatus.Pending,
          'X' as any,
          10,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid paidAmount', () => {
    expect(
      () => new PaymentData(PolicyId.Default, PaymentStatus.Pending, 10, -1),
    ).toThrowError(DomainException);
    expect(
      () =>
        new PaymentData(
          PolicyId.Default,
          PaymentStatus.Pending,
          10,
          'X' as any,
        ),
    ).toThrowError(DomainException);
  });
});
