import { ValueObject } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Utils from '@shared/utils';
import { getAcceptedPolicyIds, PolicyId } from '@domain/policy';
import { getAcceptedPaymentStatus, PaymentStatus } from './payment-status.enum';

export class PaymentData extends ValueObject {
  public readonly policy: PolicyId;
  public readonly status: PaymentStatus;
  public readonly amount: number;
  public readonly paidAmount: number;

  constructor(
    policy: PolicyId,
    status: PaymentStatus,
    amount: number,
    paidAmount: number,
  ) {
    super();
    this.setPolicy(policy);
    this.setStatus(status);
    this.setAmount(amount);
    this.setPaidAmount(paidAmount);
  }

  private setPolicy(aPolicy: PolicyId): void {
    if (!aPolicy) return;

    const isPolicyNotAccepted = !getAcceptedPolicyIds().includes(aPolicy);
    if (isPolicyNotAccepted)
      throw new DomainException(
        `The PaymentEvent policy is not accepted: ${aPolicy}`,
      );

    this.setReadOnlyProperty('policy', aPolicy);
  }

  private setStatus(aStatus: PaymentStatus): void {
    if (!aStatus) return;

    const isStatusNotAccepted = !getAcceptedPaymentStatus().includes(aStatus);
    if (isStatusNotAccepted)
      throw new DomainException(
        `The PaymentEvent status is not accepted: ${aStatus}`,
      );

    this.setReadOnlyProperty('status', aStatus);
  }

  private setAmount(anAmount: number): void {
    if (!anAmount) return;
    if (anAmount < 0 || isNaN(anAmount))
      throw new DomainException('The PaymentEvent amount is invalid');

    this.setReadOnlyProperty('amount', Utils.Math.round(anAmount));
  }

  private setPaidAmount(anAmount: number): void {
    if (!anAmount) return;
    if (anAmount < 0 || isNaN(anAmount))
      throw new DomainException('The PaymentEvent paidAmount is invalid');

    this.setReadOnlyProperty('paidAmount', Utils.Math.round(anAmount));
  }
}
