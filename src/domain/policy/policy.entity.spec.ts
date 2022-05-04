import { PaymentMethod } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { RecipientType } from '@domain/recipient';
import { PaymentLiable } from './payment-liable.vo';
import { PolicyId } from './policy-id.enum';
import { Policy } from './policy.entity';
import { Requirements } from './requirements.vo';

describe('Policy', () => {
  it('Should be able to create a Policy correctly', () => {
    expect(
      new Policy(
        PolicyId.Default,
        0.1,
        new Requirements(100, 2, RecipientType.Individual),
        [new PaymentLiable('stone', PaymentMethod.CreditCard)],
      ),
    ).toEqual({
      id: 'default',
      fee: 0.1,
      requirements: {
        minTransactionalValue: 100,
        minAccountMonths: 2,
        recipientType: 'individual',
      },
      paymentLiables: [
        {
          paymentProviderId: 'stone',
          paymentMethod: 'credit_card',
        },
      ],
      createdAt: jasmine.any(Date),
    });
  });

  it('Should be able to throw a DomainException if we pass an empty id', () => {
    expect(
      () =>
        new Policy(
          undefined,
          0.1,
          new Requirements(100, 2, RecipientType.Individual),
          [new PaymentLiable('stone', PaymentMethod.CreditCard)],
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty fee', () => {
    expect(
      () =>
        new Policy(
          PolicyId.Default,
          undefined,
          new Requirements(100, 2, RecipientType.Individual),
          [new PaymentLiable('stone', PaymentMethod.CreditCard)],
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty requirements', () => {
    expect(
      () =>
        new Policy(PolicyId.Default, 0.1, undefined, [
          new PaymentLiable('stone', PaymentMethod.CreditCard),
        ]),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty paymentLiables', () => {
    expect(
      () =>
        new Policy(
          PolicyId.Default,
          0.1,
          new Requirements(100, 2, RecipientType.Individual),
          undefined,
        ),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an invalid id', () => {
    expect(
      () =>
        new Policy(
          'X' as any,
          0.1,
          new Requirements(100, 2, RecipientType.Individual),
          [new PaymentLiable('stone', PaymentMethod.CreditCard)],
        ),
    ).toThrowError(DomainException);
  });
});
