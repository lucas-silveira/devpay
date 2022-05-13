import { ValueObject, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { PaymentStatus } from './payment-status.enum';

export class PaymentData extends ValueObject {
  public readonly policyId?: string;
  public readonly orderId?: string;
  public readonly status?: PaymentStatus;
  public readonly amount?: number;
  public readonly paidAmount?: number;
  public readonly cardToken?: string;

  constructor(
    policyId?: string,
    orderId?: string,
    status?: PaymentStatus,
    amount?: number,
    paidAmount?: number,
    cardToken?: string,
  ) {
    super();
    this.policyId = policyId;
    this.orderId = orderId;
    this.setStatus(status);
    this.setAmount(amount);
    this.setPaidAmount(paidAmount);
    this.cardToken = cardToken;
  }

  private setStatus(aStatus: PaymentStatus): void {
    if (!aStatus) return;
    Validator.checkIfIsAValidEnum(
      PaymentStatus,
      aStatus,
      `The PaymentEvent status is not accepted: ${aStatus}`,
    );
    this.setReadOnlyProperty('status', aStatus);
  }

  private setAmount(anAmount: number): void {
    if (!anAmount) return;
    Validator.checkIfIsNaN(anAmount, 'The PaymentEvent amount is invalid');
    Validator.checkIfIsLowerThanMin(
      anAmount,
      0,
      'The PaymentEvent amount is invalid',
    );
    this.setReadOnlyProperty('amount', Utils.Math.round(anAmount));
  }

  private setPaidAmount(anAmount: number): void {
    if (!anAmount) return;
    Validator.checkIfIsNaN(anAmount, 'The PaymentEvent amount is invalid');
    Validator.checkIfIsLowerThanMin(
      anAmount,
      0,
      'The PaymentEvent amount is invalid',
    );
    this.setReadOnlyProperty('paidAmount', Utils.Math.round(anAmount));
  }
}
