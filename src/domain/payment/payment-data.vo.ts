import { ValueObject } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Utils from '@shared/utils';
import { getAcceptedPaymentStatus, PaymentStatus } from './payment-status.enum';

export class PaymentData extends ValueObject {
  public readonly policyId: string;
  public readonly orderId: string;
  public readonly status: PaymentStatus;
  public readonly amount: number;
  public readonly paidAmount: number;

  constructor(
    policyId: string,
    orderId: string,
    status: PaymentStatus,
    amount: number,
    paidAmount: number,
  ) {
    super();
    this.policyId = policyId;
    this.orderId = orderId;
    this.setStatus(status);
    this.setAmount(amount);
    this.setPaidAmount(paidAmount);
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
